import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageBreadcrumb, Spinner } from "@/components/shared";
import { VaccineExportDetailTable } from "../components/VaccineExportDetailTable";
import { useHistoryByVaccineBatch } from "../hooks/useHistoryByVaccineBatch";

export default function VaccineExportHistoryPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const vaccineBatchId = searchParams.get("vaccineBatchId");
  const batchNumber = searchParams.get("batchNumber") || "";

  const {
    data: exportHistory,
    isLoading,
    error,
  } = useHistoryByVaccineBatch(vaccineBatchId ? Number(vaccineBatchId) : null);

  const handleBack = () => {
    // Determine current route prefix (admin or staff)
    const currentPath = window.location.pathname;
    const routePrefix = currentPath.includes("/admin") ? "/admin" : "/staff";
    navigate(`${routePrefix}/vaccine-batches`);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-center py-8">
          <Spinner />
          <span className="ml-2">Đang tải lịch sử xuất kho...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 p-6">
        <div className="py-8 text-center">
          <p className="text-red-600">Có lỗi xảy ra khi tải dữ liệu</p>
          <Button onClick={handleBack} className="mt-4">
            <ArrowLeft size={16} className="mr-2" />
            Quay lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Quay lại
          </Button>
          <div>
            <h1 className="text-primary font-inter-600 flex items-center gap-2 text-xl">
              <Calendar size={20} />
              Lịch sử xuất kho - Lô: {decodeURIComponent(batchNumber)}
            </h1>
            <PageBreadcrumb
              items={["Trang chủ", "Quản lý lô vaccine", "Lịch sử xuất kho"]}
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      {exportHistory && exportHistory.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <Package size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tổng số lần xuất</p>
                <p className="text-2xl font-bold text-blue-600">
                  {exportHistory.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2">
                <Package size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tổng số lượng xuất</p>
                <p className="text-2xl font-bold text-green-600">
                  {exportHistory.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                  liều
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2">
                <Calendar size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Lần xuất gần nhất</p>
                <p className="text-sm font-medium text-purple-600">
                  {exportHistory.length > 0
                    ? new Date(exportHistory[0].createdAt).toLocaleDateString(
                        "vi-VN",
                      )
                    : "Chưa có"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-lg border bg-white shadow-sm">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">Danh sách lịch sử xuất kho</h2>
        </div>
        <VaccineExportDetailTable
          data={exportHistory || []}
          isPending={isLoading}
        />
      </div>
    </div>
  );
}
