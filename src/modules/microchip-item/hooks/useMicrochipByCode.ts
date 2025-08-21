import { useQuery } from "@tanstack/react-query";
import { microchipItemService } from "../services/microchip-item.service";

interface UseMicrochipByCodeProps {
  microchipCode: string;
  status?: number;
  enabled?: boolean;
}

export function useMicrochipByCode({
  microchipCode,
  status,
  enabled = true,
}: UseMicrochipByCodeProps) {
  return useQuery({
    queryKey: ["microchip-by-code", microchipCode, status],
    queryFn: () =>
      microchipItemService.getMicrochipItemByCode({
        microchipCode,
      }),
    enabled: !!microchipCode && enabled,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
