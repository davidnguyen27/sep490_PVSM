import { Hash, Package, FileText, Building2, Calendar } from "lucide-react";
import { DetailItem } from "./DetailItem";
import { formatData } from "@/shared/utils/format.utils";
import type { VaccineReceiptDetail } from "../types/vaccine-receipt-detal.type";

interface VaccineBatchInfoSectionProps {
  detail: VaccineReceiptDetail;
}

export function VaccineBatchInfoSection({
  detail,
}: VaccineBatchInfoSectionProps) {
  return (
    <div>
      <h3 className="font-nunito-600 mb-4 text-lg text-gray-900">
        Thông tin lô vaccine
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DetailItem
          icon={Hash}
          label="Số lô"
          value={detail.vaccineBatch?.batchNumber || "N/A"}
          colorClass="blue"
        />
        <DetailItem
          icon={Package}
          label="Mã vaccine"
          value={detail.vaccineBatch?.vaccineCode || "N/A"}
          colorClass="green"
        />
        <DetailItem
          icon={FileText}
          label="Tên vaccine"
          value={detail.vaccineBatch?.vaccineResponseDTO?.name || "N/A"}
          colorClass="purple"
        />
        <DetailItem
          icon={Building2}
          label="Nhà cung cấp"
          value={detail.suppiler || "N/A"}
          colorClass="orange"
        />
        <DetailItem
          icon={Calendar}
          label="Ngày sản xuất"
          value={
            detail.vaccineBatch?.manufactureDate
              ? formatData.formatDate(detail.vaccineBatch.manufactureDate)
              : "N/A"
          }
          colorClass="cyan"
        />
        <DetailItem
          icon={Calendar}
          label="Ngày hết hạn"
          value={
            detail.vaccineBatch?.expiryDate
              ? formatData.formatDate(detail.vaccineBatch.expiryDate)
              : "N/A"
          }
          colorClass="red"
        />
      </div>
    </div>
  );
}
