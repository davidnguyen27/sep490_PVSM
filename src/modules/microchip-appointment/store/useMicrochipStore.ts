import { create } from "zustand";
import type { MicrochipFormData, MicrochipState } from "../types/state.type";

const initialFormData: MicrochipFormData = {
  vetSelection: { date: "", time: "", slot: null, vetId: null },
  microchipItemId: null,
  result: { location: "", note: "" },
};

export const useMicrochipStore = create<MicrochipState>((set) => ({
  activeStep: null,
  showReject: false,
  formData: initialFormData,
  setActiveStep: (step) => set({ activeStep: step }),
  setShowReject: (val) => set({ showReject: val }),
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  setVetSelection: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        vetSelection: { ...state.formData.vetSelection, ...data },
      },
    })),
  setResult: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        result: { ...state.formData.result, ...data },
      },
    })),
  initializeFromAPI: () => {
    set({
      formData: {
        ...initialFormData,
      },
    });
  },
  reset: () => set({ activeStep: null, formData: initialFormData }),
}));
