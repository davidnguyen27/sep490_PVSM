import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePaymentStore } from "../store/usePaymentStore";
import {
  paymentService,
  type UpdatePaymentPayload,
} from "../services/payment.service";
import type { Payment } from "../types/payment.type";
import { toast } from "sonner";

export function useUpdatePayment({
  onSuccess,
  onError,
}: {
  onSuccess?: (payment: Payment) => void;
  onError?: (error: Error) => void;
} = {}) {
  const queryClient = useQueryClient();
  const setPaymentState = usePaymentStore((state) => state.setPaymentState);

  return useMutation<Payment, Error, UpdatePaymentPayload>({
    mutationFn: paymentService.updatePaymentStatus,
    onMutate: () => {
      setPaymentState({ isPaymentLoading: true, paymentError: null });
    },
    onSuccess: (payment) => {
      setPaymentState({
        paymentId: payment.paymentId,
        isPaymentLoading: false,
      });
      queryClient.invalidateQueries({ queryKey: ["vaccination"] });
      queryClient.invalidateQueries({
        queryKey: ["vaccination", "detail", payment.appointmentDetailId],
      });

      toast.success("Cập nhật trạng thái thanh toán thành công");
      onSuccess?.(payment);
    },
    onError: (error) => {
      setPaymentState({ isPaymentLoading: false, paymentError: error.message });
      toast.error("Cập nhật trạng thái thanh toán thất bại");
      onError?.(error);
    },
  });
}
