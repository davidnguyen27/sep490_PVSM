import { useQuery } from "@tanstack/react-query";
import { vaccineExportService } from "../services/vaccine-export.service";

export function useVaccineExportById(exportId: number) {
  return useQuery({
    queryKey: ["vaccine-export", exportId],
    queryFn: () => vaccineExportService.getVaccineExportById(exportId),
    enabled: !!exportId,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 0, // No caching to ensure fresh data after edits
  });
}
