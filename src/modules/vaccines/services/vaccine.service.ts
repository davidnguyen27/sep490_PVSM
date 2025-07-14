import axiosInstance from "@/lib/axios";
import type { BaseListResponse } from "@/shared/types/api.type";
import type { Vaccine } from "../types/vaccine.type";

export const vaccineService = {
  getAllVaccines: async (params: {
    pageNumber: number;
    pageSize: number;
    keyWord: string;
  }): Promise<BaseListResponse<Vaccine>> =>
    axiosInstance
      .get("/api/Vaccine/get-all-vaccines", { params })
      .then((res) => (res.data.success ? res.data : null)),

  getVaccineById: async (vaccineId: number): Promise<Vaccine> =>
    axiosInstance
      .get(`/api/Vaccine/get-vaccine-by-id/${vaccineId}`)
      .then((res) => res.data.data),

  getVaccineByDisease: async (diseaseId: number): Promise<Vaccine> =>
    axiosInstance
      .get(`/api/Vaccine/get-vaccine-by-disease-id/${diseaseId}`)
      .then((res) => res.data.data),
};
