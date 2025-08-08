import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";
import { vaccineReceiptService } from "../services/vaccine-receipt.service";
import type { VaccineReceiptUpdateRequest } from "../types/vaccine-receipt.type";

interface UseVaccineReceiptEditOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useVaccineReceiptEdit(options?: UseVaccineReceiptEditOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      vaccineReceiptId,
      data,
    }: {
      vaccineReceiptId: number;
      data: VaccineReceiptUpdateRequest;
    }) => vaccineReceiptService.updateVaccineReceipt(vaccineReceiptId, data),
    onSuccess: (data) => {
      toast.success("Cập nhật phiếu nhập vaccine thành công!");

      // Invalidate and refetch vaccine receipts list
      queryClient.invalidateQueries({ queryKey: ["vaccine-receipts"] });

      // Invalidate specific vaccine receipt detail
      if (data?.vaccineReceiptId) {
        queryClient.invalidateQueries({
          queryKey: ["vaccine-receipt", data.vaccineReceiptId],
        });
      }

      options?.onSuccess?.();
    },
    onError: (error: AxiosError) => {
      const errorMessage = extractErrorMessage(error);
      toast.error(errorMessage || "Cập nhật phiếu nhập vaccine thất bại!");
      options?.onError?.(errorMessage);
    },
  });
}
