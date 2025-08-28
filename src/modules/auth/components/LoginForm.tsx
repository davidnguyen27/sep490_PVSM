import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { icons } from "@/shared/constants/icons.constants";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormMessage,
  Button,
} from "@/components/ui";
import { toast } from "sonner";
import { useCountdown } from "@/shared/hooks/useCountdown";
import { useSendOTP } from "../hooks/use-otp.mutation";
import { useLoginMutation } from "../hooks/use-login.mutation";
import { loginSchema, type LoginSchema } from "../schemas/login.schema";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isPending: isLoggingIn } = useLoginMutation();
  const { mutate: sendOtp, isPending: isSendingOtp } = useSendOTP();
  const countDown = useCountdown(240);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      verificationCode: "",
      remember: false,
    },
  });

  const handleSendOTP = () => {
    const { email, password } = form.getValues();

    if (!email || !password) {
      toast.error("Hãy nhập Email và Mật khẩu trước khi gửi mã.");
      return;
    }

    sendOtp({ email, password });

    countDown.start();
  };

  const onSubmit = async (data: LoginSchema) => {
    login({ email: data.email, otp: data.verificationCode });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-10">
              <FormLabel className="text-dark font-nunito-500">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  className="focus:border-primary focus:ring-primary mx-auto h-12 w-full max-w-md focus:ring-1"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-10">
              <FormLabel className="text-dark font-nunito-500">
                Mật khẩu
              </FormLabel>
              <FormControl>
                <div className="relative mx-auto w-full max-w-md">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    className="h-12 pr-10"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-dark absolute top-1/2 right-3 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <icons.EyeOff size={18} />
                    ) : (
                      <icons.Eye size={18} />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Verification Code */}
        <FormField
          control={form.control}
          name="verificationCode"
          render={({ field }) => (
            <FormItem className="mb-10">
              <FormLabel className="text-dark font-nunito-500">
                Mã xác thực
              </FormLabel>
              <FormControl>
                <div className="relative mx-auto w-full max-w-md">
                  <Input
                    placeholder="Nhập mã xác thực"
                    className="h-12 pr-16"
                    {...field}
                  />
                  <button
                    type="button"
                    disabled={isSendingOtp || countDown.isCounting}
                    onClick={handleSendOTP}
                    className="text-primary font-nunito absolute top-1/2 right-3 -translate-y-1/2 text-sm hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSendingOtp
                      ? "Đang gửi..."
                      : countDown.isCounting
                        ? `Gửi lại (${countDown.formatted})`
                        : "Gửi mã"}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Remember + Forgot */}
        <div className="mx-auto mb-8 flex w-full max-w-md items-center justify-between text-sm">
          <a
            href="/reset-password"
            className="text-primary font-nunito hover:underline"
          >
            Quên mật khẩu?
          </a>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="bg-primary font-inter-500 mx-auto h-12 w-full max-w-md text-lg text-white"
          disabled={isLoggingIn}
        >
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
}
