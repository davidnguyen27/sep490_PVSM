import { useQuery } from "@tanstack/react-query";
import { vaccineScheduleService } from "../services/vaccine-schedule.service";

export function useVaccineScheduleByDisease(diseaseId: number | null) {
  return useQuery({
    queryKey: ["vaccine-schedules", "by-disease", diseaseId],
    queryFn: () =>
      vaccineScheduleService.getVaccineScheduleByDisease(diseaseId),
    enabled: !!diseaseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
