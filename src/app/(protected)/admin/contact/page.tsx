"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Mail, Search, Eye, Trash2 } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
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

interface IContactItem {
  _id: string;
  name: string;
  email: string;
  phone: string;
  content: string;
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<IContactItem[]>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSearch, setActiveSearch] = useState<string>("");

  // Dialog & Pagination States
  const [viewDialogOpen, setViewDialogOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [selectedContact, setSelectedContact] = useState<IContactItem | null>(null);

  // Delete States
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  
  const { toast } = useToast();

  // Fetch Paginated & Filtered Contact Items
  const fetchContacts = async (page: number, limit: number, search: string) => {
    try {
      setPageLoading(true);
      const response = await axiosInstance.get("/contact", {
        params: {
          page,
          limit,
          searchTerm: search || undefined,
        },
      });

      // Adjust extraction key matching your API structure response format
      const data = response?.data?.data?.result || response?.data?.data || response?.data || [];
      const metaTotal = response?.data?.data?.meta?.totalPage || 1;

      setContacts(data);
      setTotalPages(metaTotal);
    } catch (error: any) {
      console.error("Failed to fetch contact submissions:", error);
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
    fetchContacts(currentPage, entriesPerPage, activeSearch);
  }, [currentPage, entriesPerPage, activeSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setActiveSearch(searchQuery);
  };

  const handleViewOpen = (contact: IContactItem) => {
    setSelectedContact(contact);
    setViewDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    try {
      setDeleteLoading(true);
      const response = await axiosInstance.delete(`/contact/${deleteId}`);

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Contact inquiry deleted successfully.",
          variant: "default",
        });
        fetchContacts(currentPage, entriesPerPage, activeSearch);
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to delete contact inquiry.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to delete contact inquiry.",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
      setShowDeleteDialog(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="mx-auto space-y-6 text-black">
      {/* Top Header Row Panel */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 w-full lg:flex-row lg:items-center flex-1">
          <h1 className="text-2xl font-bold tracking-tight shrink-0">Contacts</h1>

          {/* Filter Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col gap-3 w-full sm:flex-row sm:items-center lg:max-w-xl lg:ml-6"
          >
            <div className="relative w-full lg:w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
              <Input
                type="text"
                placeholder="Search by name, email or message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-black/20  focus-visible:ring-black h-10 bg-white w-full"
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
      ) : contacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-black/20 rounded-xl p-12 text-center bg-black/[0.01]">
          <Mail className="w-12 h-12 text-black/30 mb-4" />
          <h3 className="text-lg font-semibold text-primary">
            No Messages Found
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            There are currently no custom contact requests or inquiries listed.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[700px] w-full">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-black/30 hover:bg-transparent">
                  <TableHead className="text-black font-semibold h-12">
                    Sender Name
                  </TableHead>
                  <TableHead className="text-black font-semibold h-12">
                    Email Address
                  </TableHead>
                  <TableHead className="text-black font-semibold h-12">
                    Phone Number
                  </TableHead>
                  <TableHead className="text-black font-semibold h-12">
                    Message
                  </TableHead>
                  <TableHead className="text-black font-semibold h-12 text-right pr-4">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow
                    key={contact._id}
                                              onClick={() => handleViewOpen(contact)}

                    className="border-b border-black/10 hover:bg-black/[0.01] transition-colors cursor-pointer"
                  >
                    <TableCell className="py-4 pl-4 font-bold text-black">
                      {contact.name}
                    </TableCell>
                    <TableCell className="text-black/80 py-4 font-medium">
                      {contact.email}
                    </TableCell>
                    <TableCell className="font-medium text-black/80 py-4">
                      {contact.phone || "—"}
                    </TableCell>
                    <TableCell className="text-black/80 py-4 max-w-[250px] truncate">
                      {contact.content}
                    </TableCell>
                    <TableCell className="text-right py-4 pr-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="icon"
                          onClick={() => handleViewOpen(contact)}
                          title="View Message Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(contact._id);
                          }}
                          title="Delete Message"
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

      {/* VIEW CONTACT INQUIRY MODAL */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="bg-white border border-black/10 max-w-[92vw] sm:max-w-2xl rounded-xl text-black p-5 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-black">
              Inquiry Details
            </DialogTitle>
            <DialogDescription className="text-black/50 text-xs">
              Received on: {selectedContact?.createdAt ? new Date(selectedContact.createdAt).toLocaleString() : "—"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4 text-sm border-t border-b border-black/5 py-4">
            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold text-black/60">From:</span>
              <span className="col-span-2 font-bold text-black">{selectedContact?.name}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold text-black/60">Email:</span>
              <span className="col-span-2 font-medium text-black select-all">{selectedContact?.email}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold text-black/60">Phone:</span>
              <span className="col-span-2 font-medium text-black select-all">{selectedContact?.phone || "—"}</span>
            </div>
            <div className="flex flex-col gap-1.5 pt-2">
              <span className="font-semibold text-black/60">Message Content:</span>
              <div className="bg-black/[0.02] border border-black/5 rounded-lg p-3 text-black/90 whitespace-pre-wrap leading-relaxed max-h-[240px] overflow-y-auto">
                {selectedContact?.content}
              </div>
            </div>
          </div>

          <DialogFooter className="flex sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setViewDialogOpen(false)}
              className="w-full sm:w-auto border-black/20 rounded-lg"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the contact inquiry and remove all
              associated data.
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