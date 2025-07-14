import type { VaccinationDetail } from "./detail.type";

export interface VetSelection {
  date: string;
  time: string;
  slot: number | null;
  vetId: number | null;
}

export interface VaccinationFormData {
  diseaseId: number | null;
  vetSelection: VetSelection;
  healthData: {
    temperature: string;
    generalCondition: string;
    heartRate: string;
    others: string;
  };
  resultData: {
    reaction: string;
    appointmentDate: string;
    notes: string;
  };
  selectedVaccineBatchId: number | null;
}

export interface VaccinationState {
  formData: VaccinationFormData;
  activeStep: number | null;
  showReject: boolean;
  isSubmitting: boolean;

  updateFormData: (updates: Partial<VaccinationFormData>) => void;
  setActiveStep: (step: number | null) => void;
  setShowReject: (show: boolean) => void;
  setSubmitting: (val: boolean) => void;
  resetForm: () => void;
  initializeFromAPI: (data: VaccinationDetail) => void;

  isStepValid: (step: number) => boolean;
  canEditStep: (step: number, currentStatus: number) => boolean;

  setSelectedDiseaseId: (diseaseId: number | null) => void;
  setVetSelection: (data: Partial<VetSelection>) => void;
  setHealthData: (health: VaccinationFormData["healthData"]) => void;
  setSelectedVaccineBatchId: (id: number | null) => void;
  setResultData: (
    data:
      | VaccinationFormData["resultData"]
      | ((
          prev: VaccinationFormData["resultData"],
        ) => VaccinationFormData["resultData"]),
  ) => void;
  getStepValidationStatus: () => {
    step1: boolean;
    step2: boolean;
    step3: boolean;
    step4: boolean;
  };
}
