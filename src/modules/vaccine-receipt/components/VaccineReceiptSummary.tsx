import { Badge } from "@/components/ui/badge";
import type { VaccineReceipt } from "../types/vaccine-receipt.type";
import type { VaccineReceiptDetail } from "@/modules/vaccine-receipt-detail/types/vaccine-receipt-detal.type";
import {
  formatCreatedDate,
  formatStatus,
  getStatusVariant,
} from "../utils/vaccine-receipt.utils";

interface VaccineReceiptSummaryProps {
  vaccineReceipt: VaccineReceipt;
  receiptDetails: VaccineReceiptDetail[] | undefined;
}

export function VaccineReceiptSummary({
  vaccineReceipt,
  receiptDetails,
}: VaccineReceiptSummaryProps) {
  return (
    <div className="rounded-none border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-4">
        <h3 className="font-nunito-700 text-lg text-gray-900">
          Tóm tắt phiếu nhập
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="from-primary/5 to-primary/10 rounded-none bg-gradient-to-r p-4">
            <div className="text-center">
              <p className="font-nunito-500 text-sm text-gray-600">
                Tổng số lô vaccine
              </p>
              <p className="font-nunito-700 text-primary mt-1 text-2xl">
                {receiptDetails?.length || 0}
              </p>
            </div>
          </div>

          <div className="rounded-none bg-gradient-to-r from-green-50 to-emerald-50 p-4">
            <div className="text-center">
              <p className="font-nunito-500 text-sm text-gray-600">
                Trạng thái
              </p>
              <Badge
                variant={getStatusVariant(vaccineReceipt?.isDeleted ?? false)}
                className="font-nunito-600 mt-2"
              >
                {formatStatus(vaccineReceipt?.isDeleted ?? false)}
              </Badge>
            </div>
          </div>

          <div className="rounded-none bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
            <div className="text-center">
              <p className="font-nunito-500 text-sm text-gray-600">Ngày tạo</p>
              <p className="font-nunito-600 mt-1 text-sm text-gray-900">
                {formatCreatedDate(vaccineReceipt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
