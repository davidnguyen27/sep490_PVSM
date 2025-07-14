import { useMemo } from "react";
import type { MicrochipFormData } from "../types/state.type";

export function useMicrochipValidation(formData: MicrochipFormData) {
  const isStep2Valid = useMemo(
    () => !!formData.vetSelection.vetId,
    [formData.vetSelection.vetId],
  );

  const isStep3Valid = useMemo(
    () => !!formData.microchipItemId && !!formData.result.description,
    [formData.microchipItemId, formData.result.description],
  );

  return {
    isStep2Valid,
    isStep3Valid,
  };
}
