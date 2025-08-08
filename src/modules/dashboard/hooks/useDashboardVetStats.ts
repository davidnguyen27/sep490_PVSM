import { useMemo } from "react";
import type { DashboardVetData } from "../types/dashboard.type";
import { icons } from "@/shared/constants/icons.constants";

export interface VetStatItem {
  title: string;
  value: number;
  change?: number;
  iconName: keyof typeof icons;
  color: string;
}

export function useDashboardVetStats(data?: DashboardVetData): VetStatItem[] {
  return useMemo(() => {
    if (!data) return [];

    return [
      {
        title: "Tổng Vaccine",
        value: data.totalVaccines,
        iconName: "Syringe",
        color: "blue",
      },
      {
        title: "Lô Vaccine",
        value: data.totalVaccineBatches,
        iconName: "PackageOpen",
        color: "green",
      },
      {
        title: "Check-in Tiêm Chủng",
        value: data.totalCheckedInAppointmentVaccinations,
        iconName: "CalendarCheck",
        color: "purple",
      },
      {
        title: "Check-in Microchip",
        value: data.totalCheckedInAppointmentMicrochips,
        iconName: "ScanBarcode",
        color: "orange",
      },
      {
        title: "Check-in Khám Bệnh",
        value: data.totalCheckedInAppointmentHealthConditions,
        iconName: "Stethoscope",
        color: "red",
      },
      {
        title: "Đã Xử Lý Tiêm Chủng",
        value: data.totalProcessedAppointmentVaccinations,
        iconName: "BookCheck",
        color: "emerald",
      },
      {
        title: "Đã Xử Lý Microchip",
        value: data.totalProcessedAppointmentMicrochips,
        iconName: "BookCheck",
        color: "teal",
      },
      {
        title: "Đã Xử Lý Khám Bệnh",
        value: data.totalProcessedAppointmentHealthConditions,
        iconName: "BookCheck",
        color: "indigo",
      },
    ];
  }, [data]);
}
