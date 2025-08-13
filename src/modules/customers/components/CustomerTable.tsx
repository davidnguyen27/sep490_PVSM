import {
  BadgeInfo,
  SquarePen,
  ArrowUp,
  ArrowDown,
  ArrowDownUp,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Customer } from "../types/customer.type";
import { EmptyTable, TableSkeleton } from "@/components/shared";
import { useCustomerDelete } from "../hooks/useCustomerDelete";
import { formatData } from "@/shared/utils/format.utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/shared";

const tableHeaders = [
  "STT",
  "Mã khách hàng",
  "Tên khách hàng",
  "Ngày sinh",
  "Số điện thoại",
  "Địa chỉ",
  "Thao tác",
];

interface Props {
  customers: Customer[];
  isPending: boolean;
  currentPage: number;
  pageSize: number;
}

export function CustomerTable({
  customers,
  isPending,
  currentPage,
  pageSize,
}: Props) {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(
    null,
  );

  // Delete mutation
  const deleteCustomer = useCustomerDelete();

  // Handle delete modal
  const handleDeleteClick = (customer: Customer) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (customerToDelete?.customerId) {
      deleteCustomer.mutate(customerToDelete.customerId, {
        onSuccess: () => {
          setShowDeleteModal(false);
          setCustomerToDelete(null);
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setCustomerToDelete(null);
  };

  // Handle STT sorting
  const handleSortClick = () => {
    if (sortOrder === null) {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder(null);
    }
  };

  // Sort customers: Default newest first (by customerId desc), with STT sorting option
  const getSortedCustomers = () => {
    // Filter out deleted customers first
    const activeCustomers = customers.filter((customer) => !customer.isDeleted);

    // Sort by customerId desc to show newest customers first
    const newestFirstCustomers = [...activeCustomers].sort((a, b) => {
      const aId = a.customerId ?? 0;
      const bId = b.customerId ?? 0;
      return bId - aId;
    });

    if (sortOrder === null) return newestFirstCustomers;

    // Apply STT sorting on already sorted data
    const indexedCustomers = newestFirstCustomers.map((customer, index) => ({
      ...customer,
      originalIndex: (currentPage - 1) * pageSize + index + 1,
    }));

    return indexedCustomers.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.originalIndex - b.originalIndex;
      } else {
        return b.originalIndex - a.originalIndex;
      }
    });
  };

  const sortedCustomers = getSortedCustomers();

  // Get sort icon
  const getSortIcon = () => {
    if (sortOrder === "asc") {
      return <ArrowUp size={16} className="text-white" />;
    } else if (sortOrder === "desc") {
      return <ArrowDown size={16} className="text-white" />;
    } else {
      return <ArrowDownUp size={16} className="text-white/70" />;
    }
  };

  return (
    <div className="bg-linen shadow-md">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow className="hover:bg-transparent">
            {tableHeaders.map((header, index) => (
              <TableHead
                key={header}
                className={`font-nunito px-4 py-2 text-center text-sm text-white ${
                  index === 0
                    ? `cursor-pointer transition-colors ${
                        sortOrder !== null
                          ? "bg-green/20 hover:bg-green/30"
                          : "hover:bg-primary/80"
                      }`
                    : ""
                }`}
                onClick={index === 0 ? handleSortClick : undefined}
              >
                {index === 0 ? (
                  <div className="flex items-center justify-center gap-1">
                    <span>{header}</span>
                    {getSortIcon()}
                  </div>
                ) : (
                  header
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {isPending ? (
          <TableSkeleton columnCount={7} rowCount={pageSize} />
        ) : sortedCustomers.length > 0 ? (
          <TableBody>
            {sortedCustomers.map((item, idx) => {
              const sttValue = (currentPage - 1) * pageSize + idx + 1;

              return (
                <TableRow
                  key={item.customerId || `customer-${idx}`}
                  className="hover:bg-accent/10 transition-colors duration-150"
                >
                  <TableCell className="text-dark font-nunito-500 text-center text-sm">
                    {sttValue}
                  </TableCell>
                  <TableCell className="text-dark font-nunito-400 max-w-[140px] truncate text-center text-sm">
                    {item.customerCode}
                  </TableCell>
                  <TableCell className="text-dark font-nunito-500 max-w-[140px] truncate text-center text-sm">
                    {item.fullName}
                  </TableCell>
                  <TableCell className="text-dark font-nunito-400 text-center text-sm">
                    {formatData.formatDateYMD(item.dateOfBirth)}
                  </TableCell>
                  <TableCell className="text-dark font-nunito-400 text-center text-sm">
                    {item.phoneNumber}
                  </TableCell>
                  <TableCell className="text-dark font-nunito-400 max-w-[200px] truncate text-center text-sm">
                    {item.address}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-3">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <BadgeInfo
                              size={16}
                              className="text-info cursor-pointer transition-transform hover:scale-110"
                              onClick={() =>
                                navigate(`?customerId=${item.customerId}`, {
                                  replace: false,
                                })
                              }
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-nunito">Chi tiết</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SquarePen
                              size={16}
                              className="text-purple cursor-pointer transition-transform hover:scale-110"
                              onClick={() =>
                                navigate(
                                  `?customerId=${item.customerId}&action=edit`,
                                  {
                                    replace: false,
                                  },
                                )
                              }
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-nunito">Chỉnh sửa</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Trash2
                              size={16}
                              className="cursor-pointer text-red-500 transition-transform hover:scale-110"
                              onClick={() => handleDeleteClick(item)}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-nunito">Xóa</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        ) : null}
      </Table>

      {!isPending && sortedCustomers.length === 0 && <EmptyTable />}

      {/* Delete Confirmation Modal */}
      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa khách hàng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa khách hàng "{customerToDelete?.fullName}
              "? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleCancelDelete}
              disabled={deleteCustomer.isPending}
            >
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={deleteCustomer.isPending}
              className="bg-red-500 hover:bg-red-600"
            >
              {deleteCustomer.isPending ? (
                <>
                  <Spinner />
                  <span className="ml-2">Đang xóa...</span>
                </>
              ) : (
                "Xóa"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
