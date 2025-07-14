export interface UpdateStatusParams {
  appointmentId: number;
  appointmentStatus: number;
  vetId?: number;
  diseaseId?: number;
  vaccineBatchId?: number;
  reaction?: string;
  temperature?: string;
  heartRate?: string;
  generalCondition?: string;
  others?: string;
  notes?: string;
  appointmentDate?: string;
}
