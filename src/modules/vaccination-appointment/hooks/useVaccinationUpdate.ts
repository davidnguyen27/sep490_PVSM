import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";
import { vaccinationService } from "../services/vaccination.service";

interface StatusData {
  appointmentId: number;
  appointmentStatus: number;
  vetId?: number;
  diseaseId?: number;
  temperature?: string;
  heartRate?: string;
  generalCondition?: string;
  others?: string;
  vaccineBatchId?: number;
  reaction?: string;
  notes?: string;
}

export function useUpdateStatus(options?: { onSuccess?: () => void }) {
  return useMutation({
    mutationFn: (data: StatusData) =>
      vaccinationService.updateAppointment(data),
    onSuccess: (data) => {
      toast.success(data?.message);
      options?.onSuccess?.();
    },
    onError: (error) => toast.error(extractErrorMessage(error as AxiosError)),
  });
}
