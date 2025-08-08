import axiosInstance from "@/lib/axios";
import type { VaccineExportDetail } from "../types/vaccine-export-detail.type";
import type { VaccineExportDetailPayload } from "../types/payload.type";
import type { BaseResponse } from "@/shared/types/api.type";

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

  async getHistoryExportByVaccineBatch(
    vaccineBatchId: number | null,
  ): Promise<VaccineExportDetail[]> {
    return await axiosInstance
      .get(
        `/api/VaccineExportDetail/get-vaccine-export-details-by-vaccine-batch-id/${vaccineBatchId}`,
      )
      .then((res) => res.data.data);
  },

  async getExportDetailByExportId(
    exportId: number | null,
  ): Promise<VaccineExportDetail[]> {
    return await axiosInstance
      .get(
        `/api/VaccineExportDetail/get-vaccine-export-details-by-vaccine-export-id/${exportId}`,
      )
      .then((res) => res.data.data);
  },

  async createVaccineExport(
    vaccineExportPayload: VaccineExportDetailPayload,
  ): Promise<BaseResponse<VaccineExportDetail>> {
    return await axiosInstance
      .post(
        "/api/VaccineExportDetail/create-vaccine-export-detail",
        vaccineExportPayload,
      )
      .then((res) => res.data);
  },

  async getVaccineExportDetailById(
    exportDetailId: number | null,
  ): Promise<VaccineExportDetail> {
    return await axiosInstance
      .get(
        `/api/VaccineExportDetail/get-vaccine-export-detail-by-id/${exportDetailId}`,
      )
      .then((res) => res.data.data);
  },

  async updateExportDetail(
    exportDetailId: number | null,
    payload: VaccineExportDetailPayload,
  ): Promise<BaseResponse<VaccineExportDetail>> {
    return await axiosInstance
      .put(
        `/api/VaccineExportDetail/update-vaccine-export-detail/${exportDetailId}`,
        payload,
      )
      .then((res) => res.data);
  },

  async deleteExportDetail(
    exportDetailId: number | null,
  ): Promise<BaseResponse<VaccineExportDetail>> {
    return await axiosInstance
      .delete(
        `/api/VaccineExportDetail/delete-vaccine-export-detail/${exportDetailId}`,
      )
      .then((res) => res.data);
  },
};
