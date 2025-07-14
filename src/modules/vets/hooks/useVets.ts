import { useQuery } from "@tanstack/react-query";
import { vetService } from "../services/vet.service";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
}

export function useVets(params: Params) {
  return useQuery({
    queryKey: ["vets", params],
    queryFn: () => vetService.getAllVets(params),
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });
}
