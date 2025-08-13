import { Badge } from "@/components/ui/badge";
import { Package, AlertCircle } from "lucide-react";
import { VaccineExportDetailTable } from "@/modules/vaccine-export-detail/components";

interface VaccineExportDetailsTableProps {
  exportDetails?: unknown[];
  isDetailsLoading: boolean;
  detailsError?: Error | null;
}

export default function VaccineExportDetailsTable({
  exportDetails = [],
  isDetailsLoading,
  detailsError,
}: VaccineExportDetailsTableProps) {
  if (detailsError) {
    return (
      <div className="rounded-none border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-red-100 p-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-nunito-700 text-lg text-gray-900">
                Danh sách lô vaccine
              </h3>
              <p className="font-nunito-400 text-sm text-gray-500">
                Chi tiết các lô vaccine trong phiếu xuất
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex min-h-32 items-center justify-center">
            <div className="text-center">
              <AlertCircle className="mx-auto mb-4 h-16 w-16 text-red-400" />
              <p className="text-gray-600">
                Có lỗi xảy ra khi tải danh sách chi tiết
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-none border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-100 p-2">
              <Package className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-nunito-700 text-lg text-gray-900">
                Danh sách lô vaccine
              </h3>
              <p className="font-nunito-400 text-sm text-gray-500">
                Chi tiết các lô vaccine trong phiếu xuất
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="font-nunito-500 text-white">
            {exportDetails.length} lô vaccine
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <VaccineExportDetailTable
          data={exportDetails as never}
          isPending={isDetailsLoading}
        />
      </div>
    </div>
  );
}
