import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { icons } from "@/shared/constants/icons";
import { Outlet } from "react-router-dom";

const adminSidebarItems = [
  {
    label: "Dashboard",
    icon: <icons.LayoutDashboard size={20} />,
    path: "/admin/dashboard",
  },
  {
    label: "Khách hàng",
    icon: <icons.Users size={20} />,
    children: [
      {
        label: "Thú cưng",
        icon: <icons.PawPrint size={20} />,
        path: "/admin/pets",
      },
      {
        label: "Chủ nuôi",
        icon: <icons.User size={20} />,
        path: "",
      },
    ],
  },
  {
    label: "Nhân sự",
    icon: <icons.ShieldCheck size={20} />,
    children: [
      {
        label: "Nhân viên",
        icon: <icons.User size={20} />,
        path: "",
      },
      {
        label: "Bác sĩ",
        icon: <icons.User size={20} />,
        path: "/vets",
      },
    ],
  },
  {
    label: "Vắc xin",
    icon: <icons.Syringe size={20} />,
    children: [
      {
        label: "Danh sách",
        icon: <icons.List size={20} />,
        path: "/admin/vaccines",
      },
      {
        label: "Lô vắc xin",
        icon: <icons.PackageOpen size={20} />,
        path: "",
      },
      {
        label: "Nhập hàng",
        icon: <icons.Truck size={20} />,
        path: "",
      },
    ],
  },
  {
    label: "Microchip",
    icon: <icons.ScanBarcode size={20} />,
    children: [
      {
        label: "Danh sách",
        icon: <icons.List size={20} />,
        path: "/microchips",
      },
      {
        label: "Lô microchip",
        icon: <icons.PackageOpen size={20} />,
        path: "/admin/microchip-batches",
      },
      {
        label: "Nhập hàng",
        icon: <icons.Truck size={20} />,
        path: "/admin/microchip-imports",
      },
    ],
  },
  {
    label: "Giấy chứng nhận",
    icon: <icons.BookCheck size={20} />,
    path: "/admin/health-certificates",
  },
  {
    label: "Hạng thành viên",
    icon: <icons.BadgeInfo size={20} />,
    path: "/admin/membership",
  },
];

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar items={adminSidebarItems} />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
