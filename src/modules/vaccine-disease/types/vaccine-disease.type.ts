import type { Disease } from "@/modules/diseases";
import type { Vaccine } from "@/modules/vaccines";

export interface VaccineDisease {
  vaccineDiseaseId: number | null;
  vaccineId: number | null;
  diseaseId: number | null;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  isDeleted: boolean;
  vaccineResponseDTO: Vaccine | null;
  diseaseResponseDTO: Disease | null;
}
