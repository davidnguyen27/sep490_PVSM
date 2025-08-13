import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/shared";
import { VaccineReceiptDetailHeader } from "./VaccineReceiptDetailHeader";
import { AlertCircle } from "lucide-react";

interface VaccineReceiptErrorStateProps {
  onBack: () => void;
  onEdit: () => void;
}

interface VaccineReceiptLoadingStateProps {
  onBack: () => void;
  onEdit: () => void;
}

export function VaccineReceiptErrorState({
  onBack,
  onEdit,
}: VaccineReceiptErrorStateProps) {
  return (
    <div className="min-h-screen bg-gray-50/30">
      <VaccineReceiptDetailHeader onBack={onBack} onEdit={onEdit} />

      {/* Error Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mx-auto max-w-lg rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-6 w-fit rounded-full bg-red-50 p-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="font-nunito-700 mb-2 text-xl text-gray-900">
            Không thể tải thông tin
          </h3>
          <p className="font-nunito-400 mb-6 text-gray-500">
            Có lỗi xảy ra khi tải chi tiết phiếu nhập vaccine. Vui lòng thử lại
            sau.
          </p>
          <Button onClick={onBack} className="font-nunito-600">
            Quay lại danh sách
          </Button>
        </div>
      </div>
    </div>
  );
}

export function VaccineReceiptLoadingState({
  onBack,
  onEdit,
}: VaccineReceiptLoadingStateProps) {
  return (
    <div className="min-h-screen bg-gray-50/30">
      <VaccineReceiptDetailHeader onBack={onBack} onEdit={onEdit} />

      {/* Loading Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <Spinner />
            <p className="font-nunito-500 mt-4 text-gray-500">
              Đang tải thông tin...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
