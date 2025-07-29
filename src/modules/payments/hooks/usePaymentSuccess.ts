import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { usePaymentStore } from "../store/usePaymentStore";
import { usePaymentMutation } from "../store/usePaymentMutation";

export function usePaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const paymentId = usePaymentStore((state) => state.paymentId);
  const paymentType = usePaymentStore((state) => state.paymentType);
  const updateStatus = usePaymentMutation((state) => state.updateStatus);

  const orderCode = params.get("orderCode");
  const status = params.get("status");
  const code = params.get("code");

  const loading =
    code === "00" && status === "PAID" && !!paymentId && !!paymentType;

  useEffect(() => {
    if (!loading) return;

    const REDIRECT_MAP: Record<NonNullable<typeof paymentType>, string> = {
      vaccination: "/staff/vaccination-appointments",
      microchip: "/staff/microchip-appointments",
      condition: "/staff/condition-appointments",
    };

    const process = async () => {
      try {
        await updateStatus(paymentId!);
        toast.success(`Đơn hàng #${orderCode} đã được xử lý.`);
        setTimeout(() => {
          navigate(REDIRECT_MAP[paymentType!]);
        }, 3000);
      } catch {
        toast.error("Có lỗi xảy ra, vui lòng liên hệ với quản trị viên!");
      }
    };

    process();
  }, [loading, updateStatus, navigate, orderCode, paymentId, paymentType]);

  return { loading };
}
