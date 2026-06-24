"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Edit2, Trash2, Loader2, Car, Search } from "lucide-react";
import axiosInstance from "../../../../lib/axios";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../../components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { DynamicPagination } from "../../../../components/shared/DynamicPagination";
import { BlinkingDots } from "../../../../components/ui/blinking-dots";
import { useToast } from "../../../../components/ui/use-toast";

interface ICarBrand {
  _id: string;
  brandName: string;
  createdAt: string;
  updatedAt: string;
}

const carBrandFormSchema = z.object({
  brandName: z
    .string()
    .min(1, "Brand name is required.")
    .trim(),
});

type CarBrandFormValues = z.infer<typeof carBrandFormSchema>;

export default function CarBrandPage() {
  const { toast } = useToast();

  const [brands, setBrands] = useState<ICarBrand[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [selectedBrand, setSelectedBrand] = useState<ICarBrand | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const form = useForm<CarBrandFormValues>({
    resolver: zodResolver(carBrandFormSchema),
    defaultValues: {
      brandName: "",
    },
  });

  const fetchBrands = async (page: number, limit: number, search?: string) => {
    try {
      setPageLoading(true);
      const response = await axiosInstance.get("/car-brand", {
        params: { page, limit, searchTerm: search || undefined },
      });
      const data =
        response?.data?.data?.result || response?.data?.data || response?.data || [];
      setTotalPages(response?.data?.data?.meta?.totalPage || 1);
      setBrands(data);
    } catch (error) {
      console.error("Failed to fetch car brands:", error);
      toast({
        title: "Error",
        description: "Failed to load car brands.",
        variant: "destructive",
      });
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands(currentPage, entriesPerPage, activeSearch);
  }, [currentPage, entriesPerPage, activeSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setActiveSearch(searchQuery);
  };

  const handleCreateOpen = () => {
    setSelectedBrand(null);
    form.reset({ brandName: "" });
    setFormDialogOpen(true);
  };

  const handleEditOpen = (brand: ICarBrand) => {
    setSelectedBrand(brand);
    form.reset({ brandName: brand.brandName });
    setFormDialogOpen(true);
  };

  const handleDeleteOpen = (brand: ICarBrand) => {
    setSelectedBrand(brand);
    setDeleteDialogOpen(true);
  };

  const onSubmit = async (values: CarBrandFormValues) => {
    try {
      setSubmitLoading(true);
      if (selectedBrand) {
        await axiosInstance.patch(`/car-brand/${selectedBrand._id}`, values);
        toast({ title: "Success", description: "Car brand updated." });
      } else {
        await axiosInstance.post("/car-brand", values);
        toast({ title: "Success", description: "Car brand created." });
      }
      await fetchBrands(currentPage, entriesPerPage, activeSearch);
      setFormDialogOpen(false);
    } catch (error) {
      console.error("Error saving car brand:", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to save car brand.",
        variant: "destructive",
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedBrand) return;
    try {
      setSubmitLoading(true);
      await axiosInstance.delete(`/car-brand/${selectedBrand._id}`);
      toast({ title: "Success", description: "Car brand deleted." });
      await fetchBrands(currentPage, entriesPerPage, activeSearch);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting car brand:", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to delete car brand.",
        variant: "destructive",
      });
    } finally {
      setSubmitLoading(false);
      setSelectedBrand(null);
    }
  };

  return (
    <div className="mx-auto space-y-6 text-black">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 w-full lg:flex-row lg:items-center flex-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Car className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Car Brands</h1>
              <p className="text-sm text-gray-500">Manage car brands</p>
            </div>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col gap-3 w-full sm:flex-row sm:items-center lg:max-w-xl lg:ml-6"
          >
            <div className="relative w-full lg:w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
              <Input
                type="text"
                placeholder="Search by brand name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-black/20 focus-visible:ring-black h-10 bg-white w-full"
              />
            </div>
            <Button
              type="submit"
              className="h-10 w-full sm:w-auto px-5 rounded-sm font-medium shrink-0 bg-primary"
            >
              Search
            </Button>
          </form>
        </div>

        <Button
          onClick={handleCreateOpen}
          className="h-10 px-5 rounded-sm font-medium shrink-0 bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Car Brand
        </Button>
      </div>

      {pageLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
          <BlinkingDots />
        </div>
      ) : brands.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-black/20 rounded-xl p-12 text-center bg-black/[0.01]">
          <Car className="w-12 h-12 text-black/30 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700">No Car Brands Found</h3>
          <p className="text-sm text-gray-500 mt-1 mb-4">
            {activeSearch
              ? "No brands match your search criteria."
              : "There are currently no car brands."}
          </p>
          {!activeSearch && (
            <Button onClick={handleCreateOpen} className="bg-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Brand
            </Button>
          )}
        </div>
      ) : (
        <div className="overflow-hidden bg-white">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-black/10 hover:bg-transparent">
                <TableHead className="text-black font-semibold h-12">
                  Brand Name
                </TableHead>
                <TableHead className="text-black font-semibold h-12 text-right pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.map((brand) => (
                <TableRow
                  key={brand._id}
                  className="border-b border-black/10 hover:bg-black/[0.01] transition-colors"
                >
                  <TableCell className="font-medium text-black py-4">
                    {brand.brandName}
                  </TableCell>
                  <TableCell className="text-right py-4 pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="icon"
                        onClick={() => handleEditOpen(brand)}
                        title="Edit Brand"
                        
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDeleteOpen(brand)}
                        title="Delete Brand"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="p-4 border-t border-black/5">
              <DynamicPagination
                pageSize={entriesPerPage}
                setPageSize={setEntriesPerPage}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      )}

      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="bg-white border border-black/10 sm:max-w-xl rounded-xl text-black">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {selectedBrand ? "Edit Car Brand" : "Add Car Brand"}
            </DialogTitle>
            <DialogDescription>
              {selectedBrand
                ? "Update the car brand name below."
                : "Enter a new car brand name."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 py-2"
            >
              <FormField
                control={form.control}
                name="brandName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-semibold">
                      Brand Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Toyota, BMW, Tesla" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600 font-medium" />
                  </FormItem>
                )}
              />
              <DialogFooter className="gap-2 sm:gap-0 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setFormDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitLoading}>
                  {submitLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                  ) : selectedBrand ? (
                    "Save Changes"
                  ) : (
                    "Create"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <strong className="text-black">
                "{selectedBrand?.brandName}"
              </strong>{" "}
              car brand.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={submitLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {submitLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
