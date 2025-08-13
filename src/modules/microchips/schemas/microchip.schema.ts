import { z } from "zod";

export const microchipSchema = z.object({
  microchipCode: z.string().min(1, "Mã vi mạch không được để trống"),
  name: z.string().min(1, "Tên microchip không được để trống"),
  description: z.string().min(1, "Mô tả không được để trống"),
  price: z
    .number({
      invalid_type_error: "Giá phải là một số",
      required_error: "Giá không được để trống",
    })
    .min(0, "Giá tiền không hợp lệ"),
  notes: z.string().min(1, "Ghi chú không được để trống"),
  // Microchip Item fields
  petId: z.number(),
  itemName: z.string().min(1, "Tên item không được để trống"),
  itemDescription: z.string().min(1, "Mô tả item không được để trống"),
  location: z.string().min(1, "Vị trí không được để trống"),
  installationDate: z.string().min(1, "Ngày cài đặt không được để trống"),
});

export type MicrochipSchema = z.infer<typeof microchipSchema>;
