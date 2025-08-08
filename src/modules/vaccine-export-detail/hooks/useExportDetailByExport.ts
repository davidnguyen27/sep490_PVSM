import { useQuery } from "@tanstack/react-query";
import { vaccineExportDetailService } from "../services/vaccine-export-detail.service";

export const useExportDetailByExport = (exportId: number | null) => {
  return useQuery({
    queryKey: ["export-details", exportId],
    queryFn: () =>
      vaccineExportDetailService.getExportDetailByExportId(exportId),
    enabled: !!exportId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
