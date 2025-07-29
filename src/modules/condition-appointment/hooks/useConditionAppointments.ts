import { useQuery } from "@tanstack/react-query";
import { conditionService } from "../services/condition.service";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord: string;
  status?: boolean;
}

export function useConditionAppointments(params: Params) {
  return useQuery({
    queryKey: ["conditions", params],
    queryFn: () => conditionService.getAllConditions(params),
    placeholderData: (prev) => prev,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
