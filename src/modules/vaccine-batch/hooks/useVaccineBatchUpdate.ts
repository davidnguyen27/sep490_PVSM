import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vaccineBatchService } from "../services/vaccine-batch.service";
import type { VaccineBatchPayload } from "../types/vaccine-batch.payload.type";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";

export const useVaccineBatchUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      vaccineBatchId,
      payload,
    }: {
      vaccineBatchId: number;
      payload: VaccineBatchPayload;
    }) => vaccineBatchService.updateVaccineBatch(vaccineBatchId, payload),
    onSuccess: ({ message, data }, variables) => {
      // Invalidate and refetch vaccine batches queries
      queryClient.invalidateQueries({
        queryKey: ["vaccine-batches"],
      });

      // Update the specific vaccine batch cache
      queryClient.setQueryData(
        ["vaccine-batches", "detail", variables.vaccineBatchId],
        data,
      );

      toast.success(message, {
        description: `Lô vaccine ${data?.vaccineBatchId} đã được cập nhật.`,
      });
    },
    onError: (error) => {
      toast.error("Cập nhật lô vaccine thất bại!", {
        description:
          extractErrorMessage(error as AxiosError) ||
          "Có lỗi xảy ra khi cập nhật lô vaccine.",
      });
    },
  });
};
