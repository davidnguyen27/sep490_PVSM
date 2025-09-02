import axiosInstance from "@/lib/axios";
import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { VaccineBatch } from "../types/vaccine-batch.type";
import type { VaccineBatchPayload } from "../types/vaccine-batch.payload.type";

export const vaccineBatchService = {
  async getAllVaccineBatches(params: {
    pageNumber: number;
    pageSize: number;
    keyWord?: string;
  }): Promise<BaseListResponse<VaccineBatch>> {
    return axiosInstance
      .get("/api/VaccineBatch/get-all-vaccine-batches", { params })
      .then((res) => (res.data.success ? res.data : null));
  },

  async getVaccineBatchByVaccine(vaccineId: number): Promise<VaccineBatch> {
    return axiosInstance
      .get(`/api/VaccineBatch/get-vaccine-batch-by-vaccine-id/${vaccineId}`)
      .then((res) => res.data.data);
  },

  async getVaccineBatchById(vaccineBatchId: number): Promise<VaccineBatch> {
    return axiosInstance
      .get(`/api/VaccineBatch/get-vaccine-batch-by-id/${vaccineBatchId}`)
      .then((res) => res.data.data);
  },

  async createVaccineBatch(
    vaccineBatchPayload: VaccineBatchPayload,
  ): Promise<BaseResponse<VaccineBatch>> {
    return axiosInstance
      .post("/api/VaccineBatch/create-vaccine-batch", vaccineBatchPayload)
      .then((res) => res.data);
  },

  async updateVaccineBatch(
    vaccineBatchId: number,
    vaccineBatchPayload: VaccineBatchPayload,
  ): Promise<BaseResponse<VaccineBatch>> {
    return axiosInstance
      .put(
        `/api/VaccineBatch/update-vaccine-batch/${vaccineBatchId}`,
        vaccineBatchPayload,
      )
      .then((res) => res.data);
  },

  async deleteVaccineBatch(
    vaccineBatchId: number,
  ): Promise<BaseResponse<VaccineBatch>> {
    return axiosInstance
      .delete(`/api/VaccineBatch/delete-vaccine-batch/${vaccineBatchId}`)
      .then((res) => res.data);
  },
};
