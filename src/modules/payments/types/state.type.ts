export interface PaymentState {
  paymentMethod: "cash" | "transfer";
  paymentId: number | null;
  isPaymentLoading: boolean;
  paymentError: string | null;
  qrCode: string | null;
  setQrCode: (qr: string | null) => void;
  setPaymentMethod: (method: "cash" | "transfer") => void;
  setPaymentId: (paymentId: number | null) => void;
  setPaymentLoading: (isLoading: boolean) => void;
  setPaymentError: (error: string | null) => void;
  reset: () => void;
  setPaymentState: (partial: Partial<PaymentState>) => void;
}
