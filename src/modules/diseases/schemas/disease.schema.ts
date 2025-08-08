import { z } from "zod";

export const diseaseSchema = z.object({
  name: z.string().min(1, "Tên bệnh là bắt buộc"),
  description: z.string().min(1, "Mô tả là bắt buộc"),
  species: z.string().min(1, "Loài là bắt buộc"),
  symptoms: z.string().min(1, "Triệu chứng là bắt buộc"),
  treatment: z.string().min(1, "Phương pháp điều trị là bắt buộc"),
});

export type DiseaseFormData = z.infer<typeof diseaseSchema>;
