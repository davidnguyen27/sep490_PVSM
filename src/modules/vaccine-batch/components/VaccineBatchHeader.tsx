import { ArrowLeft, Calendar, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageBreadcrumb } from "@/components/shared";

interface VaccineBatchHeaderProps {
  batchNumber?: string;
  onGoBack: () => void;
}

export function VaccineBatchHeader({
  batchNumber,
  onGoBack,
}: VaccineBatchHeaderProps) {
  const breadcrumbItems = [
    { label: "Lô vaccine", href: "/admin/vaccine-batches" },
    { label: `Lịch sử lô ${batchNumber || "N/A"}`, href: "#" },
  ];

  return (
    <div className="border-b border-white bg-white">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button & Title */}
        <div className="mb-6 flex items-start gap-6">
          <Button
            variant="ghost"
            size="lg"
            onClick={onGoBack}
            className="hover:bg-primary flex items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition-all duration-200 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-inter-500">Quay lại</span>
          </Button>

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="rounded-none border border-blue-100 bg-blue-50 p-3">
                <Package2 className="text-info h-6 w-6" />
              </div>
              <h1 className="font-inter-700 text-dark text-3xl leading-tight">
                Lịch sử nhập xuất kho
              </h1>
            </div>

            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="font-nunito-500 text-sm">Lô vaccine:</span>
              </div>
              <div className="rounded-none border border-blue-100 bg-blue-50 px-4 py-2">
                <span className="font-inter-600 text-info">
                  {batchNumber || "N/A"}
                </span>
              </div>
            </div>

            <p className="font-nunito max-w-2xl leading-relaxed text-gray-500">
              Theo dõi chi tiết lịch sử nhập kho và xuất kho của lô vaccine này.
              Bao gồm thông tin về số lượng, ngày tháng, nhà cung cấp và mục
              đích sử dụng.
            </p>
          </div>
        </div>

        {/* Breadcrumb */}
        <PageBreadcrumb items={breadcrumbItems} />
      </div>
    </div>
  );
}
