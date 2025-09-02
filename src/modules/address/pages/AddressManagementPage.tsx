import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageBreadcrumb, Pagination } from "@/components/shared";
import { useAddresses } from "../hooks/useAddress";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { AddressTable } from "../components/AddressTable";
import { AddressModal } from "../components/AddressModal";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";
import type { Address } from "../types/address.type";
import { Plus, MapPin, Search } from "lucide-react";

export default function AddressManagementPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const debouncedSearch = useDebounce(search, 500);

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
          <h1 className="font-inter-700 text-primary flex items-center gap-2 text-2xl">
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
        items={[
          { label: "Cài đặt hệ thống", path: "/admin/settings" },
          { label: "Quản lý địa chỉ" },
        ]}
      />

      {/* Search Section */}
      <Card className="rounded-none">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative w-80">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm theo tên địa chỉ, thành phố..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Tìm thấy {totalItems} kết quả
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card className="py-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Thống kê</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-blue-50 p-4 text-center">
              <div className="font-inter-700 text-2xl text-blue-600">
                {totalItems}
              </div>
              <div className="text-sm text-gray-600">Tổng số địa chỉ</div>
            </div>
            <div className="rounded-lg bg-green-50 p-4 text-center">
              <div className="font-inter-700 text-2xl text-green-600">
                {addresses.length}
              </div>
              <div className="text-sm text-gray-600">Hiển thị trên trang</div>
            </div>
            <div className="rounded-lg bg-purple-50 p-4 text-center">
              <div className="font-inter-700 text-2xl text-purple-600">
                {totalPages}
              </div>
              <div className="text-sm text-gray-600">Tổng số trang</div>
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
