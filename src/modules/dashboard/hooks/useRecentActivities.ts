import type { DashboardAdminData } from "../types/dashboard.type";
import type { IconName } from "@/shared/constants/icons.constants";

export interface ActivityData {
  id: number;
  title: string;
  description: string;
  time: string;
  iconName: IconName;
  color: string;
}

export const useRecentActivities = (
  dashboardData: DashboardAdminData | undefined,
): ActivityData[] => {
  return [
    {
      id: 1,
      title: "Lịch hẹn tiêm phòng mới",
      description: "Khách hàng Nguyễn Văn A đã đặt lịch hẹn cho thú cưng",
      time: "2 giờ trước",
      iconName: "Calendar",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Nhập kho vaccine",
      description: `Đã nhập ${dashboardData?.totalVaccineBatches || 0} lô vaccine mới`,
      time: "4 giờ trước",
      iconName: "PackageOpen",
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      title: "Đăng ký thú cưng mới",
      description: "Đã đăng ký thông tin cho chó Golden Retriever",
      time: "6 giờ trước",
      iconName: "PawPrint",
      color: "bg-purple-100 text-purple-600",
    },
  ];
};
