import { useMutation, useQueryClient } from "@tanstack/react-query";
import { microchipItemService } from "../services/microchip-item.service";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";

export function useDeleteMicrochipItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (microchipItemId: number | null) =>
      microchipItemService.deleteMicrochipItem(microchipItemId),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["microchip-items"] });
    },
    onError: (error) => toast.error(extractErrorMessage(error as AxiosError)),
  });
}
