import { useMemo } from "react";
import type { DashboardStaffData } from "../types/dashboard.type";
import type { IconName } from "@/shared/constants/icons.constants";

export interface StatItem {
  title: string;
  value: number;
  change: string;
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
        change: "+15%",
        iconName: "Users",
        color: "bg-primary",
      },
      {
        title: "Tổng thú cưng",
        value: dashboardData.totalPets,
        change: "+8%",
        iconName: "PawPrint",
        color: "bg-green-500",
      },
      {
        title: "Cuộc hẹn hôm nay",
        value: dashboardData.totalAppointmentsToday,
        change: "+5%",
        iconName: "Calendar",
        color: "bg-blue-500",
      },
      {
        title: "Cuộc hẹn tuần này",
        value: dashboardData.totalAppointmentsThisWeek,
        change: "+12%",
        iconName: "CalendarRange",
        color: "bg-purple-500",
      },
      {
        title: "Vaccine tiêm",
        value: dashboardData.totalAppointmentVaccinations,
        change: "+7%",
        iconName: "Syringe",
        color: "bg-orange-500",
      },
      {
        title: "Cấp microchip",
        value: dashboardData.totalAppointmentMicrochips,
        change: "+4%",
        iconName: "CpuIcon",
        color: "bg-indigo-500",
      },
    ];
  }, [dashboardData]);
};
