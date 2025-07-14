import { useMutation, useQueryClient } from "@tanstack/react-query";
import { vetService } from "../services/vet.service";
import type { VetPayload } from "../types/payload.type";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";

interface Params {
  payload: VetPayload;
  vetId: number;
}

export function useVetUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, vetId }: Params) =>
      vetService.updateVet(vetId, payload),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["vet", "detail"] });
    },
    onError: (error) => toast.error(extractErrorMessage(error as AxiosError)),
  });
}
