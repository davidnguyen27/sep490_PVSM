import { useQuery } from "@tanstack/react-query";
import { handbookService } from "../services/handbook.service";
import type { Handbook } from "../types/handbook.type";

export function useHandbookDetails(handbookId: number | null) {
  return useQuery<Handbook, Error>({
    queryKey: ["handbook", handbookId],
    queryFn: () => handbookService.getHandbookById(handbookId),
    enabled: !!handbookId,
  });
}
