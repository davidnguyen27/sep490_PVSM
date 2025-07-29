import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

import type {
  VaccinationFormData,
  VaccinationState,
} from "../types/state.type";
import type { VaccinationDetail } from "../types/detail.type";
import { mappingUtils } from "@/shared/utils/mapping.utils";

const initialFormData: VaccinationFormData = {
  diseaseId: null,
  vetSelection: {
    date: "",
    time: "",
    slot: null,
    vetId: null,
  },
  healthData: {
    temperature: "",
    generalCondition: "",
    heartRate: "",
    others: "",
  },
  resultData: {
    reaction: "",
    appointmentDate: "",
    notes: "",
  },
  selectedVaccineBatchId: null,
};

export const useVaccinationStore = create<VaccinationState>()(
  devtools(
    immer((set, get) => ({
      formData: initialFormData,
      activeStep: null,
      showReject: false,
      exportDetail: null,
      exportDetailVisible: false,
      isSubmitting: false,

      // Actions
      updateFormData: (updates) => {
        set((state) => {
          state.formData = {
            ...state.formData,
            ...updates,
          };
        });
      },

      setActiveStep: (step) =>
        set((state) => {
          state.activeStep = step;
        }),

      setShowReject: (show) =>
        set((state) => {
          state.showReject = show;
        }),

      setSubmitting: (val) =>
        set((state) => {
          state.isSubmitting = val;
        }),

      // Form field setters
      setSelectedDiseaseId: (diseaseId) =>
        set((state) => {
          state.formData.diseaseId = diseaseId;
        }),

      setVetSelection: (vetSelection) =>
        set((state) => {
          state.formData.vetSelection = {
            ...state.formData.vetSelection,
            ...vetSelection,
          };
        }),

      setHealthData: (healthData) =>
        set((state) => {
          state.formData.healthData = healthData;
        }),

      setResultData: (resultData) =>
        set((state) => {
          state.formData.resultData =
            typeof resultData === "function"
              ? resultData(state.formData.resultData)
              : resultData;
        }),

      setSelectedVaccineBatchId: (vaccineBatchId) =>
        set((state) => {
          state.formData.selectedVaccineBatchId = vaccineBatchId;
        }),

      setExportDetailVisible: (visible: boolean) =>
        set((state) => {
          state.exportDetailVisible = visible;
        }),

      setExportDetail: (detail) =>
        set((state) => {
          state.exportDetail = detail;
        }),
      resetForm: () =>
        set(() => ({
          formData: initialFormData,
          activeStep: null,
          showReject: false,
          isSubmitting: false,
        })),

      initializeFromAPI: (data: VaccinationDetail) => {
        set((state) => {
          // Safe property access with fallbacks
          const scheduleResponse = data.vet?.scheduleResponse?.[0];

          state.formData = {
            diseaseId: data.disease?.diseaseId ?? null,
            vetSelection: {
              date: data.vet?.scheduleResponse?.[0]?.scheduleDate ?? "",
              time: scheduleResponse?.slotNumber
                ? (mappingUtils.mapSlotToTime(scheduleResponse.slotNumber) ??
                  "")
                : "",
              slot: scheduleResponse?.slotNumber ?? null,
              vetId: data.vet?.vetId ?? null,
            },
            healthData: {
              temperature: data.temperature ?? "",
              generalCondition: data.generalCondition ?? "",
              heartRate: data.heartRate ?? "",
              others: data.others ?? "",
            },
            resultData: {
              reaction: data.reaction ?? "",
              appointmentDate: data.appointmentDate ?? "",
              notes: data.notes ?? "",
            },
            selectedVaccineBatchId: data.vaccineBatch?.vaccineBatchId ?? null,
          };
        });
      },

      // Validation helpers
      isStepValid: (step) => {
        const { formData } = get();
        switch (step) {
          case 1:
            return !!formData.diseaseId;
          case 2:
            return !!formData.vetSelection.vetId;
          case 3:
            return (
              !!formData.selectedVaccineBatchId &&
              formData.resultData.reaction !== "" &&
              formData.resultData.appointmentDate !== ""
            );
          case 4:
            return !!formData.selectedVaccineBatchId;
          default:
            return false;
        }
      },

      canEditStep: (step, currentStatus) => step === currentStatus,

      // Computed getters
      getCurrentStepData: () => {
        const { formData } = get();
        return formData;
      },

      getStepValidationStatus: () => {
        const { isStepValid } = get();
        return {
          step1: isStepValid(1),
          step2: isStepValid(2),
          step3: isStepValid(3),
          step4: isStepValid(4),
        };
      },
    })),
    { name: "vaccination-store" },
  ),
);

// Selectors for better performance
export const useVaccinationValidation = () =>
  useVaccinationStore((state) => ({
    isStepValid: state.isStepValid,
    canEditStep: state.canEditStep,
    getStepValidationStatus: state.getStepValidationStatus,
  }));
