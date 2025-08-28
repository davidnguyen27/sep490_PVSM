import axiosInstance from "@/lib/axios";
import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { Vet } from "../types/vet.type";
import type { VetPayload } from "../types/payload.type";
import type { VetAccount } from "../types/vet-account.type";

export const vetService = {
  async getAllVets(params: {
    pageNumber: number;
    pageSize: number;
    keyword?: string;
  }): Promise<BaseListResponse<Vet>> {
    return await axiosInstance
      .get("/api/Vets/get-all-vets", { params })
      .then((res) => res.data);
  },

  async getVetById(vetId: number): Promise<Vet> {
    return await axiosInstance
      .get(`/api/Vets/get-vet-by-id/${vetId}`)
      .then((res) => res.data.data);
  },

  async createVet(vetAccount: {
    email: string;
    password: string;
    role: number;
  }): Promise<BaseResponse<VetAccount>> {
    return await axiosInstance
      .post("/api/Account/create-vet-account", vetAccount)
      .then((res) => res.data);
  },

  async updateVet(payload: VetPayload): Promise<BaseResponse<Vet>> {
    const formData = new FormData();

    if (payload.vetId !== null && payload.vetId !== undefined) {
      formData.append("vetId", String(payload.vetId));
    }
    formData.append("name", payload.name);
    formData.append("image", payload.image);
    formData.append("specialization", payload.specialization);
    formData.append("dateOfBirth", payload.dateOfBirth);
    formData.append("phoneNumber", payload.phoneNumber);

    return await axiosInstance
      .put("/api/Vets/update-vet", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data);
  },

  async deleteVet(vetId: number): Promise<BaseResponse<Vet>> {
    return await axiosInstance
      .delete(`/api/Vets/delete-vet/${vetId}`)
      .then((res) => res.data);
  },
};
