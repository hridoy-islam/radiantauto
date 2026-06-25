"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Car,
  Search,
  Eye,
  Calendar,
  Mail,
  Phone,
  User,
  Trash2,
  FileText,
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

interface ITradeIn {
  _id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  current_car_brand: string;
  current_car_model: string;
  current_car_year: number;
  current_car_mileage: number;
  current_car_transmission_type: string;
  current_car_photos: string[];
  current_car_special_notes?: string;
  expected_car_model: string;
  expected_car_year: number;
  expected_car_mileage?: number;
  expected_car_transmission_type: string;
  expected_car_special_notes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function TradeInManagementPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [tradeIns, setTradeIns] = useState<ITradeIn[]>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSearch, setActiveSearch] = useState<string>("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(100);

  // Fetch Paginated & Filtered Trade-Ins
  const fetchTradeIns = async (page: number, limit: number, search: string) => {
    try {
      setPageLoading(true);
      const response = await axiosInstance.get("/trade-car", {
        params: {
          page,
          limit,
          searchTerm: search || undefined,
        },
      });

      const data =
        response?.data?.data?.result ||
        response?.data?.data ||
        response?.data ||
        [];
      const metaTotal = response?.data?.data?.meta?.totalPage || 1;

      setTradeIns(data);
      setTotalPages(metaTotal);
    } catch (error: any) {
      console.error("Failed to fetch trade-in requests:", error);
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
    fetchTradeIns(currentPage, entriesPerPage, activeSearch);
  }, [currentPage, entriesPerPage, activeSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setActiveSearch(searchQuery);
  };

  // Navigate to details page
  const handleViewDetails = (id: string) => {
    router.push(`/admin/trade-in/${id}`);
  };

  // Handle delete
  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    try {
      setDeleteLoading(true);
      const response = await axiosInstance.delete(`/trade-car/${deleteId}`);

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Trade-in request deleted successfully.",
          variant: "default",
        });
        // Refresh the list
        fetchTradeIns(currentPage, entriesPerPage, activeSearch);
      } else {
        toast({
          title: "Error",
          description:
            response.data.message || "Failed to delete trade-in request.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description:
          error?.response?.data?.message ||
          "Failed to delete trade-in request.",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
      setShowDeleteDialog(false);
      setDeleteId(null);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get car display name
  const getCarDisplay = (tradeIn: ITradeIn) => {
    return `${tradeIn.current_car_model}`;
  };

  // Get transmission badge variant
  const getTransmissionBadge = (type: string) => {
    if (type?.toLowerCase() === "automatic") {
      return (
        <Badge className="bg-blue-100 text-primary hover:bg-blue-100">
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
            <div className="p-2 bg-gradient-to-br from-primary/80 to-primary rounded-lg">
              <Car className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Trade-In Requests
              </h1>
              <p className="text-sm text-gray-500">
                Manage all car trade-in submissions
              </p>
            </div>
          </div>

          {/* Filter Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col gap-3 w-full sm:flex-row sm:items-center lg:max-w-xl lg:ml-6"
          >
            <div className="relative w-full lg:w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
              <Input
                type="text"
                placeholder="Search by name, email, car brand or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-black/20 focus-visible:ring-black h-10 bg-white w-full"
              />
            </div>

            <Button
              type="submit"
              className="h-10 w-full sm:w-auto px-5 rounded-sm font-medium shrink-0 bg-gradient-to-r from-primary to-primary hover:from-primary hover:to-primary"
            >
              Search
            </Button>
          </form>
        </div>
      </div>

      {/* Main Content Area */}
      {pageLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
          <BlinkingDots />
        </div>
      ) : tradeIns.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-black/20 rounded-xl p-12 text-center bg-black/[0.01]">
          <Car className="w-12 h-12 text-black/30 mb-4" />
          <h3 className="text-lg font-semibold text-primary">
            No Trade-In Requests Found
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            There are currently no trade-in submissions.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[1000px] w-full">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-black/30 hover:bg-transparent bg-gray-50">
                  <TableHead className="text-black font-semibold h-12">
                    Customer
                  </TableHead>
                  <TableHead className="text-black font-semibold h-12">
                    Contact
                  </TableHead>
                  <TableHead className="text-black font-semibold h-12">
                    Current Car
                  </TableHead>
                  <TableHead className="text-black font-semibold h-12">
                    Expected Car
                  </TableHead>

                  <TableHead className="text-black font-semibold h-12 text-right pr-4">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tradeIns.map((tradeIn) => (
                  <TableRow
                    key={tradeIn._id}
                     onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(tradeIn._id);
                          }}
                    className="border-b border-black/10 hover:bg-gray-50/50 transition-colors cursor-pointer cursor-pointer"
                  >
                    <TableCell className="py-4 pl-4">
                      <div>
                        <p className="font-semibold text-black">
                          {tradeIn.first_name} {tradeIn.last_name}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <p className="text-sm flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-gray-700">{tradeIn.email}</span>
                        </p>
                        <p className="text-sm flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-gray-700">
                            {tradeIn.phone_number || "—"}
                          </span>
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div>
                        <p className="font-medium text-black">
                          {getCarDisplay(tradeIn)}
                        </p>

                    

                        {tradeIn.current_car_transmission_type && (
                          <div className="mt-1">
                            {getTransmissionBadge(
                              tradeIn.current_car_transmission_type,
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div>
                        <p className="font-medium text-black">
                          {tradeIn.expected_car_model || "—"}
                        </p>

                        {tradeIn.expected_car_transmission_type && (
                          <div className="mt-1">
                            {getTransmissionBadge(
                              tradeIn.expected_car_transmission_type,
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="text-right py-4 pr-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(tradeIn._id);
                          }}
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(tradeIn._id);
                          }}
                          title="Delete Request"
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              trade-in request and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading}>
              Cancel
            </AlertDialogCancel>
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
