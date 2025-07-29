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
  FormMessage,
  Input,
  Button,
} from "@/components/ui";
import {
  resetPassSchema,
  type ResetPassSchema,
} from "../schemas/reset-pass.schema";

export default function ResetPassForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<ResetPassSchema>({
    resolver: zodResolver(resetPassSchema),
    defaultValues: {
      email: "",
      verificationCode: "",
      password: "",
    },
  });

  const onSubmit = (data: ResetPassSchema) => {
    console.log("Reset password:", data);
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
                  placeholder="admin@example.com"
                  className="focus:border-primary focus:ring-primary mx-auto h-12 w-full max-w-md focus:ring-1"
                  {...field}
                />
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
                    className="text-primary font-nunito absolute top-1/2 right-3 -translate-y-1/2 text-sm hover:underline"
                    onClick={() => alert("Gửi mã!")}
                  >
                    Gửi mã
                  </button>
                </div>
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
                Mật khẩu mới
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

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-10">
              <FormLabel className="text-dark font-nunito-500">
                Nhập lại mật khẩu
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

        {/* Submit */}
        <Button
          type="submit"
          className="bg-primary font-inter-500 mx-auto h-12 w-full max-w-md text-lg text-white"
        >
          Cập nhật mật khẩu
        </Button>
      </form>
    </Form>
  );
}
