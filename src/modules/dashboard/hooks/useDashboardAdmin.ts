import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";
import type { DashboardAdminData } from "../types/dashboard.type";

export const useDashboardAdmin = () => {
  return useQuery<DashboardAdminData, Error>({
    queryKey: ["dashboard", "admin"],
    queryFn: () => dashboardService.getAdminDashboardData(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
