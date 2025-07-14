import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";

export function useSendOTP() {
  return useMutation({
    mutationFn: authService.sendOTP,
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error as AxiosError));
    },
  });
}
