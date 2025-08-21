import { useMutation } from "@tanstack/react-query";
import {
  paymentService,
  type PaymentPayload,
} from "../services/payment.service";
import type { BaseResponse } from "@/shared/types/api.type";
import type { Payment } from "../types/payment.type";

export const useRetryPayment = () => {
  return useMutation<BaseResponse<Payment>, Error, PaymentPayload>({
    mutationFn: (payload: PaymentPayload) => {
      console.log("Retrying payment with payload:", payload);
      return paymentService.retryPayment(payload);
    },
    onSuccess: (data) => {
      console.log("Retry payment successful:", data);
    },
    onError: (error) => {
      console.error("Retry payment failed:", error);
    },
  });
};
