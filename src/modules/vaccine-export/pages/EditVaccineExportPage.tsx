import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Edit } from "lucide-react";

import { PageBreadcrumb } from "@/components/shared";
import { Button } from "@/components/ui/button";

import { useVaccineExportById } from "../hooks";
import { EditVaccineExportForm } from "../components";

export default function EditVaccineExportPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const exportId = searchParams.get("exportId");

  const { data: vaccineExport, isPending } = useVaccineExportById(
    Number(exportId),
  );

  const handleGoBack = () => {
    navigate("/admin/vaccine-exports");
  };

  const handleSuccess = () => {
    // Navigate back with success parameter
    navigate("/admin/vaccine-exports?updated=true");
  };

  if (isPending) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-b-2"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (!vaccineExport) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <div className="text-center">
          <Package className="mx-auto mb-4 h-16 w-16 text-gray-400" />
          <p className="text-gray-600">Không tìm thấy thông tin xuất kho</p>
          <Button onClick={handleGoBack} className="mt-4">
            Quay lại danh sách
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleGoBack}>
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-primary font-inter-600 flex items-center gap-2 text-xl">
            <Edit /> Cập nhật phiếu xuất kho vaccine
          </h1>
        </div>
        <PageBreadcrumb items={["Trang chủ", "Xuất kho vaccine", "Cập nhật"]} />
      </div>

      <EditVaccineExportForm
        vaccineExport={vaccineExport}
        onSuccess={handleSuccess}
        onCancel={handleGoBack}
      />
    </>
  );
}
