import { useQuery } from "@tanstack/react-query";
import { vaccineExportDetailService } from "../services/vaccine-export-detail.service";
import type { VaccineExportDetail } from "../types/vaccine-export-detail.type";

export function useVaccineExportDetail(appointmentDetailId: number | null) {
  return useQuery<VaccineExportDetail>({
    queryKey: ["vaccine-export-detail", appointmentDetailId],
    queryFn: () =>
      vaccineExportDetailService.getVaccineExportDetailByAppointment(
        appointmentDetailId,
      ),
    enabled: !!appointmentDetailId,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
