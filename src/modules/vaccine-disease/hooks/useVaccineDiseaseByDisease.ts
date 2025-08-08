import { useQuery } from "@tanstack/react-query";
import { vaccineDiseaseService } from "../services/vaccine-disease.service";

export const useVaccineDiseaseByDisease = (diseaseId: number | null) => {
  return useQuery({
    queryKey: ["vaccine-disease", "by-disease", diseaseId],
    queryFn: () => vaccineDiseaseService.getVaccineDiseaseByDisease(diseaseId),
    enabled: !!diseaseId,
  });
};
