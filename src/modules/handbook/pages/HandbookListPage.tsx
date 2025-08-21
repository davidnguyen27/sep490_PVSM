import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, BookOpen } from "lucide-react";
import PageBreadcrumb from "@/components/shared/PageBreadcrumb";
import Pagination from "@/components/shared/Pagination";
import LoadingSkeleton from "@/components/shared/LoadingSkeleton";
import EmptyTable from "@/components/shared/EmptyTable";
import { useHandbooks } from "../hooks/useHandbooks";
import {
  HandbookTable,
  HandbookModal,
  HandbookDetailModal,
  DeleteConfirmModal,
} from "../components";
import type { Handbook } from "../types/handbook.type";

export default function HandbookListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<boolean | undefined>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedHandbook, setSelectedHandbook] = useState<Handbook | null>(
    null,
  );
  const pageSize = 10;

  const { data, isLoading, error } = useHandbooks({
    pageNumber: currentPage,
    pageSize,
    keyword: searchKeyword || undefined,
    status: statusFilter,
  });

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleView = (handbook: Handbook) => {
    setSelectedHandbook(handbook);
    setShowDetailModal(true);
  };

  const handleEdit = (handbook: Handbook) => {
    setSelectedHandbook(handbook);
    setShowEditModal(true);
  };

  const handleDelete = (handbook: Handbook) => {
    setSelectedHandbook(handbook);
    setShowDeleteModal(true);
  };

  const handleCreateNew = () => {
    setSelectedHandbook(null);
    setShowCreateModal(true);
  };

  const handleCloseModals = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setShowDetailModal(false);
    setShowDeleteModal(false);
    setSelectedHandbook(null);
  };

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/admin" },
    { label: "Cài đặt", href: "/admin/settings" },
    { label: "Quản lý Handbook", href: "/admin/settings/handbooks" },
  ];

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center text-red-500">
          Có lỗi xảy ra khi tải dữ liệu: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <PageBreadcrumb items={breadcrumbItems} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <BookOpen className="h-6 w-6 text-blue-600" />
            Quản lý Handbook
          </h1>
          <p className="mt-1 text-gray-600">
            Quản lý tài liệu hướng dẫn và kiến thức chăm sóc thú cưng
          </p>
        </div>
        <Button
          className="rounded-none bg-blue-600 hover:bg-blue-700"
          onClick={handleCreateNew}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm Handbook mới
        </Button>
      </div>

      <Card className="rounded-none border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">
            Danh sách Handbook
          </CardTitle>
          <div className="mt-4 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo tiêu đề..."
                value={searchKeyword}
                onChange={(e) => handleSearch(e.target.value)}
                className="rounded-none border-gray-300 pl-10 focus:border-blue-500"
              />
            </div>
            <select
              value={statusFilter === undefined ? "" : statusFilter.toString()}
              onChange={(e) => {
                setStatusFilter(
                  e.target.value === "" ? undefined : e.target.value === "true",
                );
                setCurrentPage(1);
              }}
              className="rounded-none border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="false">Hoạt động</option>
              <option value="true">Đã xóa</option>
            </select>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6">
              <LoadingSkeleton />
            </div>
          ) : !data?.data?.pageData || data.data.pageData.length === 0 ? (
            <EmptyTable />
          ) : (
            <HandbookTable
              handbooks={data.data.pageData}
              currentPage={currentPage}
              pageSize={pageSize}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}

          {data && data.data.pageInfo.totalItem > 0 && (
            <div className="border-t border-gray-200 px-6 py-4">
              <Pagination
                currentPage={currentPage}
                totalPages={data.data.pageInfo.totalPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <HandbookModal
        open={showCreateModal}
        onClose={handleCloseModals}
        mode="create"
      />

      <HandbookModal
        open={showEditModal}
        onClose={handleCloseModals}
        handbook={selectedHandbook}
        mode="edit"
      />

      <HandbookDetailModal
        open={showDetailModal}
        onClose={handleCloseModals}
        handbook={selectedHandbook}
      />

      <DeleteConfirmModal
        open={showDeleteModal}
        onClose={handleCloseModals}
        handbook={selectedHandbook}
      />
    </div>
  );
}
