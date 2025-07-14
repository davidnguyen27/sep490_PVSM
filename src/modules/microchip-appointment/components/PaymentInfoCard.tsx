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
import type { MicrochipDetail } from "../types/detail.type";
import { QRCodeSVG } from "qrcode.react";

interface PaymentInfoCardProps {
  ownerName: string;
  petName: string;
  memberRank: string;
  discountPercent: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  appointmentDetailId: number | null;
  customerId: number | null;
  microchipItemId: number | null;
  disabled?: boolean;
  onPaymentSuccess?: (paymentId: number, method: "cash" | "transfer") => void;
  invoiceData?: MicrochipDetail;
  onExportInvoice?: () => void;
}

export function PaymentInfoCard({
  ownerName,
  petName,
  memberRank,
  discountPercent,
  productName,
  unitPrice,
  quantity,
  appointmentDetailId,
  customerId,
  microchipItemId,
  disabled = false,
  onPaymentSuccess,
  onExportInvoice,
}: PaymentInfoCardProps) {
  const { paymentMethod, setPaymentMethod, setPaymentId } = usePaymentStore();
  const { setQrCode } = usePaymentStore.getState();
  const { mutate, isPending: isLoading } = useCreatePayment();

  const totalPrice = unitPrice * quantity;
  const discountAmount = (totalPrice * discountPercent) / 100;
  const finalAmount = totalPrice - discountAmount;

  const paymentId = usePaymentStore((state) => state.paymentId);
  const qrCode = usePaymentStore((state) => state.qrCode);

  const handlePaymentMethodChange = useCallback(
    (method: "cash" | "transfer") => {
      setPaymentMethod(method);
    },
    [setPaymentMethod],
  );

  const handlePaymentComplete = useCallback(() => {
    const payload: PaymentPayload = {
      appointmentDetailId,
      customerId,
      microchipItemId,
      paymentMethod: paymentMethod === "cash" ? 1 : 2,
    };
    mutate(payload, {
      onSuccess: (response) => {
        const id = response.data?.paymentId;
        if (id) {
          setPaymentId(id);
          onPaymentSuccess?.(id, paymentMethod);
        }
        setQrCode(response.data?.qrCode ?? null);
      },
    });
  }, [
    appointmentDetailId,
    customerId,
    microchipItemId,
    paymentMethod,
    mutate,
    setPaymentId,
    onPaymentSuccess,
    setQrCode,
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
            <span>{productName}</span>
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

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handlePaymentMethodChange("cash")}
              disabled={disabled || isLoading}
              className={`flex items-center gap-2 rounded-md border-2 p-3 transition-all ${
                paymentMethod === "cash"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-gray-200 hover:border-gray-300"
              } ${disabled || isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            >
              <Banknote size={18} />
              <span className="text-sm font-medium">Tiền mặt</span>
            </button>

            <button
              onClick={() => handlePaymentMethodChange("transfer")}
              disabled={disabled}
              className={`flex items-center gap-2 rounded-md border-2 p-3 transition-all ${
                paymentMethod === "transfer"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-gray-200 hover:border-gray-300"
              } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            >
              <Building2 size={18} />
              <span className="text-sm font-medium">Chuyển khoản</span>
            </button>
          </div>
        </div>

        {/* Transfer Details (only show when transfer is selected) */}
        {paymentMethod === "transfer" && qrCode && (
          <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
            <h4 className="mb-2 font-medium text-blue-900">
              Thông tin chuyển khoản:
            </h4>
            <div className="space-y-1 text-sm text-blue-800">
              <p>
                Tên tài khoản:{" "}
                <span className="font-medium">Phòng khám thú y ABC</span>
              </p>
              <p>
                Số tài khoản: <span className="font-medium">1234567890</span>
              </p>
              <p>
                Ngân hàng: <span className="font-medium">Vietcombank</span>
              </p>
              <p>
                Chi nhánh: <span className="font-medium">Quận 1, TP.HCM</span>
              </p>
              <p>
                Nội dung:{" "}
                <span className="font-medium">
                  Thanh toan vaccine {petName}
                </span>
              </p>
            </div>

            <div className="mt-6 space-y-3 border-t pt-4 text-center">
              <p className="text-primary font-semibold">
                Quét mã QR để thanh toán
              </p>
              <QRCodeSVG
                value={qrCode}
                size={200}
                includeMargin
                className="mx-auto rounded-md border"
              />
              <p className="text-muted-foreground text-xs italic">
                Mã được tạo bởi PayOS. Vui lòng quét bằng ứng dụng ngân hàng.
              </p>
            </div>
          </div>
        )}

        {/* Payment Action */}
        <div className="flex justify-end pt-4">
          {paymentId ? (
            <Button
              className="bg-secondary hover:bg-secondary/90 px-8 py-2 text-white"
              onClick={onExportInvoice}
            >
              Xuất hóa đơn
            </Button>
          ) : (
            <Button
              onClick={handlePaymentComplete}
              disabled={disabled || isLoading}
              className="bg-primary hover:bg-primary/90 px-8 py-2 text-white"
            >
              {isLoading && <Loader2 className="animate-spin" size={16} />}
              Đồng ý
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
