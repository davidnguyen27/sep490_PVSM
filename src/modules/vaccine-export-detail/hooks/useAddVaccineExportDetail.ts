import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";
import { vaccineExportDetailService } from "../services/vaccine-export-detail.service";

export function useAddVaccineExportDetail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["vaccine-export-detail", "create"],
    mutationFn: vaccineExportDetailService.createVaccineExport,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["vaccine-export-detail"] });
      queryClient.invalidateQueries({ queryKey: ["vaccine-export"] });
      toast.success(
        response.message || "Thêm lô vaccine vào xuất kho thành công",
      );
    },
    onError: (error: AxiosError) => {
      const errorMessage = extractErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}
