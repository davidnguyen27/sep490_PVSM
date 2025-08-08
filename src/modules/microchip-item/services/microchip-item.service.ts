import axiosInstance from "@/lib/axios";
import type { BaseListResponse } from "@/shared/types/api.type";
import type { MicrochipItem } from "../types/microchip-item.type";
import type { MicrochipItemByCode } from "../types/microchip-item-by-code.type";

export const microchipItemService = {
  async getAllMicrochipItems(params: {
    pageNumber: number;
    pageSize: number;
    keyWord?: string;
    isUsed?: boolean;
  }): Promise<BaseListResponse<MicrochipItem>> {
    return await axiosInstance
      .get("/api/MicrochipItems/get-all-microchip-items", { params })
      .then((res) => (res.data.success ? res.data : null));
  },

  async getMicrochipItemByCode(params: {
    microchipCode: string;
    status?: number;
  }): Promise<MicrochipItemByCode> {
    return await axiosInstance
      .get("/api/MicrochipItems/get-information-of-pet-by-microchip-code", {
        params,
      })
      .then((res) => {
        // Check if response has data regardless of success flag
        if (res.data && res.data.data && res.data.code === 200) {
          return res.data.data;
        }
        throw new Error(
          res.data?.message || "Không tìm thấy thông tin microchip",
        );
      });
  },

  async assignChipToPet({
    microchipItemId,
    petId,
  }: {
    microchipItemId: number | null;
    petId: number | null;
  }) {
    return await axiosInstance
      .patch(
        `/api/MicrochipItems/assign-chip-for-pet/${microchipItemId}/${petId}`,
      )
      .then((res) => (res.data.success ? res.data : null));
  },
};
