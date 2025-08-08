import axiosInstance from "@/lib/axios";
import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { Vaccine } from "../types/vaccine.type";
import type { VaccinePayload } from "../types/vaccine.payload.type";

export const vaccineService = {
  async getAllVaccines(params: {
    pageNumber: number;
    pageSize: number;
    keyWord: string;
  }): Promise<BaseListResponse<Vaccine>> {
    return axiosInstance
      .get("/api/Vaccine/get-all-vaccines", { params })
      .then((res) => (res.data.success ? res.data : null));
  },

  async getVaccineById(vaccineId: number): Promise<Vaccine> {
    return axiosInstance
      .get(`/api/Vaccine/get-vaccine-by-id/${vaccineId}`)
      .then((res) => res.data.data);
  },

  async createVaccine(
    vaccineData: VaccinePayload,
  ): Promise<BaseResponse<Vaccine>> {
    const formData = new FormData();

    formData.append("name", vaccineData.name);
    formData.append("description", vaccineData.description);
    formData.append("price", vaccineData.price.toString());
    if (vaccineData.image) {
      formData.append("image", vaccineData.image);
    }
    formData.append("notes", vaccineData.notes);

    return axiosInstance
      .post("/api/Vaccine/create-vaccine", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => (res.data.success ? res.data : null));
  },

  async updateVaccine(
    vaccineData: VaccinePayload,
    vaccineId: number | null,
  ): Promise<BaseResponse<Vaccine>> {
    const formData = new FormData();

    formData.append("name", vaccineData.name);
    formData.append("description", vaccineData.description);
    formData.append("price", vaccineData.price.toString());
    formData.append("notes", vaccineData.notes);

    // Handle image - only append if it's a File (new upload)
    if (vaccineData.image instanceof File) {
      formData.append("image", vaccineData.image);
    } else if (typeof vaccineData.image === "string") {
      // Keep existing image URL - backend should handle this
      formData.append("imageUrl", vaccineData.image);
    }

    return axiosInstance
      .put(`/api/Vaccine/update-vaccine/${vaccineId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => (res.data.success ? res.data.data : null));
  },

  async deleteVaccine(vaccineId: number): Promise<BaseResponse<Vaccine>> {
    return axiosInstance
      .delete(`/api/Vaccine/delete-vaccine/${vaccineId}`)
      .then((res) => res.data);
  },

  async getVaccineByDisease(diseaseId: number): Promise<Vaccine> {
    return axiosInstance
      .get(`/api/Vaccine/get-vaccine-by-disease-id/${diseaseId}`)
      .then((res) => res.data.data);
  },
};
