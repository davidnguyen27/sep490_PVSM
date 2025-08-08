import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vaccineDiseaseService } from "../services/vaccine-disease.service";
import {
  VACCINE_DISEASE_QUERY_KEYS,
  VACCINE_DISEASE_MESSAGES,
} from "../constants";
import type { VaccineDiseasePayload } from "../types/vaccine-disease.payload.type";

export function useVaccineDiseaseAdd() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VaccineDiseasePayload) =>
      vaccineDiseaseService.createVaccineDisease(payload),
    onSuccess: () => {
      // Invalidate and refetch vaccine diseases list
      queryClient.invalidateQueries({
        queryKey: VACCINE_DISEASE_QUERY_KEYS.all,
      });
      // Also invalidate by-disease queries
      queryClient.invalidateQueries({
        queryKey: ["vaccine-disease", "by-disease"],
      });
      toast.success(VACCINE_DISEASE_MESSAGES.CREATE_SUCCESS);
    },
    onError: (error: Error) => {
      const errorMessage =
        error?.message || VACCINE_DISEASE_MESSAGES.CREATE_ERROR;
      toast.error(errorMessage);
    },
  });
}
