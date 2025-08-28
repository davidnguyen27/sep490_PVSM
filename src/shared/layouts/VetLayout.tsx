import { Spinner } from "@/components/shared";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { icons } from "@/shared/constants/icons.constants";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const vetSidebarItems = [
  {
    label: "Dashboard",
    icon: <icons.LayoutDashboard size={20} />,
    path: "/vet/dashboard",
  },
  {
    label: "Lịch hẹn",
    icon: <icons.CalendarRange size={20} />,
    children: [
      {
        label: "Tiêm chủng",
        icon: <icons.Syringe size={20} />,
        path: "/vet/vaccination-appointments",
      },
      {
        label: "Cấy microchip",
        icon: <icons.CpuIcon size={20} />,
        path: "/vet/microchip-appointments",
      },
      {
        label: "Chứng nhận",
        icon: <icons.BookCheck size={20} />,
        path: "/vet/condition-appointments",
      },
    ],
  },
  {
    label: "Lịch khám",
    icon: <icons.CalendarCheck size={20} />,
    path: "/vet/vet-schedules",
  },
];

export default function VetLayout() {
  return (
    <div className="fixed inset-0 flex h-screen w-screen flex-col overflow-hidden">
      <Header />

      <div className="flex min-h-0 flex-1">
        <Sidebar items={vetSidebarItems} />

        <main className="flex min-h-0 flex-1 flex-col bg-gray-50">
          <div className="flex flex-1 flex-col overflow-y-auto">
            <div className="flex-1 px-4 py-4 sm:px-6 lg:px-8">
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
