import axiosInstance from "@/lib/axios";
import type { BaseListResponse } from "@/shared/types/api.type";
import type { VaccineReceipt } from "../types/vaccine-receipt.type";
import { vaccineReceiptDetailService } from "@/modules/vaccine-receipt-detail/services/vaccine-receipt-detail.service";

// Type for vaccine receipt detail when creating
interface VaccineReceiptDetailPayload {
  vaccineBatchId: number;
  suppiler: string;
  quantity: number;
  vaccineStatus: string;
  notes?: string;
  coldChainLog: {
    logTime: string;
    temperature: number;
    humidity: number;
    event: string;
    notes?: string;
  };
}

// Extended payload for creating vaccine receipt with details
interface VaccineReceiptCreateWithDetailsPayload {
  receiptDate: string;
  details: VaccineReceiptDetailPayload[];
}

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

  async createVaccineReceiptWithDetails(
    payload: VaccineReceiptCreateWithDetailsPayload,
  ): Promise<VaccineReceipt> {
    try {
      // Step 1: Create vaccine receipt
      const receiptResponse = await axiosInstance
        .post("/api/VaccineReceipt/create-vaccine-receipt", {
          receiptDate: payload.receiptDate,
        })
        .then((res) => (res.data.success ? res.data.data : null));

      if (!receiptResponse || !receiptResponse.vaccineReceiptId) {
        throw new Error("Failed to create vaccine receipt");
      }

      // Step 2: Create vaccine receipt details
      const detailPromises = payload.details.map((detail) => {
        const detailPayload = {
          vaccineReceiptId: receiptResponse.vaccineReceiptId,
          vaccineBatchId: detail.vaccineBatchId,
          suppiler: detail.suppiler,
          quantity: detail.quantity,
          vaccineStatus: detail.vaccineStatus,
          notes: detail.notes || "",
          coldChainLog: {
            vaccineBatchId: detail.vaccineBatchId,
            logTime: detail.coldChainLog.logTime,
            temperature: detail.coldChainLog.temperature,
            humidity: detail.coldChainLog.humidity,
            event: detail.coldChainLog.event,
            notes: detail.coldChainLog.notes || "",
          },
        };
        return vaccineReceiptDetailService.createVaccineReceiptDetail(
          detailPayload,
        );
      });

      // Wait for all details to be created
      await Promise.all(detailPromises);

      return receiptResponse;
    } catch (error) {
      console.error("Error creating vaccine receipt with details:", error);
      throw error;
    }
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
