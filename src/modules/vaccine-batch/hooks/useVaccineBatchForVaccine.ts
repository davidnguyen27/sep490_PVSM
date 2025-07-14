import { useQuery } from "@tanstack/react-query";
import { vaccineBatchService } from "../services/vaccine-batch.service";

export function useVaccineBatchForVaccine(vaccineId: number) {
  return useQuery({
    queryKey: ["vaccine-batch-for-vaccine", vaccineId],
    queryFn: () => vaccineBatchService.getVaccineBatchByVaccine(vaccineId),
    enabled: !!vaccineId, // Only run the query if vaccineId is provided
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
