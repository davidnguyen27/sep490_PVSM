import { useQuery } from "@tanstack/react-query";
import { vaccineExportDetailService } from "../services/vaccine-export-detail.service";

export const useExportDetailByExport = (exportId: number | null) => {
  return useQuery({
    queryKey: ["export-details", exportId],
    queryFn: () =>
      vaccineExportDetailService.getExportDetailByExportId(exportId),
    enabled: !!exportId,
    staleTime: 0, // No caching to ensure fresh data after edits
  });
};
