import { useMemo } from "react";
import type { DashboardVetData } from "../types/dashboard.type";
import { icons } from "@/shared/constants/icons.constants";

export interface VetActivityData {
  id: number;
  title: string;
  description: string;
  time: string;
  iconName: keyof typeof icons;
  color: string;
  type: "vaccination" | "microchip" | "health" | "system";
  timestamp: Date;
  value?: number;
}

export function useVetRecentActivities(
  data?: DashboardVetData,
): VetActivityData[] {
  return useMemo(() => {
    if (!data) return [];

    const activities: VetActivityData[] = [];

    // Generate recent activities based on vet data
    if (data.totalCheckedInAppointmentVaccinations > 0) {
      activities.push({
        id: 1,
        title: "Lịch hẹn tiêm chủng check-in",
        description: `${data.totalCheckedInAppointmentVaccinations} lịch hẹn đã check-in chờ xử lý`,
        time: "Vừa cập nhật",
        iconName: "Syringe",
        color: "text-blue-600",
        type: "vaccination",
        timestamp: new Date(),
        value: data.totalCheckedInAppointmentVaccinations,
      });
    }

    if (data.totalCheckedInAppointmentMicrochips > 0) {
      activities.push({
        id: 2,
        title: "Lịch hẹn microchip check-in",
        description: `${data.totalCheckedInAppointmentMicrochips} lịch hẹn đã check-in chờ xử lý`,
        time: "Vừa cập nhật",
        iconName: "ScanBarcode",
        color: "text-purple-600",
        type: "microchip",
        timestamp: new Date(),
        value: data.totalCheckedInAppointmentMicrochips,
      });
    }

    if (data.totalCheckedInAppointmentHealthConditions > 0) {
      activities.push({
        id: 3,
        title: "Lịch hẹn khám bệnh check-in",
        description: `${data.totalCheckedInAppointmentHealthConditions} lịch hẹn đã check-in chờ xử lý`,
        time: "Vừa cập nhật",
        iconName: "PawPrint",
        color: "text-green-600",
        type: "health",
        timestamp: new Date(),
        value: data.totalCheckedInAppointmentHealthConditions,
      });
    }

    if (data.totalProcessedAppointmentVaccinations > 0) {
      activities.push({
        id: 4,
        title: "Hoàn thành tiêm chủng",
        description: `Đã xử lý ${data.totalProcessedAppointmentVaccinations} lịch hẹn tiêm chủng`,
        time: "Hôm nay",
        iconName: "BookCheck",
        color: "text-green-600",
        type: "vaccination",
        timestamp: new Date(),
        value: data.totalProcessedAppointmentVaccinations,
      });
    }

    if (data.totalProcessedAppointmentMicrochips > 0) {
      activities.push({
        id: 5,
        title: "Hoàn thành cấy microchip",
        description: `Đã xử lý ${data.totalProcessedAppointmentMicrochips} lịch hẹn cấy microchip`,
        time: "Hôm nay",
        iconName: "BookCheck",
        color: "text-purple-600",
        type: "microchip",
        timestamp: new Date(),
        value: data.totalProcessedAppointmentMicrochips,
      });
    }

    if (data.totalProcessedAppointmentHealthConditions > 0) {
      activities.push({
        id: 6,
        title: "Hoàn thành khám bệnh",
        description: `Đã xử lý ${data.totalProcessedAppointmentHealthConditions} lịch hẹn khám bệnh`,
        time: "Hôm nay",
        iconName: "BookCheck",
        color: "text-green-600",
        type: "health",
        timestamp: new Date(),
        value: data.totalProcessedAppointmentHealthConditions,
      });
    }

    // Sort by value (most important first) and limit to recent activities
    return activities
      .sort((a, b) => (b.value || 0) - (a.value || 0))
      .slice(0, 5);
  }, [data]);
}
