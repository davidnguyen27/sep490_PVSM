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
    <div className="fixed inset-0 flex h-screen w-screen flex-col overflow-hidden">
      <Header />

      <div className="flex min-h-0 flex-1">
        <Sidebar items={staffSidebarItems} />

        <main className="flex min-h-0 flex-1 flex-col bg-gray-50">
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
              <Suspense fallback={<Spinner />}>
                <Outlet />
              </Suspense>
            </div>

            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
