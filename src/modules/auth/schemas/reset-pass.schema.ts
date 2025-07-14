import { z } from "zod";

export const resetPassSchema = z.object({
  email: z.string().email("Email không hợp lệ").min(1, "Vui lòng nhập email"),
  verificationCode: z.string().min(1, "Vui lòng nhập mã xác thực"),
  password: z
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ in hoa")
    .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất một số")
    .regex(/[^A-Za-z0-9]/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"),
});

export type ResetPassSchema = z.infer<typeof resetPassSchema>;
