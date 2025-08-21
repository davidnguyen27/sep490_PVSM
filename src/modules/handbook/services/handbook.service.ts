import axiosInstance from "@/lib/axios";
import type { Handbook } from "../types/handbook.type";
import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { HandbookPayload } from "../types/handbook.payload.type";

interface params {
  pageNumber: number;
  pageSize: number;
  keyword?: string;
  status?: boolean;
}

export const handbookService = {
  async getAllHandbooks(params: params): Promise<BaseListResponse<Handbook>> {
    return await axiosInstance
      .get("/api/Handbook/get-all-handbooks", { params })
      .then((res) => res.data);
  },

  async getHandbookById(handbookId: number | null): Promise<Handbook> {
    return await axiosInstance
      .get(`/api/Handbook/get-handbook-by-id/${handbookId}`)
      .then((res) => res.data.data);
  },

  async createHandbook(
    payload: HandbookPayload,
  ): Promise<BaseResponse<Handbook>> {
    const formData = new FormData();

    formData.append("title", payload.title);
    formData.append("introduction", payload.introduction);
    formData.append("highlight", payload.highlight);
    formData.append("content", payload.content);
    formData.append("importantNote", payload.importantNote);
    formData.append("imageUrl", payload.imageUrl);

    return await axiosInstance
      .post("/api/Handbook/create-handbook", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  },

  async updateHandbook(
    handbookId: number | null,
    payload: HandbookPayload,
  ): Promise<BaseResponse<Handbook>> {
    const formData = new FormData();

    formData.append("title", payload.title);
    formData.append("introduction", payload.introduction);
    formData.append("highlight", payload.highlight);
    formData.append("content", payload.content);
    formData.append("importantNote", payload.importantNote);
    formData.append("imageUrl", payload.imageUrl);

    return await axiosInstance
      .put(`/api/Handbook/update-handbook/${handbookId}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  },

  async deleteHandbook(
    handbookId: number | null,
  ): Promise<BaseResponse<Handbook>> {
    return await axiosInstance
      .delete(`/api/Handbook/delete-handbook/${handbookId}`)
      .then((res) => res.data);
  },
};
