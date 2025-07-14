import { useQuery } from "@tanstack/react-query";
import { diseaseService } from "../services/disease.service";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
}

export function useDiseases(params: Params) {
  return useQuery({
    queryKey: ["diseases", params],
    queryFn: () => diseaseService.getAllDiseases(params),
    staleTime: 5 * 60 * 1000, // 5 minutes,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });
}
