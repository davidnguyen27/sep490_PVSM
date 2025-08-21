export interface VaccineSchedulePayload {
  diseaseId: number | null;
  species: string;
  doseNumber: number;
  ageInterval: number;
}
