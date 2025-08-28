import { z } from "zod";

export const updateVaccinationAppointmentSchema = z.object({
  appointmentDate: z.date({
    required_error: "Ngày hẹn là bắt buộc",
    invalid_type_error: "Ngày hẹn không hợp lệ",
  }),
  serviceType: z
    .number({
      required_error: "Loại dịch vụ là bắt buộc",
      invalid_type_error: "Loại dịch vụ phải là số",
    })
    .min(1, "Vui lòng chọn loại dịch vụ"),
  location: z
    .number({
      required_error: "Địa điểm là bắt buộc",
      invalid_type_error: "Địa điểm phải là số",
    })
    .min(1, "Vui lòng chọn địa điểm"),
  address: z
    .string({
      required_error: "Địa chỉ là bắt buộc",
    })
    .min(1, "Địa chỉ không được để trống")
    .max(500, "Địa chỉ không được quá 500 ký tự"),
  diseaseId: z
    .number({
      invalid_type_error: "Bệnh cần tiêm phòng phải là số",
    })
    .nullable()
    .optional(),
});

export type UpdateVaccinationAppointmentForm = z.infer<
  typeof updateVaccinationAppointmentSchema
>;
