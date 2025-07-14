import type { BaseListResponse } from "@/shared/types/api.type";
import type { Disease } from "../types/disease.type";
import axiosInstance from "@/lib/axios";

export const diseaseService = {
  getAllDiseases: async (params: {
    pageNumber: number;
    pageSize: number;
    keyWord?: string;
  }): Promise<BaseListResponse<Disease>> =>
    axiosInstance
      .get("/api/Disease/get-all-diseases", { params })
      .then((res) => res.data),
};
