import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import type { PaymentState } from "../types/state.type";

/**
 * Zustand store for managing payment-related state in the Pet Vaccination Management System.
 * Handles payment method, payment ID, loading state, and error state for payment operations.
 */
export const usePaymentStore = create<PaymentState>()(
  devtools(
    immer((set) => ({
      paymentMethod: "cash",
      paymentId: null,
      isPaymentLoading: false,
      paymentError: null,
      qrCode: null,
      setPaymentMethod: (method) =>
        set((state) => {
          state.paymentMethod = method;
        }),
      setPaymentId: (paymentId) =>
        set((state) => {
          state.paymentId = paymentId;
        }),
      setPaymentLoading: (isLoading) =>
        set((state) => {
          state.isPaymentLoading = isLoading;
        }),
      setPaymentError: (error) =>
        set((state) => {
          state.paymentError = error;
        }),
      setPaymentState: (partial) =>
        set((state) => {
          Object.assign(state, partial);
        }),
      setQrCode: (qr) =>
        set((state) => {
          state.qrCode = qr;
        }),
      reset: () =>
        set((state) => {
          state.paymentMethod = "cash";
          state.paymentId = null;
          state.qrCode = null;
          state.isPaymentLoading = false;
          state.paymentError = null;
        }),
    })),
    { name: "payment-store" },
  ),
);
