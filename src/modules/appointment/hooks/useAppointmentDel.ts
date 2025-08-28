import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appointmentService } from "../services/appointment.service";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";

export function useAppointmentDel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (appointmentId: number | null) =>
      appointmentService.deleteAppointment(appointmentId),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error as AxiosError));
    },
  });
}
