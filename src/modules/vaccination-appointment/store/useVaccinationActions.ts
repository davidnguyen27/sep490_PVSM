import { useVaccinationStore } from "./useVaccinationStore";

export const useVaccinationActions = () =>
  useVaccinationStore((state) => ({
    setSelectedDiseaseId: state.setSelectedDiseaseId,
    setVetSelection: state.setVetSelection,
    setHealthData: state.setHealthData,
    setResultData: state.setResultData,
    setSelectedVaccineBatchId: state.setSelectedVaccineBatchId,
    setActiveStep: state.setActiveStep,
    setShowReject: state.setShowReject,
    resetForm: state.resetForm,
    initializeFromAPI: state.initializeFromAPI,
  }));
