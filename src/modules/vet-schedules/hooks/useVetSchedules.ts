import { useQuery } from "@tanstack/react-query";
import { vetScheduleService } from "../services/vet-schedule.service";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
}

export function useVetSchedules(params: Params) {
  return useQuery({
    queryKey: ["schedules", params],
    queryFn: () => vetScheduleService.getAllVetSchedules(params),
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
