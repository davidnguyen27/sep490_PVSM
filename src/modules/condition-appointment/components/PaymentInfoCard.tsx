import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Dog,
  BadgePercent,
  CreditCard,
  Banknote,
  Building2,
  Loader2,
} from "lucide-react";
import {
  useCreatePayment,
  usePaymentStore,
  type PaymentPayload,
} from "@/modules/payments";
import type { ConditionAppointments } from "../types/condition.type";

interface Props {
  ownerName: string;
  petName: string;
  memberRank: string;
  discountPercent: number;
  healthConditionCode: string;
  unitPrice: number;
  quantity: number;
  appointmentDetailId: number | null;
  customerId: number | null;
  healthConditionId: number | null;
  disabled?: boolean;
  onPaymentSuccess?: (
    paymentId: number,
    method: "Cash" | "BankTransfer",
  ) => void;
  invoiceData?: ConditionAppointments;
  onExportInvoice?: () => void;
}

export function PaymentInfoCard({
  ownerName,
  petName,
  memberRank,
  discountPercent,
  healthConditionCode,
  unitPrice,
  quantity,
  appointmentDetailId,
  customerId,
  healthConditionId,
  disabled = false,
  onPaymentSuccess,
  onExportInvoice,
  invoiceData,
}: Props) {
  const { paymentMethod, setPaymentMethod, setPaymentId } = usePaymentStore();
  const { setQrCode } = usePaymentStore.getState();
  const { mutate, isPending: isLoading } = useCreatePayment();

  const totalPrice = unitPrice * quantity;
  const discountAmount = (totalPrice * discountPercent) / 100;
  const finalAmount = totalPrice - discountAmount;

  // Lấy paymentId từ data thực tế trước, sau đó mới từ store
  const storePaymentId = usePaymentStore((state) => state.paymentId);
  const actualPaymentId = invoiceData?.payment?.paymentId;
  const paymentId = actualPaymentId || storePaymentId;

  // Kiểm tra trạng thái thanh toán từ data thực tế
  const isActuallyPaid = invoiceData?.payment?.paymentStatus === 2;
  const { setPaymentType } = usePaymentStore.getState();

  // Lấy phương thức thanh toán từ invoiceData nếu có
  const savedPaymentMethod = invoiceData?.payment?.paymentMethod;
  const displayPaymentMethod =
    savedPaymentMethod === "Cash" ||
    savedPaymentMethod === "BankTransfer" ||
    savedPaymentMethod === "CASH" ||
    savedPaymentMethod === "BANK_TRANSFER"
      ? savedPaymentMethod === "CASH"
        ? "Cash"
        : savedPaymentMethod === "BANK_TRANSFER"
          ? "BankTransfer"
          : savedPaymentMethod
      : paymentMethod;

  const handlePaymentMethodChange = useCallback(
    (method: "Cash" | "BankTransfer") => {
      setPaymentMethod(method);
    },
    [setPaymentMethod],
  );

  const handlePaymentComplete = useCallback(() => {
    const payload: PaymentPayload = {
      appointmentDetailId,
      customerId,
      healthConditionId,
      paymentMethod: paymentMethod === "Cash" ? 1 : 2,
    };

    mutate(payload, {
      onSuccess: (response) => {
        const data = response.data;
        const id = data?.paymentId;

        if (!id) return;

        setPaymentType("vaccination");
        setPaymentId(id);
        setQrCode(data.qrCode ?? null);

        if (paymentMethod === "Cash") {
          onPaymentSuccess?.(id, "Cash");
        } else if (
          paymentMethod === "BankTransfer" &&
          data.checkoutUrl &&
          data.paymentId
        ) {
          const url = new URL(data.checkoutUrl);
          url.searchParams.set("paymentId", String(data.paymentId));
          // The orderCode parameter will already contain the appointmentDetailId
          // No need to add an extra parameter

          window.location.href = url.toString();
        }
      },
    });
  }, [
    appointmentDetailId,
    customerId,
    healthConditionId,
    paymentMethod,
    mutate,
    setPaymentId,
    setQrCode,
    setPaymentType,
    onPaymentSuccess,
  ]);

  return (
    <Card className="bg-linen rounded-none">
      <CardContent className="space-y-4 p-6">
        <div className="text-primary font-nunito-700 text-lg underline">
          Thông tin thanh toán
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>
              Chủ nuôi:{" "}
              <span className="text-primary cursor-pointer hover:underline">
                {ownerName}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Dog size={16} />
            <span>Thú cưng: {petName}</span>
          </div>

          <div className="flex items-center gap-2">
            <BadgePercent size={16} />
            <span>
              Hạng thành viên: {memberRank} (giảm {discountPercent}%)
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-md border">
          <div className="bg-muted grid grid-cols-4 p-2 text-sm font-medium">
            <span>Sản phẩm</span>
            <span className="text-center">Đơn giá</span>
            <span className="text-center">Số lượng</span>
            <span className="text-primary cursor-pointer text-right">
              Thành tiền
            </span>
          </div>

          <div className="grid grid-cols-4 items-center p-2 text-sm">
            <span>{healthConditionCode}</span>
            <span className="text-center">
              {unitPrice.toLocaleString()} vnđ
            </span>
            <span className="text-center">{quantity}</span>
            <span className="text-right">
              {totalPrice.toLocaleString()} vnđ
            </span>
          </div>
        </div>

        <div className="space-y-1 text-right text-sm">
          <p>
            Tổng tiền hàng:{" "}
            <span className="font-medium">
              {totalPrice.toLocaleString()} vnđ
            </span>
          </p>
          <p>
            Tổng tiền giảm:{" "}
            <span className="text-green-600">
              {discountAmount.toLocaleString()} vnđ
            </span>
          </p>
          <p className="text-base font-semibold">
            Tổng thanh toán: {finalAmount.toLocaleString()} vnđ
          </p>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CreditCard size={16} />
            <p className="text-sm font-medium">Phương thức thanh toán:</p>
          </div>

          {paymentId || isActuallyPaid ? (
            // Đã thanh toán - chỉ hiển thị phương thức đã chọn
            <div className="border-primary bg-primary/10 text-primary flex items-center gap-2 rounded-md border-2 p-3">
              {displayPaymentMethod === "Cash" ||
              invoiceData?.payment?.paymentMethod === "Cash" ||
              invoiceData?.payment?.paymentMethod === "CASH" ? (
                <>
                  <Banknote size={18} />
                  <span className="text-sm font-medium">Tiền mặt</span>
                </>
              ) : (
                <>
                  <Building2 size={18} />
                  <span className="text-sm font-medium">Chuyển khoản</span>
                </>
              )}
              {invoiceData?.payment?.paymentDate && (
                <span className="ml-auto text-xs text-gray-500">
                  {new Date(invoiceData.payment.paymentDate).toLocaleDateString(
                    "vi-VN",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                </span>
              )}
            </div>
          ) : (
            // Chưa thanh toán - cho phép chọn phương thức
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handlePaymentMethodChange("Cash")}
                disabled={disabled || isLoading}
                className={`flex items-center gap-2 rounded-md border-2 p-3 transition-all ${
                  paymentMethod === "Cash"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-200 hover:border-gray-300"
                } ${disabled || isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
              >
                <Banknote size={18} />
                <span className="text-sm font-medium">Tiền mặt</span>
              </button>

              <button
                onClick={() => handlePaymentMethodChange("BankTransfer")}
                disabled={disabled}
                className={`flex items-center gap-2 rounded-md border-2 p-3 transition-all ${
                  paymentMethod === "BankTransfer"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-200 hover:border-gray-300"
                } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
              >
                <Building2 size={18} />
                <span className="text-sm font-medium">Chuyển khoản</span>
              </button>
            </div>
          )}
        </div>

        {/* Payment Action and Payment Status */}
        <div className="flex items-center justify-between pt-4">
          {/* Payment Status */}
          {(paymentId || isActuallyPaid) && (
            <div className="flex items-center">
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Đã thanh toán
              </span>
            </div>
          )}

          {/* Action Button */}
          <div>
            {paymentId || isActuallyPaid ? (
              <Button
                className="bg-secondary hover:bg-secondary/90 px-8 py-2 text-white"
                onClick={onExportInvoice}
              >
                In hóa đơn
              </Button>
            ) : (
              <Button
                onClick={handlePaymentComplete}
                disabled={disabled || isLoading}
                className="bg-primary hover:bg-primary/90 px-8 py-2 text-white"
              >
                {isLoading && (
                  <Loader2 className="mr-2 animate-spin" size={16} />
                )}
                Thanh toán
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
