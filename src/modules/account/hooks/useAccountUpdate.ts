import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountService } from "../services/account.service";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { extractErrorMessage } from "@/shared/utils/error.utils";

interface UpdateAccountPayload {
  accountId: number | null;
  email?: string;
  role?: number;
  isVerify: boolean;
}

export function useAccountUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateAccountPayload) =>
      accountService.updateAccount(payload.accountId, payload),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error as AxiosError));
    },
  });
}
