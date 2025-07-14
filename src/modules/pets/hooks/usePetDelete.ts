import { useMutation, useQueryClient } from "@tanstack/react-query";
import { petService } from "../services/pet.service";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { extractErrorMessage } from "@/shared/utils/error.utils";

export function usePetDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (petId: number) => petService.deletePet(petId),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
    onError: (error) => toast.error(extractErrorMessage(error as AxiosError)),
  });
}
