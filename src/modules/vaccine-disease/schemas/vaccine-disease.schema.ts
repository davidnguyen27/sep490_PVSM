import { z } from "zod";

export const vaccineDiseaseSchema = z.object({
  vaccineId: z.number().min(1, "Vui lòng chọn vaccine"),
  diseaseId: z.number().min(1, "Vui lòng chọn bệnh tật"),
});

export type VaccineDiseaseFormData = z.infer<typeof vaccineDiseaseSchema>;
