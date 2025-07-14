import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePaymentStore } from "../store/usePaymentStore";
import {
  paymentService,
  type UpdatePaymentPayload,
} from "../services/payment.service";
import type { Payment } from "../types/payment.type";

/**
 * Hook to update payment status using React Query mutation.
 * Manages payment state in usePaymentStore and invalidates related queries on success.
 * @returns Mutation object for updating payment status
 */
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
      queryClient.invalidateQueries({ queryKey: ["appointments"] });

      onSuccess?.(payment); // allow external behavior
    },
    onError: (error) => {
      setPaymentState({ isPaymentLoading: false, paymentError: error.message });
      onError?.(error);
    },
  });
}
