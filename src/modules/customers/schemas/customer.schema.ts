import { z } from "zod";

export const customerUpdateSchema = z.object({
  fullName: z.string().min(1, "Họ tên không được để trống"),
  userName: z.string().min(1, "Tên đăng nhập không được để trống"),
  phoneNumber: z
    .string()
    .regex(
      /^\d{10}$/,
      "Số điện thoại phải gồm đúng 10 số và không chứa ký tự chữ",
    ),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  dateOfBirth: z
    .string()
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Ngày sinh phải đúng định dạng dd/mm/yyyy (ví dụ: 31/12/2000)",
    ),
  gender: z.enum(["Male", "Female"], {
    required_error: "Vui lòng chọn giới tính",
  }),
  address: z.string().min(1, "Địa chỉ không được để trống"),
});

export type CustomerUpdateSchema = z.infer<typeof customerUpdateSchema>;
