import axiosInstance from "@/lib/axios";
import type { BaseListResponse } from "@/shared/types/api.type";
import type { VetSchedule } from "../types/vet-schedule.type";

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
};
