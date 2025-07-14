import { useQuery } from "@tanstack/react-query";
import { vaccineService } from "../services/vaccine.service";

export function useVaccineByDisease(diseaseId: number, enabled = true) {
  return useQuery({
    queryKey: ["vaccine-by-disease", diseaseId],
    queryFn: () => vaccineService.getVaccineByDisease(diseaseId),
    enabled: !!diseaseId && enabled,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
