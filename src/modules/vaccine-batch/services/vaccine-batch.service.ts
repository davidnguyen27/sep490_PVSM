import axiosInstance from "@/lib/axios";
import type { BaseListResponse } from "@/shared/types/api.type";
import type { VaccineBatch } from "../types/vaccine-batch.type";

export const vaccineBatchService = {
  getAllVaccineBatches: async (params: {
    pageNumber: number;
    pageSize: number;
    keyWord?: string;
  }): Promise<BaseListResponse<VaccineBatch>> =>
    axiosInstance
      .get("/api/VaccineBatch/get-all-vaccine-batches", { params })
      .then((res) => res.data),

  getVaccineBatchByVaccine: async (vaccineId: number): Promise<VaccineBatch> =>
    axiosInstance
      .get(`/api/VaccineBatch/get-vaccine-batch-by-vaccine-id/${vaccineId}`)
      .then((res) => res.data.data),

  getVaccineBatchById: async (vaccineBatchId: number): Promise<VaccineBatch> =>
    axiosInstance
      .get(`/api/VaccineBatch/get-vaccine-batch-by-id/${vaccineBatchId}`)
      .then((res) => res.data.data),
};
