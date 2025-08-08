import axiosInstance from "@/lib/axios";
import type { VaccineReceiptDetail } from "../types/vaccine-receipt-detal.type";
import type { VaccineReceiptDetailData } from "../types/payload.type";
import type { BaseResponse } from "@/shared/types/api.type";

export const vaccineReceiptDetailService = {
  async getVaccineReceiptDetailByReceiptId(
    receiptId: number,
  ): Promise<VaccineReceiptDetail[]> {
    return await axiosInstance
      .get(
        `api/VaccineReceiptDetail/get-receipt-details-by-receipt-id/${receiptId}`,
      )
      .then((res) => res.data.data);
  },

  async createVaccineReceiptDetail(
    payload: VaccineReceiptDetailData,
  ): Promise<BaseResponse<VaccineReceiptDetail>> {
    return await axiosInstance
      .post("/api/VaccineReceiptDetail/create-receipt-detail", payload)
      .then((res) => res.data);
  },

  async getHistoryReceiptByVaccineBatch(
    vaccineBatchId: number | null,
  ): Promise<VaccineReceiptDetail> {
    return await axiosInstance
      .get(
        `api/VaccineReceiptDetail/get-receipt-details-by-vaccine-batch-id/${vaccineBatchId}`,
      )
      .then((res) => res.data.data);
  },

  async updateVaccineReceiptDetail(
    vaccineReceiptDetailId: number | null,
    payload: VaccineReceiptDetailData,
  ): Promise<BaseResponse<VaccineReceiptDetail>> {
    return await axiosInstance
      .put(
        `/api/VaccineReceiptDetail/update-receipt-detail/${vaccineReceiptDetailId}`,
        payload,
      )
      .then((res) => res.data);
  },

  async deleteVaccineReceiptDetail(
    vaccineReceiptDetailId: number | null,
  ): Promise<BaseResponse<VaccineReceiptDetail>> {
    return await axiosInstance
      .delete(
        `/api/VaccineReceiptDetail/delete-receipt-detail/${vaccineReceiptDetailId}`,
      )
      .then((res) => res.data);
  },
};
