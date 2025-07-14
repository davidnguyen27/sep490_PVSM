import { Button } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, UserCog, Stethoscope } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  const roleOptions = [
    {
      label: "Quản trị viên",
      icon: <ShieldCheck className="text-primary h-10 w-10" />,
      description: "Quản lý hệ thống, người dùng, và các hoạt động tiêm chủng.",
      href: "/admin/login",
    },
    {
      label: "Nhân viên",
      icon: <UserCog className="text-primary h-10 w-10" />,
      description:
        "Hỗ trợ khách hàng, xử lý thông tin tiêm chủng và thanh toán.",
      href: "/staff/login",
    },
    {
      label: "Bác sĩ thú y",
      icon: <Stethoscope className="text-primary h-10 w-10" />,
      description: "Khám bệnh, tiêm chủng và theo dõi thú cưng sau tiêm.",
      href: "/vet/login",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white via-[#E6FFFC] to-[#DFFAF7] px-4 py-12">
      <h1 className="text-primary font-inter mb-2 text-center text-4xl font-bold">
        Hệ thống quản lý tiêm chủng thú cưng
      </h1>
      <p className="mb-10 max-w-xl text-center text-lg text-gray-600">
        Vui lòng chọn vai trò để đăng nhập vào hệ thống.
      </p>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {roleOptions.map((role) => (
          <div
            key={role.label}
            className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 shadow-xl transition hover:shadow-2xl"
          >
            <div className="mb-4">{role.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800">
              {role.label}
            </h2>
            <p className="mt-2 mb-4 text-center text-sm text-gray-500">
              {role.description}
            </p>
            <Button
              className="bg-primary hover:bg-second mt-auto w-full text-white"
              onClick={() => navigate(role.href)}
            >
              Đăng nhập
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}
