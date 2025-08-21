import { ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VaccineExportErrorStateProps {
  onBack: () => void;
}

export default function VaccineExportErrorState(
  props: VaccineExportErrorStateProps,
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

      {/* Error Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex min-h-96 items-center justify-center">
          <div className="text-center">
            <Package className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <p className="text-gray-600">Không tìm thấy thông tin xuất kho</p>
          </div>
        </div>
      </div>
    </div>
  );
}
