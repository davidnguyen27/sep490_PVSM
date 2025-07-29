import { useMemo } from "react";
import type { VaccinationFormData } from "../types/state.type";

export function useVaccinationValidation(formData: VaccinationFormData) {
  const isConfirmValid = useMemo(
    () => formData.diseaseId !== null,
    [formData.diseaseId],
  );

  const isCheckInValid = useMemo(
    () => !!formData.vetSelection.vetId,
    [formData.vetSelection.vetId],
  );

  const isInjectValid = useMemo(
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
    isConfirmValid,
    isCheckInValid,
    isInjectValid,
  };
}
