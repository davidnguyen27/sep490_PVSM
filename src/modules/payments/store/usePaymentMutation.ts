import { create } from "zustand";
import { paymentService } from "../services/payment.service";

interface PaymentMutationState {
  updateStatus: (paymentId: number | null) => Promise<void>;
}

export const usePaymentMutation = create<PaymentMutationState>(() => ({
  updateStatus: async (paymentId: number | null) => {
    if (paymentId === null) return;

    await paymentService.updatePaymentStatus({
      paymentStatus: 2,
      paymentId,
    });
  },
}));
