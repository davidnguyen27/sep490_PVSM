import { useMemo } from "react";
import type { DashboardAdminData } from "../types/dashboard.type";

export interface StatItem {
  title: string;
  value: number;
  change: string;
  iconName: string;
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
        change: "+15%", // You can calculate this based on historical data
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
        title: "Số lượng vaccine",
        value: dashboardData.totalVaccines,
        change: "+3%",
        iconName: "Syringe",
        color: "bg-purple-500",
      },
      {
        title: "Tổng thanh toán",
        value: dashboardData.totalPayments,
        change: "+12%",
        iconName: "ShoppingCart",
        color: "bg-orange-500",
      },
    ];
  }, [dashboardData]);
};
