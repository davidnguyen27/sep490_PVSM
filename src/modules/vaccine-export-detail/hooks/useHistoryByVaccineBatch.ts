import { useQuery } from "@tanstack/react-query";
import { vaccineExportDetailService } from "../services/vaccine-export-detail.service";
import type { VaccineExportDetail } from "../types/vaccine-export-detail.type";

export function useHistoryByVaccineBatch(
  vaccineBatchId: number | null,
  enabled = true,
) {
  return useQuery<VaccineExportDetail[]>({
    queryKey: ["vaccine-export-history", vaccineBatchId],
    queryFn: () =>
      vaccineExportDetailService.getHistoryExportByVaccineBatch(vaccineBatchId),
    enabled: !!vaccineBatchId && enabled,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
