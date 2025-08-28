import axiosInstance from "@/lib/axios";
import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { VaccinationApp } from "../types/vaccination.type";
import type { VaccinationDetail } from "../types/detail.type";
import type { UpdateStatusParams } from "../types/params.type";
import type { VaccinationPayload } from "../types/vaccination.payload.type";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
  vetId?: number;
}

export const vaccinationService = {
  // Fetch all vaccination appointments
  async getAllVaccinationApps(
    params: Params,
  ): Promise<BaseListResponse<VaccinationApp>> {
    return axiosInstance
      .get("/api/AppointmentForVaccination/get-all-appointment-vaccination", {
        params,
      })
      .then((res) => (res.data.success ? res.data : null));
  },

  // Fetch vaccination appointments by appointment ID
  async getAppointmentDetail(
    appointmentId: number | null,
  ): Promise<VaccinationApp> {
    return axiosInstance
      .get(
        `/api/AppointmentForVaccination/get-appointment-vaccination-by-id/${appointmentId}`,
      )
      .then((res) => res.data.data);
  },

  // Fetch vaccination appointment details by appointment ID
  async getAppointmentById(
    appointmentId: number | null,
  ): Promise<VaccinationDetail> {
    return axiosInstance
      .get(
        `/api/AppointmentForVaccination/get-appointment-detail-vaccination-by-appointment-id/${appointmentId}`,
      )
      .then((res) => res.data.data);
  },

  // Update vaccination appointment status
  async updateAppointment(
    data: UpdateStatusParams,
  ): Promise<BaseResponse<VaccinationApp>> {
    const formData = new FormData();

    formData.append("appointmentId", String(data.appointmentId));
    formData.append("appointmentStatus", String(data.appointmentStatus));

    if (data.vetId) formData.append("vetId", String(data.vetId));
    if (data.diseaseId) formData.append("diseaseId", String(data.diseaseId));
    if (data.vaccineBatchId)
      formData.append("vaccineBatchId", String(data.vaccineBatchId));
    if (data.reaction) formData.append("reaction", data.reaction);
    if (data.temperature) formData.append("temperature", data.temperature);
    if (data.heartRate) formData.append("heartRate", data.heartRate);
    if (data.generalCondition)
      formData.append("generalCondition", data.generalCondition);
    if (data.others) formData.append("others", data.others);
    if (data.notes) formData.append("notes", data.notes);
    if (data.appointmentDate)
      formData.append("appointmentDate", data.appointmentDate);

    return await axiosInstance
      .put(
        `/api/AppointmentForVaccination/update-appointment-vaccination/${data.appointmentId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((res) => res.data);
  },

  async updateAppointmentById(
    appointmentId: number | null,
    payload: VaccinationPayload,
  ): Promise<BaseResponse<VaccinationApp>> {
    return await axiosInstance
      .put(`/api/Appointment/update-appointment/${appointmentId}`, payload)
      .then((res) => res.data.data);
  },
};
