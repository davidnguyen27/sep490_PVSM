import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { useDetailPayment } from "@/modules/payments/hooks/useDetailPayment";
import { useUpdatePayment } from "@/modules/payments/hooks/useUpdatePayment";
import { usePaymentStore } from "@/modules/payments/store/usePaymentStore";

export default function ConditionPaymentSuccessPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // Extract payment parameters from URL
  const orderCode = params.get("orderCode");
  const status = params.get("status");
  const code = params.get("code");
  const appointmentDetailId = orderCode ? Number(orderCode) : null;

  // Validate payment parameters
  const isValidPayment =
    code === "00" && status === "PAID" && appointmentDetailId !== null;

  // Get payment details
  const { data: paymentData, isLoading: isLoadingPayment } =
    useDetailPayment(appointmentDetailId);

  const { mutate: updatePaymentStatus, isPending: isUpdatingPayment } =
    useUpdatePayment({
      onSuccess: (payment) => {
        const paymentIdText = payment?.paymentId
          ? `#${payment.paymentId}`
          : paymentData && Array.isArray(paymentData) && paymentData.length > 0
            ? `#${paymentData[0].paymentId}`
            : "";

        toast.success(
          `Đơn cấp chứng nhận ${paymentIdText} đã thanh toán thành công.`,
        );

        setTimeout(() => {
          navigate("/staff/condition-appointments");
        }, 3000);
      },
      onError: () => {
        toast.error(
          "Cập nhật trạng thái thanh toán thất bại. Vui lòng liên hệ quản trị viên.",
        );

        setTimeout(() => {
          navigate("/staff/condition-appointments");
        }, 5000);
      },
    });

  const isLoading = isValidPayment && (isLoadingPayment || isUpdatingPayment);

  // Handle invalid payment parameters
  useEffect(() => {
    if (!isValidPayment) {
      if (code !== "00" || status !== "PAID") {
        toast.error("Thanh toán không thành công. Vui lòng thử lại.");
      } else if (!appointmentDetailId) {
        toast.error(
          "Không tìm thấy mã cuộc hẹn trong orderCode. Vui lòng liên hệ quản trị viên.",
        );
      }

      setTimeout(() => {
        navigate("/staff/condition-appointments");
      }, 3000);
    }
  }, [isValidPayment, code, status, appointmentDetailId, navigate]);

  // Process payment update when data is available
  useEffect(() => {
    if (
      !isValidPayment ||
      !paymentData ||
      !Array.isArray(paymentData) ||
      paymentData.length === 0
    ) {
      return;
    }

    const payment = paymentData[0];

    if (!payment.paymentId) {
      return;
    }

    const timer = setTimeout(() => {
      const paymentStore = usePaymentStore.getState();
      paymentStore.setPaymentId(payment.paymentId);
      paymentStore.setPaymentType("condition");

      updatePaymentStatus({
        paymentId: payment.paymentId,
        paymentStatus: 2,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [isValidPayment, paymentData, updatePaymentStatus]);

  if (!isValidPayment && !isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <p className="text-muted-foreground">
          Đang xử lý yêu cầu, vui lòng đợi...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
      <Loader2 className="text-primary h-8 w-8 animate-spin" />
      {isLoadingPayment ? (
        <p className="text-muted-foreground text-sm">
          Đang tải thông tin thanh toán...
        </p>
      ) : isUpdatingPayment ? (
        <p className="text-muted-foreground text-sm">
          Đang cập nhật trạng thái thanh toán...
        </p>
      ) : (
        <p className="text-muted-foreground text-sm">
          Đang xác nhận thanh toán...
        </p>
      )}
    </div>
  );
}
