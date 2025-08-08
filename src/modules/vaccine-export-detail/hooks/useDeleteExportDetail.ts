import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vaccineExportDetailService } from "../services/vaccine-export-detail.service";

export function useDeleteExportDetail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (exportDetailId: number) =>
      vaccineExportDetailService.deleteExportDetail(exportDetailId),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Xóa chi tiết xuất kho thành công!");
        // Invalidate các queries liên quan
        queryClient.invalidateQueries({ queryKey: ["vaccine-export-detail"] });
        queryClient.invalidateQueries({
          queryKey: ["export-details-by-export"],
        });
      } else {
        toast.error(data.message || "Xóa chi tiết xuất kho thất bại!");
      }
    },
    onError: (error: Error) => {
      console.error("Error deleting export detail:", error);
      toast.error("Có lỗi xảy ra khi xóa chi tiết xuất kho!");
    },
  });
}
