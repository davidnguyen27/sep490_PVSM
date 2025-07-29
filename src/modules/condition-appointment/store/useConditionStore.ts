import { create } from "zustand";
import type { ConditionFormData, ConditionState } from "../types/state.type";
import type { ConditionAppointments } from "../types/condition.type";

const initialFormData: ConditionFormData = {
  vetSelection: { appointmentDate: "", vetId: null },
  petId: null,
  healthConditionId: null,
  microchipItemId: null,
  note: "",
  vitalSigns: {
    heartRate: "",
    breathingRate: "",
    weight: "",
    temperature: "",
  },
  healthCheck: {
    eHNM: "",
    skinAFur: "",
    digestion: "",
    respiratory: "",
    excrete: "",
    behavior: "",
    psycho: "",
    different: "",
    conclusion: "",
  },
};

export const useConditionStore = create<ConditionState>((set) => ({
  activeStep: null,
  showReject: false,
  formData: initialFormData,

  setActiveStep: (step) => set({ activeStep: step }),
  setShowReject: (val) => set({ showReject: val }),

  setFormData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),

  setVetSelection: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        vetSelection: {
          ...state.formData.vetSelection,
          ...data,
        },
      },
    })),

  setVitalSigns: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        vitalSigns: {
          ...state.formData.vitalSigns,
          ...data,
        },
      },
    })),

  setHealthCheck: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        healthCheck: {
          ...state.formData.healthCheck,
          ...data,
        },
      },
    })),

  initializeFromAPI: (data: ConditionAppointments) =>
    set(() => ({
      formData: {
        ...initialFormData,
        vetSelection: {
          appointmentDate: data?.appointmentDate || "",
          vetId: data?.vetId ?? null,
        },
        petId: data?.appointment?.petResponseDTO?.petId ?? null,
        healthConditionId: data?.healthConditionId ?? null,
        microchipItemId: data?.healthCondition?.microchipItemId ?? null,
        note: data?.notes ?? "",
        vitalSigns: {
          heartRate: data?.healthCondition?.heartRate ?? "",
          breathingRate: data?.healthCondition?.breathingRate ?? "",
          weight: data?.healthCondition?.weight ?? "",
          temperature: data?.healthCondition?.temperature ?? "",
        },
        healthCheck: {
          eHNM: data?.healthCondition?.ehnm ?? "",
          skinAFur: data?.healthCondition?.skinAFur ?? "",
          digestion: data?.healthCondition?.digestion ?? "",
          respiratory: data?.healthCondition?.respiratory ?? "",
          excrete: data?.healthCondition?.excrete ?? "",
          behavior: data?.healthCondition?.behavior ?? "",
          psycho: data?.healthCondition?.psycho ?? "",
          different: data?.healthCondition?.different ?? "",
          conclusion: data?.healthCondition?.conclusion ?? "",
        },
      },
    })),

  reset: () =>
    set({
      activeStep: null,
      showReject: false,
      formData: initialFormData,
    }),
}));
