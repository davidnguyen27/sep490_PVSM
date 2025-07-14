import axiosInstance from "@/lib/axios";
import type { Payment } from "../types/payment.type";
import type { BaseResponse } from "@/shared/types/api.type";

export interface PaymentPayload {
  appointmentDetailId: number | null;
  customerId: number | null;
  vaccineBatchId?: number | null;
  microchipItemId?: number | null;
  paymentMethod: number;
}

export interface UpdatePaymentPayload {
  paymentStatus: 1 | 2 | 3;
  paymentId: number;
}

export const paymentService = {
  // Create a new payment
  async createPayment(payload: PaymentPayload): Promise<BaseResponse<Payment>> {
    return await axiosInstance
      .post("/api/Payment/create", payload)
      .then((res) => res.data);
  },

  // Update payment status and appointment status
  async updatePaymentStatus(payload: UpdatePaymentPayload): Promise<Payment> {
    return await axiosInstance
      .post("/api/Payment/paymen-callback", payload)
      .then((res) => res.data);
  },
};
