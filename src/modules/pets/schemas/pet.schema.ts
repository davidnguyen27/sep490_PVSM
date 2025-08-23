import { z } from "zod";

// Base schema with common fields
const basePetSchema = z.object({
  customerId: z.string().min(1, "Chọn khách hàng!"),
  name: z.string().min(1, "Nhập tên thú cưng!"),
  species: z.string().min(1, "Nhập thông tin loài!"),
  breed: z.string().min(1, "Nhập giống thú cưng!"),
  gender: z.string().min(1, "Chọn giới tính!"),
  dateOfBirth: z.string().min(1, "Chọn ngày sinh!"),
  placeToLive: z.string().min(1, "Nhập nơi ở!"),
  placeOfBirth: z.string().min(1, "Nhập nơi sinh!"),
  weight: z.string().min(1, "Nhập cân nặng của thú cưng!"),
  color: z.string().min(1, "Nhập màu sắc của thú cưng!"),
  nationality: z.string().min(1, "Nhập quốc tịch của thú cưng!"),
  isSterilized: z.boolean(),
});

// Schema for creating new pets (image required)
export const petCreateSchema = basePetSchema.extend({
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Chọn hình ảnh thú cưng!"),
});

// Schema for updating pets (image optional, can be File or string URL)
export const petSchema = basePetSchema.extend({
  image: z
    .union([
      z.instanceof(File), // New uploaded file
      z.string(), // Existing image URL from database
      z.undefined(), // No image
    ])
    .optional(),
});

export type PetCreateSchema = z.infer<typeof petCreateSchema>;
export type PetSchema = z.infer<typeof petSchema>;
