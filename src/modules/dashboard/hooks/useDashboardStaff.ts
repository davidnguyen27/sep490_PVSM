import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";
import type { DashboardStaffData } from "../types/dashboard.type";

export const useDashboardStaff = () => {
  return useQuery<DashboardStaffData, Error>({
    queryKey: ["dashboard", "staff"],
    queryFn: () => dashboardService.getStaffDashboardData(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
