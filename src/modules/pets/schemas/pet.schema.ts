import { z } from "zod";

export const petSchema = z.object({
  name: z.string().min(1, "Nhập tên thú cưng!"),
  species: z.string().min(1, "Nhập thông tin loài!"),
  breed: z.string().min(1, "Nhập giống thú cưng!"),
  gender: z.string().min(1, "Chọn giới tính!"),
  dateOfBirth: z.string().min(1, "Chọn ngày sinh!"),
  placeToLive: z.string().min(1, "Nhập nơi ở!"),
  placeOfBirth: z.string().min(1, "Nhập nơi sinh!"),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Chọn hình ảnh thú cưng!"),
  weight: z.string().min(1, "Nhập cân nặng của thú cưng!"),
  color: z.string().min(1, "Nhập màu sắc của thú cưng!"),
  nationality: z.string().min(1, "Nhập quốc tịch của thú cưng!"),
  isSterilized: z.boolean(),
});

export type PetSchema = z.infer<typeof petSchema>;
