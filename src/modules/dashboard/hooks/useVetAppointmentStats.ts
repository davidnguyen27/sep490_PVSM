import { useMemo } from "react";
import type { DashboardVetData } from "../types/dashboard.type";

export interface VetAppointmentStats {
  total: number;
  pending: number;
  completed: number;
  checkedInVaccination: number;
  checkedInMicrochip: number;
  checkedInHealthCondition: number;
  processedVaccination: number;
  processedMicrochip: number;
  processedHealthCondition: number;
  totalCheckedIn: number;
  totalProcessed: number;
}

export function useVetAppointmentStats(
  data?: DashboardVetData,
): VetAppointmentStats {
  return useMemo(() => {
    if (!data) {
      return {
        total: 0,
        pending: 0,
        completed: 0,
        checkedInVaccination: 0,
        checkedInMicrochip: 0,
        checkedInHealthCondition: 0,
        processedVaccination: 0,
        processedMicrochip: 0,
        processedHealthCondition: 0,
        totalCheckedIn: 0,
        totalProcessed: 0,
      };
    }

    const totalCheckedIn =
      data.totalCheckedInAppointmentVaccinations +
      data.totalCheckedInAppointmentMicrochips +
      data.totalCheckedInAppointmentHealthConditions;

    const totalProcessed =
      data.totalProcessedAppointmentVaccinations +
      data.totalProcessedAppointmentMicrochips +
      data.totalProcessedAppointmentHealthConditions;

    return {
      total: totalCheckedIn + totalProcessed,
      pending: totalCheckedIn,
      completed: totalProcessed,
      checkedInVaccination: data.totalCheckedInAppointmentVaccinations,
      checkedInMicrochip: data.totalCheckedInAppointmentMicrochips,
      checkedInHealthCondition: data.totalCheckedInAppointmentHealthConditions,
      processedVaccination: data.totalProcessedAppointmentVaccinations,
      processedMicrochip: data.totalProcessedAppointmentMicrochips,
      processedHealthCondition: data.totalProcessedAppointmentHealthConditions,
      totalCheckedIn,
      totalProcessed,
    };
  }, [data]);
}
