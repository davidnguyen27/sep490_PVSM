import { useQuery } from "@tanstack/react-query";
import { vaccineExportService } from "../services/vaccine-export.service";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
}

export function useVaccineExports(params: Params) {
  return useQuery({
    queryKey: ["vaccine-exports", params],
    queryFn: () => vaccineExportService.getAllVaccineExports(params),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
