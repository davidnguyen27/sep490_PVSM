import { z } from "zod";

// Schema for vaccine receipt detail
const vaccineReceiptDetailSchema = z.object({
  vaccineBatchId: z.number({
    required_error: "Lô vaccine là bắt buộc",
  }),
  suppiler: z.string().min(1, "Nhà cung cấp là bắt buộc"),
  quantity: z
    .number({
      required_error: "Số lượng là bắt buộc",
    })
    .min(1, "Số lượng phải lớn hơn 0"),
  vaccineStatus: z.string().min(1, "Trạng thái vaccine là bắt buộc"),
  notes: z.string().optional(),
  coldChainLog: z.object({
    logTime: z.string().min(1, "Thời gian log là bắt buộc"),
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

export { vaccineReceiptDetailSchema };

export const vaccineReceiptCreateSchema = z.object({
  receiptDate: z
    .date({
      required_error: "Ngày nhập là bắt buộc",
      invalid_type_error: "Ngày nhập không hợp lệ",
    })
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        return date <= today;
      },
      {
        message: "Ngày nhập không được vượt quá ngày hiện tại",
      },
    ),
  details: z
    .array(vaccineReceiptDetailSchema)
    .min(1, "Phải có ít nhất một vaccine detail"),
});

export const vaccineReceiptUpdateSchema = z.object({
  receiptDate: z
    .date({
      required_error: "Ngày nhập là bắt buộc",
      invalid_type_error: "Ngày nhập không hợp lệ",
    })
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        return date <= today;
      },
      {
        message: "Ngày nhập không được vượt quá ngày hiện tại",
      },
    ),
  details: z
    .array(vaccineReceiptDetailSchema)
    .min(1, "Phải có ít nhất một vaccine detail"),
});

export type VaccineReceiptCreateFormData = z.infer<
  typeof vaccineReceiptCreateSchema
>;

export type VaccineReceiptDetailFormData = z.infer<
  typeof vaccineReceiptDetailSchema
>;

export type VaccineReceiptUpdateFormData = z.infer<
  typeof vaccineReceiptUpdateSchema
>;
