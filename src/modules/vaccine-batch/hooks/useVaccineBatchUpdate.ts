import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vaccineBatchService } from "../services/vaccine-batch.service";
import type { VaccineBatchPayload } from "../types/vaccine-batch.payload.type";
import type { VaccineBatch } from "../types/vaccine-batch.type";

export const useVaccineBatchUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation<
    VaccineBatch,
    Error,
    { vaccineBatchId: number; payload: VaccineBatchPayload }
  >({
    mutationFn: ({ vaccineBatchId, payload }) =>
      vaccineBatchService.updateVaccineBatch(vaccineBatchId, payload),
    onSuccess: (data, variables) => {
      // Invalidate and refetch vaccine batches queries
      queryClient.invalidateQueries({
        queryKey: ["vaccine-batches"],
      });

      // Update the specific vaccine batch cache
      queryClient.setQueryData(
        ["vaccine-batches", "detail", variables.vaccineBatchId],
        data,
      );

      toast.success("Cập nhật lô vaccine thành công!", {
        description: `Lô vaccine ${data.batchNumber} đã được cập nhật.`,
      });
    },
    onError: (error: Error) => {
      toast.error("Cập nhật lô vaccine thất bại!", {
        description: error.message || "Có lỗi xảy ra khi cập nhật lô vaccine.",
      });
    },
  });
};
