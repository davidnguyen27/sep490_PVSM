import type { VaccineBatch } from "@/modules/vaccine-batch";

export interface VetSelectionData {
  date: string;
  time: string;
  slot: number | null;
  vetId: number | null;
}

export interface HealthCheckData {
  temperature: string;
  generalCondition: string;
  heartRate: string;
  others: string;
}

export interface VaccineSelectionData {
  selectedVaccineId: number | null;
  selectedBatch: VaccineBatch | null;
}

export interface Step2FormData {
  vetSelection: VetSelectionData;
  healthData: HealthCheckData;
  vaccineSelection: VaccineSelectionData;
}
