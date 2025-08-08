import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vaccineExportDetailService } from "../services/vaccine-export-detail.service";
import type { VaccineExportDetailPayload } from "../types/payload.type";

export function useUpdateExportDetail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      exportDetailId,
      payload,
    }: {
      exportDetailId: number;
      payload: VaccineExportDetailPayload;
    }) =>
      vaccineExportDetailService.updateExportDetail(exportDetailId, payload),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Cập nhật chi tiết xuất kho thành công!");
        // Invalidate các queries liên quan
        queryClient.invalidateQueries({ queryKey: ["vaccine-export-detail"] });
        queryClient.invalidateQueries({
          queryKey: ["export-details-by-export"],
        });
      } else {
        toast.error(data.message || "Cập nhật chi tiết xuất kho thất bại!");
      }
    },
    onError: (error: Error) => {
      console.error("Error updating export detail:", error);
      toast.error("Có lỗi xảy ra khi cập nhật chi tiết xuất kho!");
    },
  });
}
