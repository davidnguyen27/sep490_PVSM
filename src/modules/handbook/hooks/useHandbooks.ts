import { useQuery } from "@tanstack/react-query";
import { handbookService } from "../services/handbook.service";
import type { BaseListResponse } from "@/shared/types/api.type";
import type { Handbook } from "../types/handbook.type";

interface UseHandbooksParams {
  pageNumber: number;
  pageSize: number;
  keyword?: string;
  status?: boolean;
}

export function useHandbooks(params: UseHandbooksParams) {
  return useQuery<BaseListResponse<Handbook>, Error>({
    queryKey: ["handbooks", params],
    queryFn: () => handbookService.getAllHandbooks(params),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
