import axiosInstance from "@/lib/axios";
import type { Appointment } from "../types/appointment.type";
import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { AppointmentPayload } from "../types/payload.type";
import type { AppointmentVaccine } from "../types/appointment-vaccine.type";

export const appointmentService = {
  getAllAppointments: async (params: {
    pageNumber: number;
    pageSize: number;
    keyWord?: string;
  }): Promise<BaseListResponse<Appointment> | null> =>
    await axiosInstance
      .get("/api/Appointment/get-all-appointments", { params })
      .then((res) => (res.data.success ? res.data : null)),

  getAppointmentDetail: async (
    appointmentId: number | null,
  ): Promise<AppointmentVaccine> =>
    await axiosInstance
      .get(
        `/api/Appointment/get-appointment-vaccination-by-id/${appointmentId}`,
      )
      .then((res) => res.data.data),

  createAppointment: async (
    payload: AppointmentPayload,
  ): Promise<BaseResponse> =>
    await axiosInstance
      .post("/api/Appointment/create-appointment-vaccination", payload)
      .then((res) => res.data),

  deleteAppointment: async (appointmentId: number): Promise<void> =>
    await axiosInstance
      .delete(`/api/Appointment/delete-appointment/${appointmentId}`)
      .then((res) => res.data),
};
