import { useQuery } from "@tanstack/react-query";
import { vaccineReceiptDetailService } from "../services/vaccine-receipt-detail.service";

export function useHistoryByVaccineBatch(vaccineBatchId: number | null) {
  return useQuery({
    queryKey: ["vaccine-receipt-detail-history", vaccineBatchId],
    queryFn: () =>
      vaccineReceiptDetailService.getHistoryReceiptByVaccineBatch(
        vaccineBatchId,
      ),
    enabled: !!vaccineBatchId, // Only run query if vaccineBatchId is provided
  });
}
