import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MicrochipPayload } from "../types/payload.type";
import { microchipService } from "../services/microchip.service";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";

interface Params {
  payload: MicrochipPayload;
  microchipId: number;
}

export function useMicrochipUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, microchipId }: Params) =>
      microchipService.updateMicrochip(payload, microchipId),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["microchips", "detail"] });
    },
    onError: (error) => toast.error(extractErrorMessage(error as AxiosError)),
  });
}
