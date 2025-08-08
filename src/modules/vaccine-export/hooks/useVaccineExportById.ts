import { useQuery } from "@tanstack/react-query";
import { vaccineExportService } from "../services/vaccine-export.service";

export function useVaccineExportById(exportId: number) {
  return useQuery({
    queryKey: ["vaccine-export", exportId],
    queryFn: () => vaccineExportService.getVaccineExportById(exportId),
    enabled: !!exportId,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
