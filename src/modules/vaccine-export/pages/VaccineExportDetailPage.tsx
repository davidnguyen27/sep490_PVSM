import { useSearchParams, useNavigate } from "react-router-dom";

import { useVaccineExportById } from "../hooks";
import { useExportDetailByExport } from "@/modules/vaccine-export-detail/hooks";
import {
  VaccineExportDetailHeader,
  VaccineExportMainInfo,
  VaccineExportSummary,
  VaccineExportDetailsTable,
  VaccineExportErrorState,
  VaccineExportLoadingState,
} from "../components";

export default function VaccineExportDetailPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const exportId = searchParams.get("vaccineExportId");

  const {
    data: vaccineExport,
    isPending,
    error,
  } = useVaccineExportById(Number(exportId));
  const {
    data: exportDetails,
    isPending: isDetailsLoading,
    error: detailsError,
  } = useExportDetailByExport(Number(exportId));

  const handleBack = () => {
    setSearchParams({});
  };

  const handleEdit = () => {
    navigate(`/admin/vaccine-exports/edit?exportId=${exportId}`);
  };

  if (error) {
    return <VaccineExportErrorState onBack={handleBack} onEdit={handleEdit} />;
  }

  if (isPending) {
    return (
      <VaccineExportLoadingState onBack={handleBack} onEdit={handleEdit} />
    );
  }

  if (!vaccineExport) {
    return <VaccineExportErrorState onBack={handleBack} onEdit={handleEdit} />;
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header Section */}
      <VaccineExportDetailHeader onBack={handleBack} onEdit={handleEdit} />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Information Card */}
          <div className="lg:col-span-2">
            <VaccineExportMainInfo vaccineExport={vaccineExport} />
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <VaccineExportSummary
              vaccineExport={vaccineExport}
              exportDetails={exportDetails}
            />
          </div>
        </div>

        {/* Vaccine Details Table */}
        <div className="mt-8">
          <VaccineExportDetailsTable
            exportDetails={exportDetails}
            isDetailsLoading={isDetailsLoading}
            detailsError={detailsError}
          />
        </div>
      </div>
    </div>
  );
}
