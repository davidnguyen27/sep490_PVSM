import { z } from "zod";

export const vaccineBatchSchema = z
  .object({
    vaccineId: z
      .number({
        required_error: "Vui lòng chọn vaccine",
      })
      .min(1, "Vui lòng chọn vaccine"),

    manufactureDate: z
      .string({
        required_error: "Vui lòng chọn ngày sản xuất",
      })
      .min(1, "Vui lòng chọn ngày sản xuất"),

    expiryDate: z
      .string({
        required_error: "Vui lòng chọn ngày hết hạn",
      })
      .min(1, "Vui lòng chọn ngày hết hạn"),

    manufacturer: z
      .string({
        required_error: "Vui lòng nhập nhà sản xuất",
      })
      .min(1, "Vui lòng nhập nhà sản xuất")
      .max(255, "Nhà sản xuất không được vượt quá 255 ký tự"),

    source: z
      .string({
        required_error: "Vui lòng nhập nguồn gốc",
      })
      .min(1, "Vui lòng nhập nguồn gốc")
      .max(255, "Nguồn gốc không được vượt quá 255 ký tự"),

    storageCondition: z
      .string({
        required_error: "Vui lòng nhập điều kiện bảo quản",
      })
      .min(1, "Vui lòng nhập điều kiện bảo quản")
      .max(500, "Điều kiện bảo quản không được vượt quá 500 ký tự"),
  })
  .refine(
    (data) => {
      const manufactureDate = new Date(data.manufactureDate);
      const expiryDate = new Date(data.expiryDate);
      return expiryDate > manufactureDate;
    },
    {
      message: "Ngày hết hạn phải sau ngày sản xuất",
      path: ["expiryDate"],
    },
  );

export type VaccineBatchFormData = z.infer<typeof vaccineBatchSchema>;
