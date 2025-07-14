import type { MicrochipDetail } from "./detail.type";

export interface VetSelection {
  date: string;
  time: string;
  slot: number | null;
  vetId: number | null;
}

export interface MicrochipFormData {
  vetSelection: VetSelection;
  microchipItemId: number | null;
  result: { description: string; note: string };
}

export interface MicrochipState {
  activeStep: number | null;
  formData: MicrochipFormData;
  showReject: boolean;
  setActiveStep: (step: number | null) => void;
  setFormData: (data: Partial<MicrochipFormData>) => void;
  setVetSelection: (data: Partial<VetSelection>) => void;
  setResult: (data: Partial<{ description: string; note: string }>) => void;
  setShowReject: (val: boolean) => void;
  initializeFromAPI: (data: MicrochipDetail) => void;
  reset: () => void;
}
