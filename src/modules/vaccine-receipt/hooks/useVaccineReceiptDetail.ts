import { useQuery } from "@tanstack/react-query";

// services
import { vaccineReceiptService } from "../services/vaccine-receipt.service";

// constants
import { VACCINE_RECEIPT_QUERY_KEYS } from "../constants/vaccine-receipt.constants";

export function useVaccineReceiptDetail(vaccineReceiptId: number | null) {
  return useQuery({
    queryKey: VACCINE_RECEIPT_QUERY_KEYS.list({ vaccineReceiptId }),
    queryFn: () =>
      vaccineReceiptService.getVaccineReceiptById(vaccineReceiptId),
    enabled: !!vaccineReceiptId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}
