import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { Pet } from "../types/pet.type";
import axiosInstance from "@/lib/axios";
import type { PetPayload } from "../types/payload.type";

export const petService = {
  getAllPets: async (params: {
    pageNumber: number;
    pageSize: number;
    keyWord?: string;
    gender?: string;
    species?: string;
  }): Promise<BaseListResponse<Pet>> =>
    axiosInstance
      .get("/api/Pets/get-all-pets", { params })
      .then((res) => res.data),

  getPetById: async (petId: string): Promise<Pet | null> =>
    axiosInstance
      .get(`/api/Pets/get-pet-by-id/${petId}`)
      .then((res) => res.data.data),

  updatePet: async (
    payload: PetPayload,
    petId: string,
  ): Promise<BaseResponse<Pet>> =>
    axiosInstance
      .put(`/api/Pets/update-pet/${petId}`, payload)
      .then((res) => res.data),

  deletePet: async (petId: number): Promise<BaseResponse<Pet>> =>
    axiosInstance
      .delete(`/api/Pets/delete-pet/${petId}`)
      .then((res) => res.data),
};
