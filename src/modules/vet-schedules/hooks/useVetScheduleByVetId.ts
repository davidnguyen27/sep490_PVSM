import { useQuery } from "@tanstack/react-query";
import { vetScheduleService } from "../services/vet-schedule.service";

export function useVetScheduleByVetId(vetId: number | null) {
  return useQuery({
    queryKey: ["vet-schedules", "by-vet-id", vetId],
    queryFn: () => vetScheduleService.getVetScheduleByVetId(vetId),
    enabled: !!vetId && vetId > 0,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
