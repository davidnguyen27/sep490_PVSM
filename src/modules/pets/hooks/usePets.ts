import { useQuery } from "@tanstack/react-query";
import { petService } from "../services/pet.service";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
}

export function usePets(params: Params) {
  return useQuery({
    queryKey: ["pets", params],
    queryFn: () => petService.getAllPets(params),
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
