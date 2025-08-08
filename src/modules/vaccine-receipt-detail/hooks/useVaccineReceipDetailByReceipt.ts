import { useQuery } from "@tanstack/react-query";

// services
import { vaccineReceiptDetailService } from "../services/vaccine-receipt-detail.service";

export function useVaccineReceiptDetailByReceipt(receiptId: number | null) {
  return useQuery({
    queryKey: ["vaccine-receipt-details", receiptId],
    queryFn: () =>
      vaccineReceiptDetailService.getVaccineReceiptDetailByReceiptId(
        receiptId!,
      ),
    enabled: !!receiptId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}
