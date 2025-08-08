import { useQuery } from "@tanstack/react-query";
import { vaccineDiseaseService } from "../services/vaccine-disease.service";
import { VACCINE_DISEASE_QUERY_KEYS } from "../constants";

interface UseVaccineDiseasesParams {
  pageNumber: number;
  pageSize: number;
  keyword?: string;
}

export function useVaccineDiseases(params: UseVaccineDiseasesParams) {
  return useQuery({
    queryKey: VACCINE_DISEASE_QUERY_KEYS.list(params),
    queryFn: () => vaccineDiseaseService.getAllVaccineDiseases(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });
}
