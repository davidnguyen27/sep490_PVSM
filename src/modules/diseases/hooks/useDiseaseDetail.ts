import { useQuery } from "@tanstack/react-query";
import { diseaseService } from "../services/disease.service";

export function useDiseaseDetail(diseaseId: number | null) {
  return useQuery({
    queryKey: ["disease-detail", diseaseId],
    queryFn: async () => {
      const result = await diseaseService.getDiseaseById(diseaseId);
      return result;
    },
    enabled: !!diseaseId,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
