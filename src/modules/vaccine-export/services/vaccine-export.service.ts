import axiosInstance from "@/lib/axios";
import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { VaccineExport } from "../types/vaccine-export.type";
import type { VaccineExportPayload } from "../types/payload.type";
import { vaccineExportDetailService } from "@/modules/vaccine-export-detail/services/vaccine-export-detail.service";

// Type for vaccine export detail when creating
interface VaccineExportDetailPayload {
  vaccineBatchId: number;
  quantity: number;
  purpose: string;
  notes?: string;
  coldChainLog: {
    logTime: string;
    temperature: number;
    humidity: number;
    event: string;
    notes?: string;
  };
}

// Extended payload for creating vaccine export with details
interface VaccineExportCreateWithDetailsPayload {
  exportDate: string;
  details: VaccineExportDetailPayload[];
}

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

  async createVaccineExportWithDetails(
    payload: VaccineExportCreateWithDetailsPayload,
  ): Promise<VaccineExport> {
    try {
      // Step 1: Create vaccine export
      const exportResponse = await axiosInstance
        .post("/api/VaccineExport/create-vaccine-export", {
          exportDate: payload.exportDate,
        })
        .then((res) => (res.data.success ? res.data.data : null));

      if (!exportResponse || !exportResponse.vaccineExportId) {
        throw new Error("Failed to create vaccine export");
      }

      // Step 2: Create vaccine export details
      const detailPromises = payload.details.map((detail) => {
        const detailPayload = {
          vaccineExportId: exportResponse.vaccineExportId,
          vaccineBatchId: detail.vaccineBatchId,
          quantity: detail.quantity,
          purpose: detail.purpose,
          notes: detail.notes || "",
          coldChainLog: {
            vaccineBatchId: detail.vaccineBatchId,
            logTime: detail.coldChainLog.logTime,
            temperature: detail.coldChainLog.temperature,
            humidity: detail.coldChainLog.humidity,
            event: detail.coldChainLog.event,
            notes: detail.coldChainLog.notes || "",
          },
        };
        return vaccineExportDetailService.createVaccineExport(detailPayload);
      });

      // Wait for all details to be created
      await Promise.all(detailPromises);

      return exportResponse;
    } catch (error) {
      console.error("Error creating vaccine export with details:", error);
      throw error;
    }
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
