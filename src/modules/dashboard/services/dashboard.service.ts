import axiosInstance from "@/lib/axios";
import type {
  DashboardAdminData,
  DashboardVetData,
} from "../types/dashboard.type";

export const dashboardService = {
  async getAdminDashboardData(): Promise<DashboardAdminData> {
    return await axiosInstance
      .get("/api/Dashboard/admin-dashboard/")
      .then((res) => res.data.data);
  },

  async getVetDashboardData(): Promise<DashboardVetData> {
    return await axiosInstance
      .get("/api/Dashboard/vet-dashboard/")
      .then((res) => res.data.data);
  },
};
