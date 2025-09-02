import { z } from "zod";

// Schema for vaccine export detail
const vaccineExportDetailSchema = z.object({
  vaccineBatchId: z.number({
    required_error: "Lô vaccine là bắt buộc",
  }),
  quantity: z
    .number({
      required_error: "Số lượng là bắt buộc",
    })
    .min(1, "Số lượng phải lớn hơn 0"),
  purpose: z.enum(["hủy lô", "trả hàng", "tiêm phòng"], {
    required_error: "Mục đích là bắt buộc",
    invalid_type_error:
      "Mục đích phải là một trong các giá trị: hủy, bán, chuyển kho",
  }),
  notes: z.string().optional(),
  coldChainLog: z.object({
    temperature: z.number({
      required_error: "Nhiệt độ là bắt buộc",
    }),
    humidity: z.number({
      required_error: "Độ ẩm là bắt buộc",
    }),
    event: z.string().min(1, "Sự kiện là bắt buộc"),
    notes: z.string().optional(),
  }),
});

export { vaccineExportDetailSchema };

export const createVaccineExportSchema = z.object({
  exportDate: z.string().min(1, "Ngày xuất kho là bắt buộc"),
  details: z
    .array(vaccineExportDetailSchema)
    .min(1, "Phải có ít nhất một vaccine detail"),
});

export const updateVaccineExportSchema = z.object({
  exportDate: z.string().min(1, "Ngày xuất kho là bắt buộc"),
});

export type CreateVaccineExportFormData = z.infer<
  typeof createVaccineExportSchema
>;

export type VaccineExportDetailFormData = z.infer<
  typeof vaccineExportDetailSchema
>;

export type UpdateVaccineExportFormData = z.infer<
  typeof updateVaccineExportSchema
>;
