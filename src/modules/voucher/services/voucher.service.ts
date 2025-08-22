import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { Voucher } from "./../types/voucher.type";
import axiosInstance from "@/lib/axios";
import type { VoucherPayload } from "../types/voucher.payload.type";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
  status?: boolean;
}

export const voucherService = {
  async getCustomerVoucherByCustomerId(
    voucherId: number | null,
  ): Promise<Voucher> {
    return axiosInstance
      .get(`/api/Voucher/get-voucher-by-id/${voucherId}`)
      .then((res) => (res.data.success ? res.data.data : null));
  },

  async getAllVouchers(params: Params): Promise<BaseListResponse<Voucher>> {
    return await axiosInstance
      .get("/api/Voucher/get-all-vouchers", { params })
      .then((res) => (res.data.success ? res.data : null));
  },

  async getVoucherById(voucherId: number | null): Promise<Voucher> {
    return await axiosInstance
      .get(`/api/Voucher/get-voucher-by-id/${voucherId}`)
      .then((res) => res.data.data);
  },

  async createVoucher(
    voucherData: VoucherPayload,
  ): Promise<BaseResponse<Voucher>> {
    return await axiosInstance
      .post("/api/Voucher/create-voucher", voucherData)
      .then((res) => res.data);
  },

  async updateVoucher(
    voucherId: number | null,
    voucherData: VoucherPayload,
  ): Promise<BaseResponse<Voucher>> {
    return await axiosInstance
      .put(`/api/Voucher/update-voucher/${voucherId}`, voucherData)
      .then((res) => res.data);
  },

  async deleteVoucher(
    voucherId: number | null,
  ): Promise<BaseResponse<Voucher>> {
    return await axiosInstance
      .delete(`/api/Voucher/delete-voucher/${voucherId}`)
      .then((res) => res.data);
  },
};
