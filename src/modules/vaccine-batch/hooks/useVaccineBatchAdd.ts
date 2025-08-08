import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vaccineBatchService } from "../services/vaccine-batch.service";
import type { VaccineBatchPayload } from "../types/vaccine-batch.payload.type";
import type { VaccineBatch } from "../types/vaccine-batch.type";

export const useVaccineBatchAdd = () => {
  const queryClient = useQueryClient();

  return useMutation<VaccineBatch, Error, VaccineBatchPayload>({
    mutationFn: vaccineBatchService.createVaccineBatch,
    onSuccess: (data) => {
      // Invalidate and refetch vaccine batches queries
      queryClient.invalidateQueries({
        queryKey: ["vaccine-batches"],
      });

      toast.success("Thêm lô vaccine thành công!", {
        description: `Lô vaccine ${data.batchNumber} đã được tạo.`,
      });
    },
    onError: (error: Error) => {
      toast.error("Thêm lô vaccine thất bại!", {
        description: error.message || "Có lỗi xảy ra khi thêm lô vaccine.",
      });
    },
  });
};
