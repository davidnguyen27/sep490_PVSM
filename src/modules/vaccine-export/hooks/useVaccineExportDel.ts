import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { vaccineExportService } from "../services/vaccine-export.service";

export const useVaccineExportDel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (exportId: number) =>
      vaccineExportService.deleteVaccineExport(exportId),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Phiếu xuất kho đã được xóa thành công!");
        // Invalidate and refetch vaccine export list
        queryClient.invalidateQueries({
          queryKey: ["vaccine-exports"],
        });
      } else {
        toast.error(data.message || "Có lỗi xảy ra khi xóa phiếu xuất kho!");
      }
    },
    onError: (error: unknown) => {
      console.error("Delete vaccine export error:", error);
      const errorMessage =
        (
          error as {
            response?: { data?: { message?: string } };
            message?: string;
          }
        )?.response?.data?.message ||
        (error as { message?: string })?.message ||
        "Có lỗi xảy ra khi xóa phiếu xuất kho!";
      toast.error(errorMessage);
    },
  });
};
