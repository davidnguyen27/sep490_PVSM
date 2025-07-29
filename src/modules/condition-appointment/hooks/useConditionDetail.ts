import { useQuery } from "@tanstack/react-query";
import { conditionService } from "../services/condition.service";

export function useConditionDetail(appointmentId: number | null) {
  return useQuery({
    queryKey: ["conditions", "detail", appointmentId],
    queryFn: () => conditionService.getConditionDetail(appointmentId),
    enabled: !!appointmentId,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
