import axiosInstance from "@/lib/axios";
import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { Appointment } from "../types/appointment.type";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
}

export const appointmentService = {
  async getAllAppointments(
    params: Params,
  ): Promise<BaseListResponse<Appointment>> {
    return await axiosInstance
      .get("/api/Appointment/get-all-appointments", { params })
      .then((res) => res.data);
  },

  async getAppointmentById(appointmentId: number | null): Promise<Appointment> {
    return await axiosInstance
      .get(`/api/Appointment/get-appointment-by-id/${appointmentId}`)
      .then((res) => res.data.data);
  },

  async deleteAppointment(
    appointmentId: number | null,
  ): Promise<BaseResponse<Appointment>> {
    return await axiosInstance
      .delete(`/api/Appointment/delete-appointment/${appointmentId}`)
      .then((res) => res.data);
  },
};
