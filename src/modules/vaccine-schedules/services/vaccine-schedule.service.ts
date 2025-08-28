import axiosInstance from "@/lib/axios";
import type {
  VaccineSchedule,
  VaccineScheduleByDisease,
} from "../types/vaccine-schedule.type";
import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
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

  async getVaccineScheduleByDisease(
    diseaseId: number | null,
  ): Promise<BaseResponse<VaccineScheduleByDisease>> {
    return await axiosInstance
      .get(
        `/api/VaccinationSchedule/get-vaccination-schedule-by-disease-id/${diseaseId}`,
      )
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

  async updateVaccinationSchedule(
    scheduleId: number | null,
    scheduleData: {
      diseaseId: number | null;
      species: string;
      ageInterval: number;
    },
  ): Promise<BaseResponse<VaccineSchedule>> {
    return await axiosInstance
      .put(
        `/api/VaccinationSchedule/update-vaccination-schedule/${scheduleId}`,
        scheduleData,
      )
      .then((res) => res.data);
  },

  async deleteVaccinationSchedule(
    scheduleId: number | null,
  ): Promise<BaseResponse<VaccineSchedule>> {
    return await axiosInstance
      .delete(
        `/api/VaccinationSchedule/delete-vaccination-schedule/${scheduleId}`,
      )
      .then((res) => res.data);
  },
};
