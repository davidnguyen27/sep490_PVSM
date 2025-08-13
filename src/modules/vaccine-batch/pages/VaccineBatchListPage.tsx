import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "@/shared/hooks/useDebounce";
import {
  VaccineBatchTable,
  VaccineBatchFilter,
  VaccineBatchDetailModal,
  VaccineBatchDetail,
  VaccineBatchAddModal,
  VaccineBatchUpdateModal,
} from "../components";
import {
  PageBreadcrumb,
  Pagination,
  SearchLabel,
  PageLoader,
  ButtonSpinner,
  InlineLoading,
} from "@/components/shared";
import { useVaccineBatches } from "../hooks/useVaccineBatches";
import { useVaccineBatchById } from "../hooks/useVaccineBatchById";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, PackageOpen } from "lucide-react";
import Spinner from "@/components/shared/Spinner";
import { VaccineBatchHistoryPage } from "./VaccineBatchHistoryPage";

export default function VaccineBatchListPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  // Set document title
  useEffect(() => {
    document.title = "PVMS | Quản lý lô vắc-xin";

    return () => {
      document.title = "PVMS";
    };
  }, []);

  // Reset page when search changes
  const debouncedSearch = useDebounce(search, 500, { leading: true });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const vaccineBatchId = searchParams.get("vaccineBatchId");
  const batchNumber = searchParams.get("batchNumber");
  const action = searchParams.get("action");
  const isDetailModalOpen = !!vaccineBatchId && !action && !batchNumber; // Quick view (no action, no batchNumber)
  const isEditModalOpen = !!vaccineBatchId && action === "edit"; // Edit mode
  const isDetailPageView = !!vaccineBatchId && action === "view"; // Full page view
  const isHistoryView = !!vaccineBatchId && !!batchNumber; // History view - both vaccineBatchId and batchNumber present  // Hook for detail page view
  const {
    data: vaccineBatchDetail,
    isLoading: isDetailLoading,
    error: detailError,
  } = useVaccineBatchById(isDetailPageView ? parseInt(vaccineBatchId) : null);

  // Hook for edit modal
  const { data: vaccineBatchForEdit } = useVaccineBatchById(
    isEditModalOpen ? parseInt(vaccineBatchId) : null,
  );

  const handleCloseDetailModal = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete("vaccineBatchId");
      newParams.delete("action");
      return newParams;
    });
  };

  const handleCloseEditModal = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete("vaccineBatchId");
      newParams.delete("action");
      return newParams;
    });
  };

  const handleBackToList = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete("vaccineBatchId");
      newParams.delete("action");
      return newParams;
    });
  };

  const { data, isPending, isFetching } = useVaccineBatches({
    pageNumber: page,
    pageSize: 10,
    keyWord: debouncedSearch,
  });

  const vaccineBatches = data?.data?.pageData ?? [];
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  // Filter data based on status
  const filteredData = vaccineBatches.filter((item) => {
    if (!filters.status) return true;

    const today = new Date();
    const expiry = new Date(item.expiryDate);
    const timeDiff = expiry.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    switch (filters.status) {
      case "active":
        return daysDiff > 30;
      case "expiring":
        return daysDiff <= 30 && daysDiff >= 0;
      case "expired":
        return daysDiff < 0;
      default:
        return true;
    }
  });

  const handleCreateVaccineBatch = async () => {
    setIsCreating(true);
    try {
      setIsAddModalOpen(true);
    } finally {
      setTimeout(() => setIsCreating(false), 100);
    }
  };

  return (
    <PageLoader
      loading={isPending && !isFetching}
      loadingText="Đang tải danh sách lô vắc-xin..."
    >
      <div className="space-y-6">
        {isHistoryView ? (
          // History View - Render VaccineBatchHistoryPage
          <VaccineBatchHistoryPage />
        ) : isDetailPageView ? (
          // Detail Page View
          <>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-primary font-inter-700 text-xl">
                    Chi tiết lô vaccine:{" "}
                    {vaccineBatchDetail?.batchNumber || vaccineBatchId}
                  </h1>
                  <PageBreadcrumb
                    items={[
                      "Lô vắc-xin",
                      `Chi tiết ${vaccineBatchDetail?.batchNumber || vaccineBatchId}`,
                    ]}
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={handleBackToList}
                  className="font-nunito-500"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại danh sách
                </Button>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              {isDetailLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Spinner />
                  <span className="font-nunito-400 text-muted-foreground ml-2">
                    Đang tải thông tin...
                  </span>
                </div>
              ) : detailError || !vaccineBatchDetail ? (
                <div className="py-12 text-center">
                  <p className="font-nunito-500 text-danger mb-4">
                    {detailError
                      ? "Có lỗi xảy ra khi tải thông tin lô vaccine."
                      : "Không tìm thấy thông tin lô vaccine."}
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleBackToList}
                    className="font-nunito-500"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Quay lại danh sách
                  </Button>
                </div>
              ) : (
                <VaccineBatchDetail vaccineBatch={vaccineBatchDetail} />
              )}
            </div>
          </>
        ) : (
          // List View
          <>
            <div className="flex items-center space-x-2">
              <PackageOpen color="#00B8A9" />
              <h1 className="text-primary font-inter-700 text-2xl">
                Quản lý lô vắc-xin
              </h1>
            </div>
            <PageBreadcrumb items={["Lô vắc-xin"]} />

            <div className="bg-linen flex items-end justify-between p-4 shadow-md">
              <div className="flex items-end justify-between gap-4">
                <SearchLabel value={search} onChange={setSearch} />
                <VaccineBatchFilter
                  status={filters.status}
                  onChange={(newFilters) => {
                    setFilters(newFilters);
                    setPage(1);
                  }}
                />
              </div>

              {/* Search loading indicator */}
              {debouncedSearch && isFetching && (
                <InlineLoading
                  text="Đang tìm kiếm..."
                  variant="muted"
                  size="sm"
                />
              )}

              <Button
                onClick={handleCreateVaccineBatch}
                disabled={isCreating}
                className="font-nunito-600 bg-primary hover:bg-secondary text-white"
              >
                {isCreating && <ButtonSpinner variant="white" size="sm" />}
                <Plus className="mr-2 h-4 w-4" />
                {isCreating ? "Đang tạo..." : "Thêm lô vaccine"}
              </Button>
            </div>

            <VaccineBatchTable
              vaccineBatches={filteredData}
              isPending={isPending || isFetching}
              currentPage={page}
              pageSize={10}
            />

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />

            {/* Detail Modal */}
            <VaccineBatchDetailModal
              vaccineBatchId={vaccineBatchId ? parseInt(vaccineBatchId) : null}
              isOpen={isDetailModalOpen}
              onClose={handleCloseDetailModal}
            />

            {/* Add Modal */}
            <VaccineBatchAddModal
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
            />

            {/* Update Modal */}
            <VaccineBatchUpdateModal
              vaccineBatch={vaccineBatchForEdit || null}
              isOpen={isEditModalOpen}
              onClose={handleCloseEditModal}
            />
          </>
        )}
      </div>
    </PageLoader>
  );
}
