import {
  paymentService,
  type PaymentPayload,
} from "../services/payment.service";

// Enhanced PaymentPayload with return URLs for PayOS integration
export interface EnhancedPaymentPayload {
  appointmentDetailId: number | null;
  customerId: number | null;
  vaccineBatchId?: number | null;
  microchipItemId?: number | null;
  healthConditionId?: number | null;
  paymentMethod: number;
  returnUrl?: string;
  cancelUrl?: string;
}

// Hook for creating payment with custom return URLs
export function useCreatePaymentWithUrls() {
  const baseUrl = window.location.origin;

  const createPaymentWithUrls = (payload: PaymentPayload) => {
    const enhancedPayload: EnhancedPaymentPayload = {
      ...payload,
      returnUrl: `${baseUrl}/staff/vaccination-appointments/success`,
      cancelUrl: `${baseUrl}/staff/vaccination-appointments/cancel`,
    };

    return paymentService.createPayment(enhancedPayload);
  };

  return { createPaymentWithUrls };
}
