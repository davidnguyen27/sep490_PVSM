import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountService } from "../services/account.service";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";

export function useAccountDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accountId: number | null) =>
      accountService.deleteAccount(accountId),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error as AxiosError));
    },
  });
}
