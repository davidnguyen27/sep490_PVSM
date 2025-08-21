import { ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VaccineExportLoadingStateProps {
  onBack: () => void;
}

export default function VaccineExportLoadingState(
  props: VaccineExportLoadingStateProps,
) {
  const { onBack } = props;
  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header Section */}
      <div className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="h-8 w-8 p-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                  <Package className="text-primary h-6 w-6" />
                  Chi tiết xuất kho vaccine
                </h1>
              </div>
            </div>
            {/* Nút chỉnh sửa đã bị loại bỏ */}
          </div>
        </div>
      </div>

      {/* Loading Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex min-h-96 items-center justify-center">
          <div className="text-center">
            <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-b-2"></div>
            <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
