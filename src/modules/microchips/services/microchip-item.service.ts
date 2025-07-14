import axiosInstance from "@/lib/axios";
import type { BaseListResponse } from "@/shared/types/api.type";
import type { MicrochipItem } from "../types/microchip-item.type";

export const microchipItemService = {
  getAllMicrochipItems: async (params: {
    pageNumber: number;
    pageSize: number;
    keyWord?: string;
    isUsed?: boolean;
  }): Promise<BaseListResponse<MicrochipItem>> =>
    axiosInstance
      .get("/api/MicrochipItems/get-all-microchip-items", { params })
      .then((res) => (res.data.success ? res.data : null)),
};
