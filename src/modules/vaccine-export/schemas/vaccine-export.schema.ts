import { z } from "zod";

export const createVaccineExportSchema = z.object({
  exportDate: z.string().min(1, "Ngày xuất kho là bắt buộc"),
});

export const updateVaccineExportSchema = z.object({
  exportDate: z.string().min(1, "Ngày xuất kho là bắt buộc"),
});

export type CreateVaccineExportFormData = z.infer<
  typeof createVaccineExportSchema
>;

export type UpdateVaccineExportFormData = z.infer<
  typeof updateVaccineExportSchema
>;
