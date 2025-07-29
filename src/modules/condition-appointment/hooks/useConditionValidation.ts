import { useMemo } from "react";
import type { ConditionFormData } from "../types/state.type";

export function useConditionValidation(formData: ConditionFormData) {
  const isVetAssigned = useMemo(
    () => !!formData.vetSelection.vetId,
    [formData.vetSelection.vetId],
  );

  return {
    isVetAssigned,
  };
}
