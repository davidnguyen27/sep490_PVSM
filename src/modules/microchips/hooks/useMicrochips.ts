import { useQuery } from "@tanstack/react-query";
import { microchipService } from "../services/microchip.service";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
}

export function useMicrochips(params: Params) {
  return useQuery({
    queryKey: ["microchips", params],
    queryFn: () => microchipService.getAllMicrochips(params),
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });
}
