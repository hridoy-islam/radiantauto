"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Car,
  Search,
  Pencil,
  Trash2,
  Plus,
  BadgeCheck,
} from "lucide-react";
import axiosInstance from "../../../../lib/axios";

// Shadcn UI Imports
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
import { DynamicPagination } from "../../../../components/shared/DynamicPagination";
import { BlinkingDots } from "../../../../components/ui/blinking-dots";
import { useToast } from "../../../../components/ui/use-toast";
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
import { Badge } from "../../../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

export default function CarListManagementPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [cars, setCars] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  
  // Delete States
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Status Change Dialog States
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [statusTarget, setStatusTarget] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(100);

  // Fetch Paginated & Filtered Cars
  const fetchCars = async (page, limit, search, status) => {
    try {
      setPageLoading(true);
      const response = await axiosInstance.get("/cars", {
        params: {
          page,
          limit,
          searchTerm: search || undefined,
          status: status !== "all" ? status : undefined,
        },
      });

      const data =
        response?.data?.data?.result ||
        response?.data?.data ||
        response?.data ||
        [];
      const metaTotal = response?.data?.data?.meta?.totalPage || 1;

      setCars(data);
      setTotalPages(metaTotal);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
      const fallbackMsg =
        error?.response?.data?.message || "Server not reachable";
      toast({
        title: "Error",
        description: fallbackMsg,
        variant: "destructive",
      });
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(currentPage, entriesPerPage, activeSearch, statusFilter);
  }, [currentPage, entriesPerPage, activeSearch, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setActiveSearch(searchQuery);
  };

  const handleCreate = () => {
    router.push(`/admin/car-listing/create`);
  };

  const handleEdit = (id) => {
    router.push(`/admin/car-listing/edit/${id}`);
  };

  // Handle delete click
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    try {
      setDeleteLoading(true);
      const response = await axiosInstance.delete(`/cars/${deleteId}`);

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Car deleted successfully.",
          variant: "default",
        });
        fetchCars(currentPage, entriesPerPage, activeSearch, statusFilter);
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to delete car.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to delete car.",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
      setShowDeleteDialog(false);
      setDeleteId(null);
    }
  };

  // Open Status Confirmation Dialog
  const handleStatusClick = (id, currentStatus) => {
    const nextStatus = currentStatus === "available" ? "sold" : "available";
    setStatusTarget({ id, nextStatus });
    setShowStatusDialog(true);
  };

  // Confirm and Optimistically/Locally Update Status without re-fetching
  const handleStatusConfirm = async () => {
    if (!statusTarget) return;
    const { id, nextStatus } = statusTarget;

    try {
      setStatusUpdateLoading(true);
      const response = await axiosInstance.patch(`/cars/${id}`, {
        status: nextStatus,
      });

      if (response.data.success) {
        toast({
          title: "Success",
          description: `Car marked as ${nextStatus}.`,
          variant: "default",
        });
        
        // UPDATE LOCAL STATE DIRECTLY (NO RE-FETCH)
        setCars((prevCars) =>
          prevCars.map((car) =>
            car._id === id ? { ...car, status: nextStatus } : car
          )
        );
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to update status.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to update status.",
        variant: "destructive",
      });
    } finally {
      setStatusUpdateLoading(false);
      setShowStatusDialog(false);
      setStatusTarget(null);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    if (status === "available") {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
          <BadgeCheck className="w-3 h-3 mr-1" />
          Available
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
        Sold
      </Badge>
    );
  };

  const getTransmissionBadge = (type) => {
    if (type?.toLowerCase() === "automatic") {
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          Automatic
        </Badge>
      );
    }
    return (
      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
        Manual
      </Badge>
    );
  };

  return (
    <div className="mx-auto space-y-6 text-black">
      {/* Header Section */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 w-full lg:flex-row lg:items-center flex-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Car className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Car Inventory</h1>
              <p className="text-sm text-gray-500">Manage your car listings</p>
            </div>
          </div>

          {/* Filter Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col gap-3 w-full sm:flex-row sm:items-center lg:max-w-xl lg:ml-6"
          >
            <div className="relative w-full lg:w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
              <Input
                type="text"
                placeholder="Search by name, stock, VIN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-black/20 focus-visible:ring-black h-10 bg-white w-full"
              />
            </div>

            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-[140px] h-10">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>

            <Button
              type="submit"
              className="h-10 w-full sm:w-auto px-5 rounded-sm font-medium shrink-0 bg-primary"
            >
              Search
            </Button>
          </form>
        </div>

        <Button
          onClick={handleCreate}
          className="h-10 px-5 rounded-sm font-medium shrink-0 bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Listing
        </Button>
      </div>

      {/* Main Content Area */}
      {pageLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
          <BlinkingDots />
        </div>
      ) : cars.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-black/20 rounded-xl p-12 text-center bg-black/[0.01]">
          <Car className="w-12 h-12 text-black/30 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700">No Cars Found</h3>
          <p className="text-sm text-gray-500 mt-1 mb-4">
            {activeSearch || statusFilter !== "all"
              ? "No cars match your search criteria."
              : "There are currently no cars in the inventory."}
          </p>
          {!activeSearch && statusFilter === "all" && (
            <Button onClick={handleCreate} className="bg-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Car
            </Button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[1200px] w-full">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-black/30 hover:bg-transparent bg-gray-50">
                  <TableHead className="text-black font-semibold h-12">Car Details</TableHead>
                  <TableHead className="text-black font-semibold h-12">Specs</TableHead>
                  <TableHead className="text-black font-semibold h-12">Price</TableHead>
                  <TableHead className="text-black font-semibold h-12">Status</TableHead>
                  <TableHead className="text-black font-semibold h-12">Listed</TableHead>
                  <TableHead className="text-black font-semibold h-12 text-right pr-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cars.map((car) => (
                  <TableRow
                    key={car._id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(car._id);
                    }}
                    className="border-b border-black/10 hover:bg-gray-50/50 transition-colors cursor-pointer"
                  >
                    <TableCell className="py-4 pl-4">
                      <div>
                        <p className="font-semibold text-black">{car.name}</p>
                        <p className="text-xs text-gray-500">
                          {car.body_style} • {car.exterior_colour}
                        </p>
                      </div>
                    </TableCell>
                    
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        {car.transmission && <div>{getTransmissionBadge(car.transmission)}</div>}
                        {car.engine && (
                          <p className="text-xs text-gray-500">
                            {car.engine} • {car.drivetrain}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <p className="font-bold text-black text-lg">{formatPrice(car.price)}</p>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(car.status)}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusClick(car._id, car.status);
                          }}
                          className="text-xs text-primary hover:text-primary/80 underline font-medium"
                        >
                          {car.status === "available" ? "Mark Sold" : "Mark Available"}
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-sm text-gray-500">
                        {car.createdAt ? formatDate(car.createdAt) : "—"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right py-4 pr-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(car._id);
                          }}
                          title="Edit Car"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(car._id);
                          }}
                          title="Delete Car"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="p-4 border-t border-black/5 overflow-x-auto">
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

      {/* Status Transition Confirmation Dialog */}
      <AlertDialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Listing Status?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change this car's availability status to{" "}
              <span className="font-bold text-black uppercase">
                {statusTarget?.nextStatus}
              </span>
              ? This configuration will take immediate effect on your public channel frontend.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={statusUpdateLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleStatusConfirm} disabled={statusUpdateLoading}>
              {statusUpdateLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Confirm"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the car listing and remove all
              associated data including images.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteLoading ? (
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