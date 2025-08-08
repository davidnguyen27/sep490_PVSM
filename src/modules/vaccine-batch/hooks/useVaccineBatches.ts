import { useQuery } from "@tanstack/react-query";
import { vaccineBatchService } from "../services/vaccine-batch.service";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
}

export function useVaccineBatches(params: Params) {
  return useQuery({
    queryKey: ["vaccine-batches", params],
    queryFn: () => vaccineBatchService.getAllVaccineBatches(params),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
