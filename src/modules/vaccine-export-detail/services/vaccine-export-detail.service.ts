import axiosInstance from "@/lib/axios";
import type { VaccineExportDetail } from "../types/vaccine-export-detail.type";

export const vaccineExportDetailService = {
  async getVaccineExportDetailByAppointment(
    appointmentDetailId: number | null,
  ): Promise<VaccineExportDetail> {
    return await axiosInstance
      .get(
        `/api/VaccineExportDetail/get-vaccine-export-detail-by-appointment-detail-id/${appointmentDetailId}`,
      )
      .then((res) => res.data.data);
  },
};
