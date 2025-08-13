import { Badge } from "@/components/ui/badge";
import type { VaccineReceiptDetail } from "../types/vaccine-receipt-detal.type";

interface VaccineStatusSectionProps {
  detail: VaccineReceiptDetail;
}

export function VaccineStatusSection({ detail }: VaccineStatusSectionProps) {
  const getStatusVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      case "expired":
        return "destructive";
      default:
        return "outline";
    }
  };

  const formatVaccineStatus = (status: string): string => {
    switch (status?.toLowerCase()) {
      case "active":
        return "Hoạt động";
      case "inactive":
        return "Không hoạt động";
      case "expired":
        return "Hết hạn";
      default:
        return status || "N/A";
    }
  };

  return (
    <div>
      <h3 className="font-nunito-600 mb-4 text-lg text-gray-900">Trạng thái</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
          <span className="font-nunito-500 text-gray-600">
            Trạng thái vaccine:
          </span>
          <Badge
            variant={getStatusVariant(detail.vaccineStatus)}
            className="font-nunito-500"
          >
            {formatVaccineStatus(detail.vaccineStatus)}
          </Badge>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
          <span className="font-nunito-500 text-gray-600">
            Trạng thái sản phẩm:
          </span>
          <Badge
            variant={getStatusVariant(
              detail.vaccineBatch?.vaccineResponseDTO?.status || "",
            )}
            className="font-nunito-500"
          >
            {detail.vaccineBatch?.vaccineResponseDTO?.status === "active"
              ? "Hoạt động"
              : detail.vaccineBatch?.vaccineResponseDTO?.status === "inactive"
                ? "Không hoạt động"
                : detail.vaccineBatch?.vaccineResponseDTO?.status || "N/A"}
          </Badge>
        </div>
      </div>
    </div>
  );
}
