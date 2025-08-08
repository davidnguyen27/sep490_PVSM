import { useState } from "react";
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
import { PageBreadcrumb, Pagination, SearchLabel } from "@/components/shared";
import { useVaccineBatches } from "../hooks/useVaccineBatches";
import { useVaccineBatchById } from "../hooks/useVaccineBatchById";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Syringe, Plus } from "lucide-react";
import Spinner from "@/components/shared/Spinner";
import { VaccineBatchHistoryPage } from "@/modules/vaccine-receipt-detail/pages";

export default function VaccineBatchListPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const vaccineBatchId = searchParams.get("vaccineBatchId");
  const batchNumber = searchParams.get("batchNumber");
  const action = searchParams.get("action");
  const isDetailModalOpen = !!vaccineBatchId && !action && !batchNumber; // Quick view (no action, no batchNumber)
  const isEditModalOpen = !!vaccineBatchId && action === "edit"; // Edit mode
  const isDetailPageView = !!vaccineBatchId && action === "view"; // Full page view
  const isHistoryView = !!vaccineBatchId && !!batchNumber; // History view (both vaccineBatchId and batchNumber present)

  // Hook for detail page view
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

  const debouncedSearch = useDebounce(search, 500, { leading: true });
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

  return (
    <div className="space-y-6">
      {isHistoryView ? (
        // History View
        <VaccineBatchHistoryPage />
      ) : isDetailPageView ? (
        // Detail Page View
        <>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-primary font-inter-600 text-xl">
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
              <Button variant="outline" onClick={handleBackToList}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại danh sách
              </Button>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            {isDetailLoading ? (
              <div className="flex items-center justify-center py-12">
                <Spinner />
                <span className="ml-2 text-gray-600">
                  Đang tải thông tin...
                </span>
              </div>
            ) : detailError || !vaccineBatchDetail ? (
              <div className="py-12 text-center">
                <p className="mb-4 text-red-600">
                  {detailError
                    ? "Có lỗi xảy ra khi tải thông tin lô vaccine."
                    : "Không tìm thấy thông tin lô vaccine."}
                </p>
                <Button variant="outline" onClick={handleBackToList}>
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
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-primary font-inter-600 flex items-center gap-2 text-xl">
                  <Syringe /> Quản lý lô vắc-xin
                </h1>
                <PageBreadcrumb items={["Lô vắc-xin"]} />
              </div>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Thêm lô vaccine
              </Button>
            </div>
          </div>

          <div className="bg-linen flex flex-wrap items-end gap-4 p-4 shadow-md">
            <SearchLabel value={search} onChange={setSearch} />
            <VaccineBatchFilter
              status={filters.status}
              onChange={(newFilters) => {
                setFilters(newFilters);
                setPage(1);
              }}
            />
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
  );
}
