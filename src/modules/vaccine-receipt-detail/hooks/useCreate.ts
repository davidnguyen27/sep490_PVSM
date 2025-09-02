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

interface UseCreateVaccineReceiptDetailOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useCreateVaccineReceiptDetail(
  options?: UseCreateVaccineReceiptDetailOptions,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VaccineReceiptDetailData) =>
      vaccineReceiptDetailService.createVaccineReceiptDetail(payload),
    onSuccess: (response: BaseResponse<VaccineReceiptDetail>, variables) => {
      // Invalidate and refetch vaccine receipt details list
      queryClient.invalidateQueries({
        queryKey: ["vaccine-receipt-details", variables.vaccineReceiptId],
      });

      const successMessage =
        response?.message || "Thêm vaccine vào phiếu nhập thành công!";
      toast.success(successMessage, {
        description: `Đã thêm ${variables.quantity} vaccine từ lô ${variables.vaccineBatchId}`,
      });

      options?.onSuccess?.();
    },
    onError: (error: AxiosError) => {
      console.error("API Error:", error);
      const errorMessage = extractErrorMessage(error);

      toast.error("Lỗi thêm vaccine!", {
        description: errorMessage,
      });

      options?.onError?.(errorMessage);
    },
  });
}
