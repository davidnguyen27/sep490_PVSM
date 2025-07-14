import { useMutation } from "@tanstack/react-query";
import { updateMicrochipApp } from "../services/microchip-update.service";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";

interface StatusData {
  appointmentId: number | null;
  appointmentStatus: number;
  vetId?: number | null;
  microchipItemId?: number | null;
  note?: string;
}

export function useMicrochipAppUpdate(options?: { onSuccess?: () => void }) {
  return useMutation({
    mutationFn: (data: StatusData) => updateMicrochipApp(data),
    onSuccess: (data) => {
      toast.success(data?.message);
      options?.onSuccess?.();
    },
    onError: (error) => toast.error(extractErrorMessage(error as AxiosError)),
  });
}
