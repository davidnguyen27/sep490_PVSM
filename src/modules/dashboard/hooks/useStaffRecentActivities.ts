import { useMemo } from "react";
import type { DashboardStaffData, ActivityData } from "../types/dashboard.type";

export const useStaffRecentActivities = (
  dashboardData: DashboardStaffData | undefined,
): ActivityData[] => {
  return useMemo(() => {
    if (!dashboardData) return [];

    const activities: ActivityData[] = [];
    const now = new Date();

    // Tạo các hoạt động dựa trên dữ liệu thực từ API
    if (dashboardData.totalAppointmentsToday > 0) {
      activities.push({
        id: 1,
        title: `${dashboardData.totalAppointmentsToday} cuộc hẹn hôm nay`,
        description: `Có ${dashboardData.totalAppointmentsToday} cuộc hẹn cần xử lý trong ngày hôm nay`,
        time: new Date(now.getTime() - 10 * 60000).toLocaleTimeString("vi-VN", {
          hour: '2-digit',
          minute: '2-digit'
        }),
        iconName: "Calendar",
        color: "bg-blue-100 text-blue-600",
      });
    }

    if (dashboardData.totalProcessingAppointmentVaccinations > 0) {
      activities.push({
        id: 2,
        title: `${dashboardData.totalProcessingAppointmentVaccinations} lịch hẹn tiêm phòng đang chờ xử lý`,
        description: `Hiện có ${dashboardData.totalProcessingAppointmentVaccinations} cuộc hẹn tiêm phòng đang chờ xử lý`,
        time: new Date(now.getTime() - 25 * 60000).toLocaleTimeString("vi-VN", {
          hour: '2-digit',
          minute: '2-digit'
        }),
        iconName: "Syringe",
        color: "bg-green-100 text-green-600",
      });
    }

    if (dashboardData.totalProcessingAppointmentMicrochips > 0) {
      activities.push({
        id: 3,
        title: `${dashboardData.totalProcessingAppointmentMicrochips} lịch hẹn microchip đang chờ xử lý`,
        description: `Có ${dashboardData.totalProcessingAppointmentMicrochips} cuộc hẹn cấp microchip đang chờ xử lý`,
        time: new Date(now.getTime() - 40 * 60000).toLocaleTimeString("vi-VN", {
          hour: '2-digit',
          minute: '2-digit'
        }),
        iconName: "CpuIcon",
        color: "bg-purple-100 text-purple-600",
      });
    }

    if (dashboardData.totalProcessingAppointmentHealthConditions > 0) {
      activities.push({
        id: 4,
        title: `${dashboardData.totalProcessingAppointmentHealthConditions} lịch hẹn khám sức khỏe đang chờ xử lý`,
        description: `Hiện có ${dashboardData.totalProcessingAppointmentHealthConditions} cuộc hẹn khám sức khỏe đang chờ xử lý`,
        time: new Date(now.getTime() - 55 * 60000).toLocaleTimeString("vi-VN", {
          hour: '2-digit',
          minute: '2-digit'
        }),
        iconName: "Stethoscope",
        color: "bg-orange-100 text-orange-600",
      });
    }

    if (dashboardData.totalAppointmentsThisWeek > 0) {
      activities.push({
        id: 5,
        title: `${dashboardData.totalAppointmentsThisWeek} cuộc hẹn tuần này`,
        description: `Tổng cộng ${dashboardData.totalAppointmentsThisWeek} cuộc hẹn được đặt trong tuần này`,
        time: new Date(now.getTime() - 70 * 60000).toLocaleTimeString("vi-VN", {
          hour: '2-digit',
          minute: '2-digit'
        }),
        iconName: "CalendarRange",
        color: "bg-indigo-100 text-indigo-600",
      });
    }

    // Lọc và sắp xếp theo độ ưu tiên
    return activities
      .sort((a, b) => {
        const priorityOrder = { "Calendar": 1, "Syringe": 2, "CpuIcon": 3, "Stethoscope": 4, "CalendarRange": 5 };
        return (priorityOrder[a.iconName as keyof typeof priorityOrder] || 10) -
          (priorityOrder[b.iconName as keyof typeof priorityOrder] || 10);
      })
      .slice(0, 4); // Giới hạn 4 hoạt động gần nhất
  }, [dashboardData]);
};
