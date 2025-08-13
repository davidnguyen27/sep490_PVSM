import { Hash, Calendar, FileText, User, Clock } from "lucide-react";
import { VaccineReceiptDetailItem } from "./VaccineReceiptDetailItem";
import type { VaccineReceipt } from "../types/vaccine-receipt.type";
import {
  formatReceiptCode,
  formatReceiptDate,
  formatCreatedDate,
  formatStatus,
  getStatusVariant,
} from "../utils/vaccine-receipt.utils";

interface VaccineReceiptMainInfoProps {
  vaccineReceipt: VaccineReceipt;
}

export function VaccineReceiptMainInfo({
  vaccineReceipt,
}: VaccineReceiptMainInfoProps) {
  return (
    <div className="rounded-none border border-gray-100 bg-white shadow-sm">
      {/* Card Header */}
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <Hash className="text-primary h-5 w-5" />
          </div>
          <div>
            <h3 className="font-nunito-700 text-lg text-gray-900">
              {formatReceiptCode(vaccineReceipt)}
            </h3>
            <p className="font-nunito-400 text-sm text-gray-500">
              Mã phiếu nhập vaccine
            </p>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h4 className="font-nunito-600 mb-4 flex items-center gap-2 text-sm text-gray-700">
              <div className="bg-primary h-1 w-1 rounded-full"></div>
              Thông tin cơ bản
            </h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <VaccineReceiptDetailItem
                icon={Calendar}
                label="Ngày nhập"
                value={formatReceiptDate(vaccineReceipt)}
              />
              <VaccineReceiptDetailItem
                icon={FileText}
                label="Trạng thái"
                value="Tình trạng phiếu"
                badge={{
                  variant: getStatusVariant(vaccineReceipt?.isDeleted ?? false),
                  text: formatStatus(vaccineReceipt?.isDeleted ?? false),
                }}
              />
            </div>
          </div>

          {/* System Information */}
          <div className="border-t border-gray-50 pt-6">
            <h4 className="font-nunito-600 mb-4 flex items-center gap-2 text-sm text-gray-700">
              <div className="h-1 w-1 rounded-full bg-blue-500"></div>
              Thông tin hệ thống
            </h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <VaccineReceiptDetailItem
                icon={User}
                label="Người tạo"
                value={vaccineReceipt?.createdBy || "N/A"}
              />
              <VaccineReceiptDetailItem
                icon={Clock}
                label="Ngày tạo"
                value={formatCreatedDate(vaccineReceipt)}
              />
            </div>

            {vaccineReceipt?.modifiedBy && (
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <VaccineReceiptDetailItem
                  icon={User}
                  label="Người cập nhật"
                  value={vaccineReceipt.modifiedBy}
                />
                <VaccineReceiptDetailItem
                  icon={Clock}
                  label="Ngày cập nhật"
                  value={new Date(vaccineReceipt.modifiedAt).toLocaleDateString(
                    "vi-VN",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
