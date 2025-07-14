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
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
