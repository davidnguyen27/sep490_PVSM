import axiosInstance from "@/lib/axios";
import type { BaseResponse } from "@/shared/types/api.type";

export const updateAppointment = {
  updateAppointmentFormData: async (data: {
    appointmentId: number;
    vetId?: number;
    diseaseId?: number;
    vaccineBatchId?: number;
    dose?: string;
    reaction?: string;
    nextVaccinationInfo?: string;
    temperature?: string;
    heartRate?: string;
    generalCondition?: string;
    others?: string;
    notes?: string;
    appointmentDate?: string;
    appointmentStatus: number;
  }): Promise<BaseResponse> => {
    const formData = new FormData();

    formData.append("appointmentId", String(data.appointmentId));
    formData.append("appointmentStatus", String(data.appointmentStatus));

    if (data.vetId) formData.append("vetId", String(data.vetId));
    if (data.diseaseId) formData.append("diseaseId", String(data.diseaseId));
    if (data.vaccineBatchId)
      formData.append("vaccineBatchId", String(data.vaccineBatchId));
    if (data.dose) formData.append("dose", data.dose);
    if (data.reaction) formData.append("reaction", data.reaction);
    if (data.nextVaccinationInfo)
      formData.append("nextVaccinationInfo", data.nextVaccinationInfo);
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
        `/api/Appointment/update-appointment-vaccination/${data.appointmentId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((res) => res.data);
  },
};
