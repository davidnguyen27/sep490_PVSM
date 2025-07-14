import type { BaseListResponse } from "@/shared/types/api.type";
import type { MicrochipAppointment } from "../types/microchip.type";
import axiosInstance from "@/lib/axios";
import type { MicrochipDetail } from "../types/detail.type";

export const microchipAppService = {
  async getAllMicrochipApps(params: {
    pageNumber: number;
    pageSize: number;
    keyWord?: string;
  }): Promise<BaseListResponse<MicrochipAppointment>> {
    return axiosInstance
      .get("/api/AppointmentForMicrochip/get-all-appointment-microchip", {
        params,
      })
      .then((res) => (res.data.success ? res.data : null));
  },

  async getAppointmentDetail(
    appointmentDetailId: number | null,
  ): Promise<MicrochipDetail> {
    return axiosInstance
      .get(
        `/api/AppointmentForMicrochip/get-appoinment-microchip-by-appointment-detail/${appointmentDetailId}`,
      )
      .then((res) => res.data.data);
  },
};
