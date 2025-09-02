import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vaccineBatchService } from "../services/vaccine-batch.service";
import type { VaccineBatchPayload } from "../types/vaccine-batch.payload.type";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";

export const useVaccineBatchAdd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VaccineBatchPayload) =>
      vaccineBatchService.createVaccineBatch(payload),
    onSuccess: ({ message, data }) => {
      // Invalidate and refetch vaccine batches queries
      queryClient.invalidateQueries({
        queryKey: ["vaccine-batches"],
      });

      toast.success(message, {
        description: `Lô vaccine ${data?.batchNumber} đã được tạo.`,
      });
    },
    onError: (error) => {
      toast.error("Thêm lô vaccine thất bại!", {
        description:
          extractErrorMessage(error as AxiosError) ||
          "Có lỗi xảy ra khi thêm lô vaccine.",
      });
    },
  });
};
