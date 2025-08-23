import { z } from "zod";

export const voucherSchema = z.object({
  voucherName: z
    .string()
    .min(1, "Tên voucher không được để trống")
    .max(100, "Tên voucher không được quá 100 ký tự"),
  pointsRequired: z
    .number()
    .min(0, "Điểm yêu cầu phải lớn hơn hoặc bằng 0")
    .max(999999, "Điểm yêu cầu không được quá 999999"),
  description: z
    .string()
    .min(1, "Mô tả không được để trống")
    .max(500, "Mô tả không được quá 500 ký tự"),
  discountAmount: z
    .number()
    .min(0, "% giảm giá phải lớn hơn hoặc bằng 0")
    .max(100, "% giảm giá không được quá 100"),
  expirationDate: z
    .string()
    .min(1, "Ngày hết hạn không được để trống")
    .refine((date) => new Date(date) > new Date(), {
      message: "Ngày hết hạn phải sau ngày hiện tại",
    }),
});

export type VoucherFormData = z.infer<typeof voucherSchema>;
