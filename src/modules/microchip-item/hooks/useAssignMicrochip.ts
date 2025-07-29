import { useMutation, useQueryClient } from "@tanstack/react-query";
import { microchipItemService } from "../services/microchip-item.service";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";

interface AssignMicrochipParams {
  microchipItemId: number | null;
  petId: number | null;
}

export function useAssignMicrochip(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: AssignMicrochipParams) =>
      microchipItemService.assignChipToPet(params),
    onSuccess: (data) => {
      toast.success(data?.message || "Gắn microchip thành công!");

      // Invalidate related queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["microchip-items"] });
      queryClient.invalidateQueries({ queryKey: ["microchip-by-code"] });
      queryClient.invalidateQueries({ queryKey: ["microchips"] });
      queryClient.invalidateQueries({ queryKey: ["pets"] });

      options?.onSuccess?.();
    },
    onError: (error) => {
      const errorMessage = extractErrorMessage(error as AxiosError);
      toast.error(errorMessage || "Có lỗi xảy ra khi gắn microchip!");
    },
  });
}
