import { z } from "zod";

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
});

export type VaccineReceiptCreateFormData = z.infer<
  typeof vaccineReceiptCreateSchema
>;

export type VaccineReceiptUpdateFormData = z.infer<
  typeof vaccineReceiptUpdateSchema
>;
