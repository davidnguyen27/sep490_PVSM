import { useMutation, useQueryClient } from "@tanstack/react-query";
import { vetService } from "../services/vet.service";
import type { VetPayload } from "../types/payload.type";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { extractErrorMessage } from "@/shared/utils/error.utils";

interface Params {
  payload: VetPayload;
}

export function useVetUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }: Params) => vetService.updateVet(payload),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["vet", "detail"] });
      queryClient.invalidateQueries({ queryKey: ["vets"] });
    },
    onError: (error: AxiosError) => {
      toast.error(extractErrorMessage(error));
    },
  });
}
