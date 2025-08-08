import axiosInstance from "@/lib/axios";
import type { BaseListResponse } from "@/shared/types/api.type";
import type { VaccineReceipt } from "../types/vaccine-receipt.type";

export const vaccineReceiptService = {
  async getAllVaccineReceipts(params: {
    pageNumber: number;
    pageSize: number;
    keyword?: string;
  }): Promise<BaseListResponse<VaccineReceipt>> {
    return axiosInstance
      .get("/api/VaccineReceipt/get-all-vaccine-receipts", { params })
      .then((res) => (res.data.success ? res.data : null));
  },

  async createVaccineReceipt(payload: {
    receiptDate: string;
  }): Promise<VaccineReceipt> {
    return axiosInstance
      .post("/api/VaccineReceipt/create-vaccine-receipt", payload)
      .then((res) => (res.data.success ? res.data.data : null));
  },

  async getVaccineReceiptById(
    vaccineReceiptId: number | null,
  ): Promise<VaccineReceipt> {
    return axiosInstance
      .get(`/api/VaccineReceipt/get-vaccine-receipt-by-id/${vaccineReceiptId}`)
      .then((res) => (res.data.success ? res.data.data : null));
  },

  async updateVaccineReceipt(
    vaccineReceiptId: number,
    payload: {
      receiptDate: string;
    },
  ): Promise<VaccineReceipt> {
    return axiosInstance
      .put(
        `/api/VaccineReceipt/update-vaccine-receipt/${vaccineReceiptId}`,
        payload,
      )
      .then((res) => (res.data.success ? res.data.data : null));
  },

  async deleteVaccineReceipt(
    vaccineReceiptId: number,
  ): Promise<VaccineReceipt> {
    return await axiosInstance
      .delete(`/api/VaccineReceipt/delete-vaccine-receipt/${vaccineReceiptId}`)
      .then((res) => res.data);
  },
};
