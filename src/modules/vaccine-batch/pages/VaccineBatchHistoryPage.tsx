import { useNavigate, useSearchParams } from "react-router-dom";

// hooks
import { useHistoryByVaccineBatch } from "@/modules/vaccine-receipt-detail/hooks";
import { useHistoryByVaccineBatch as useExportHistory } from "@/modules/vaccine-export-detail/hooks/useHistoryByVaccineBatch";
import { useVaccineBatchHistory } from "../hooks/useVaccineBatchHistory";

// components
import { VaccineBatchHeader } from "../components/VaccineBatchHeader";
import { VaccineBatchStatistics } from "../components/VaccineBatchStatistics";
import { VaccineBatchHistoryTable } from "../components/VaccineBatchHistoryTable";
import { VaccineBatchLoadingState } from "../components/VaccineBatchLoadingState";

export function VaccineBatchHistoryPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const vaccineBatchId = searchParams.get("vaccineBatchId");
  const batchNumber = searchParams.get("batchNumber");

  // Fetch data
  const { data: importData, isPending: isImportLoading } =
    useHistoryByVaccineBatch(vaccineBatchId ? parseInt(vaccineBatchId) : null);

  const { data: exportData, isLoading: isExportLoading } = useExportHistory(
    vaccineBatchId ? parseInt(vaccineBatchId) : null,
  );

  const isPending = isImportLoading || isExportLoading;

  // Process data
  const { combinedHistory, statistics } = useVaccineBatchHistory({
    importData,
    exportData,
  });

  const handleGoBack = () => {
    navigate("/admin/vaccine-batches");
  };

  // Show loading state
  if (isPending) {
    return <VaccineBatchLoadingState />;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <VaccineBatchHeader
        batchNumber={batchNumber || undefined}
        onGoBack={handleGoBack}
      />

      {/* Content */}
      <div className="container mx-auto space-y-8 px-6 py-8">
        {/* Statistics */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <h2 className="font-inter-semibold text-xl text-gray-900">
              Tổng quan thống kê
            </h2>
          </div>
          <VaccineBatchStatistics
            totalImported={statistics.totalImported}
            totalExported={statistics.totalExported}
            currentStock={statistics.currentStock}
            totalTransactions={statistics.totalTransactions}
            importCount={statistics.importCount}
            exportCount={statistics.exportCount}
          />
        </div>

        {/* History Table */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"></div>
            <h2 className="font-inter-semibold text-xl text-gray-900">
              Lịch sử giao dịch chi tiết
            </h2>
            <div className="font-nunito-regular text-sm text-gray-500">
              ({combinedHistory.length} giao dịch)
            </div>
          </div>
          <VaccineBatchHistoryTable
            history={combinedHistory}
            isLoading={isPending}
          />
        </div>
      </div>
    </div>
  );
}
