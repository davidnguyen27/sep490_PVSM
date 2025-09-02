import { useMemo } from "react";
import type { DashboardAdminData, ActivityData } from "../types/dashboard.type";

export const useRecentActivities = (
  dashboardData: DashboardAdminData | undefined,
): ActivityData[] => {
  return useMemo(() => {
    if (!dashboardData) return [];

    const activities: ActivityData[] = [];
    const now = new Date();

    // Tạo các hoạt động dựa trên dữ liệu thực từ API
    if (dashboardData.totalCompletedAppointmentVaccinations > 0) {
      activities.push({
        id: 1,
        title: `${dashboardData.totalCompletedAppointmentVaccinations} lịch hẹn tiêm phòng đã hoàn thành`,
        description: `Hiện có ${dashboardData.totalCompletedAppointmentVaccinations} lịch hẹn tiêm phòng đã hoàn thành`,
        time: new Date(now.getTime() - 15 * 60000).toLocaleTimeString("vi-VN", {
          hour: '2-digit',
          minute: '2-digit'
        }),
        iconName: "Syringe",
        color: "bg-blue-100 text-blue-600",
      });
    }

    if (dashboardData.totalCompletedAppointmentMicrochips > 0) {
      activities.push({
        id: 2,
        title: `${dashboardData.totalCompletedAppointmentMicrochips} lịch hẹn microchip đã hoàn thành`,
        description: `Có ${dashboardData.totalCompletedAppointmentMicrochips} lịch hẹn cấp microchip đã hoàn thành`,
        time: new Date(now.getTime() - 30 * 60000).toLocaleTimeString("vi-VN", {
          hour: '2-digit',
          minute: '2-digit'
        }),
        iconName: "CpuIcon",
        color: "bg-purple-100 text-purple-600",
      });
    }

    if (dashboardData.totalCompletedAppointmentHealthConditions > 0) {
      activities.push({
        id: 3,
        title: `${dashboardData.totalCompletedAppointmentHealthConditions} lịch hẹn khám sức khỏe hoàn thành`,
        description: `Đã hoàn thành ${dashboardData.totalCompletedAppointmentHealthConditions} lịch hẹn khám sức khỏe hôm nay`,
        time: new Date(now.getTime() - 45 * 60000).toLocaleTimeString("vi-VN", {
          hour: '2-digit',
          minute: '2-digit'
        }),
        iconName: "Stethoscope",
        color: "bg-green-100 text-green-600",
      });
    }

    if (dashboardData.totalVaccineBatches > 0) {
      activities.push({
        id: 4,
        title: `${dashboardData.totalVaccineBatches} lô vaccine trong kho`,
        description: `Hiện có ${dashboardData.totalVaccineBatches} lô vaccine có sẵn trong kho`,
        time: new Date(now.getTime() - 60 * 60000).toLocaleTimeString("vi-VN", {
          hour: '2-digit',
          minute: '2-digit'
        }),
        iconName: "PackageOpen",
        color: "bg-orange-100 text-orange-600",
      });
    }

    if (dashboardData.totalPets > 0) {
      activities.push({
        id: 5,
        title: `${dashboardData.totalPets} thú cưng đã đăng ký`,
        description: `Tổng cộng ${dashboardData.totalPets} thú cưng đã được đăng ký trong hệ thống`,
        time: new Date(now.getTime() - 90 * 60000).toLocaleTimeString("vi-VN", {
          hour: '2-digit',
          minute: '2-digit'
        }),
        iconName: "PawPrint",
        color: "bg-indigo-100 text-indigo-600",
      });
    }

    // Lọc và sắp xếp theo độ ưu tiên (processing > completed > general info)
    return activities
      .sort((a, b) => {
        const priorityOrder = { "Syringe": 1, "CpuIcon": 2, "Stethoscope": 3, "PackageOpen": 4, "PawPrint": 5 };
        return (priorityOrder[a.iconName as keyof typeof priorityOrder] || 10) -
          (priorityOrder[b.iconName as keyof typeof priorityOrder] || 10);
      })
      .slice(0, 4); // Giới hạn 4 hoạt động gần nhất
  }, [dashboardData]);
};
