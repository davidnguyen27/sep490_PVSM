import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";

// services
import { vaccineReceiptDetailService } from "../services/vaccine-receipt-detail.service";

// types
import type { BaseResponse } from "@/shared/types/api.type";
import type { VaccineReceiptDetail } from "../types/vaccine-receipt-detal.type";

// utils
import { extractErrorMessage } from "@/shared/utils/error.utils";

export function useDeleteVaccineReceiptDetail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vaccineReceiptDetailId: number) =>
      vaccineReceiptDetailService.deleteVaccineReceiptDetail(
        vaccineReceiptDetailId,
      ),
    onSuccess: (response: BaseResponse<VaccineReceiptDetail>) => {
      // Invalidate tất cả queries liên quan đến vaccine receipt details
      queryClient.invalidateQueries({
        queryKey: ["vaccine-receipt-details"],
      });

      // Invalidate danh sách vaccine receipts
      queryClient.invalidateQueries({
        queryKey: ["vaccine-receipts"],
      });

      const successMessage = response?.message || "Xóa vaccine thành công!";
      toast.success(successMessage, {
        description: "Đã xóa vaccine khỏi phiếu nhập",
      });
    },
    onError: (error: AxiosError) => {
      console.error("Delete Error:", error);
      const errorMessage = extractErrorMessage(error);

      toast.error("Lỗi xóa vaccine!", {
        description: errorMessage,
      });
    },
  });
}
