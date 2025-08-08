import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CustomerNotFoundProps {
  onGoBack: () => void;
}

export function CustomerNotFound({ onGoBack }: CustomerNotFoundProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Không tìm thấy khách hàng
        </h3>
        <p className="text-gray-600">
          Khách hàng không tồn tại hoặc đã bị xóa.
        </p>
      </div>
      <Button onClick={onGoBack} variant="outline">
        <ArrowLeft size={16} className="mr-2" />
        Quay lại danh sách
      </Button>
    </div>
  );
}
