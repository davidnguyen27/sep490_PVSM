import { useMemo } from "react";
import type { DashboardAdminData } from "../types/dashboard.type";

export interface AppointmentStats {
  total: number;
  processing: number;
  confirmed: number;
  checkedIn: number;
  processed: number;
  paid: number;
  completed: number;
  cancel: number;
}

export const useAppointmentStats = (
  dashboardData: DashboardAdminData | undefined,
): AppointmentStats => {
  return useMemo(() => {
    if (!dashboardData) return { total: 0, processing: 0, completed: 0, confirmed: 0, checkedIn: 0, processed: 0, paid: 0, cancel: 0 };

    const totalAppointments =
      dashboardData.totalAppointmentVaccinations +
      dashboardData.totalAppointmentMicrochips +
      dashboardData.totalAppointmentHealthConditions;
    const totalCompletedAppointments =
      dashboardData.totalCompletedAppointments;
    const totalProcessingAppointments =
      dashboardData.totalProcessingAppointments;
    const totalConfirmedAppointments =
      dashboardData.totalConfirmedAppointments;
    const totalCheckedInAppointments =
      dashboardData.totalCheckedInAppointments
    const totalProcessedAppointments =
      dashboardData.totalProcessedAppointments;
    const totalCancelledAppointments =
      dashboardData.totalCancelledAppointments
    const totalPaidAppointments =
      dashboardData.totalPaidAppointments;
    return {
      total: totalAppointments,
      processing: totalProcessingAppointments,
      completed: totalCompletedAppointments,
      confirmed: totalConfirmedAppointments,
      checkedIn: totalCheckedInAppointments,
      processed: totalProcessedAppointments,
      paid: totalPaidAppointments,
      cancel: totalCancelledAppointments,
    };
  }, [dashboardData]);
};
