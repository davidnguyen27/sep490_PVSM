import { useQuery } from "@tanstack/react-query";
import { microchipAppService } from "../services/microchip.service";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
}

export function useMicrochipApps(params: Params) {
  return useQuery({
    queryKey: ["microchips", params],
    queryFn: () => microchipAppService.getAllMicrochipApps(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });
}
