import { z } from "zod";

export const vaccineReceiptDetailCreateSchema = z.object({
  vaccineReceiptId: z.number({
    required_error: "ID phiếu nhập là bắt buộc",
  }),
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
    vaccineBatchId: z.number().optional(),
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

export type VaccineReceiptDetailCreateFormData = z.infer<
  typeof vaccineReceiptDetailCreateSchema
>;
