import { useQuery } from "@tanstack/react-query";
import { vetService } from "../services/vet.service";
import type { Vet } from "../types/vet.type";

export function useVetDetail(vetId: number | null) {
  return useQuery<Vet | null>({
    queryKey: ["vet", "detail", vetId],
    queryFn: () => vetService.getVetById(vetId as number),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!vetId,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
