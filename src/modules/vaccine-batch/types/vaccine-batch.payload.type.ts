export interface VaccineBatchPayload {
  vaccineId: number;
  manufactureDate: string;
  expiryDate: string;
  manufacturer: string;
  source: string;
  storageCondition: string;
}
