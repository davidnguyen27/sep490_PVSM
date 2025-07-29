import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";
import type { UpdateStatusPayload } from "../types/payload.type";
import { conditionService } from "../services/condition.service";

interface UseConditionUpdateOptions {
  onSuccess?: () => void;
}

export const useConditionUpdate = (options?: UseConditionUpdateOptions) => {
  return useMutation({
    mutationFn: (data: UpdateStatusPayload) =>
      conditionService.updateConditionStatus(data.appointmentId, data),
    onSuccess: (data) => {
      toast.success(data?.message);
      options?.onSuccess?.();
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error as AxiosError));
    },
  });
};
