import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PetPayload } from "../types/payload.type";
import { petService } from "../services/pet.service";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";

interface Params {
  payload: PetPayload;
  petId: number;
}

export function usePetUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, petId }: Params) =>
      petService.updatePet(payload, petId.toString()),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
    onError: (error) => toast.error(extractErrorMessage(error as AxiosError)),
  });
}
