import { useQuery } from "@tanstack/react-query";
import { vaccineBatchService } from "../services/vaccine-batch.service";

/**
 * Hook to get all vaccine batches for select dropdown
 * Uses a large page size to get all batches at once
 */
export function useAllVaccineBatches() {
  return useQuery({
    queryKey: ["all-vaccine-batches"],
    queryFn: () =>
      vaccineBatchService.getAllVaccineBatches({
        pageNumber: 1,
        pageSize: 1000, // Large number to get all batches
        keyWord: "",
      }),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
