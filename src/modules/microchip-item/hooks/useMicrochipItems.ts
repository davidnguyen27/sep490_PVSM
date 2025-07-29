import { useQuery } from "@tanstack/react-query";
import { microchipItemService } from "../services/microchip-item.service";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
  isUsed: boolean;
}

export function useMicrochipItems(params: Params) {
  return useQuery({
    queryKey: ["microchip-items", params],
    queryFn: () => microchipItemService.getAllMicrochipItems(params),
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });
}
