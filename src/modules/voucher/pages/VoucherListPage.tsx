import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Button, Input } from "@/components/ui";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PageBreadcrumb, Pagination } from "@/components/shared";
import { VoucherTable } from "../components/VoucherTable";
import { VoucherForm } from "../components/VoucherForm";
import { VoucherDetailModal } from "../components/VoucherDetailModal";
import { useVouchers } from "../hooks/useVouchers";
import { useVouchersAdd } from "../hooks/useVouchersAdd";
import { useVoucherEdit } from "../hooks/useVoucherEdit";
import { useVoucherDel } from "../hooks/useVoucherDel";
import type { Voucher } from "../types/voucher.type";
import type { VoucherFormData } from "../schemas/voucher.schema";

export default function VoucherListPage() {
  // State cho filter và pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // State cho modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  // Hooks
  const {
    data: vouchersData,
    isLoading,
    error,
  } = useVouchers({
    pageNumber: currentPage,
    pageSize,
    keyWord: searchKeyword,
    status: statusFilter === "all" ? undefined : statusFilter === "active",
  });

  const createVoucherMutation = useVouchersAdd();
  const updateVoucherMutation = useVoucherEdit();
  const deleteVoucherMutation = useVoucherDel();

  // Handlers
  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleCreateVoucher = (data: VoucherFormData) => {
    createVoucherMutation.mutate(data, {
      onSuccess: (response) => {
        if (response.success) {
          setIsCreateModalOpen(false);
        }
      },
    });
  };

  const handleEditVoucher = (data: VoucherFormData) => {
    if (!selectedVoucher?.voucherId) return;

    updateVoucherMutation.mutate(
      {
        voucherId: selectedVoucher.voucherId,
        voucherData: data,
      },
      {
        onSuccess: (response) => {
          if (response.success) {
            setIsEditModalOpen(false);
            setSelectedVoucher(null);
          }
        },
      },
    );
  };

  const handleDeleteVoucher = (voucherId: number) => {
    deleteVoucherMutation.mutate(voucherId);
  };

  const handleViewVoucher = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setIsDetailModalOpen(true);
  };

  const handleEditClick = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setIsEditModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">Có lỗi xảy ra khi tải dữ liệu</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4"
            variant="outline"
          >
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <PageBreadcrumb
        items={[
          { label: "Trang chủ", path: "/" },
          { label: "Quản lý voucher", path: "/vouchers" },
        ]}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý voucher</h1>
          <p className="text-gray-600">
            Tổng số: {vouchersData?.data.pageInfo.totalItem || 0} voucher
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Tạo voucher mới
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-lg border bg-white p-4 md:flex-row md:items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Tìm kiếm theo tên voucher, mã voucher..."
              value={searchKeyword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSearch(e.target.value)
              }
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <Select value={statusFilter} onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Hoạt động</SelectItem>
              <SelectItem value="inactive">Không hoạt động</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <VoucherTable
        vouchers={vouchersData?.data.pageData || []}
        onEdit={handleEditClick}
        onDelete={handleDeleteVoucher}
        onView={handleViewVoucher}
        isLoading={isLoading}
      />

      {/* Pagination */}
      {vouchersData && vouchersData.data.pageInfo.totalItem > pageSize && (
        <Pagination
          currentPage={currentPage}
          totalPages={vouchersData.data.pageInfo.totalPage}
          onPageChange={handlePageChange}
        />
      )}

      {/* Create Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Tạo voucher mới</DialogTitle>
          </DialogHeader>
          <VoucherForm
            onSubmit={handleCreateVoucher}
            onCancel={() => setIsCreateModalOpen(false)}
            isLoading={createVoucherMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa voucher</DialogTitle>
          </DialogHeader>
          <VoucherForm
            initialData={selectedVoucher}
            onSubmit={handleEditVoucher}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedVoucher(null);
            }}
            isLoading={updateVoucherMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Detail Modal */}
      <VoucherDetailModal
        voucher={selectedVoucher}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedVoucher(null);
        }}
      />
    </div>
  );
}
