import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vaccineExportService } from "../services/vaccine-export.service";
import type { VaccineExportPayload } from "../types/payload.type";

interface UseVaccineExportAddOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useVaccineExportAdd(options?: UseVaccineExportAddOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VaccineExportPayload) =>
      vaccineExportService.createVaccineExport(data),
    onSuccess: () => {
      // Invalidate and refetch vaccine exports list
      queryClient.invalidateQueries({
        queryKey: ["vaccine-exports"],
      });

      toast.success("Tạo phiếu xuất kho thành công!");
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error("Có lỗi xảy ra khi tạo phiếu xuất kho!");
      console.error("Create vaccine export error:", error);
      options?.onError?.(error);
    },
  });
}
