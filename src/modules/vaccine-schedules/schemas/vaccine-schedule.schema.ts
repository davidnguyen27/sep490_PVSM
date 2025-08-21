import { z } from "zod";

export const createVaccineScheduleSchema = z.object({
  diseaseId: z.number({
    required_error: "Vui lòng chọn bệnh",
  }),
  species: z.enum(["dog", "cat"], {
    required_error: "Vui lòng chọn loài",
  }),
  doseNumber: z
    .number({
      required_error: "Vui lòng nhập số mũi tiêm",
    })
    .min(1, "Số mũi tiêm phải lớn hơn 0")
    .max(10, "Số mũi tiêm không được quá 10"),
  ageInterval: z
    .number({
      required_error: "Vui lòng nhập khoảng cách tuổi",
    })
    .min(1, "Khoảng cách tuổi phải lớn hơn 0 tuần")
    .max(520, "Khoảng cách tuổi không được quá 520 tuần"),
});

export type CreateVaccineScheduleFormData = z.infer<
  typeof createVaccineScheduleSchema
>;
