import type { DashboardStaffData } from "../types/dashboard.type";
import type { IconName } from "@/shared/constants/icons.constants";

export interface ActivityData {
  id: number;
  title: string;
  description: string;
  time: string;
  iconName: IconName;
  color: string;
}

export const useStaffRecentActivities = (
  dashboardData: DashboardStaffData | undefined,
): ActivityData[] => {
  return [
    {
      id: 1,
      title: "Lịch hẹn hôm nay",
      description: `Có ${dashboardData?.totalAppointmentsToday || 0} cuộc hẹn cần xử lý hôm nay`,
      time: "Mới cập nhật",
      iconName: "Calendar",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Cuộc hẹn tiêm phòng",
      description: `${dashboardData?.totalProcessingAppointmentVaccinations || 0} cuộc hẹn tiêm phòng đang xử lý`,
      time: "1 giờ trước",
      iconName: "Syringe",
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      title: "Cấp microchip",
      description: `${dashboardData?.totalProcessingAppointmentMicrochips || 0} cuộc hẹn cấp microchip đang xử lý`,
      time: "2 giờ trước",
      iconName: "CpuIcon",
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 4,
      title: "Khám sức khỏe",
      description: `${dashboardData?.totalProcessingAppointmentHealthConditions || 0} cuộc hẹn khám sức khỏe đang xử lý`,
      time: "3 giờ trước",
      iconName: "Stethoscope",
      color: "bg-orange-100 text-orange-600",
    },
  ];
};
