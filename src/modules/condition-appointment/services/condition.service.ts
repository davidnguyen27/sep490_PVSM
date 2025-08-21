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
    vetId?: number | null;
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
    // Always send appointmentId
    formData.append("appointmentId", String(appointmentId));
    // Only append fields that are not undefined/null/empty
    if (data.vetId !== undefined && data.vetId !== null)
      formData.append("vetId", String(data.vetId));
    if (data.note !== undefined && data.note !== null && data.note !== "")
      formData.append("note", data.note);
    if (
      data.appointmentDate !== undefined &&
      data.appointmentDate !== null &&
      data.appointmentDate !== ""
    )
      formData.append("appointmentDate", data.appointmentDate);
    if (data.appointmentStatus !== undefined && data.appointmentStatus !== null)
      formData.append("appointmentStatus", String(data.appointmentStatus));
    if (data.healthConditionId !== undefined && data.healthConditionId !== null)
      formData.append("healthConditionId", String(data.healthConditionId));
    if (data.petId !== undefined && data.petId !== null)
      formData.append("petId", String(data.petId));
    if (data.microchipItemId !== undefined && data.microchipItemId !== null)
      formData.append("microchipItemId", String(data.microchipItemId));
    if (
      data.heartRate !== undefined &&
      data.heartRate !== null &&
      data.heartRate !== ""
    )
      formData.append("heartRate", data.heartRate);
    if (
      data.breathingRate !== undefined &&
      data.breathingRate !== null &&
      data.breathingRate !== ""
    )
      formData.append("breathingRate", data.breathingRate);
    if (data.weight !== undefined && data.weight !== null && data.weight !== "")
      formData.append("weight", data.weight);
    if (
      data.temperature !== undefined &&
      data.temperature !== null &&
      data.temperature !== ""
    )
      formData.append("temperature", data.temperature);
    if (data.eHNM !== undefined && data.eHNM !== null && data.eHNM !== "")
      formData.append("eHNM", data.eHNM);
    if (
      data.skinAFur !== undefined &&
      data.skinAFur !== null &&
      data.skinAFur !== ""
    )
      formData.append("skinAFur", data.skinAFur);
    if (
      data.digestion !== undefined &&
      data.digestion !== null &&
      data.digestion !== ""
    )
      formData.append("digestion", data.digestion);
    if (
      data.respiratory !== undefined &&
      data.respiratory !== null &&
      data.respiratory !== ""
    )
      formData.append("respiratory", data.respiratory);
    if (
      data.excrete !== undefined &&
      data.excrete !== null &&
      data.excrete !== ""
    )
      formData.append("excrete", data.excrete);
    if (
      data.behavior !== undefined &&
      data.behavior !== null &&
      data.behavior !== ""
    )
      formData.append("behavior", data.behavior);
    if (data.psycho !== undefined && data.psycho !== null && data.psycho !== "")
      formData.append("psycho", data.psycho);
    if (
      data.different !== undefined &&
      data.different !== null &&
      data.different !== ""
    )
      formData.append("different", data.different);
    if (
      data.conclusion !== undefined &&
      data.conclusion !== null &&
      data.conclusion !== ""
    )
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
