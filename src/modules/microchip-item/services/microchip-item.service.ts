import axiosInstance from "@/lib/axios";
import type { BaseListResponse } from "@/shared/types/api.type";
import type { MicrochipItem } from "../types/microchip-item.type";

export const microchipItemService = {
  async getAllMicrochipItems(params: {
    pageNumber: number;
    pageSize: number;
    keyWord?: string;
    isUsed?: boolean;
  }): Promise<BaseListResponse<MicrochipItem>> {
    return axiosInstance
      .get("/api/MicrochipItems/get-all-microchip-items", { params })
      .then((res) => (res.data.success ? res.data : null));
  },

  async getMicrochipItemByCode(params: {
    microchipCode: string;
    status?: number;
  }) {
    return axiosInstance
      .get("/api/MicrochipItems/get-information-of-pet-by-microchip-code", {
        params,
      })
      .then((res) => (res.data.success ? res.data : null));
  },

  async assignChipToPet({
    microchipItemId,
    petId,
  }: {
    microchipItemId: number | null;
    petId: number | null;
  }) {
    return axiosInstance
      .patch(
        `/api/MicrochipItems/assign-chip-for-pet/${microchipItemId}/${petId}`,
      )
      .then((res) => (res.data.success ? res.data : null));
  },
};
