import axiosInstance from "@/lib/axios";
import type { Payment } from "../types/payment.type";
import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";

export interface PaymentPayload {
  appointmentDetailId: number | null;
  customerId: number | null;
  vaccineBatchId?: number | null;
  voucherCode?: string | null;
  microchipItemId?: number | null;
  healthConditionId?: number | null;
  paymentMethod: number;
}

export interface UpdatePaymentPayload {
  paymentStatus: number;
  paymentId: number;
}

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
  status?: boolean;
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
      .post("/api/Payment/payment-callback", payload)
      .then((res) => res.data);
  },

  async getPaymentByAppointment(
    appointmentDetailId: number | null,
  ): Promise<Payment> {
    return await axiosInstance
      .get(`/api/Payment/get-by-appointment-detail-id/${appointmentDetailId}`)
      .then((res) => res.data.data);
  },

  async getAllPayments(params: Params): Promise<BaseListResponse<Payment>> {
    return await axiosInstance
      .get("/api/Payment/get-all", { params })
      .then((res) => (res.data.success ? res.data : null));
  },

  async deletePayment(paymentId: number | null): Promise<Payment> {
    return await axiosInstance
      .delete(`/api/Payment/delete/${paymentId}`)
      .then((res) => res.data);
  },

  async getPaymentById(paymentId: number | null): Promise<Payment> {
    return await axiosInstance
      .get(`/api/Payment/get-by-id/${paymentId}`)
      .then((res) => res.data.data);
  },

  async retryPayment(payload: PaymentPayload): Promise<BaseResponse<Payment>> {
    return await axiosInstance
      .post("/api/Payment/retry-payment", payload)
      .then((res) => res.data);
  },
};
