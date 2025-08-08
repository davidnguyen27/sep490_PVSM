import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vaccineBatchService } from "../services/vaccine-batch.service";

interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function useVaccineBatchDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vaccineBatchId: number) =>
      vaccineBatchService.deleteVaccineBatch(vaccineBatchId),
    onSuccess: (_, vaccineBatchId) => {
      // Invalidate and refetch vaccine batch queries
      queryClient.invalidateQueries({ queryKey: ["vaccine-batches"] });

      // Remove the deleted item from cache
      queryClient.removeQueries({
        queryKey: ["vaccine-batches", "detail", vaccineBatchId],
      });

      toast.success("Xóa lô vaccine thành công!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Có lỗi xảy ra khi xóa lô vaccine";
      toast.error(errorMessage);
    },
  });
}
