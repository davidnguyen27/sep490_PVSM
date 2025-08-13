import Spinner from "@/components/shared/Spinner";

interface DashboardLoadingProps {
  apiUrl?: string;
}

export default function DashboardLoading({ apiUrl }: DashboardLoadingProps) {
  return (
    <div className="flex min-h-full items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="font-nunito-400 mt-4 text-gray-600">
          Đang tải dữ liệu dashboard...
        </p>
        {apiUrl && (
          <p className="font-nunito-300 mt-2 text-xs text-gray-500">
            API URL: {apiUrl}
          </p>
        )}
      </div>
    </div>
  );
}
