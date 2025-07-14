import { useMutation, useQueryClient } from "@tanstack/react-query";
import { vetService } from "../services/vet.service";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";

export function useVetDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vetId: number) => vetService.deleteVet(vetId),
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["vets"] });
      toast.success(message);
    },
    onError: (error) => toast.error(extractErrorMessage(error as AxiosError)),
  });
}
