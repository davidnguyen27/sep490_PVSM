import axiosInstance from "@/lib/axios";
import type { BaseListResponse } from "@/shared/types/api.type";
import type { VetSchedule } from "../types/vet-schedule.type";

export const vetScheduleService = {
  getAllVetSchedules: async (params: {
    pageNumber: number;
    pageSize: number;
    keyWord?: string;
  }): Promise<BaseListResponse<VetSchedule>> =>
    axiosInstance
      .get(`/api/VetSchedules/Get-all-schedules`, { params })
      .then((res) => res.data),

  getSchedulesByDate: async (params: {
    date: string;
    slot: number;
  }): Promise<VetSchedule> =>
    axiosInstance
      .get("/api/VetSchedules/Get-schedules-by-date-and-slot", { params })
      .then((res) => res.data),

  async getVetScheduleByVetId(vetId: number | null): Promise<VetSchedule[]> {
    console.log("=== vetScheduleService.getVetScheduleByVetId ===");
    console.log("Input vetId:", vetId);

    const response = await axiosInstance
      .get(`/api/VetSchedules/Get-schedules-by-vet-id/${vetId}`)
      .then((res) => {
        console.log("Full axios response:", res);
        console.log("Response status:", res.status);
        console.log("Response data:", res.data);
        console.log("Response data.data:", res.data.data);

        // API trả về array của response objects, cần extract data từ mỗi item
        const rawData = res.data;
        console.log("Raw data sample:", rawData[0]);

        // Extract actual schedule data từ mỗi response object
        const extractedData = rawData
          .map(
            (item: {
              code: number;
              success: boolean;
              message: string;
              data: VetSchedule;
            }) => {
              console.log("Processing item:", item);
              // Dữ liệu thực sự nằm trong thuộc tính 'data' của response
              return item?.data;
            },
          )
          .filter(Boolean);

        console.log("Extracted schedules:", extractedData);
        console.log("Extracted schedules count:", extractedData.length);
        return extractedData;
      });

    console.log("Final service response:", response);
    console.log("==============================================");
    return response;
  },
};
