import Spinner from "@/components/shared/Spinner";

interface DashboardLoadingProps {
  apiUrl?: string;
}

export default function DashboardLoading({ apiUrl }: DashboardLoadingProps) {
  return (
    <div className="from-linen flex min-h-screen items-center justify-center bg-gradient-to-br to-white">
      <div className="space-y-6 p-8 text-center">
        {/* Main Loading Content */}
        <div className="relative">
          {/* Background Circle Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-primary/20 h-24 w-24 animate-pulse rounded-full border-4"></div>
          </div>

          {/* Spinner */}
          <div className="relative z-10 flex justify-center">
            <Spinner size="lg" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-3">
          <h2 className="font-inter-700 text-primary text-xl">
            Đang tải dữ liệu
          </h2>
          <p className="font-nunito-500 text-dark/70 text-base">
            Vui lòng đợi trong giây lát...
          </p>

          {/* Loading Dots Animation */}
          <div className="flex justify-center space-x-1">
            <div className="bg-primary h-2 w-2 animate-bounce rounded-full"></div>
            <div
              className="bg-primary h-2 w-2 animate-bounce rounded-full"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="bg-primary h-2 w-2 animate-bounce rounded-full"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mx-auto w-64">
          <div className="h-1 overflow-hidden rounded-full bg-gray-200">
            <div className="from-primary to-secondary h-full animate-pulse rounded-full bg-gradient-to-r"></div>
          </div>
        </div>

        {/* API URL - Only show in development */}
        {apiUrl && process.env.NODE_ENV === "development" && (
          <div className="border-primary/10 mt-6 rounded-lg border bg-white/50 p-3">
            <p className="font-nunito-400 text-dark/60 text-xs">
              <span className="font-nunito-600">API:</span> {apiUrl}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
