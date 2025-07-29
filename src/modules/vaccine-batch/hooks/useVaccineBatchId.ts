import { useQuery } from "@tanstack/react-query";
import { vaccineBatchService } from "../services/vaccine-batch.service";

export function useVaccineBatchId(vaccineBatchId: number | null) {
  return useQuery({
    queryKey: ["vaccine-batches", "detail", vaccineBatchId],
    queryFn: () => vaccineBatchService.getVaccineBatchById(vaccineBatchId!),
    enabled: !!vaccineBatchId,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
