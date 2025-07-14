import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { icons } from "@/shared/constants/icons";
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
        path: "/vet/appointments-at-home",
      },
    ],
  },
];

export default function VetLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar items={vetSidebarItems} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="grid flex-1 grid-rows-[1fr_auto] overflow-auto">
          <div className="space-y-6 p-10">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
