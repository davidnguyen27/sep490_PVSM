import { useMemo } from "react";
import type { DashboardStaffData } from "../types/dashboard.type";
import type { IconName } from "@/shared/constants/icons.constants";

export interface StatItem {
  title: string;
  value: number;
  iconName: IconName;
  color: string;
}

export const useDashboardStaffStats = (
  dashboardData: DashboardStaffData | undefined,
): StatItem[] => {
  return useMemo(() => {
    if (!dashboardData) return [];

    return [
      {
        title: "Tổng khách hàng",
        value: dashboardData.totalCustomers,
        iconName: "Users",
        color: "bg-primary",
      },
      {
        title: "Tổng thú cưng",
        value: dashboardData.totalPets,
        iconName: "PawPrint",
        color: "bg-green-500",
      },
      {
        title: "Cuộc hẹn hôm nay",
        value: dashboardData.totalAppointmentsToday,
        iconName: "Calendar",
        color: "bg-blue-500",
      },
      {
        title: "Cuộc hẹn tuần này",
        value: dashboardData.totalAppointmentsThisWeek,
        iconName: "CalendarRange",
        color: "bg-purple-500",
      },
      {
        title: "Vaccine tiêm",
        value: dashboardData.totalAppointmentVaccinations,
        iconName: "Syringe",
        color: "bg-orange-500",
      },
      {
        title: "Cấp microchip",
        value: dashboardData.totalAppointmentMicrochips,
        iconName: "CpuIcon",
        color: "bg-indigo-500",
      },
    ];
  }, [dashboardData]);
};
