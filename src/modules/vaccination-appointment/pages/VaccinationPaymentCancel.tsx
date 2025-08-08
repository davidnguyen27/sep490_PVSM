import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { usePaymentStore } from "@/modules/payments/store/usePaymentStore";
import { useUpdatePayment } from "@/modules/payments/hooks/useUpdatePayment";

export default function VaccinationPaymentCancelPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  // Extract payment parameters from URL
  const orderCode = params.get("orderCode");
  const status = params.get("status");
  const code = params.get("code");
  const cancel = params.get("cancel");
  const id = params.get("id");
  const paymentId = id ? Number(id) : null;
  const appointmentDetailId = orderCode ? Number(orderCode) : null;

  // Clear payment store when payment is cancelled
  const { reset } = usePaymentStore();

  // Hook để update payment status
  const updatePayment = useUpdatePayment({
    onSuccess: () => {
      setIsUpdating(false);
      toast.success("Đã cập nhật trạng thái thanh toán hủy.");
    },
    onError: (error) => {
      setIsUpdating(false);
      console.error("Failed to update payment status:", error);
      toast.error("Có lỗi khi cập nhật trạng thái thanh toán.");
    },
  });

  // Validate cancellation parameters
  const isValidCancellation =
    code === "00" &&
    status === "CANCELLED" &&
    cancel === "true" &&
    appointmentDetailId !== null &&
    paymentId !== null;

  useEffect(() => {
    console.log("Payment Cancel Page - URL params:", {
      code,
      status,
      cancel,
      paymentId,
      appointmentDetailId,
      isValidCancellation,
    });

    if (isValidCancellation && !isUpdating) {
      setIsUpdating(true);

      console.log(
        "Updating payment status to cancelled for paymentId:",
        paymentId,
      );

      // Update payment status to 3 (cancelled)
      updatePayment.mutate({
        paymentId: paymentId!,
        paymentStatus: 3, // 3 = Cancelled status
      });

      // Clear payment data from store
      reset();

      // Show cancellation message
      toast.error("Thanh toán đã bị hủy bởi người dùng.");
    } else if (!isValidCancellation) {
      // Invalid parameters
      toast.error("Thông tin hủy thanh toán không hợp lệ.");
    }
  }, [
    isValidCancellation,
    reset,
    updatePayment,
    paymentId,
    isUpdating,
    code,
    status,
    cancel,
    appointmentDetailId,
  ]);

  const handleBackToAppointments = () => {
    navigate("/staff/vaccination-appointments");
  };

  const handleRetryPayment = () => {
    if (appointmentDetailId) {
      // Navigate back to the appointment detail with the payment step
      navigate(
        `/staff/vaccination-appointments/detail/${appointmentDetailId}?step=payment`,
      );
    } else {
      navigate("/staff/vaccination-appointments");
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
          {isUpdating && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-blue-600">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                <span>Đang cập nhật trạng thái thanh toán...</span>
              </div>
            </div>
          )}

          {isValidCancellation ? (
            <>
              <div className="text-center text-gray-600">
                <p className="mb-2">
                  Giao dịch thanh toán cho lịch hẹn tiêm chủng đã bị hủy.
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
          ) : (
            <>
              <div className="text-center text-gray-600">
                <p className="mb-4">
                  Thông tin hủy thanh toán không hợp lệ hoặc không đầy đủ.
                </p>
                <div className="text-sm text-gray-500">
                  <p>Các thông số nhận được:</p>
                  <ul className="mt-2 space-y-1">
                    <li>Code: {code || "Không có"}</li>
                    <li>Status: {status || "Không có"}</li>
                    <li>Order Code: {orderCode || "Không có"}</li>
                    <li>Cancel: {cancel || "Không có"}</li>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
