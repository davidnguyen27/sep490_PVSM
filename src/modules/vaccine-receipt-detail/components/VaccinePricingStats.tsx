import { formatData } from "@/shared/utils/format.utils";
import type { VaccineReceiptDetail } from "../types/vaccine-receipt-detal.type";

interface VaccinePricingStatsProps {
  detail: VaccineReceiptDetail;
}

export function VaccinePricingStats({ detail }: VaccinePricingStatsProps) {
  return (
    <div>
      <h3 className="font-nunito-600 mb-4 text-lg text-gray-900">
        Thông tin số lượng và giá
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-4 text-center">
          <p className="font-nunito-500 text-sm text-blue-600">Số lượng nhập</p>
          <p className="font-nunito-700 text-2xl text-blue-700">
            {detail.quantity?.toLocaleString("vi-VN") || 0}
          </p>
        </div>

        <div className="rounded-lg bg-gradient-to-r from-green-50 to-green-100 p-4 text-center">
          <p className="font-nunito-500 text-sm text-green-600">Giá vaccine</p>
          <p className="font-nunito-700 text-xl text-green-700">
            {detail.vaccineBatch?.vaccineResponseDTO?.price
              ? formatData.formatCurrency(
                  detail.vaccineBatch.vaccineResponseDTO.price,
                )
              : "N/A"}
          </p>
        </div>

        <div className="rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 p-4 text-center">
          <p className="font-nunito-500 text-sm text-purple-600">
            Tổng giá trị
          </p>
          <p className="font-nunito-700 text-xl text-purple-700">
            {detail.vaccineBatch?.vaccineResponseDTO?.price && detail.quantity
              ? formatData.formatCurrency(
                  detail.vaccineBatch.vaccineResponseDTO.price *
                    detail.quantity,
                )
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
