import axiosInstance from "@/lib/axios";
import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { Microchip } from "../types/microchip.type";
import type { MicrochipPayload } from "../types/payload.type";

export const microchipService = {
  getAllMicrochips: async (params: {
    pageNumber: number;
    pageSize: number;
    keyWord?: string;
  }): Promise<BaseListResponse<Microchip>> =>
    axiosInstance
      .get("/api/Microchips/GetAllMicrochips", { params })
      .then((res) => res.data),

  getMicrochipById: async (microchipId: string): Promise<Microchip> =>
    axiosInstance
      .get(`/api/Microchips/GetMicrochipById/${microchipId}`)
      .then((res) => res.data.data),

  createMicrochip: async (payload: MicrochipPayload): Promise<BaseResponse> =>
    axiosInstance
      .post("/api/Microchips/CreateMicrochip", payload)
      .then((res) => res.data),

  updateMicrochip: async (
    payload: MicrochipPayload,
    microchipId: number,
  ): Promise<BaseResponse> =>
    axiosInstance
      .put(`/api/Microchips/UpdateMicrochip/${microchipId}`, payload)
      .then((res) => res.data),

  deleteMicrochip: async (microchipId: number): Promise<BaseResponse> =>
    axiosInstance
      .delete(`/api/Microchips/DeleteMicrochip/${microchipId}`)
      .then((res) => res.data),
};
