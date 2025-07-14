import { useQuery } from "@tanstack/react-query";
import { vetScheduleService } from "../services/vet-schedule.service";

export function useVetScheduleByDate(date: string, slot: number) {
  return useQuery({
    queryKey: ["vet-schedule-by-date", date, slot],
    queryFn: () => vetScheduleService.getSchedulesByDate({ date, slot }),
    enabled: !!date && !!slot,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}
