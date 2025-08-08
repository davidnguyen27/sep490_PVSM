import { useQuery } from "@tanstack/react-query";
import { vaccineDiseaseService } from "../services/vaccine-disease.service";
import { VACCINE_DISEASE_QUERY_KEYS } from "../constants";

export function useVaccineDiseaseDetail(vaccineDiseaseId: number | null) {
  return useQuery({
    queryKey: [...VACCINE_DISEASE_QUERY_KEYS.all, "detail", vaccineDiseaseId],
    queryFn: () =>
      vaccineDiseaseService.getVaccineDiseaseById(vaccineDiseaseId),
    enabled: !!vaccineDiseaseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
