import axiosInstance from "@/lib/axios";
import type { VaccineSchedule } from "../types/vaccine-schedule.type";
import type { BaseListResponse } from "@/shared/types/api.type";
import type { VaccineSchedulePayload } from "../types/vaccine-schedule.payload.type";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
  status?: boolean;
}

export const vaccineScheduleService = {
  async getAllVaccineSchedule(
    params: Params,
  ): Promise<BaseListResponse<VaccineSchedule>> {
    return await axiosInstance
      .get("/api/VaccinationSchedule/get-all-vaccination-schedules", { params })
      .then((res) => res.data);
  },

  async createVaccinationSchedule(
    vaccinationData: VaccineSchedulePayload,
  ): Promise<VaccineSchedule> {
    return await axiosInstance
      .post(
        "/api/VaccinationSchedule/create-vaccination-schedule",
        vaccinationData,
      )
      .then((res) => res.data);
  },
};
