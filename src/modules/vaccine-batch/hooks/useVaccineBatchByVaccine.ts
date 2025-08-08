import { useQuery } from "@tanstack/react-query";
import { vaccineBatchService } from "../services/vaccine-batch.service";

export function useVaccineBatchByVaccine(vaccineId: number | null) {
  return useQuery({
    queryKey: ["vaccine-batches", "by-vaccine", vaccineId],
    queryFn: () => vaccineBatchService.getVaccineBatchByVaccine(vaccineId!),
    enabled: !!vaccineId,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
