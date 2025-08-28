import { useMutation, useQueryClient } from "@tanstack/react-query";
import { vaccinationService } from "../services/vaccination.service";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";
import type { VaccinationPayload } from "../types/vaccination.payload.type";

export function useVaccinationUpdateById() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      appointmentId,
      payload,
    }: {
      appointmentId: number | null;
      payload: VaccinationPayload;
    }) => vaccinationService.updateAppointmentById(appointmentId, payload),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["vaccination"] });
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error as AxiosError));
    },
  });
}
