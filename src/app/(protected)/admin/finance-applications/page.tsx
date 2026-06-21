"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Users, Search, Eye } from "lucide-react";
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

interface IFinanceApplicant {
  _id: string;
  first_name: string;
  middle_name?: string ;
  last_name: string;
  email: string;
  phone: string;
  status?: string; // e.g., "Pending", "Approved", "Rejected"
  requestedAmount?: number;
  createdAt: string;
}

export default function FinanceApplicantsPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [applicants, setApplicants] = useState<IFinanceApplicant[]>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSearch, setActiveSearch] = useState<string>("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(100);

  // Fetch Paginated & Filtered Applicants
  const fetchApplicants = async (page: number, limit: number, search: string) => {
    try {
      setPageLoading(true);
      const response = await axiosInstance.get("/finance-applicants", {
        params: {
          page,
          limit,
          searchTerm: search || undefined,
        },
      });

      // Matches your existing data structure strategy
      const data = response?.data?.data?.result || response?.data?.data || response?.data || [];
      const metaTotal = response?.data?.data?.meta?.totalPage || 1;

      setApplicants(data);
      setTotalPages(metaTotal);
    } catch (error: any) {
      console.error("Failed to fetch finance applicants:", error);
      const fallbackMsg = error?.response?.data?.message || "Server not reachable";
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
    fetchApplicants(currentPage, entriesPerPage, activeSearch);
  }, [currentPage, entriesPerPage, activeSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setActiveSearch(searchQuery);
  };

  // Navigates directly to the specific dynamic detail route
  const handleViewDetails = (id: string) => {
    router.push(`/admin/finance-applications/${id}`);
  };

  return (
    <div className="mx-auto space-y-6 text-black">
      {/* Top Header Row Panel */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 w-full lg:flex-row lg:items-center flex-1">
          <h1 className="text-2xl font-bold tracking-tight shrink-0">Finance Applicants</h1>

          {/* Filter Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col gap-3 w-full sm:flex-row sm:items-center lg:max-w-xl lg:ml-6"
          >
            <div className="relative w-full lg:w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
              <Input
                type="text"
                placeholder="Search by name, email or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-black/20 focus-visible:ring-black h-10 bg-white w-full"
              />
            </div>

            <Button
              type="submit"
              className="h-10 w-full sm:w-auto px-5 rounded-sm font-medium shrink-0"
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
      ) : applicants.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-black/20 rounded-xl p-12 text-center bg-black/[0.01]">
          <Users className="w-12 h-12 text-black/30 mb-4" />
          <h3 className="text-lg font-semibold text-primary">
            No Applicants Found
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            There are currently no finance applications submitted.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[700px] w-full">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-black/30 hover:bg-transparent">
                  <TableHead className="text-black font-semibold h-12">
                    Applicant Name
                  </TableHead>
                  <TableHead className="text-black font-semibold h-12">
                    Email Address
                  </TableHead>
                  <TableHead className="text-black font-semibold h-12">
                    Phone Number
                  </TableHead>
                  
                  <TableHead className="text-black font-semibold h-12 text-right pr-4">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicants.map((applicant) => (
                  <TableRow
                    key={applicant._id}
                    onClick={() => handleViewDetails(applicant._id)}
                    className="border-b border-black/10 hover:bg-black/[0.01] transition-colors cursor-pointer"
                  >
                    <TableCell className="py-4 pl-4 font-bold text-black">
{[
  applicant.first_name,
  applicant.middle_name,
  applicant.last_name
]
  .filter(Boolean)
  .join(' ')  }                  </TableCell>
                    <TableCell className="text-black/80 py-4 font-medium">
                      {applicant.email}
                    </TableCell>
                    <TableCell className="font-medium text-black/80 py-4">
                      {applicant.phone || "—"}
                    </TableCell>
                   
                    <TableCell className="text-right py-4 pr-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevents double-firing row onClick
                            handleViewDetails(applicant._id);
                          }}
                          title="View Applicant Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
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
    </div>
  );
}