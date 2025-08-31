import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import type { PaymentState } from "../types/state.type";

export const usePaymentStore = create<PaymentState>()(
  devtools(
    immer((set) => ({
      paymentMethod: "Cash",
      paymentId: null,
      isPaymentLoading: false,
      paymentError: null,
      qrCode: null,
      paymentType: null,
      hasNewPendingPayment: false,
      isPaymentMethodSelected: false,
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
      setHasNewPendingPayment: (hasNew) =>
        set((state) => {
          state.hasNewPendingPayment = hasNew;
        }),
      setIsPaymentMethodSelected: (selected) =>
        set((state) => {
          state.isPaymentMethodSelected = selected;
        }),
      setPaymentState: (partial) =>
        set((state) => {
          Object.assign(state, partial);
        }),
      setQrCode: (qr) =>
        set((state) => {
          state.qrCode = qr;
        }),
      setPaymentType: (type) =>
        set((state) => {
          state.paymentType = type;
        }),
      reset: () =>
        set((state) => {
          state.paymentMethod = "Cash";
          state.paymentId = null;
          state.paymentType = null;
          state.qrCode = null;
          state.isPaymentLoading = false;
          state.paymentError = null;
          state.hasNewPendingPayment = false;
          state.isPaymentMethodSelected = false;
        }),
    })),
    { name: "payment-store" },
  ),
);
