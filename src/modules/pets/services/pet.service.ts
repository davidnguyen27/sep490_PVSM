import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { Pet } from "../types/pet.type";
import axiosInstance from "@/lib/axios";
import type { PetPayload, PetCreatePayload } from "../types/payload.type";

export const petService = {
  async getAllPets(params: {
    pageNumber: number;
    pageSize: number;
    keyWord?: string;
    gender?: string;
    species?: string;
  }): Promise<BaseListResponse<Pet>> {
    return axiosInstance
      .get("/api/Pets/get-all-pets", { params })
      .then((res) => res.data);
  },

  async getPetById(petId: string): Promise<Pet | null> {
    return axiosInstance
      .get(`/api/Pets/get-pet-by-id/${petId}`)
      .then((res) => res.data.data);
  },

  async updatePet(
    payload: PetPayload,
    petId: string,
  ): Promise<BaseResponse<Pet>> {
    const formData = new FormData();

    formData.append("petId", payload.petId.toString());
    formData.append("customerId", payload.customerId.toString());
    formData.append("name", payload.name.trim());
    formData.append("species", payload.species);
    formData.append("breed", payload.breed.trim());
    formData.append("gender", payload.gender);
    formData.append("dateOfBirth", payload.dateOfBirth);
    formData.append("placeToLive", payload.placeToLive.trim());
    formData.append("placeOfBirth", payload.placeOfBirth.trim());
    formData.append("weight", payload.weight);
    formData.append("color", payload.color.trim());
    formData.append("nationality", payload.nationality.trim());
    formData.append("isSterilized", String(payload.isSterilized));

    if (payload.image && payload.image instanceof File) {
      formData.append("image", payload.image);
    }

    return await axiosInstance
      .put(`/api/Pets/update-pet-by/${petId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
      })
      .then((res) => res.data);
  },

  async deletePet(petId: number): Promise<BaseResponse<Pet>> {
    return axiosInstance
      .delete(`/api/Pets/delete-pet/${petId}`)
      .then((res) => res.data);
  },

  async createPet(petPayload: PetCreatePayload): Promise<BaseResponse<Pet>> {
    const formData = new FormData();

    formData.append("customerId", petPayload.customerId.toString());
    formData.append("name", petPayload.name.trim());
    formData.append("species", petPayload.species);
    formData.append("breed", petPayload.breed.trim());
    formData.append("gender", petPayload.gender);
    formData.append("dateOfBirth", petPayload.dateOfBirth);
    formData.append("placeToLive", petPayload.placeToLive.trim());
    formData.append("placeOfBirth", petPayload.placeOfBirth.trim());
    formData.append("weight", petPayload.weight);
    formData.append("color", petPayload.color.trim());
    formData.append("nationality", petPayload.nationality.trim());
    formData.append("isSterilized", String(petPayload.isSterilized));

    if (petPayload.image) {
      formData.append("image", petPayload.image);
    }

    return await axiosInstance
      .post("/api/Pets/create-pet", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  },
};
