import { Spinner } from "@/components/shared";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { icons } from "@/shared/constants/icons.constants";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const adminSidebarItems = [
  {
    label: "Dashboard",
    icon: <icons.LayoutDashboard size={20} />,
    path: "/admin/dashboard",
  },
  {
    label: "Hồ sơ",
    icon: <icons.Users size={20} />,
    children: [
      {
        label: "Thú cưng",
        icon: <icons.PawPrint size={18} />,
        path: "/admin/pet-profiles",
      },
      {
        label: "Chủ nuôi",
        icon: <icons.User size={18} />,
        path: "/admin/customers",
      },
    ],
  },
  {
    label: "Nhân sự",
    icon: <icons.ShieldCheck size={20} />,
    children: [
      {
        label: "Bác sĩ",
        icon: <icons.Stethoscope size={18} />,
        path: "/admin/vets",
      },
    ],
  },
  {
    label: "Vắc xin",
    icon: <icons.Syringe size={20} />,
    children: [
      {
        label: "Danh sách",
        icon: <icons.List size={18} />,
        path: "/admin/vaccines",
      },
      {
        label: "Lô vắc xin",
        icon: <icons.PackageOpen size={18} />,
        path: "/admin/vaccine-batches",
      },
      {
        label: "Nhập kho",
        icon: <icons.Truck size={18} />,
        path: "/admin/vaccine-receipts",
      },
      {
        label: "Xuất kho",
        icon: <icons.Truck size={18} />,
        path: "/admin/vaccine-exports",
      },
    ],
  },
  {
    label: "Microchip",
    icon: <icons.CpuIcon size={20} />,
    path: "/admin/microchips",
  },
  {
    label: "Bệnh",
    icon: <icons.BookCheck size={20} />,
    path: "/admin/diseases",
  },
  {
    label: "Hạng thành viên",
    icon: <icons.BadgeInfo size={20} />,
    path: "/admin/membership",
  },
];

export default function AdminLayout() {
  return (
    <div className="fixed inset-0 flex h-screen w-screen flex-col overflow-hidden">
      <Header />

      <div className="flex min-h-0 flex-1">
        <Sidebar items={adminSidebarItems} />

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
