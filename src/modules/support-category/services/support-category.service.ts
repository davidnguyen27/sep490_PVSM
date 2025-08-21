import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { SupportCategory } from "../types/support-category.type";
import axiosInstance from "@/lib/axios";
import type { SupportCategoryPayload } from "../types/support-category.payload.type";

interface params {
  pageNumber: number;
  pageSize: number;
  keyword?: string;
  status?: boolean;
}

export const supportCategoryService = {
  async getAllSupportCategories(
    params: params,
  ): Promise<BaseListResponse<SupportCategory>> {
    return await axiosInstance
      .get("/api/SupportCategory/get-all-support-categories", { params })
      .then((res) => res.data);
  },

  async getSupportCategoryById(
    supportCategoryId: number | null,
  ): Promise<SupportCategory> {
    return await axiosInstance
      .get(
        `/api/SupportCategory/get-support-category-by-id/${supportCategoryId}`,
      )
      .then((res) => res.data.data);
  },

  async createSupportCategory(
    payload: SupportCategoryPayload,
  ): Promise<BaseResponse<SupportCategory>> {
    return await axiosInstance
      .post("/api/SupportCategory/create-support-category", payload)
      .then((res) => res.data);
  },

  async updateSupportCategory(
    supportCategoryId: number | null,
    payload: SupportCategoryPayload,
  ): Promise<BaseResponse<SupportCategory>> {
    return await axiosInstance
      .put(
        `/api/SupportCategory/update-support-category/${supportCategoryId}`,
        payload,
      )
      .then((res) => res.data);
  },

  async deleteSupportCategory(
    supportCategoryId: number | null,
  ): Promise<BaseResponse<SupportCategory>> {
    return await axiosInstance
      .delete(
        `/api/SupportCategory/delete-support-category/${supportCategoryId}`,
      )
      .then((res) => res.data);
  },
};
