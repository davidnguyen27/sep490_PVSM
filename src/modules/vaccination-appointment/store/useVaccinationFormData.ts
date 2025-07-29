import { useVaccinationStore } from "./useVaccinationStore";

export const useVaccinationFormData = () =>
  useVaccinationStore((state) => state.formData);
