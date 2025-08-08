import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";

// services
import { vaccineReceiptDetailService } from "../services/vaccine-receipt-detail.service";

// types
import type { VaccineReceiptDetailData } from "../types/payload.type";
import type { BaseResponse } from "@/shared/types/api.type";
import type { VaccineReceiptDetail } from "../types/vaccine-receipt-detal.type";

// utils
import { extractErrorMessage } from "@/shared/utils/error.utils";

export function useUpdateVaccineReceiptDetail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      vaccineReceiptDetailId,
      payload,
    }: {
      vaccineReceiptDetailId: number;
      payload: VaccineReceiptDetailData;
    }) =>
      vaccineReceiptDetailService.updateVaccineReceiptDetail(
        vaccineReceiptDetailId,
        payload,
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

      const successMessage =
        response?.message || "Cập nhật vaccine thành công!";
      toast.success(successMessage, {
        description: "Thông tin vaccine đã được cập nhật",
      });
    },
    onError: (error: AxiosError) => {
      console.error("Update Error:", error);
      const errorMessage = extractErrorMessage(error);

      toast.error("Lỗi cập nhật vaccine!", {
        description: errorMessage,
      });
    },
  });
}
