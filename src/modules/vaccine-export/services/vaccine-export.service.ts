import axiosInstance from "@/lib/axios";
import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { VaccineExport } from "../types/vaccine-export.type";
import type { VaccineExportPayload } from "../types/payload.type";

export const vaccineExportService = {
  async getAllVaccineExports(params: {
    pageNumber: number;
    pageSize: number;
    keyWord?: string;
  }): Promise<BaseListResponse<VaccineExport>> {
    return await axiosInstance
      .get("/api/VaccineExport/get-all-vaccine-exports", { params })
      .then((res) => (res.data.success ? res.data : null));
  },

  async getVaccineExportById(exportId: number | null): Promise<VaccineExport> {
    return await axiosInstance
      .get(`/api/VaccineExport/get-vaccine-export-by-id/${exportId}`)
      .then((res) => res.data.data);
  },

  async createVaccineExport(
    exportData: VaccineExportPayload,
  ): Promise<BaseResponse<VaccineExport>> {
    return await axiosInstance
      .post("/api/VaccineExport/create-vaccine-export", exportData)
      .then((res) => res.data);
  },

  async updateVaccineExport(
    exportId: number | null,
    exportData: VaccineExportPayload,
  ): Promise<BaseResponse<VaccineExport>> {
    return await axiosInstance
      .put(`/api/VaccineExport/update-vaccine-export/${exportId}`, exportData)
      .then((res) => res.data);
  },

  async deleteVaccineExport(
    exportId: number | null,
  ): Promise<BaseResponse<VaccineExport>> {
    return await axiosInstance
      .delete(`/api/VaccineExport/delete-vaccine-export/${exportId}`)
      .then((res) => res.data);
  },
};
