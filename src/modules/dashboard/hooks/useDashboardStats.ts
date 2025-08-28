import { useMemo } from "react";
import type { DashboardAdminData } from "../types/dashboard.type";
import type { IconName } from "@/shared/constants/icons.constants";

export interface StatItem {
  title: string;
  value: number;
  iconName: IconName;
  color: string;
}

export const useDashboardStats = (
  dashboardData: DashboardAdminData | undefined,
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
        title: "Số lượng vaccine",
        value: dashboardData.totalVaccines,
        iconName: "Syringe",
        color: "bg-purple-500",
      },
      {
        title: "Tổng thanh toán",
        value: dashboardData.totalPayments,
        iconName: "ShoppingCart",
        color: "bg-orange-500",
      },
    ];
  }, [dashboardData]);
};
