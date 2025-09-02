import { useMemo } from "react";
import type { DashboardVetData } from "../types/dashboard.type";
import { icons } from "@/shared/constants/icons.constants";

export interface VetStatItem {
  title: string;
  value: number;
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
        color: "bg-blue-500",
      },
      {
        title: "Lô Vaccine",
        value: data.totalVaccineBatches,
        iconName: "PackageOpen",
        color: "bg-green-500",
      },
      {
        title: "Check-in Tiêm Chủng",
        value: data.totalCheckedInAppointmentVaccinations,
        iconName: "CalendarCheck",
        color: "bg-purple-500",
      },
      {
        title: "Check-in Microchip",
        value: data.totalCheckedInAppointmentMicrochips,
        iconName: "ScanBarcode",
        color: "bg-orange-500",
      },
      {
        title: "Check-in Khám Bệnh",
        value: data.totalCheckedInAppointmentHealthConditions,
        iconName: "Stethoscope",
        color: "bg-red-500",
      },
      {
        title: "Đã Xử Lý Tiêm Chủng",
        value: data.totalProcessedAppointmentVaccinations,
        iconName: "BookCheck",
        color: "bg-emerald-500",
      },
      {
        title: "Đã Xử Lý Microchip",
        value: data.totalProcessedAppointmentMicrochips,
        iconName: "BookCheck",
        color: "bg-teal-500",
      },
      {
        title: "Đã Xử Lý Khám Bệnh",
        value: data.totalProcessedAppointmentHealthConditions,
        iconName: "BookCheck",
        color: "bg-indigo-500",
      },
    ];
  }, [data]);
}
