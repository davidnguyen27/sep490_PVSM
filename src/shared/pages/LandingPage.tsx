import { Button } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  ArrowRight,
  Stethoscope,
  FileText,
  Database,
  Settings,
} from "lucide-react";
import vaxpetLogo from "@/assets/images/vaxpet-logo.svg";

export default function LandingPage() {
  const navigate = useNavigate();

  const systemFeatures = [
    {
      icon: <Calendar className="text-primary h-6 w-6" />,
      title: "Quản lý lịch tiêm",
      description: "Lập lịch và theo dõi tiêm chủng cho thú cưng",
    },
    {
      icon: <Database className="text-primary h-6 w-6" />,
      title: "Quản lý dữ liệu",
      description: "Lưu trữ thông tin khách hàng và thú cưng",
    },
    {
      icon: <FileText className="text-primary h-6 w-6" />,
      title: "Báo cáo thống kê",
      description: "Theo dõi hiệu suất và doanh thu",
    },
    {
      icon: <Settings className="text-primary h-6 w-6" />,
      title: "Quản trị hệ thống",
      description: "Cấu hình và quản lý người dùng",
    },
  ];

  const userRoles = [
    {
      role: "Admin",
      description: "Quản trị toàn bộ hệ thống",
      icon: <Settings className="text-info h-8 w-8" />,
    },
    {
      role: "Nhân viên",
      description: "Quản lý khách hàng và lịch hẹn",
      icon: <Users className="text-primary h-8 w-8" />,
    },
    {
      role: "Bác sĩ thú y",
      description: "Quản lý lịch làm việc và tiêm chủng",
      icon: <Stethoscope className="text-purple h-8 w-8" />,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={vaxpetLogo} alt="VaxPet Logo" className="h-12 w-auto" />
              <div>
                <h1 className="font-inter-700 text-dark text-xl">VaxPet</h1>
                <p className="font-nunito text-sm text-gray-600">
                  Pet Vaccination Management System
                </p>
              </div>
            </div>
            <Button
              onClick={() => navigate("/login")}
              className="bg-primary hover:bg-primary/90 font-nunito"
            >
              Đăng nhập
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h2 className="font-inter-700 text-dark mb-4 text-4xl">
            VaxPet - Hệ thống quản lý tiêm chủng thú cưng
          </h2>
          <p className="font-nunito mx-auto max-w-3xl text-xl text-gray-600">
            Giải pháp quản lý toàn diện cho phòng khám thú y - từ lịch hẹn đến
            báo cáo thống kê
          </p>
        </div>

        {/* User Roles Section */}
        <div className="mb-16">
          <h3 className="font-nunito-600 text-dark mb-8 text-center text-2xl">
            Dành cho các vai trò trong hệ thống
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            {userRoles.map((role, index) => (
              <div
                key={index}
                className="rounded-none border border-gray-200 bg-white p-6 text-center shadow-md"
              >
                <div className="mb-4 flex justify-center">{role.icon}</div>
                <h4 className="font-nunito-600 text-dark mb-2 text-xl">
                  {role.role}
                </h4>
                <p className="text-gray-600">{role.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* System Features */}
        <div className="mb-16">
          <h3 className="font-nunito-600 text-dark mb-8 text-center text-2xl">
            Tính năng chính
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {systemFeatures.map((feature, index) => (
              <div
                key={index}
                className="rounded-none border border-gray-200 bg-white p-6 shadow-md"
              >
                <div className="mb-3">{feature.icon}</div>
                <h4 className="font-nunito-600 text-dark mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Login CTA */}
        <div className="bg-primary rounded-none p-8 text-center text-white">
          <h3 className="font-nunito-600 mb-4 text-2xl">
            Bắt đầu sử dụng hệ thống
          </h3>
          <p className="font-nunito mb-6 text-lg opacity-90">
            Đăng nhập để truy cập vào các chức năng quản lý
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/login")}
            className="text-primary font-nunito bg-white hover:bg-gray-50"
          >
            Đăng nhập hệ thống
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="font-nunito text-sm text-gray-500">
            © 2025 VaxPet - Pet Vaccination Management System. All rights
            reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
