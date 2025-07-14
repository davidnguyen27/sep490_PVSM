import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MicrochipPayload } from "../types/payload.type";
import { microchipService } from "../services/microchip.service";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";

export function useMicrochipCreation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: MicrochipPayload) =>
      microchipService.createMicrochip(payload),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["microchips"] });
    },
    onError: (error) => toast.error(extractErrorMessage(error as AxiosError)),
  });
}
