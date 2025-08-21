import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUpdatePayment } from "@/modules/payments/hooks";
import { PageLoader } from "@/components/shared";

export default function ConditionPaymentCancelPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const { mutateAsync: updatePaymentStatus } = useUpdatePayment();

  useEffect(() => {
    const handlePaymentCancel = async () => {
      try {
        // Parse URL parameters
        const searchParams = new URLSearchParams(location.search);
        const orderCode = searchParams.get("orderCode");
        const cancel = searchParams.get("cancel");

        console.log("ConditionPaymentCancel - URL params:", {
          orderCode,
          cancel,
          fullSearch: location.search,
        });

        // Validate parameters
        if (!orderCode || cancel !== "true") {
          console.error("Invalid payment cancel parameters");
          toast.error("Thông tin hủy thanh toán không hợp lệ");
          navigate("/condition-appointments");
          return;
        }

        // Extract appointmentDetailId from orderCode
        // OrderCode format should be: appointmentDetailId (or with prefix)
        const appointmentDetailId = parseInt(orderCode);

        if (isNaN(appointmentDetailId) || appointmentDetailId <= 0) {
          console.error(
            "Invalid appointmentDetailId from orderCode:",
            orderCode,
          );
          toast.error("Mã đơn hàng không hợp lệ");
          navigate("/condition-appointments");
          return;
        }

        console.log(
          "Processing payment cancellation for appointmentDetailId:",
          appointmentDetailId,
        );

        // Update payment status to cancelled (status = 3)
        await updatePaymentStatus({
          paymentStatus: 3, // Cancelled
          paymentId: appointmentDetailId, // Using appointmentDetailId as paymentId
        });

        console.log("Payment status updated to cancelled successfully");

        toast.success("Thanh toán đã được hủy thành công");

        // Redirect to appointment detail page
        navigate(`/condition-appointments/${appointmentDetailId}`);
      } catch (error) {
        console.error("Error handling payment cancellation:", error);
        toast.error("Có lỗi xảy ra khi hủy thanh toán");
        navigate("/condition-appointments");
      } finally {
        setIsProcessing(false);
      }
    };

    handlePaymentCancel();
  }, [location.search, navigate, updatePaymentStatus]);

  if (isProcessing) {
    return <PageLoader>Đang xử lý hủy thanh toán...</PageLoader>;
  }

  return null;
}
