export interface PaymentState {
  paymentMethod: "Cash" | "BankTransfer";
  paymentId: number | null;
  isPaymentLoading: boolean;
  paymentError: string | null;
  qrCode: string | null;
  paymentType: "vaccination" | "microchip" | "condition" | null;
  hasNewPendingPayment: boolean; // For retry payment flow
  isPaymentMethodSelected: boolean; // Track if payment method has been selected
  setQrCode: (qr: string | null) => void;
  setPaymentMethod: (method: "Cash" | "BankTransfer") => void;
  setPaymentId: (paymentId: number | null) => void;
  setPaymentLoading: (isLoading: boolean) => void;
  setPaymentError: (error: string | null) => void;
  setHasNewPendingPayment: (hasNew: boolean) => void;
  setIsPaymentMethodSelected: (selected: boolean) => void;
  reset: () => void;
  setPaymentState: (partial: Partial<PaymentState>) => void;
  setPaymentType: (type: "vaccination" | "microchip" | "condition") => void;
}
