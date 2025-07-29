export interface UpdateStatusPayload {
  appointmentId: number | null;
  vetId?: number | null;
  note: string;
  appointmentDate: string;
  appointmentStatus: number;
  healthConditionId: number | null;
  petId: number | null;
  microchipItemId: number | null;
  heartRate: string;
  breathingRate: string;
  weight: string;
  temperature: string;
  eHNM: string;
  skinAFur: string;
  digestion: string;
  respiratory: string;
  excrete: string;
  behavior: string;
  psycho: string;
  different: string;
  conclusion: string;
}
