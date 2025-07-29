import type { ConditionAppointments } from "./condition.type";

export interface VitalSigns {
  heartRate: string;
  breathingRate: string;
  weight: string;
  temperature: string;
}

export interface HealthCheck {
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

export interface VetSelection {
  appointmentDate: string;
  vetId: number | null;
}

export interface ConditionFormData {
  vetSelection: VetSelection;
  petId: number | null;
  healthConditionId: number | null;
  microchipItemId: number | null;
  note: string;
  vitalSigns: VitalSigns;
  healthCheck: HealthCheck;
}

export interface ConditionState {
  activeStep: number | null;
  showReject: boolean;
  formData: ConditionFormData;

  setActiveStep: (step: number | null) => void;
  setShowReject: (val: boolean) => void;
  setFormData: (data: Partial<ConditionFormData>) => void;

  setVetSelection: (data: Partial<VetSelection>) => void;
  setVitalSigns: (data: Partial<VitalSigns>) => void;
  setHealthCheck: (data: Partial<HealthCheck>) => void;

  initializeFromAPI: (data: ConditionAppointments) => void;
  reset: () => void;
}
