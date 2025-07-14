import AuthLayout from "@/shared/layouts/AuthLayout";
import LoginForm from "../components/LoginForm";

export default function VetPage() {
  return (
    <AuthLayout>
      <h2 className="text-primary font-inter-700 text-2xl whitespace-nowrap sm:text-3xl md:text-4xl">
        Đăng nhập cho Nhân Viên
      </h2>
      <p className="text-dark font-nunito-400 mt-4 mb-8 text-base sm:text-lg">
        Dành cho nhân viên hỗ trợ tiêm chủng
      </p>
      <LoginForm />
    </AuthLayout>
  );
}
