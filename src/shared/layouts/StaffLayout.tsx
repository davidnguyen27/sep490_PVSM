import { Spinner } from "@/components/shared";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { icons } from "@/shared/constants/icons.constants";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const staffSidebarItems = [
  {
    label: "Dashboard",
    icon: <icons.LayoutDashboard size={20} />,
    path: "/staff/dashboard",
  },
  {
    label: "Hồ sơ",
    icon: <icons.Users size={20} />,
    children: [
      {
        label: "Khách hàng",
        icon: <icons.User size={20} />,
        path: "/staff/customer-profiles",
      },
      {
        label: "Thú cưng",
        icon: <icons.PawPrint size={20} />,
        path: "/staff/pet-profiles",
      },
      {
        label: "Tiêm chủng",
        icon: <icons.Syringe size={20} />,
        path: "/staff/vaccine-profiles",
      },
    ],
  },
  {
    label: "Lịch hẹn",
    icon: <icons.CalendarRange size={20} />,
    children: [
      {
        label: "Tiêm chủng",
        icon: <icons.Syringe size={20} />,
        path: "/staff/vaccination-appointments",
      },
      {
        label: "Cấy microchip",
        icon: <icons.CpuIcon size={20} />,
        path: "/staff/microchip-appointments",
      },
      {
        label: "Chứng nhận",
        icon: <icons.BookCheck size={20} />,
        path: "/staff/condition-appointments",
      },
    ],
  },
];

export default function StaffLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar items={staffSidebarItems} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="grid flex-1 grid-rows-[1fr_auto] overflow-auto">
          <div className="space-y-6 p-10">
            <Suspense fallback={<Spinner />}>
              <Outlet />
            </Suspense>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
