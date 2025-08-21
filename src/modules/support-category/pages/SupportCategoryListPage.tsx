import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, HeadphonesIcon } from "lucide-react";
import PageBreadcrumb from "@/components/shared/PageBreadcrumb";
import Pagination from "@/components/shared/Pagination";
import LoadingSkeleton from "@/components/shared/LoadingSkeleton";
import EmptyTable from "@/components/shared/EmptyTable";
import { useSupportCategories } from "../hooks/useSupportCategories";
import {
  SupportCategoryTable,
  SupportCategoryModal,
  SupportCategoryDetailModal,
  DeleteConfirmModal,
} from "../components";
import type { SupportCategory } from "../types/support-category.type";

export default function SupportCategoryListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<boolean | undefined>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<SupportCategory | null>(null);
  const pageSize = 10;

  const { data, isLoading, error } = useSupportCategories({
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

  const handleView = (category: SupportCategory) => {
    setSelectedCategory(category);
    setShowDetailModal(true);
  };

  const handleEdit = (category: SupportCategory) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleDelete = (category: SupportCategory) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const handleCreateNew = () => {
    setSelectedCategory(null);
    setShowCreateModal(true);
  };

  const handleCloseModals = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setShowDetailModal(false);
    setShowDeleteModal(false);
    setSelectedCategory(null);
  };

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/admin" },
    { label: "Cài đặt", href: "/admin/settings" },
    {
      label: "Quản lý danh mục hỗ trợ",
      href: "/admin/settings/support-categories",
    },
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
            <HeadphonesIcon className="h-6 w-6 text-blue-600" />
            Quản lý danh mục hỗ trợ
          </h1>
          <p className="mt-1 text-gray-600">
            Quản lý các danh mục hỗ trợ khách hàng của hệ thống
          </p>
        </div>
        <Button
          className="rounded-none bg-blue-600 hover:bg-blue-700"
          onClick={handleCreateNew}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm danh mục mới
        </Button>
      </div>

      <Card className="rounded-none border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">
            Danh sách danh mục hỗ trợ
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
            <SupportCategoryTable
              supportCategories={data.data.pageData}
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
      <SupportCategoryModal
        open={showCreateModal}
        onClose={handleCloseModals}
        mode="create"
      />

      <SupportCategoryModal
        open={showEditModal}
        onClose={handleCloseModals}
        category={selectedCategory}
        mode="edit"
      />

      <SupportCategoryDetailModal
        open={showDetailModal}
        onClose={handleCloseModals}
        category={selectedCategory}
      />

      <DeleteConfirmModal
        open={showDeleteModal}
        onClose={handleCloseModals}
        category={selectedCategory}
      />
    </div>
  );
}
