import axiosInstance from "@/lib/axios";
import type { BaseListResponse } from "@/shared/types/api.type";
import type { VaccineDisease } from "../types/vaccine-disease.type";
import type { VaccineDiseasePayload } from "../types/vaccine-disease.payload.type";

export const vaccineDiseaseService = {
  async getAllVaccineDiseases(params: {
    pageSize: number;
    pageNumber: number;
    keyword?: string;
  }): Promise<BaseListResponse<VaccineDisease>> {
    return await axiosInstance
      .get("/api/VaccineDisease/get-all-vaccine-diseases", { params })
      .then((res) => (res.data.success ? res.data : null));
  },

  async createVaccineDisease(
    vaccineDiseasePayload: VaccineDiseasePayload,
  ): Promise<VaccineDisease> {
    const formData = new FormData();

    formData.append(
      "diseaseId",
      vaccineDiseasePayload.diseaseId?.toString() || "",
    );
    formData.append(
      "vaccineId",
      vaccineDiseasePayload.vaccineId?.toString() || "",
    );

    return await axiosInstance
      .post("/api/VaccineDisease/create-vaccine-disease", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => (res.data.success ? res.data.data : null));
  },

  async getVaccineDiseaseById(
    vaccineDiseaseId: number | null,
  ): Promise<VaccineDisease> {
    return await axiosInstance
      .get(`/api/VaccineDisease/get-vaccine-disease-by-id/${vaccineDiseaseId}`)
      .then((res) => res.data.data);
  },

  async getVaccineDiseaseByDisease(
    diseaseId: number | null,
  ): Promise<VaccineDisease[]> {
    return await axiosInstance
      .get(`/api/VaccineDisease/get-vaccine-disease-by-disease-id/${diseaseId}`)
      .then((res) => (res.data.success ? res.data.data : []));
  },

  async updateVaccineDisease(
    vaccineDiseaseId: number | null,
    vaccineDiseasePayload: VaccineDiseasePayload,
  ): Promise<VaccineDisease> {
    const formData = new FormData();

    formData.append(
      "diseaseId",
      vaccineDiseasePayload.diseaseId?.toString() || "",
    );
    formData.append(
      "vaccineId",
      vaccineDiseasePayload.vaccineId?.toString() || "",
    );

    return await axiosInstance
      .put(
        `/api/VaccineDisease/update-vaccine-disease/${vaccineDiseaseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((res) => (res.data.success ? res.data.data : null));
  },

  async deleteVaccineDisease(
    vaccineDiseaseId: number | null,
  ): Promise<VaccineDisease> {
    return await axiosInstance
      .delete(`/api/VaccineDisease/delete-vaccine-disease/${vaccineDiseaseId}`)
      .then((res) => res.data);
  },
};
