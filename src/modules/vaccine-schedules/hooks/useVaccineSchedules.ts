import { useQuery } from "@tanstack/react-query";
import { vaccineScheduleService } from "../services/vaccine-schedule.service";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
  status?: boolean;
}

export function useVaccineSchedules(params: Params) {
  return useQuery({
    queryKey: ["vaccine-schedules", params],
    queryFn: () => {
      console.log("Fetching vaccine schedules with params:", params);
      return vaccineScheduleService.getAllVaccineSchedule(params);
    },
    staleTime: 0, // Always refetch when invalidated
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}
