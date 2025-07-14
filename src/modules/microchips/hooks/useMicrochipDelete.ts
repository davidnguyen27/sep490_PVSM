import { useMutation, useQueryClient } from "@tanstack/react-query";
import { microchipService } from "../services/microchip.service";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";

export function useMicrochipDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (microchipId: number) =>
      microchipService.deleteMicrochip(microchipId),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["microchips"] });
    },
    onError: (error) => toast.error(extractErrorMessage(error as AxiosError)),
  });
}
