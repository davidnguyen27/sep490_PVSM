import ResetPassForm from "@/modules/auth/components/ResetPassForm";
import AuthLayout from "@/shared/layouts/AuthLayout";

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <h2 className="text-primary font-inter-700 text-2xl whitespace-nowrap sm:text-3xl md:text-4xl">
        Lấy lại mật khẩu
      </h2>
      <p className="text-dark font-nunito-400 mt-4 mb-8 text-base sm:text-lg">
        Vui lòng kiểm tra email để lấy mã OTP
      </p>
      <ResetPassForm />
    </AuthLayout>
  );
}
