import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";

import { PageBreadcrumb } from "@/components/shared";
import { Button } from "@/components/ui/button";

import { CreateVaccineExportForm } from "../components";

export default function CreateVaccineExportPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/admin/vaccine-exports");
  };

  const handleSuccess = () => {
    // Navigate back with success parameter
    navigate("/admin/vaccine-exports?created=true");
  };

  return (
    <>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleGoBack}>
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-primary font-inter-600 flex items-center gap-2 text-xl">
            <Plus /> Tạo phiếu xuất kho vaccine
          </h1>
        </div>
        <PageBreadcrumb
          items={["Trang chủ", "Xuất kho vaccine", "Tạo phiếu"]}
        />
      </div>

      <CreateVaccineExportForm
        onSuccess={handleSuccess}
        onCancel={handleGoBack}
      />
    </>
  );
}
