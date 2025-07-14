import { useMutation } from "@tanstack/react-query";
import { updateAppointment } from "../services/appointment-update.service";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";

interface StatusData {
  appointmentId: number;
  appointmentStatus: number;
  vetId?: number;
  diseaseId?: number;
}

export function useUpdateStatus(options?: { onSuccess?: () => void }) {
  return useMutation({
    mutationFn: (data: StatusData) =>
      updateAppointment.updateAppointmentFormData(data),
    onSuccess: (data) => {
      toast.success(data?.message);
      options?.onSuccess?.();
    },
    onError: (error) => toast.error(extractErrorMessage(error as AxiosError)),
  });
}
