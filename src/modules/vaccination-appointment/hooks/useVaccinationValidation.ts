import { useMemo } from "react";
import type { VaccinationFormData } from "../types/state.type";

export function useVaccinationValidation(formData: VaccinationFormData) {
  const isStep1Valid = useMemo(
    () => formData.diseaseId !== null,
    [formData.diseaseId],
  );

  const isStep2Valid = useMemo(
    () => !!formData.vetSelection.vetId,
    [formData.vetSelection.vetId],
  );

  const isStep3Valid = useMemo(
    () =>
      !!formData.selectedVaccineBatchId &&
      !!formData.resultData.reaction &&
      !!formData.resultData.appointmentDate,
    [
      formData.selectedVaccineBatchId,
      formData.resultData.reaction,
      formData.resultData.appointmentDate,
    ],
  );

  return {
    isStep1Valid,
    isStep2Valid,
    isStep3Valid,
  };
}
