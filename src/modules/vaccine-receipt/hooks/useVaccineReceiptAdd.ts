import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// services
import { vaccineReceiptService } from "../services/vaccine-receipt.service";

// types
import type {
  VaccineReceiptCreateRequest,
  VaccineReceipt,
} from "../types/vaccine-receipt.type";

// constants
import { VACCINE_RECEIPT_QUERY_KEYS } from "../constants/vaccine-receipt.constants";

export function useVaccineReceiptAdd() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VaccineReceiptCreateRequest) =>
      vaccineReceiptService.createVaccineReceipt(payload),
    onSuccess: (data: VaccineReceipt) => {
      // Invalidate and refetch vaccine receipts list
      queryClient.invalidateQueries({
        queryKey: VACCINE_RECEIPT_QUERY_KEYS.all,
      });

      toast.success("Tạo phiếu nhập vaccine thành công!", {
        description: `Mã phiếu: ${data?.receiptCode || "N/A"}`,
      });
    },
    onError: (error: Error) => {
      const errorMessage = error?.message || "Tạo phiếu nhập vaccine thất bại!";

      toast.error("Lỗi tạo phiếu nhập!", {
        description: errorMessage,
      });
    },
  });
}
