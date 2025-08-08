import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vaccineExportService } from "../services/vaccine-export.service";
import type { VaccineExportPayload } from "../types/payload.type";

interface UseVaccineExportEditOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useVaccineExportEdit(options?: UseVaccineExportEditOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      exportId,
      data,
    }: {
      exportId: number;
      data: VaccineExportPayload;
    }) => vaccineExportService.updateVaccineExport(exportId, data),
    onSuccess: (_, variables) => {
      // Invalidate and refetch vaccine exports list
      queryClient.invalidateQueries({
        queryKey: ["vaccine-exports"],
      });

      // Invalidate specific vaccine export detail
      queryClient.invalidateQueries({
        queryKey: ["vaccine-export", variables.exportId],
      });

      toast.success("Cập nhật phiếu xuất kho thành công!");
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error("Có lỗi xảy ra khi cập nhật phiếu xuất kho!");
      console.error("Update vaccine export error:", error);
      options?.onError?.(error);
    },
  });
}
