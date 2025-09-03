import { useMemo } from "react";
import type { DashboardVetData } from "../types/dashboard.type";

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

export const useVetAppointmentStats = (
  dashboardData: DashboardVetData | undefined,
): AppointmentStats => {
  return useMemo(() => {
    if (!dashboardData) {
      return {
        total: 0,
        processing: 0,
        confirmed: 0,
        checkedIn: 0,
        processed: 0,
        paid: 0,
        completed: 0,
        cancel: 0
      };
    }

    const totalCheckedInAppointments =
      dashboardData.totalCheckedInAppointmentVaccinations +
      dashboardData.totalCheckedInAppointmentMicrochips +
      dashboardData.totalCheckedInAppointmentHealthConditions;

    const totalProcessedAppointments =
      dashboardData.totalProcessedAppointmentVaccinations +
      dashboardData.totalProcessedAppointmentMicrochips +
      dashboardData.totalProcessedAppointmentHealthConditions;

    const totalAppointments =
      dashboardData.totalProcessingAppointments +
      dashboardData.totalConfirmedAppointments +
      dashboardData.totalCheckedInAppointments +
      dashboardData.totalProcessedAppointments +
      dashboardData.totalPaidAppointments +
      dashboardData.totalCompletedAppointments +
      dashboardData.totalCancelledAppointments;

    return {
      total: totalAppointments,
      processing: dashboardData.totalProcessingAppointments || 0,
      confirmed: dashboardData.totalConfirmedAppointments || 0,
      checkedIn: totalCheckedInAppointments,
      processed: totalProcessedAppointments,
      paid: dashboardData.totalPaidAppointments || 0,
      completed: dashboardData.totalCompletedAppointments || 0,
      cancel: dashboardData.totalCancelledAppointments || 0,
    };
  }, [dashboardData]);
};
