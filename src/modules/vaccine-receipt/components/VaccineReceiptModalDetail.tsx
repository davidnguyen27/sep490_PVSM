import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/shared";
import {
  Calendar,
  User,
  Clock,
  Hash,
  FileText,
  AlertCircle,
} from "lucide-react";

// hooks
import { useVaccineReceiptDetail } from "../hooks/useVaccineReceiptDetail";
import { useVaccineReceiptDetailByReceipt } from "@/modules/vaccine-receipt-detail/hooks/useVaccineReceipDetailByReceipt";

// components
import { VaccineReceiptDetailTable } from "@/modules/vaccine-receipt-detail/components/VaccineReceiptDetailTable";

// utils
import {
  formatReceiptCode,
  formatReceiptDate,
  formatCreatedDate,
  formatStatus,
  getStatusVariant,
} from "../utils/vaccine-receipt.utils";

interface VaccineReceiptModalDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vaccineReceiptId: number | null;
}

export function VaccineReceiptModalDetail({
  open,
  onOpenChange,
  vaccineReceiptId,
}: VaccineReceiptModalDetailProps) {
  const {
    data: vaccineReceipt,
    isPending,
    error,
  } = useVaccineReceiptDetail(vaccineReceiptId);

  const {
    data: receiptDetails,
    isPending: isDetailsLoading,
    error: detailsError,
  } = useVaccineReceiptDetailByReceipt(vaccineReceiptId);

  const DetailItem = ({
    icon: Icon,
    label,
    value,
    badge,
  }: {
    icon: React.ElementType;
    label: string;
    value: string;
    badge?: {
      variant:
        | "default"
        | "secondary"
        | "destructive"
        | "outline"
        | null
        | undefined;
      text: string;
    };
  }) => (
    <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-4">
      <div className="flex-shrink-0">
        <Icon className="text-primary h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-nunito-600 text-sm text-gray-700">{label}</p>
        <div className="mt-1 flex items-center gap-2">
          <p className="font-nunito-500 text-gray-900">{value}</p>
          {badge && (
            <Badge variant={badge.variant} className="font-nunito-500">
              {badge.text}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-primary">
              Chi tiết phiếu nhập vaccine
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center space-y-4 px-4 py-8">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <div className="text-center">
              <h3 className="font-nunito-600 text-lg text-gray-900">
                Không thể tải thông tin
              </h3>
              <p className="font-nunito-400 mt-1 text-sm text-gray-500">
                Có lỗi xảy ra khi tải chi tiết phiếu nhập vaccine
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="text-primary">
            Chi tiết phiếu nhập vaccine
          </DialogTitle>
          <DialogDescription>
            Thông tin chi tiết về phiếu nhập vaccine và danh sách vaccine trong
            phiếu
          </DialogDescription>
        </DialogHeader>

        {isPending ? (
          <div className="flex items-center justify-center py-8">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Thông tin phiếu nhập */}
            <div className="space-y-4">
              <h3 className="font-nunito-600 border-b pb-2 text-lg text-gray-900">
                Thông tin phiếu nhập
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <DetailItem
                  icon={Hash}
                  label="Mã phiếu nhập"
                  value={formatReceiptCode(vaccineReceipt!)}
                />

                <DetailItem
                  icon={Calendar}
                  label="Ngày nhập"
                  value={formatReceiptDate(vaccineReceipt!)}
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <DetailItem
                  icon={FileText}
                  label="Trạng thái"
                  value="Tình trạng phiếu nhập"
                  badge={{
                    variant: getStatusVariant(
                      vaccineReceipt?.isDeleted ?? false,
                    ),
                    text: formatStatus(vaccineReceipt?.isDeleted ?? false),
                  }}
                />
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-nunito-600 mb-3 text-sm text-gray-700">
                  Thông tin hệ thống
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <DetailItem
                    icon={User}
                    label="Người tạo"
                    value={vaccineReceipt?.createdBy || "N/A"}
                  />

                  <DetailItem
                    icon={Clock}
                    label="Ngày tạo"
                    value={formatCreatedDate(vaccineReceipt!)}
                  />
                </div>

                {vaccineReceipt?.modifiedBy && (
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <DetailItem
                      icon={User}
                      label="Người cập nhật"
                      value={vaccineReceipt.modifiedBy}
                    />

                    <DetailItem
                      icon={Clock}
                      label="Ngày cập nhật"
                      value={new Date(
                        vaccineReceipt.modifiedAt,
                      ).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Danh sách vaccine chi tiết */}
            <div className="space-y-4">
              <h3 className="font-nunito-600 border-b pb-2 text-lg text-gray-900">
                Danh sách vaccine trong phiếu
              </h3>

              {detailsError ? (
                <div className="py-8 text-center">
                  <AlertCircle className="mx-auto mb-2 h-8 w-8 text-red-500" />
                  <p className="text-sm text-gray-500">
                    Không thể tải danh sách vaccine chi tiết
                  </p>
                </div>
              ) : (
                <VaccineReceiptDetailTable
                  data={receiptDetails || []}
                  isPending={isDetailsLoading}
                />
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
