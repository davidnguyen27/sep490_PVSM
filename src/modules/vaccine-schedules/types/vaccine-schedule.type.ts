export interface VaccineSchedule {
  vaccinationScheduleId: number | null;
  diseaseId: number | null;
  species: string;
  doseNumber: number;
  ageInterval: number;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  disease: {
    diseaseId: number | null;
    name: string;
    species: string;
    description: string;
  };
}
