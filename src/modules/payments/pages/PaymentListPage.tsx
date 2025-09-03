// components
import {
  PageBreadcrumb,
  SearchLabel,
  Pagination,
  PageLoader,
  InlineLoading,
} from "@/components/shared";
import {
  PaymentTable,
  PaymentFilter,
  PaymentDetailModal,
  ConfirmDeletePayment,
} from "../components";
import { Button } from "@/components/ui";

// hooks
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { usePayments, usePaymentDelete } from "../hooks";

// icons
import { DollarSign, X } from "lucide-react";

// types
import type { Payment } from "../types/payment.type";

export default function PaymentListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "paid" | "cancelled" | "refunded"
  >("all");
  const [methodFilter, setMethodFilter] = useState<"all" | "cash" | "payos">(
    "all",
  );
  const [deletedStatusFilter, setDeletedStatusFilter] = useState<
    "all" | "active" | "deleted"
  >("active"); // Mặc định hiển thị dữ liệu đang hoạt động
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState<Payment | null>(null);

  // Debounced search
  const debouncedSearch = useDebounce(search, 500, { leading: true });

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [statusFilter, methodFilter, deletedStatusFilter, debouncedSearch]);

  // Payment data for list view

  // Convert status filter to API params
  const getStatusParam = () => {
    switch (statusFilter) {
      case "paid":
        return true;
      case "cancelled":
      case "refunded":
        return false;
      default:
        return undefined; // "all" or "pending"
    }
  };

  const { data, isPending, isFetching } = usePayments({
    pageNumber: page,
    pageSize: 10,
    keyWord: debouncedSearch,
    status: getStatusParam(),
  });

  // Delete payment mutation
  const deletePaymentMutation = usePaymentDelete();

  const pageData = data?.data?.pageData || [];
  const totalPages = data?.data?.pageInfo?.totalPage || 1;

  // Filter payments based on status, method and deleted status
  const filteredPayments = pageData.filter((payment: Payment) => {
    // Filter by payment status
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "pending" && payment.paymentStatus === 1) ||
      (statusFilter === "paid" && payment.paymentStatus === 2) ||
      (statusFilter === "cancelled" && payment.paymentStatus === 3) ||
      (statusFilter === "refunded" && payment.paymentStatus === 4);

    // Filter by payment method
    const methodMatch =
      methodFilter === "all" ||
      payment.paymentMethod.toLowerCase() === methodFilter;

    // Filter by deleted status
    const deletedMatch =
      deletedStatusFilter === "all" ||
      (deletedStatusFilter === "active" && !payment.isDeleted) ||
      (deletedStatusFilter === "deleted" && payment.isDeleted);

    return statusMatch && methodMatch && deletedMatch;
  });

  const handleViewDetail = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDetailModalOpen(true);
    // Update URL with paymentId param
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      paymentId: payment.paymentId?.toString() || "",
    });
  };

  const handleCloseDetailModal = () => {
    setSelectedPayment(null);
    setIsDetailModalOpen(false);
    // Remove paymentId from URL
    const params = new URLSearchParams(searchParams);
    params.delete("paymentId");
    navigate({ search: params.toString() }, { replace: true });
  };

  const handleDelete = (payment: Payment) => {
    setPaymentToDelete(payment);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (paymentToDelete && paymentToDelete.paymentId) {
      deletePaymentMutation.mutate(paymentToDelete.paymentId, {
        onSuccess: () => {
          handleCloseDeleteModal();
        },
      });
    }
  };

  const handleCloseDeleteModal = () => {
    setPaymentToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setMethodFilter("all");
    setDeletedStatusFilter("active"); // Reset về mặc định
    setPage(1);
  };

  // Open detail modal if paymentId param exists in URL
  useEffect(() => {
    const paymentIdParam = searchParams.get("paymentId");
    if (paymentIdParam && !isDetailModalOpen) {
      // Tìm payment trong filteredPayments hoặc pageData
      const payment =
        filteredPayments.find((p) => p.paymentId === Number(paymentIdParam)) ||
        pageData.find((p) => p.paymentId === Number(paymentIdParam));
      if (payment) {
        setSelectedPayment(payment);
        setIsDetailModalOpen(true);
      }
    }
    if (!paymentIdParam && isDetailModalOpen) {
      setIsDetailModalOpen(false);
      setSelectedPayment(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, filteredPayments, pageData]);

  return (
    <PageLoader loading={isPending}>
      <div className="w-full space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="text-primary" />
            <h1 className="font-inter-700 text-primary text-xl">
              Quản lý thanh toán
            </h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <PageBreadcrumb items={["Quản lý thanh toán"]} />

        {/* Search and Filters */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <SearchLabel value={search} onChange={setSearch} />
          </div>
          <PaymentFilter
            onStatusChange={setStatusFilter}
            onMethodChange={setMethodFilter}
            onDeletedStatusChange={setDeletedStatusFilter}
            currentStatus={statusFilter}
            currentMethod={methodFilter}
            currentDeletedStatus={deletedStatusFilter}
          />
          {(statusFilter !== "all" ||
            methodFilter !== "all" ||
            deletedStatusFilter !== "active" ||
            search) && (
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Xóa bộ lọc
            </Button>
          )}
        </div>

        {/* Results Info */}
        <div className="text-muted-foreground flex items-center justify-between text-sm">
          <span>
            Hiển thị {filteredPayments.length} trong tổng số{" "}
            {data?.data?.pageInfo?.totalItem || 0} kết quả
            {search && ` cho "${search}"`}
            {statusFilter !== "all" &&
              ` - Lọc: ${
                statusFilter === "pending"
                  ? "Chờ thanh toán"
                  : statusFilter === "paid"
                    ? "Đã thanh toán"
                    : statusFilter === "cancelled"
                      ? "Đã hủy"
                      : statusFilter === "refunded"
                        ? "Hoàn tiền"
                        : ""
              }`}
            {methodFilter !== "all" &&
              ` - Phương thức: ${
                methodFilter === "cash" ? "Tiền mặt" : "PayOS"
              }`}
            {deletedStatusFilter !== "active" &&
              ` - Trạng thái: ${
                deletedStatusFilter === "all"
                  ? "Tất cả"
                  : deletedStatusFilter === "deleted"
                    ? "Đã xóa"
                    : "Đang hoạt động"
              }`}
          </span>
          {isFetching && <InlineLoading />}
        </div>

        {/* Table */}
        <PaymentTable
          payments={filteredPayments}
          isPending={isPending}
          currentPage={page}
          pageSize={data?.data?.pageInfo?.size || 10}
          onViewDetail={handleViewDetail}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}

        {/* Detail Modal */}
        <PaymentDetailModal
          payment={selectedPayment}
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmDeletePayment
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          payment={paymentToDelete}
          isDeleting={deletePaymentMutation.isPending}
        />
      </div>
    </PageLoader>
  );
}
