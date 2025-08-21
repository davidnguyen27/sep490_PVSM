import axiosInstance from "@/lib/axios";
import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { Faq } from "../types/faq.type";

interface params {
  pageNumber: number;
  pageSize: number;
  keyword?: string;
  status?: number;
}

export const faqService = {
  async getAllFaq(params: params): Promise<BaseListResponse<Faq>> {
    return await axiosInstance
      .get("/api/FAQ/get-all-faqs", { params })
      .then((res) => res.data);
  },

  async getFaqById(faqId: number | null): Promise<Faq> {
    return await axiosInstance
      .get(`/api/FAQ/get-faq-by-id/${faqId}`)
      .then((res) => res.data.data);
  },

  async createFaq(payload: {
    question: string;
    answer: string;
  }): Promise<BaseResponse<Faq>> {
    return await axiosInstance
      .post("/api/FAQ/create-faq", payload)
      .then((res) => res.data);
  },

  async updateFaq(
    faqId: number | null,
    payload: { question: string; answer: string },
  ): Promise<BaseResponse<Faq>> {
    return await axiosInstance
      .put(`/api/FAQ/update-faq/${faqId}`, payload)
      .then((res) => res.data);
  },

  async deleteFaq(faqId: number | null): Promise<BaseResponse<Faq>> {
    return await axiosInstance
      .delete(`/api/FAQ/delete-faq/${faqId}`)
      .then((res) => res.data);
  },
};
