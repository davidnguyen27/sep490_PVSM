import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";
import { vaccineReceiptService } from "../services/vaccine-receipt.service";

interface UseVaccineReceiptDeleteOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useVaccineReceiptDelete(
  options?: UseVaccineReceiptDeleteOptions,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vaccineReceiptId: number) =>
      vaccineReceiptService.deleteVaccineReceipt(vaccineReceiptId),
    onSuccess: () => {
      toast.success("Xóa phiếu nhập vaccine thành công!");

      // Invalidate and refetch vaccine receipts list
      queryClient.invalidateQueries({ queryKey: ["vaccine-receipts"] });

      options?.onSuccess?.();
    },
    onError: (error: AxiosError) => {
      const errorMessage = extractErrorMessage(error);
      toast.error(errorMessage || "Xóa phiếu nhập vaccine thất bại!");
      options?.onError?.(errorMessage);
    },
  });
}
