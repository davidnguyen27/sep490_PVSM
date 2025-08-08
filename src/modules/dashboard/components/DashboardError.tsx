import { icons } from "@/shared/constants/icons.constants";

interface DashboardErrorProps {
  error?: { message?: string } | null;
  apiUrl?: string;
  onRetry?: () => void;
}

export default function DashboardError({
  error,
  apiUrl,
  onRetry,
}: DashboardErrorProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center bg-[#F8FFFE] p-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <icons.Bell className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="font-nunito-600 mb-2 text-xl text-gray-900">
          Lỗi tải dữ liệu
        </h2>
        <p className="font-nunito-400 mb-4 text-gray-600">
          {error?.message ||
            "Không thể tải dữ liệu dashboard. Vui lòng thử lại sau."}
        </p>
        {apiUrl && (
          <div className="mb-4 bg-gray-100 p-4 text-left">
            <p className="font-nunito-400 text-xs text-gray-600">
              API URL: {apiUrl || "Chưa cấu hình"}
            </p>
            {error && (
              <p className="font-nunito-400 text-xs text-gray-600">
                Error: {JSON.stringify(error, null, 2)}
              </p>
            )}
          </div>
        )}
        <button
          onClick={handleRetry}
          className="bg-primary font-nunito-500 px-4 py-2 text-white transition-colors hover:bg-teal-700"
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}
