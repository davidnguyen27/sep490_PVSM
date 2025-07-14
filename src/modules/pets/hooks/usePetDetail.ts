import { useQuery } from "@tanstack/react-query";
import type { Pet } from "../types/pet.type";
import { petService } from "../services/pet.service";

export function usePetDetail(petId: number | null) {
  return useQuery<Pet | null>({
    queryKey: ["pet", "detail", petId],
    queryFn: () => petService.getPetById(String(petId)),
    enabled: !!petId,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
