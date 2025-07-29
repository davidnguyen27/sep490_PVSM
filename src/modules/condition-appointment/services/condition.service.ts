import axiosInstance from "@/lib/axios";
import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { ConditionAppointments } from "../types/condition.type";
import type { UpdateStatusPayload } from "../types/payload.type";

export const conditionService = {
  async getAllConditions(params: {
    pageNumber: number;
    pageSize: number;
    keyWord: string;
    status?: boolean;
  }): Promise<BaseListResponse<ConditionAppointments>> {
    return await axiosInstance
      .get(
        "/api/AppointmentForHealthCondition/Get-All-Appointment-Detail-HealthConditions",
        {
          params,
        },
      )
      .then((res) => res.data);
  },

  async getConditionDetail(
    appointmentId: number | null,
  ): Promise<ConditionAppointments> {
    return await axiosInstance
      .get(
        `/api/AppointmentForHealthCondition/Get-Appointment-Detail-HealthCondition-By/${appointmentId}`,
      )
      .then((res) => res.data.data);
  },

  async updateConditionStatus(
    appointmentId: number | null,
    data: UpdateStatusPayload,
  ): Promise<BaseResponse<ConditionAppointments>> {
    const formData = new FormData();

    formData.append("appointmentId", String(appointmentId));
    formData.append("vetId", String(data.vetId ?? ""));
    formData.append("note", data.note);
    formData.append("appointmentDate", data.appointmentDate);
    formData.append("appointmentStatus", String(data.appointmentStatus));
    formData.append("healthConditionId", String(data.healthConditionId ?? ""));
    formData.append("petId", String(data.petId ?? ""));
    formData.append("microchipItemId", String(data.microchipItemId ?? ""));
    formData.append("heartRate", data.heartRate);
    formData.append("breathingRate", data.breathingRate);
    formData.append("weight", data.weight);
    formData.append("temperature", data.temperature);
    formData.append("eHNM", data.eHNM);
    formData.append("skinAFur", data.skinAFur);
    formData.append("digestion", data.digestion);
    formData.append("respiratory", data.respiratory);
    formData.append("excrete", data.excrete);
    formData.append("behavior", data.behavior);
    formData.append("psycho", data.psycho);
    formData.append("different", data.different);
    formData.append("conclusion", data.conclusion);

    return await axiosInstance
      .put(
        "/api/AppointmentForHealthCondition/Update-Appointment-HealthCondition-For-Staff",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            appointmentId,
          },
        },
      )
      .then((res) => res.data);
  },
};
