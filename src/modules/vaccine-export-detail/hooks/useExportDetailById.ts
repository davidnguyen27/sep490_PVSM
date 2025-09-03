import { useQuery } from "@tanstack/react-query";
import { vaccineExportDetailService } from "../services/vaccine-export-detail.service";

export function useExportDetailById(exportDetailId: number | null) {
  return useQuery({
    queryKey: ["vaccine-export-detail", exportDetailId],
    queryFn: () =>
      vaccineExportDetailService.getVaccineExportDetailById(exportDetailId),
    enabled: !!exportDetailId,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 0, // No caching to ensure fresh data after edits
  });
}
