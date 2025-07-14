import axiosInstance from "@/lib/axios";
import type { BaseResponse } from "@/shared/types/api.type";
import type { MicrochipDetail } from "../types/detail.type";

export async function updateMicrochipApp(data: {
  appointmentId: number | null;
  vetId?: number | null;
  microchipItemId?: number | null;
  location?: string;
  note?: string;
  appointmentStatus: number;
}): Promise<BaseResponse<MicrochipDetail>> {
  const formData = new FormData();

  formData.append("appointmentId", String(data.appointmentId));
  formData.append("appointmentStatus", String(data.appointmentStatus));

  if (data.vetId) formData.append("vetId", String(data.vetId));
  if (data.microchipItemId)
    formData.append("microchipItemId", String(data.microchipItemId));
  if (data.location) formData.append("location", data.location);
  if (data.note) formData.append("note", data.note);

  return await axiosInstance
    .put(
      `/api/AppointmentForMicrochip/update-appointment-microchip`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    )
    .then((res) => res.data);
}
