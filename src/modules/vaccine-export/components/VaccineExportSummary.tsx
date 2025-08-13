import { formatData } from "@/shared/utils/format.utils";
import type { VaccineExport } from "../types/vaccine-export.type";

interface VaccineExportSummaryProps {
  vaccineExport: VaccineExport;
  exportDetails?: unknown[];
}

export default function VaccineExportSummary({
  vaccineExport,
  exportDetails = [],
}: VaccineExportSummaryProps) {
  const totalItems = exportDetails.length;

  return (
    <div className="rounded-none border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-4">
        <h3 className="font-nunito-700 text-lg text-gray-900">
          Tóm tắt phiếu xuất
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
                {totalItems}
              </p>
            </div>
          </div>

          <div className="rounded-none bg-gradient-to-r from-green-50 to-emerald-50 p-4">
            <div className="text-center">
              <p className="font-nunito-500 text-sm text-gray-600">
                Trạng thái
              </p>
              <div className="mt-2">
                <span
                  className={`font-nunito-600 rounded px-2 py-1 text-xs ${
                    vaccineExport.isDeleted
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {vaccineExport.isDeleted ? "Đã xóa" : "Hoạt động"}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-none bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
            <div className="text-center">
              <p className="font-nunito-500 text-sm text-gray-600">Ngày tạo</p>
              <p className="font-nunito-600 mt-1 text-sm text-gray-900">
                {formatData.formatDateTime(vaccineExport.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
