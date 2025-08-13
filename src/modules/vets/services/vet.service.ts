import axiosInstance from "@/lib/axios";
import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { Vet } from "../types/vet.type";
import type { VetPayload } from "../types/payload.type";

export const vetService = {
  getAllVets: async (params: {
    pageNumber: number;
    pageSize: number;
    keyword?: string;
  }): Promise<BaseListResponse<Vet>> =>
    axiosInstance
      .get("/api/Vets/get-all-vets", { params })
      .then((res) => res.data),

  getVetById: async (vetId: number): Promise<Vet> =>
    axiosInstance
      .get(`/api/Vets/get-vet-by-id/${vetId}`)
      .then((res) => res.data.data),

  createVet: async (payload: VetPayload): Promise<BaseResponse<Vet>> =>
    axiosInstance.post("/api/Vets/create-vet", payload).then((res) => res.data),

  updateVet: async (payload: VetPayload): Promise<BaseResponse<Vet>> =>
    axiosInstance.put("/api/Vets/update-vet", payload).then((res) => res.data),

  deleteVet: async (vetId: number): Promise<BaseResponse<Vet>> =>
    axiosInstance
      .delete(`/api/Vets/delete-vet/${vetId}`)
      .then((res) => res.data),
};
