import { formatData } from "@/shared/utils/format.utils";
import type { VaccineReceiptDetail } from "../types/vaccine-receipt-detal.type";

interface VaccineSystemInfoProps {
  detail: VaccineReceiptDetail;
}

export function VaccineSystemInfo({ detail }: VaccineSystemInfoProps) {
  return (
    <div>
      <h3 className="font-nunito-600 mb-4 text-lg text-gray-900">
        Thông tin hệ thống
      </h3>
      <div className="rounded-lg border border-gray-100 p-4">
        <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
          <div className="flex justify-between">
            <span className="font-nunito-500 text-gray-600">Ngày tạo:</span>
            <span className="font-nunito-400 text-gray-900">
              {detail.createdAt
                ? formatData.formatDate(detail.createdAt)
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-nunito-500 text-gray-600">Người tạo:</span>
            <span className="font-nunito-400 text-gray-900">
              {detail.createdBy || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-nunito-500 text-gray-600">
              Cập nhật cuối:
            </span>
            <span className="font-nunito-400 text-gray-900">
              {detail.modifiedAt
                ? formatData.formatDate(detail.modifiedAt)
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-nunito-500 text-gray-600">
              Người cập nhật:
            </span>
            <span className="font-nunito-400 text-gray-900">
              {detail.modifiedBy || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
