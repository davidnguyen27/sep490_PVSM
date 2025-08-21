import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useDetailPayment } from "@/modules/payments/hooks/useDetailPayment";
import { useUpdatePayment } from "@/modules/payments/hooks/useUpdatePayment";
import { usePaymentStore } from "@/modules/payments/store/usePaymentStore";

export default function MicrochipPaymentCancelPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);

  // Extract payment parameters from URL
  const orderCode = params.get("orderCode");
  const status = params.get("status");
  const code = params.get("code");
  const cancel = params.get("cancel");
  const id = params.get("id");
  const appointmentDetailId = orderCode ? Number(orderCode) : null;

  // Get payment details using appointmentDetailId
  const {
    data: paymentData,
    isLoading: isLoadingPayment,
    error: paymentError,
  } = useDetailPayment(appointmentDetailId);

  // Handle array response from API - get first element if array
  const actualPaymentData =
    Array.isArray(paymentData) && paymentData.length > 0
      ? paymentData[0]
      : paymentData;
  const actualPaymentId = actualPaymentData?.paymentId;

  // Clear payment store when payment is cancelled
  const { reset } = usePaymentStore();

  // Get stored paymentId as fallback
  const storedPaymentId = usePaymentStore((state) => state.paymentId);

  // Use the available paymentId (priority: API data > stored > null)
  const effectivePaymentId = actualPaymentId || storedPaymentId;

  // Hook để update payment status
  const updatePayment = useUpdatePayment({
    onSuccess: () => {
      setIsUpdating(false);
      toast.success("Đã cập nhật trạng thái thanh toán hủy.");

      // Navigate back to microchip list after 2 seconds
      setTimeout(() => {
        navigate("/staff/microchip-appointments");
      }, 2000);
    },
    onError: () => {
      setIsUpdating(false);
      toast.error("Có lỗi khi cập nhật trạng thái thanh toán.");
    },
  });

  // Validate cancellation parameters
  const hasBasicParams =
    (code === "00" || !code) &&
    (status === "CANCELLED" || cancel === "true") &&
    appointmentDetailId !== null;

  const isValidCancellation = hasBasicParams && effectivePaymentId !== null;

  // Show loading while fetching payment data
  const isWaitingForPaymentData =
    hasBasicParams && isLoadingPayment && !effectivePaymentId;

  useEffect(() => {
    if (
      isValidCancellation &&
      !isUpdating &&
      !hasProcessed &&
      effectivePaymentId
    ) {
      setIsUpdating(true);
      setHasProcessed(true);

      // Update payment status to cancelled
      updatePayment.mutate({
        paymentId: effectivePaymentId,
        paymentStatus: 3,
      });

      // Clear payment data from store
      reset();
    } else if (!hasBasicParams && !hasProcessed) {
      // Invalid basic parameters
      toast.error("Thông tin hủy thanh toán không hợp lệ.");
      setHasProcessed(true);
    } else if (
      hasBasicParams &&
      !isLoadingPayment &&
      !effectivePaymentId &&
      !hasProcessed
    ) {
      // Valid basic params but no payment found after loading
      if (paymentError) {
        toast.error(`API Error: ${paymentError.message || "Unknown error"}`);
      } else {
        toast.error("Không tìm thấy thông tin thanh toán cho lịch hẹn này.");
      }
      setHasProcessed(true);
    }
  }, [
    isValidCancellation,
    hasBasicParams,
    reset,
    updatePayment,
    effectivePaymentId,
    isUpdating,
    isLoadingPayment,
    appointmentDetailId,
    paymentData,
    paymentError,
    hasProcessed,
  ]);

  const handleBackToAppointments = () => {
    navigate("/staff/microchip-appointments");
  };

  const handleRetryPayment = () => {
    if (appointmentDetailId) {
      // Navigate back to the appointment detail with the payment step
      navigate(
        `/staff/microchip-appointments/detail/${appointmentDetailId}?step=payment`,
      );
    } else {
      navigate("/staff/microchip-appointments");
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-600">
            Thanh toán đã bị hủy
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {(isUpdating || isWaitingForPaymentData) && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-blue-600">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                <span>
                  {isUpdating
                    ? "Đang cập nhật trạng thái thanh toán..."
                    : "Đang tải thông tin thanh toán..."}
                </span>
              </div>
            </div>
          )}

          {!isWaitingForPaymentData && isValidCancellation ? (
            <>
              <div className="text-center text-gray-600">
                <p className="mb-2">
                  Giao dịch thanh toán cho lịch hẹn cấy chip đã bị hủy.
                </p>
                {appointmentDetailId && (
                  <p className="text-sm">
                    Mã lịch hẹn:{" "}
                    <span className="font-medium">#{appointmentDetailId}</span>
                  </p>
                )}
                {id && (
                  <p className="text-sm">
                    Mã giao dịch: <span className="font-medium">{id}</span>
                  </p>
                )}
              </div>

              <div className="rounded-lg bg-yellow-50 p-4">
                <h3 className="mb-2 font-medium text-yellow-800">
                  Lưu ý quan trọng:
                </h3>
                <ul className="space-y-1 text-sm text-yellow-700">
                  <li>• Lịch hẹn vẫn được giữ nguyên trong hệ thống</li>
                  <li>• Bạn có thể thực hiện thanh toán lại bất cứ lúc nào</li>
                  <li>• Vui lòng liên hệ nhân viên nếu cần hỗ trợ</li>
                </ul>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  onClick={handleRetryPayment}
                  disabled={isUpdating}
                  className="bg-primary hover:bg-primary/90 text-white disabled:opacity-50"
                >
                  Thử thanh toán lại
                </Button>

                <Button
                  onClick={handleBackToAppointments}
                  disabled={isUpdating}
                  variant="outline"
                  className="flex items-center gap-2 disabled:opacity-50"
                >
                  <ArrowLeft size={16} />
                  Quay lại danh sách
                </Button>
              </div>
            </>
          ) : !isWaitingForPaymentData ? (
            <>
              <div className="text-center text-gray-600">
                <p className="mb-4">
                  {!hasBasicParams
                    ? "Thông tin hủy thanh toán không hợp lệ hoặc không đầy đủ."
                    : "Không tìm thấy thông tin thanh toán."}
                </p>
                <div className="text-sm text-gray-500">
                  <p>Các thông số nhận được:</p>
                  <ul className="mt-2 space-y-1">
                    <li>Code: {code || "Không có"}</li>
                    <li>Status: {status || "Không có"}</li>
                    <li>Order Code: {orderCode || "Không có"}</li>
                    <li>Cancel: {cancel || "Không có"}</li>
                    <li>Transaction ID: {id || "Không có"}</li>
                    <li>Payment ID: {effectivePaymentId || "Không có"}</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleBackToAppointments}
                  disabled={isUpdating}
                  variant="outline"
                  className="flex items-center gap-2 disabled:opacity-50"
                >
                  <ArrowLeft size={16} />
                  Quay lại danh sách
                </Button>
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
