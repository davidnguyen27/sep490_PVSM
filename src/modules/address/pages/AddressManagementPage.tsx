import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageBreadcrumb, Pagination } from "@/components/shared";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useAddresses } from "../hooks/useAddress";
import { AddressTable } from "../components/AddressTable";
import { AddressModal } from "../components/AddressModal";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";
import type { Address } from "../types/address.type";
import { Plus, Search, MapPin } from "lucide-react";

export default function AddressManagementPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const debouncedSearch = useDebounce(search, 500, { leading: true });

  useEffect(() => {
    document.title = "PVMS | Quản lý địa chỉ";
    return () => {
      document.title = "PVMS | Quản lý địa chỉ";
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, error } = useAddresses({
    pageNumber: page,
    pageSize: 10,
    keyword: debouncedSearch,
  });

  const addresses = data?.data?.pageData || [];
  const totalPages = data?.data?.pageInfo?.totalPage || 1;
  const totalItems = data?.data?.pageInfo?.totalItem || 0;

  const handleCreate = () => {
    setSelectedAddress(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const handleEdit = (address: Address) => {
    setSelectedAddress(address);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleDelete = (address: Address) => {
    setSelectedAddress(address);
    setDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAddress(null);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedAddress(null);
  };

  if (error) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-red-500">Có lỗi xảy ra khi tải dữ liệu</p>
          <Button onClick={() => window.location.reload()}>Thử lại</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <MapPin className="text-primary h-6 w-6" />
            Quản lý địa chỉ
          </h1>
          <p className="mt-1 text-gray-600">
            Quản lý danh sách địa chỉ trong hệ thống
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-none"
        >
          <Plus className="h-4 w-4" />
          Thêm địa chỉ
        </Button>
      </div>

      <PageBreadcrumb
        items={[{ label: "Cài đặt hệ thống" }, { label: "Quản lý địa chỉ" }]}
      />

      {/* Stats Card */}
      <Card className="rounded-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Thống kê</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-blue-50 p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {totalItems}
              </div>
              <div className="text-sm text-gray-600">Tổng số địa chỉ</div>
            </div>
            <div className="rounded-lg bg-green-50 p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {addresses.length}
              </div>
              <div className="text-sm text-gray-600">Hiển thị trên trang</div>
            </div>
            <div className="rounded-lg bg-purple-50 p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {totalPages}
              </div>
              <div className="text-sm text-gray-600">Tổng số trang</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card className="rounded-none">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative max-w-md flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Tìm kiếm địa chỉ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-none pl-10"
              />
            </div>
            <div className="text-sm text-gray-500">
              {totalItems > 0 && (
                <span>
                  Hiển thị {(page - 1) * 10 + 1} -{" "}
                  {Math.min(page * 10, totalItems)} của {totalItems} kết quả
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="rounded-none">
        <CardContent className="p-0">
          <AddressTable
            data={addresses}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

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

      {/* Modals */}
      <AddressModal
        open={modalOpen}
        onClose={handleCloseModal}
        address={selectedAddress}
        mode={modalMode}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        address={selectedAddress}
      />
    </div>
  );
}
