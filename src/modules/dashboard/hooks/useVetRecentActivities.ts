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
    const now = new Date();

    // Generate recent activities based on vet data
    if (data.totalCheckedInAppointmentVaccinations > 0) {
      activities.push({
        id: 1,
        title: "Lịch hẹn tiêm chủng check-in",
        description: `${data.totalCheckedInAppointmentVaccinations} lịch hẹn đã check-in chờ xử lý trên toàn hệ thống`,
        time: new Date(now.getTime() - 10 * 60000).toLocaleTimeString("vi-VN", {
          hour: '2-digit',
          minute: '2-digit'
        }),
        iconName: "Syringe",
        color: "bg-blue-100 text-blue-600",
        type: "vaccination",
        timestamp: new Date(),
        value: data.totalCheckedInAppointmentVaccinations,
      });
    }

    if (data.totalCheckedInAppointmentMicrochips > 0) {
      activities.push({
        id: 2,
        title: "Lịch hẹn microchip check-in",
        description: `${data.totalCheckedInAppointmentMicrochips} lịch hẹn đã check-in chờ xử lý trên toàn hệ thống`,
        time: new Date(now.getTime() - 25 * 60000).toLocaleTimeString("vi-VN", {
          hour: '2-digit',
          minute: '2-digit'
        }),
        iconName: "ScanBarcode",
        color: "bg-purple-100 text-purple-600",
        type: "microchip",
        timestamp: new Date(),
        value: data.totalCheckedInAppointmentMicrochips,
      });
    }

    if (data.totalCheckedInAppointmentHealthConditions > 0) {
      activities.push({
        id: 3,
        title: "Lịch hẹn khám bệnh check-in",
        description: `${data.totalCheckedInAppointmentHealthConditions} lịch hẹn đã check-in chờ xử lý trên toàn hệ thống`,
        time: new Date(now.getTime() - 40 * 60000).toLocaleTimeString("vi-VN", {
          hour: '2-digit',
          minute: '2-digit'
        }),
        iconName: "Stethoscope",
        color: "bg-green-100 text-green-600",
        type: "health",
        timestamp: new Date(),
        value: data.totalCheckedInAppointmentHealthConditions,
      });
    }

    if (data.totalProcessedAppointmentVaccinations > 0) {
      activities.push({
        id: 4,
        title: "Hoàn thành tiêm chủng",
        description: `Đã xử lý ${data.totalProcessedAppointmentVaccinations} lịch hẹn tiêm chủng trên toàn hệ thống`,
        time: new Date(now.getTime() - 55 * 60000).toLocaleTimeString("vi-VN", {
          hour: '2-digit',
          minute: '2-digit'
        }),
        iconName: "BookCheck",
        color: "bg-green-100 text-green-600",
        type: "vaccination",
        timestamp: new Date(),
        value: data.totalProcessedAppointmentVaccinations,
      });
    }

    if (data.totalProcessedAppointmentMicrochips > 0) {
      activities.push({
        id: 5,
        title: "Hoàn thành cấy microchip",
        description: `Đã xử lý ${data.totalProcessedAppointmentMicrochips} lịch hẹn cấy microchip trên toàn hệ thống`,
        time: new Date(now.getTime() - 70 * 60000).toLocaleTimeString("vi-VN", {
          hour: '2-digit',
          minute: '2-digit'
        }),
        iconName: "BookCheck",
        color: "bg-purple-100 text-purple-600",
        type: "microchip",
        timestamp: new Date(),
        value: data.totalProcessedAppointmentMicrochips,
      });
    }

    if (data.totalProcessedAppointmentHealthConditions > 0) {
      activities.push({
        id: 6,
        title: "Hoàn thành khám bệnh",
        description: `Đã xử lý ${data.totalProcessedAppointmentHealthConditions} lịch hẹn khám bệnh trên toàn hệ thống`,
        time: new Date(now.getTime() - 85 * 60000).toLocaleTimeString("vi-VN", {
          hour: '2-digit',
          minute: '2-digit'
        }),
        iconName: "BookCheck",
        color: "bg-orange-100 text-orange-600",
        type: "health",
        timestamp: new Date(),
        value: data.totalProcessedAppointmentHealthConditions,
      });
    }

    // Lọc và sắp xếp theo độ ưu tiên (giống Staff logic)
    return activities
      .sort((a, b) => {
        const priorityOrder = {
          "Syringe": 1,
          "ScanBarcode": 2,
          "Stethoscope": 3,
          "BookCheck": 4
        };
        return (priorityOrder[a.iconName as keyof typeof priorityOrder] || 10) -
          (priorityOrder[b.iconName as keyof typeof priorityOrder] || 10);
      })
      .slice(0, 5); // Giới hạn 5 hoạt động gần nhất
  }, [data]);
}
