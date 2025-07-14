import { z } from "zod";

export const vetSchema = z.object({
  name: z.string().min(1, "Tên bác sĩ thú y không được để trống"),
  specialization: z.string().min(1, "Chuyên khoa không được để trống"),
  image: z.string().url("Hình ảnh phải là một URL hợp lệ"),
  dateOfBirth: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Ngày sinh không hợp lệ"),
  phoneNumber: z
    .string()
    .min(1, "Số điện thoại không được để trống")
    .regex(/^\d{10,11}$/, "Số điện thoại phải có 10 hoặc 11 chữ số"),
});

export type VetSchema = z.infer<typeof vetSchema>;
