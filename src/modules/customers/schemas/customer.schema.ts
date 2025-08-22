import { z } from "zod";

export const customerUpdateSchema = z.object({
  fullName: z.string().min(1, "Họ tên không được để trống"),
  userName: z.string().min(1, "Tên đăng nhập không được để trống"),
  phoneNumber: z.string().min(10, "Số điện thoại phải ít nhất 10 số"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  dateOfBirth: z.string().min(1, "Ngày sinh không được để trống"),
  gender: z.enum(["Male", "Female"], {
    required_error: "Vui lòng chọn giới tính",
  }),
  address: z.string().min(1, "Địa chỉ không được để trống"),
});

export type CustomerUpdateSchema = z.infer<typeof customerUpdateSchema>;
