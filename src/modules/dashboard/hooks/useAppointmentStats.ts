import { useMemo } from "react";
import type { DashboardAdminData } from "../types/dashboard.type";

export interface AppointmentStats {
  total: number;
  pending: number;
  completed: number;
}

export const useAppointmentStats = (
  dashboardData: DashboardAdminData | undefined,
): AppointmentStats => {
  return useMemo(() => {
    if (!dashboardData) return { total: 0, pending: 0, completed: 0 };

    const totalAppointments =
      dashboardData.totalAppointmentVaccinations +
      dashboardData.totalAppointmentMicrochips +
      dashboardData.totalAppointmentHealthConditions;

    const pendingAppointments =
      dashboardData.totalProcessingAppointmentVaccinations +
      dashboardData.totalProcessingAppointmentMicrochips +
      dashboardData.totalProcessingAppointmentHealthConditions;

    const completedAppointments =
      dashboardData.totalCompletedAppointmentVaccinations +
      dashboardData.totalCompletedAppointmentMicrochips +
      dashboardData.totalCompletedAppointmentHealthConditions;

    return {
      total: totalAppointments,
      pending: pendingAppointments,
      completed: completedAppointments,
    };
  }, [dashboardData]);
};
