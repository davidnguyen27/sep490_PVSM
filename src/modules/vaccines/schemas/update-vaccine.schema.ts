import { z } from "zod";

export const updateVaccineSchema = z.object({
  name: z
    .string()
    .min(1, "Tên vaccine là bắt buộc")
    .min(2, "Tên vaccine phải có ít nhất 2 ký tự")
    .max(100, "Tên vaccine không được quá 100 ký tự"),

  description: z
    .string()
    .min(1, "Mô tả là bắt buộc")
    .min(10, "Mô tả phải có ít nhất 10 ký tự")
    .max(500, "Mô tả không được quá 500 ký tự"),

  price: z
    .number({
      required_error: "Giá là bắt buộc",
      invalid_type_error: "Giá phải là số",
    })
    .min(1000, "Giá phải ít nhất 1,000 VNĐ")
    .max(50000000, "Giá không được quá 50,000,000 VNĐ"),

  image: z
    .union([
      z.instanceof(File),
      z.string().url("URL hình ảnh không hợp lệ"),
      z.null(),
    ])
    .optional()
    .refine((value) => {
      if (value instanceof File) {
        return value.size <= 5 * 1024 * 1024;
      }
      return true;
    }, "Kích thước file không được quá 5MB")
    .refine((value) => {
      if (value instanceof File) {
        return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          value.type,
        );
      }
      return true;
    }, "Chỉ hỗ trợ file ảnh định dạng JPEG, PNG, WEBP"),

  notes: z
    .string()
    .max(500, "Ghi chú không được quá 500 ký tự")
    .optional()
    .or(z.literal("")),
});

export type UpdateVaccineFormData = z.infer<typeof updateVaccineSchema>;
