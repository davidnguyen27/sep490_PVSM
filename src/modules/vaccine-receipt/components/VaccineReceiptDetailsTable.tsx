import { Badge } from "@/components/ui/badge";
import { FileText, AlertCircle } from "lucide-react";
import { useState } from "react";
import { VaccineReceiptDetailTable } from "@/modules/vaccine-receipt-detail/components/VaccineReceiptDetailTable";
import { VaccineBatchDetailModal } from "@/modules/vaccine-receipt-detail/components/VaccineBatchDetailModal";
import type { VaccineReceiptDetail } from "@/modules/vaccine-receipt-detail/types/vaccine-receipt-detal.type";

interface VaccineReceiptDetailsTableProps {
  receiptDetails: VaccineReceiptDetail[] | undefined;
  isDetailsLoading: boolean;
  detailsError: Error | null;
}

export function VaccineReceiptDetailsTable({
  receiptDetails,
  isDetailsLoading,
  detailsError,
}: VaccineReceiptDetailsTableProps) {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDetailId, setSelectedDetailId] = useState<number | null>(null);

  const handleViewDetail = (item: VaccineReceiptDetail) => {
    if (item.vaccineReceiptDetailId) {
      setSelectedDetailId(item.vaccineReceiptDetailId);
      setShowDetailModal(true);
    }
  };

  return (
    <div className="rounded-none border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-100 p-2">
              <FileText className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-nunito-700 text-lg text-gray-900">
                Danh sách lô vaccine
              </h3>
              <p className="font-nunito-400 text-sm text-gray-500">
                Chi tiết các lô vaccine trong phiếu nhập
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="font-nunito-500 text-white">
            {receiptDetails?.length || 0} lô vaccine
          </Badge>
        </div>
      </div>

      <div className="p-6">
        {detailsError ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 w-fit rounded-full bg-red-50 p-4">
              <AlertCircle className="text-danger h-8 w-8" />
            </div>
            <h4 className="font-nunito-600 mb-2 text-lg text-gray-900">
              Không thể tải dữ liệu
            </h4>
            <p className="font-nunito-400 text-sm text-gray-500">
              Có lỗi xảy ra khi tải danh sách vaccine chi tiết
            </p>
          </div>
        ) : (
          <VaccineReceiptDetailTable
            data={receiptDetails || []}
            isPending={isDetailsLoading}
            onViewDetail={handleViewDetail}
          />
        )}
      </div>

      {/* Modal chi tiết lô vaccine */}
      <VaccineBatchDetailModal
        open={showDetailModal}
        onOpenChange={setShowDetailModal}
        vaccineReceiptDetailId={selectedDetailId}
      />
    </div>
  );
}
