import { useQuery } from "@tanstack/react-query";
import { vaccineReceiptDetailService } from "../services/vaccine-receipt-detail.service";
import type { VaccineReceiptDetail } from "../types/vaccine-receipt-detal.type";

export function useHistoryByVaccineBatch(vaccineBatchId: number | null) {
  return useQuery<VaccineReceiptDetail[]>({
    queryKey: ["vaccine-receipt-detail-history", vaccineBatchId],
    queryFn: () =>
      vaccineReceiptDetailService.getHistoryReceiptByVaccineBatch(
        vaccineBatchId,
      ),
    enabled: !!vaccineBatchId, // Only run query if vaccineBatchId is provided
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
