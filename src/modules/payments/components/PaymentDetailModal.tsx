import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Banknote, Calendar, User, DollarSign } from "lucide-react";
import type { Payment } from "../types/payment.type";
import { usePaymentDetail } from "../hooks/usePaymentDetail";

interface Props {
  payment: Payment | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentDetailModal({ payment, isOpen, onClose }: Props) {
  const paymentId = payment?.paymentId ?? null;
  // Only fetch detail when modal is open and paymentId exists
  const { data: paymentDetail, isLoading } = usePaymentDetail(
    isOpen ? paymentId : null,
  );
  const detail = paymentDetail || payment;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getPaymentStatusBadge = (status: number) => {
    switch (status) {
      case 1:
        return (
          <Badge
            variant="outline"
            className="border-warning text-warning font-nunito-600 bg-yellow-50"
          >
            Chờ thanh toán
          </Badge>
        );
      case 2:
        return (
          <Badge
            variant="default"
            className="bg-primary text-primary-foreground font-nunito-600"
          >
            Đã thanh toán
          </Badge>
        );
      case 3:
        return (
          <Badge variant="destructive" className="font-nunito-600">
            Đã hủy
          </Badge>
        );
      case 4:
        return (
          <Badge variant="secondary" className="font-nunito-600">
            Hoàn tiền
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="font-nunito-600">
            Không xác định
          </Badge>
        );
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "cash":
        return <Banknote className="text-primary h-5 w-5" />;
      case "payos":
      case "banking":
      case "banktransfer":
        return <CreditCard className="text-primary h-5 w-5" />;
      default:
        return <CreditCard className="text-primary h-5 w-5" />;
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method.toLowerCase()) {
      case "cash":
        return "Tiền mặt";
      case "banktransfer":
        return "Chuyển khoản";
      default:
        return method;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-linen font-nunito-400 modal-scrollbar max-w-2xl rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="font-inter-700 text-primary flex items-center gap-2 text-xl">
            <DollarSign className="text-primary h-6 w-6" />
            Chi tiết thanh toán
          </DialogTitle>
        </DialogHeader>
        {!isOpen ? null : isLoading ? (
          <div className="text-muted-foreground font-nunito-500 py-10 text-center text-lg">
            Đang tải chi tiết...
          </div>
        ) : !detail ? (
          <div className="text-muted-foreground font-nunito-500 py-10 text-center text-lg">
            Không có dữ liệu
          </div>
        ) : (
          <div className="space-y-8">
            {/* Payment Basic Info */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="text-muted-foreground font-nunito-600 text-xs">
                  Mã thanh toán
                </div>
                <div
                  className="text-dark font-nunito-600 max-w-[140px] truncate text-sm"
                  title={detail.paymentCode}
                >
                  {detail.paymentCode}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground font-nunito-600 text-xs">
                  Trạng thái
                </div>
                <div>{getPaymentStatusBadge(detail.paymentStatus)}</div>
              </div>
            </div>
            <Separator />
            {/* Amount and Method */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="text-muted-foreground font-nunito-600 text-xs">
                  Số tiền
                </div>
                <div className="font-nunito-700 text-secondary text-xl">
                  {formatCurrency(detail.amount)}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground font-nunito-600 text-xs">
                  Phương thức thanh toán
                </div>
                <div className="flex items-center gap-2">
                  {getPaymentMethodIcon(detail.paymentMethod)}
                  <span className="font-nunito-600 text-dark capitalize">
                    {getPaymentMethodText(detail.paymentMethod)}
                  </span>
                </div>
              </div>
            </div>
            <Separator />
            {/* Customer and Appointment Info */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="text-muted-foreground font-nunito-600 flex items-center gap-1 text-xs">
                  <User className="text-info h-4 w-4" /> Khách hàng
                </div>
                <div className="font-nunito-600 text-dark">
                  ID: {detail.customerId}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground font-nunito-600 flex items-center gap-1 text-xs">
                  <Calendar className="text-info h-4 w-4" /> Cuộc hẹn
                </div>
                <div className="font-nunito-600 text-dark">
                  ID: {detail.appointmentDetailId}
                </div>
              </div>
            </div>
            <Separator />
            {/* Service Info */}
            <div className="space-y-2">
              <div className="text-muted-foreground font-nunito-600 text-xs">
                Dịch vụ
              </div>
              <div className="grid grid-cols-1 gap-2">
                {detail.vaccineBatchId && (
                  <div className="text-dark flex justify-between">
                    <span>Vaccine Batch ID:</span>
                    <span className="font-nunito-600">
                      {detail.vaccineBatchId}
                    </span>
                  </div>
                )}
                {detail.microchipId && (
                  <div className="text-dark flex justify-between">
                    <span>Microchip ID:</span>
                    <span className="font-nunito-600">
                      {detail.microchipId}
                    </span>
                  </div>
                )}
                {detail.healthConditionId && (
                  <div className="text-dark flex justify-between">
                    <span>Health Condition ID:</span>
                    <span className="font-nunito-600">
                      {detail.healthConditionId}
                    </span>
                  </div>
                )}
                {detail.vaccinationCertificateId && (
                  <div className="text-dark flex justify-between">
                    <span>Certificate ID:</span>
                    <span className="font-nunito-600">
                      {detail.vaccinationCertificateId}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <Separator />
            {/* Timestamps */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="text-muted-foreground font-nunito-600 text-xs">
                  Ngày thanh toán
                </div>
                <div className="font-nunito-600 text-dark">
                  {formatDate(detail.paymentDate)}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground font-nunito-600 text-xs">
                  Ngày tạo
                </div>
                <div className="font-nunito-600 text-dark">
                  {formatDate(detail.createdAt)}
                </div>
              </div>
            </div>
            {/* QR Code if available */}
            {detail.qrCode && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="text-muted-foreground font-nunito-600 text-xs">
                    QR Code
                  </div>
                  <div className="flex justify-center">
                    <img
                      src={detail.qrCode}
                      alt="QR Code thanh toán"
                      className="h-32 w-32 rounded border"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
