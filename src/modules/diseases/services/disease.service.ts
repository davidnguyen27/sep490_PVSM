import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { Disease } from "../types/disease.type";
import axiosInstance from "@/lib/axios";
import type { DiseasePayload } from "../types/disease.payload.type";

export const diseaseService = {
  async getAllDiseases(params: {
    pageNumber: number;
    pageSize: number;
    keyWord?: string;
  }): Promise<BaseListResponse<Disease>> {
    return axiosInstance
      .get("/api/Disease/get-all-diseases", { params })
      .then((res) => res.data);
  },

  async getDiseaseById(diseaseId: number | null): Promise<Disease> {
    return axiosInstance
      .get(`/api/Disease/get-disease-by-id/${diseaseId}`)
      .then((res) => (res.data.success ? res.data.data : null));
  },

  async createDisease(diseaseData: DiseasePayload): Promise<Disease> {
    const formData = new FormData();
    formData.append("name", diseaseData.name);
    formData.append("description", diseaseData.description);
    formData.append("species", diseaseData.species);
    formData.append("symptoms", diseaseData.symptoms);
    formData.append("treatment", diseaseData.treatment);

    return axiosInstance
      .post("/api/Disease/create-disease", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => (res.data.success ? res.data.data : null));
  },

  async updateDisease(
    diseaseId: number | null,
    diseaseData: DiseasePayload,
  ): Promise<Disease> {
    const formData = new FormData();
    formData.append("name", diseaseData.name);
    formData.append("description", diseaseData.description);
    formData.append("species", diseaseData.species);
    formData.append("symptoms", diseaseData.symptoms);
    formData.append("treatment", diseaseData.treatment);

    return axiosInstance
      .put(`/api/Disease/update-disease/${diseaseId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => (res.data.success ? res.data.data : null));
  },

  async deleteDisease(
    diseaseId: number | null,
  ): Promise<BaseResponse<Disease>> {
    return axiosInstance
      .delete(`/api/Disease/delete-disease/${diseaseId}`)
      .then((res) => res.data);
  },

  async getDiseaseBySpecies(species: string): Promise<Disease[]> {
    return await axiosInstance
      .get(`/api/Disease/get-disease-by-species/${species}`)
      .then((res) => (res.data.success ? res.data.data : []));
  },
};
