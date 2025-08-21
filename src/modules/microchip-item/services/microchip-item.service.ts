import axiosInstance from "@/lib/axios";
import type { BaseListResponse } from "@/shared/types/api.type";
import type { MicrochipItem } from "../types/microchip-item.type";
import type { MicrochipItemByCode } from "../types/microchip-item-by-code.type";
import type { AppointmentDetail } from "../types/appointment-detail.type";

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
  }): Promise<MicrochipItemByCode> {
    return await axiosInstance
      .get("/api/MicrochipItems/get-information-of-pet-by-microchip-code", {
        params,
      })
      .then((res) => (res.data && res.data.data ? res.data.data : null));
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

  async getAppointmentDetail(
    appointmentId: number | null,
  ): Promise<AppointmentDetail> {
    return await axiosInstance
      .get(`/api/Appointment/get-appointment-by-id/${appointmentId}`)
      .then((res) => (res.data.success ? res.data.data : null));
  },
};
