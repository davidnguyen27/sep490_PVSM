import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui";
import {
  CalendarIcon,
  CreditCardIcon,
  TagIcon,
  FileTextIcon,
} from "lucide-react";
import type { Voucher } from "../types/voucher.type";

interface VoucherDetailModalProps {
  voucher: Voucher | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VoucherDetailModal({
  voucher,
  isOpen,
  onClose,
}: VoucherDetailModalProps) {
  if (!voucher) return null;

  // discountAmount is represented as percentage in UI

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: vi });
  };

  const formatDateOnly = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy", { locale: vi });
  };

  const isExpired = (expirationDate: string) => {
    return new Date(expirationDate) < new Date();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <TagIcon className="h-5 w-5" />
            <span>Chi tiết voucher</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{voucher.voucherName}</h3>
                <p className="text-sm text-gray-600">
                  Mã voucher:{" "}
                  <span className="font-mono">{voucher.voucherCode}</span>
                </p>
              </div>
              <div className="text-right">
                {voucher.isDeleted ? (
                  <Badge variant="destructive">Đã xóa</Badge>
                ) : isExpired(voucher.expirationDate) ? (
                  <Badge variant="secondary">Hết hạn</Badge>
                ) : (
                  <Badge variant="default">Hoạt động</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Main Details */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Điểm yêu cầu */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <CreditCardIcon className="h-4 w-4" />
                <span>Điểm yêu cầu</span>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-lg font-semibold text-blue-600">
                  {voucher.pointsRequired.toLocaleString()} điểm
                </p>
              </div>
            </div>

            {/* Giảm giá */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <TagIcon className="h-4 w-4" />
                <span>Giảm giá (%)</span>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-lg font-semibold text-green-600">
                  {voucher.discountAmount}%
                </p>
              </div>
            </div>

            {/* Ngày hết hạn */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <CalendarIcon className="h-4 w-4" />
                <span>Ngày hết hạn</span>
              </div>
              <div className="rounded-lg border p-3">
                <p
                  className={`text-lg font-semibold ${isExpired(voucher.expirationDate)
                    ? "text-red-600"
                    : "text-gray-900"
                    }`}
                >
                  {formatDateOnly(voucher.expirationDate)}
                </p>
              </div>
            </div>

            {/* Transaction ID */}
            {voucher.transactionId && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <FileTextIcon className="h-4 w-4" />
                  <span>Mã giao dịch</span>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="font-mono text-sm text-gray-900">
                    {voucher.transactionId}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Mô tả */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <FileTextIcon className="h-4 w-4" />
              <span>Mô tả</span>
            </div>
            <div className="rounded-lg border p-4">
              <p className="whitespace-pre-wrap text-gray-900">
                {voucher.description}
              </p>
            </div>
          </div>

          {/* Thông tin hệ thống */}
          <div className="space-y-4 rounded-lg bg-gray-50 p-4">
            <h4 className="font-medium text-gray-900">Thông tin hệ thống</h4>
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
              <div>
                <span className="text-gray-600">Người tạo:</span>
                <p className="font-medium">{voucher.createdBy}</p>
              </div>
              <div>
                <span className="text-gray-600">Ngày tạo:</span>
                <p className="font-medium">{formatDate(voucher.createdAt)}</p>
              </div>
              {voucher.modifiedBy && (
                <div>
                  <span className="text-gray-600">Người sửa cuối:</span>
                  <p className="font-medium">{voucher.modifiedBy}</p>
                </div>
              )}
              {voucher.modifiedAt && (
                <div>
                  <span className="text-gray-600">Ngày sửa cuối:</span>
                  <p className="font-medium">
                    {formatDate(voucher.modifiedAt)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
