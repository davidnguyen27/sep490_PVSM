import { useMutation, useQueryClient } from "@tanstack/react-query";
import { vetService } from "../services/vet.service";
import type { VetPayload } from "../types/payload.type";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { extractErrorMessage } from "@/shared/utils/error.utils";

interface Params {
  payload: VetPayload;
}

export function useVetCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }: Params) => vetService.createVet(payload),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["vets"] });
    },
    onError: (error: AxiosError) => {
      toast.error(extractErrorMessage(error));
    },
  });
}
