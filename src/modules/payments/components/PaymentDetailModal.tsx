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
      <DialogContent className="bg-linen font-nunito-400 flex max-h-[90vh] max-w-2xl flex-col overflow-hidden p-6">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="font-inter-700 text-primary flex items-center gap-2 text-xl">
            <DollarSign className="text-primary h-6 w-6" />
            Chi tiết thanh toán
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-2">
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
                  <div className="text-dark font-nunito-600 text-sm break-all">
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

              {/* Amount and Voucher */}
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
                    Mã voucher
                  </div>
                  <div className="font-nunito-600 text-dark">
                    {detail.voucherCode || (
                      <span className="text-sm text-gray-400">Không có</span>
                    )}
                  </div>
                </div>
              </div>
              <Separator />

              {/* Payment Method */}
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
              <Separator />

              {/* Customer Info */}
              <div className="space-y-2">
                <div className="text-muted-foreground font-nunito-600 flex items-center gap-1 text-xs">
                  <User className="text-info h-4 w-4" /> Thông tin khách hàng
                </div>
                <div className="space-y-1">
                  <div className="font-nunito-600 text-dark">
                    {detail.customer?.fullName || "N/A"}
                  </div>
                  <div className="text-sm text-gray-600">
                    {detail.customer?.phoneNumber || "N/A"}
                  </div>
                  {detail.customer?.customerCode && (
                    <div className="text-sm text-gray-600">
                      Mã khách hàng: {detail.customer.customerCode}
                    </div>
                  )}
                </div>
              </div>
              <Separator />

              {/* Appointment Info */}
              <div className="space-y-2">
                <div className="text-muted-foreground font-nunito-600 flex items-center gap-1 text-xs">
                  <Calendar className="text-info h-4 w-4" /> Thông tin cuộc hẹn
                </div>
                <div className="space-y-1">
                  <div className="font-nunito-600 text-dark">
                    Mã cuộc hẹn:{" "}
                    {detail.appointmentDetail?.appointmentDetailCode || "N/A"}
                  </div>
                  {detail.appointmentDetail?.appointmentDate && (
                    <div className="text-sm text-gray-600">
                      Ngày hẹn:{" "}
                      {formatDate(detail.appointmentDetail.appointmentDate)}
                    </div>
                  )}
                  {detail.appointmentDetail?.vet?.name && (
                    <div className="text-sm text-gray-600">
                      Bác sĩ: {detail.appointmentDetail.vet.name}
                    </div>
                  )}
                </div>
              </div>
              <Separator />

              {/* Service Details */}
              <div className="space-y-2">
                <div className="text-muted-foreground font-nunito-600 text-xs">
                  Chi tiết dịch vụ
                </div>
                <div className="space-y-2">
                  {/* Service Type */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Loại dịch vụ:</span>
                    <Badge variant="secondary" className="text-xs">
                      {detail.appointmentDetail?.serviceType === 1
                        ? "Tiêm vaccine"
                        : detail.appointmentDetail?.serviceType === 2
                          ? "Gắn microchip"
                          : detail.appointmentDetail?.serviceType === 3
                            ? "Khám bệnh"
                            : "Không xác định"}
                    </Badge>
                  </div>

                  {/* Vaccine Info */}
                  {detail.vaccineBatch && (
                    <div className="flex justify-between">
                      <span className="text-sm">Vaccine:</span>
                      <span className="font-nunito-600 text-sm">
                        {detail.vaccineBatch.vaccineResponseDTO?.name ||
                          detail.vaccineBatch.batchNumber ||
                          "N/A"}
                      </span>
                    </div>
                  )}

                  {/* Microchip Info */}
                  {detail.microchip && (
                    <div className="flex justify-between">
                      <span className="text-sm">Microchip:</span>
                      <span className="font-nunito-600 text-sm">
                        {detail.microchip.microchipCode || "N/A"}
                      </span>
                    </div>
                  )}

                  {/* Health Condition */}
                  {detail.healthCondition && (
                    <div className="flex justify-between">
                      <span className="text-sm">Tình trạng sức khỏe:</span>
                      <span className="font-nunito-600 text-sm">
                        {detail.healthCondition.conditionCode || "N/A"}
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
