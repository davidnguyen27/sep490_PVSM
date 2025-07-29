import { useQuery } from "@tanstack/react-query";
import { vaccinationService } from "../services/vaccination.service";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
}

export function useVaccinationApps(params: Params) {
  return useQuery({
    queryKey: ["vaccination", params],
    queryFn: () => vaccinationService.getAllVaccinationApps(params),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
