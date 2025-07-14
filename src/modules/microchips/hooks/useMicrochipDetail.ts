import { useQuery } from "@tanstack/react-query";
import { microchipService } from "../services/microchip.service";
import type { Microchip } from "../types/microchip.type";

export function useMicrochipDetail(microchipId: number | null) {
  return useQuery<Microchip | null>({
    queryKey: ["microchip", "detail", microchipId],
    queryFn: () => microchipService.getMicrochipById(String(microchipId)),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!microchipId,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
