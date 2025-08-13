import { Button } from "@/components/ui/button";
import { PageBreadcrumb } from "@/components/shared";
import { ArrowLeft, FileText, Edit } from "lucide-react";

interface VaccineReceiptDetailHeaderProps {
  onBack: () => void;
  onEdit: () => void;
}

export function VaccineReceiptDetailHeader({
  onBack,
  onEdit,
}: VaccineReceiptDetailHeaderProps) {
  return (
    <div className="border-b border-gray-100 bg-white">
      <div className="mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="font-nunito-600 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
            <div>
              <div className="mb-2 flex items-center gap-3">
                <FileText className="text-primary h-8 w-8" />
                <h1 className="font-nunito-700 text-3xl text-gray-900">
                  Chi tiết phiếu nhập vaccine
                </h1>
              </div>
              <PageBreadcrumb items={["Phiếu nhập vaccine", "Chi tiết"]} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onEdit}
              className="font-nunito-600 border-primary/20 text-primary hover:bg-primary/5"
            >
              <Edit className="mr-2 h-4 w-4" />
              Chỉnh sửa phiếu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
