import axiosInstance from "@/lib/axios";
import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { VetSchedule } from "../types/vet-schedule.type";
import type { VetSchedulePayload } from "../types/vet-schedule.payload.type";

export const vetScheduleService = {
  getAllVetSchedules: async (params: {
    pageNumber: number;
    pageSize: number;
    keyWord?: string;
  }): Promise<BaseListResponse<VetSchedule>> =>
    axiosInstance
      .get(`/api/VetSchedules/Get-all-schedules`, { params })
      .then((res) => res.data),

  getSchedulesByDate: async (params: {
    date: string;
    slot: number;
  }): Promise<VetSchedule> =>
    axiosInstance
      .get("/api/VetSchedules/Get-schedules-by-date-and-slot", { params })
      .then((res) => res.data),

  async getVetScheduleByVetId(vetId: number | null): Promise<VetSchedule[]> {
    const response = await axiosInstance
      .get(`/api/VetSchedules/Get-schedules-by-vet-id/${vetId}`)
      .then((res) => {
        // API trả về array của response objects, cần extract data từ mỗi item
        const rawData = res.data;

        // Extract actual schedule data từ mỗi response object
        const extractedData = rawData
          .map(
            (item: {
              code: number;
              success: boolean;
              message: string;
              data: VetSchedule;
            }) => {
              // Dữ liệu thực sự nằm trong thuộc tính 'data' của response
              return item?.data;
            },
          )
          .filter(Boolean);

        return extractedData;
      });

    return response;
  },

  async createSchedule(
    payload: VetSchedulePayload,
  ): Promise<BaseResponse<VetSchedule>> {
    return await axiosInstance
      .post("/api/VetSchedules/Create-schedule", payload)
      .then((res) => res.data);
  },

  async updateSchedule(
    payload: VetSchedulePayload,
  ): Promise<BaseResponse<VetSchedule>> {
    return await axiosInstance
      .put("/api/VetSchedules/Update-schedule", payload)
      .then((res) => res.data);
  },

  async deleteSchedule(
    scheduleId: number | null,
  ): Promise<BaseResponse<VetSchedule>> {
    return await axiosInstance
      .delete(`/api/VetSchedules/Delete-schedule/${scheduleId}`)
      .then((res) => res.data);
  },
};
