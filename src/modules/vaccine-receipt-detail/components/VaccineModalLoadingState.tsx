import { Spinner } from "@/components/shared";
import { AlertCircle } from "lucide-react";

interface VaccineModalLoadingStateProps {
  isPending: boolean;
  error: Error | null;
}

export function VaccineModalLoadingState({
  isPending,
  error,
}: VaccineModalLoadingStateProps) {
  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner />
        <span className="font-nunito-500 ml-2 text-gray-600">
          Đang tải thông tin chi tiết...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h3 className="font-nunito-600 text-lg text-gray-900">
          Không thể tải thông tin chi tiết
        </h3>
        <p className="text-sm text-gray-600">
          {error?.message || "Đã xảy ra lỗi khi tải dữ liệu"}
        </p>
      </div>
    );
  }

  return null;
}
