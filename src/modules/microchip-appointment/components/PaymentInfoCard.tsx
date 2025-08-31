import { useCallback, useState, useEffect } from "react";
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
  MapPin,
  Truck,
} from "lucide-react";
import {
  useCreatePayment,
  usePaymentStore,
  useRetryPayment,
  type PaymentPayload,
} from "@/modules/payments";
import type { MicrochipDetail } from "../types/detail.type";
import { VoucherSelection } from "./VoucherSelection";
import type { CustomerVoucher } from "@/modules/customer-voucher/types/customer-voucher.type";
import type { Membership } from "@/modules/membership/types/membership.type";
import { membershipService } from "@/modules/membership/service/membership.service";
import { useDistanceCalculation } from "@/shared/hooks/useDistanceCalculation";
import { appointmentService } from "@/modules/appointment/services/appointment.service";

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
  onPaymentSuccess?: (
    paymentId: number,
    method: "Cash" | "BankTransfer",
  ) => void;
  invoiceData?: MicrochipDetail;
  onExportInvoice?: () => void;
  onRefreshData?: () => void; // Add callback to refresh data
  // Add new props for home service
  appointmentId: number;
  appointmentAddress?: string;
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
  onRefreshData,
  invoiceData,
  appointmentId,
  appointmentAddress,
}: PaymentInfoCardProps) {
  const { paymentMethod, setPaymentMethod, setPaymentId } = usePaymentStore();
  const { setQrCode, setHasNewPendingPayment } = usePaymentStore.getState();
  const hasNewPendingPayment = usePaymentStore(
    (state) => state.hasNewPendingPayment,
  );
  const { mutate, isPending: isLoading } = useCreatePayment();
  const { mutateAsync: retryPayment } = useRetryPayment();
  const [selectedVoucher, setSelectedVoucher] =
    useState<CustomerVoucher | null>(null);

  // State for membership management
  const [membershipData, setMembershipData] = useState<Membership | null>(null);
  const [loadingMembership, setLoadingMembership] = useState(false);

  // Fetch appointment data to get location
  const [appointmentLocation, setAppointmentLocation] = useState<number | null>(
    null,
  );

  // Fetch appointment data when appointmentId changes
  useEffect(() => {
    const fetchAppointment = async () => {
      if (!appointmentId) return;

      try {
        const appointment =
          await appointmentService.getAppointmentById(appointmentId);
        setAppointmentLocation(appointment.location);
      } catch (error) {
        console.error("Error fetching appointment:", error);
        setAppointmentLocation(null);
      }
    };

    fetchAppointment();
  }, [appointmentId]);

  // Check if this is a home service appointment (location = 2)
  const isHomeService = appointmentLocation === 2;

  // Distance calculation for home service
  const {
    distance,
    transportFee,
    centerLocation,
    loading: loadingDistance,
    error: distanceError,
  } = useDistanceCalculation({
    address: appointmentAddress,
    isHomeService,
  }); // Fetch membership data when customerId changes
  useEffect(() => {
    const fetchMembership = async () => {
      if (!customerId) return;

      setLoadingMembership(true);
      try {
        const membership =
          await membershipService.getMembershipByCustomerId(customerId);
        setMembershipData(membership);
      } catch (error) {
        console.error("Error fetching membership:", error);
        setMembershipData(null);
      } finally {
        setLoadingMembership(false);
      }
    };

    fetchMembership();
  }, [customerId]);

  // Use membership data if available, otherwise fallback to props
  const actualMemberRank = membershipData?.rank || memberRank;
  const actualDiscountPercent = membershipData
    ? membershipData.rank === "gold"
      ? 20
      : membershipData.rank === "silver"
        ? 10
        : membershipData.rank === "bronze"
          ? 0
          : 0
    : discountPercent;

  const displayMemberRank = membershipData
    ? membershipData.rank === "gold"
      ? "Vàng"
      : membershipData.rank === "silver"
        ? "Bạc"
        : membershipData.rank === "bronze"
          ? "Đồng"
          : actualMemberRank
    : actualMemberRank;
  const benefits = membershipData?.benefits;

  const totalPrice = unitPrice * quantity;
  const memberDiscountAmount = (totalPrice * actualDiscountPercent) / 100;

  // Calculate voucher discount based on percentage
  const voucherDiscountAmount = selectedVoucher
    ? (totalPrice * selectedVoucher.voucher.discountAmount) / 100
    : 0;

  // Total discount = member discount + voucher discount
  const totalDiscountAmount = memberDiscountAmount + voucherDiscountAmount;

  // Add transport fee for home service
  const subtotalWithTransport = totalPrice + (isHomeService ? transportFee : 0);
  const finalAmount = subtotalWithTransport - totalDiscountAmount;

  // Store helpers
  const { setPaymentType } = usePaymentStore.getState();

  // Lấy payment status để xử lý các trạng thái khác nhau
  const paymentStatus = invoiceData?.microchip?.payment?.paymentStatus;
  const isPaymentCancelled = paymentStatus === 3;

  // Kiểm tra xem payment đã tồn tại và có paymentMethod chưa
  const existingPayment = invoiceData?.microchip?.payment;
  const hasExistingPaymentMethod =
    existingPayment && existingPayment.paymentMethod;

  // Tự động set payment method về Cash khi payment bị hủy
  useEffect(() => {
    if (isPaymentCancelled) {
      setPaymentMethod("Cash");
    }
  }, [isPaymentCancelled, setPaymentMethod]);

  // Lấy phương thức thanh toán từ invoiceData nếu có
  const savedPaymentMethod = invoiceData?.microchip?.payment?.paymentMethod;
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
      microchipItemId,
      paymentMethod: paymentMethod === "Cash" ? 1 : 2,
      ...(selectedVoucher && {
        voucherCode: selectedVoucher.voucher.voucherCode,
      }),
    };

    console.log("Microchip Payment payload with voucher:", payload);
    console.log("Final amount being sent:", finalAmount);

    mutate(payload, {
      onSuccess: (response) => {
        const data = response.data;
        const id = data?.paymentId;

        if (!id) return;

        setPaymentType("microchip");
        setPaymentId(id);
        setQrCode(data.qrCode ?? null);

        if (paymentMethod === "Cash") {
          onPaymentSuccess?.(id, "Cash");
          setHasNewPendingPayment(true); // Set flag for new pending payment
          // Refresh data to update payment status
          setTimeout(() => {
            onRefreshData?.();
          }, 500);
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
    microchipItemId,
    paymentMethod,
    selectedVoucher,
    finalAmount,
    mutate,
    setPaymentId,
    setQrCode,
    setPaymentType,
    onPaymentSuccess,
    setHasNewPendingPayment,
    onRefreshData,
  ]);

  const handleRetryPayment = useCallback(async () => {
    // Khi thanh toán lại từ trạng thái hủy, luôn sử dụng Cash
    const retryPaymentMethod = isPaymentCancelled ? "Cash" : paymentMethod;

    const payload: PaymentPayload = {
      appointmentDetailId,
      customerId,
      microchipItemId,
      paymentMethod: retryPaymentMethod === "Cash" ? 1 : 2,
      voucherCode: selectedVoucher ? selectedVoucher.voucher.voucherCode : null,
    };

    try {
      const response = await retryPayment(payload);
      const data = response.data;
      const id = data?.paymentId;

      if (!id) return;

      setPaymentType("microchip");
      setPaymentId(id);
      setQrCode(data.qrCode ?? null);

      if (retryPaymentMethod === "Cash") {
        onPaymentSuccess?.(id, "Cash");
        setHasNewPendingPayment(true); // Set flag for new pending payment
        // Refresh data to update payment status
        setTimeout(() => {
          onRefreshData?.();
        }, 500);
      } else if (
        retryPaymentMethod === "BankTransfer" &&
        data.checkoutUrl &&
        data.paymentId
      ) {
        const url = new URL(data.checkoutUrl);
        url.searchParams.set("paymentId", String(data.paymentId));
        window.location.href = url.toString();
      }
    } catch (error) {
      console.error("Retry payment failed:", error);
    }
  }, [
    appointmentDetailId,
    customerId,
    microchipItemId,
    paymentMethod,
    isPaymentCancelled,
    selectedVoucher,
    retryPayment,
    setPaymentId,
    setQrCode,
    setPaymentType,
    onPaymentSuccess,
    setHasNewPendingPayment,
    onRefreshData,
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
              Hạng thành viên:{" "}
              {loadingMembership ? "Đang tải..." : displayMemberRank} (
              {benefits})
              {Array.isArray(membershipData?.customer) &&
                membershipData.customer[0]?.currentPoints && (
                  <span className="ml-2 text-xs text-gray-500">
                    - {membershipData.customer[0].currentPoints} điểm
                  </span>
                )}
            </span>
          </div>

          {/* Display home service info */}
          {isHomeService && (
            <div className="space-y-2 rounded-md border border-blue-200 bg-blue-50 p-3">
              <div className="flex items-center gap-2 font-medium text-blue-700">
                <MapPin size={16} />
                <span>🏠 Dịch vụ tại nhà</span>
              </div>

              <div className="ml-6 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="font-medium">Địa chỉ:</span>
                  <span>{appointmentAddress}</span>
                </div>

                {centerLocation && (
                  <div className="mt-1 flex items-start gap-2">
                    <span className="font-medium">Từ trung tâm:</span>
                    <span>{centerLocation}</span>
                  </div>
                )}

                <div className="mt-1 flex items-center gap-2">
                  <Truck size={14} />
                  <span className="font-medium">Khoảng cách:</span>
                  {loadingDistance ? (
                    <span className="text-blue-500">Đang tính toán...</span>
                  ) : distanceError ? (
                    <span className="text-red-500">Không thể tính toán</span>
                  ) : distance ? (
                    <span className="font-medium text-blue-600">
                      {distance.toFixed(1)} km
                    </span>
                  ) : (
                    <span className="text-gray-400">--</span>
                  )}
                </div>

                {transportFee > 0 && (
                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-medium">Phí di chuyển:</span>
                    <span className="font-semibold text-orange-600">
                      +{transportFee.toLocaleString()} VNĐ
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
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

          {/* Add transport fee row for home service */}
          {isHomeService && transportFee > 0 && (
            <div className="grid grid-cols-4 items-center border-t bg-orange-50 p-2 text-sm">
              <span className="flex items-center gap-1">
                <Truck size={14} className="text-orange-500" />
                Phí di chuyển
              </span>
              <span className="text-center text-gray-600">
                {distance ? `${distance.toFixed(1)} km` : "--"}
              </span>
              <span className="text-center">1</span>
              <span className="text-right font-medium text-orange-600">
                +{transportFee.toLocaleString()} vnđ
              </span>
            </div>
          )}
        </div>

        <div className="space-y-1 text-right text-sm">
          <p>
            Tổng tiền hàng:{" "}
            <span className="font-medium">
              {totalPrice.toLocaleString()} vnđ
            </span>
          </p>
          {isHomeService && transportFee > 0 && (
            <p className="text-orange-600">
              Phí di chuyển ({distance?.toFixed(1)} km):{" "}
              <span className="font-medium">
                +{transportFee.toLocaleString()} vnđ
              </span>
            </p>
          )}
          {actualDiscountPercent > 0 && (
            <p>
              Hạng thành viên: {displayMemberRank} (giảm {actualDiscountPercent}
              %):{" "}
              <span className="text-green-600">
                -{memberDiscountAmount.toLocaleString()} vnđ
              </span>
            </p>
          )}
          {voucherDiscountAmount > 0 && (
            <p>
              Giảm giá voucher ({selectedVoucher?.voucher.discountAmount}%):{" "}
              <span className="text-green-600">
                -{voucherDiscountAmount.toLocaleString()} vnđ
              </span>
            </p>
          )}
          {totalDiscountAmount > 0 && (
            <p>
              Tổng tiền giảm:{" "}
              <span className="text-green-600">
                -{totalDiscountAmount.toLocaleString()} vnđ
              </span>
            </p>
          )}
          <div className="mt-2 border-t pt-2">
            <p className="text-base font-semibold">
              Tổng thanh toán: {finalAmount.toLocaleString()} vnđ
            </p>
            {isHomeService && transportFee > 0 && (
              <p className="mt-1 text-xs text-gray-500">
                (Bao gồm phí di chuyển tại nhà)
              </p>
            )}
          </div>
        </div>

        {/* Voucher Selection */}
        <VoucherSelection
          customerId={customerId}
          onVoucherSelect={setSelectedVoucher}
          selectedVoucher={selectedVoucher}
        />

        {/* Payment Method Selection */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CreditCard size={16} />
            <p className="text-sm font-medium">Phương thức thanh toán:</p>
          </div>

          {paymentStatus === 2 ? (
            // Đã thanh toán thành công - hiển thị phương thức đã chọn
            <div className="border-primary bg-primary/10 text-primary flex items-center gap-2 rounded-md border-2 p-3">
              {displayPaymentMethod === "Cash" ||
              invoiceData?.microchip?.payment?.paymentMethod === "Cash" ||
              invoiceData?.microchip?.payment?.paymentMethod === "CASH" ? (
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
              {invoiceData?.microchip?.payment?.paymentDate && (
                <span className="ml-auto text-xs text-gray-500">
                  {new Date(
                    invoiceData.microchip.payment.paymentDate,
                  ).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
          ) : paymentStatus === 3 ? (
            // Thanh toán đã bị hủy - chỉ hiển thị phương thức Tiền mặt
            <>
              <div className="text-danger mb-3 flex items-center gap-2 rounded-md border-2 border-red-300 bg-red-50 p-3">
                <span className="text-sm font-medium">
                  Thanh toán đã bị hủy
                </span>
                <span className="ml-auto text-xs text-gray-500">
                  {invoiceData?.microchip?.payment?.paymentDate &&
                    new Date(
                      invoiceData.microchip.payment.paymentDate,
                    ).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </span>
              </div>
              {/* Chỉ hiển thị phương thức Tiền mặt */}
              <div className="flex justify-center">
                <div className="border-primary bg-primary/10 text-primary flex w-full max-w-xs items-center gap-2 rounded-md border-2 p-3">
                  <Banknote size={18} />
                  <span className="text-sm font-medium">Tiền mặt</span>
                </div>
              </div>
            </>
          ) : hasExistingPaymentMethod ? (
            // Payment đã tồn tại với paymentMethod - không cho chọn lại, chỉ hiển thị
            <div className="border-primary bg-primary/10 text-primary flex items-center gap-2 rounded-md border-2 p-3">
              {displayPaymentMethod === "Cash" ||
              invoiceData?.microchip?.payment?.paymentMethod === "Cash" ||
              invoiceData?.microchip?.payment?.paymentMethod === "CASH" ||
              invoiceData?.microchip?.payment?.paymentMethod === "1" ? (
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
              <span className="ml-auto text-xs text-gray-500">
                Đã chọn phương thức thanh toán
              </span>
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
        <div className="flex items-center justify-end gap-4 pt-4">
          {/* Payment Status */}
          {paymentStatus === 2 && (
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              Đã thanh toán
            </span>
          )}
          {paymentStatus === 3 && (
            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
              Thanh toán đã hủy
            </span>
          )}

          {/* Action Button */}
          {paymentStatus === 2 ? (
            // paymentStatus = 2 => hiển thị nút "In hóa đơn"
            <Button
              className="bg-secondary hover:bg-secondary/90 px-8 py-2 text-white"
              onClick={onExportInvoice}
            >
              In hóa đơn
            </Button>
          ) : paymentStatus === 3 && !hasNewPendingPayment ? (
            // paymentStatus = 3 và chưa có payment mới => hiển thị nút "Thanh toán lại"
            <Button
              onClick={handleRetryPayment}
              disabled={disabled || isLoading}
              className="bg-primary hover:bg-primary/90 px-8 py-2 text-white"
            >
              {isLoading && <Loader2 className="mr-2 animate-spin" size={16} />}
              Thanh toán lại
            </Button>
          ) : (
            // Các trường hợp khác: paymentStatus = 1, paymentStatus = 3 có hasNewPendingPayment,
            // hoặc hasNewPendingPayment và BankTransfer => hiển thị nút "Chọn thanh toán"
            <Button
              onClick={handlePaymentComplete}
              disabled={disabled || isLoading}
              className="bg-primary hover:bg-primary/90 px-8 py-2 text-white"
            >
              {isLoading && <Loader2 className="mr-2 animate-spin" size={16} />}
              Chọn thanh toán
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
