import { useQuery } from "@tanstack/react-query";
import { vaccineReceiptService } from "../services/vaccine-receipt.service";
import { VACCINE_RECEIPT_QUERY_KEYS } from "../constants";

interface UseVaccineReceiptsParams {
  pageNumber: number;
  pageSize: number;
  keyword?: string;
}

export function useVaccineReceipts(params: UseVaccineReceiptsParams) {
  return useQuery({
    queryKey: VACCINE_RECEIPT_QUERY_KEYS.list(params),
    queryFn: () => vaccineReceiptService.getAllVaccineReceipts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });
}
