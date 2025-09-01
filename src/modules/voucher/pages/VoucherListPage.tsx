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
  const [isDeletedFilter, setIsDeletedFilter] = useState<string>("all");

  // State cho STT sorting
  const [sttSortOrder, setSttSortOrder] = useState<"asc" | "desc" | null>(null);

  // State cho modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  // Hooks - fetch all data without status filter, we'll filter locally
  const {
    data: vouchersData,
    isLoading,
    error,
  } = useVouchers({
    pageNumber: currentPage,
    pageSize,
    keyWord: searchKeyword,
    // Remove server-side status filter, handle locally
  });

  const createVoucherMutation = useVouchersAdd();
  const updateVoucherMutation = useVoucherEdit();
  const deleteVoucherMutation = useVoucherDel();

  // Process vouchers data with filtering
  const allVouchers = vouchersData?.data.pageData || [];

  // Apply filters
  const getFilteredVouchers = () => {
    let filtered = [...allVouchers];

    // Filter by isDeleted status
    if (isDeletedFilter === "active") {
      filtered = filtered.filter((voucher) => !voucher.isDeleted);
    } else if (isDeletedFilter === "deleted") {
      filtered = filtered.filter((voucher) => voucher.isDeleted);
    }
    // 'all' shows everything

    return filtered;
  };

  const filteredVouchers = getFilteredVouchers();

  // Sort vouchers: Default newest first (by voucherId desc), with STT sorting option
  const getSortedVouchers = () => {
    // Add STT numbers to filtered data first (global numbering)
    const dataWithSTT = filteredVouchers.map((voucher, index) => ({
      ...voucher,
      sttNumber: index + 1,
    }));

    if (sttSortOrder === null) return dataWithSTT;

    // Apply STT sorting
    return dataWithSTT.sort((a, b) => {
      if (sttSortOrder === "asc") {
        return a.sttNumber - b.sttNumber;
      } else {
        return b.sttNumber - a.sttNumber;
      }
    });
  };

  const sortedVouchers = getSortedVouchers();

  // Apply pagination to sorted and filtered data and adjust STT for current page
  const paginatedVouchers = sortedVouchers
    .slice((currentPage - 1) * pageSize, currentPage * pageSize)
    .map((voucher, index) => ({
      ...voucher,
      sttNumber: (currentPage - 1) * pageSize + index + 1,
    }));

  // Handlers
  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    setCurrentPage(1);
  };

  const handleIsDeletedFilter = (value: string) => {
    setIsDeletedFilter(value);
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

  const handleSttSort = () => {
    if (sttSortOrder === null) {
      setSttSortOrder("asc");
    } else if (sttSortOrder === "asc") {
      setSttSortOrder("desc");
    } else {
      setSttSortOrder(null);
    }
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-inter-700 text-primary text-2xl">
            Quản lý voucher
          </h1>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Tạo voucher mới
        </Button>
      </div>

      {/* Breadcrumb */}
      <PageBreadcrumb items={["Quản lý voucher"]} />

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
          <Select value={isDeletedFilter} onValueChange={handleIsDeletedFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tình trạng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Hiện có</SelectItem>
              <SelectItem value="deleted">Đã xóa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <VoucherTable
        vouchers={paginatedVouchers}
        onEdit={handleEditClick}
        onDelete={handleDeleteVoucher}
        onView={handleViewVoucher}
        isLoading={isLoading}
        pageSize={pageSize}
        sttSortOrder={sttSortOrder}
        onSttSort={handleSttSort}
      />

      {/* Pagination */}
      {filteredVouchers.length > pageSize && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredVouchers.length / pageSize)}
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
