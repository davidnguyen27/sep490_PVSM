import { useQuery } from "@tanstack/react-query";
import { diseaseService } from "../services/disease.service";

export function useDiseaseBySpecies(species: "Dog" | "Cat" | string) {
  return useQuery({
    queryKey: ["diseases", "by-species", species],
    queryFn: () => diseaseService.getDiseaseBySpecies(species),
    enabled: !!species, // Only run query if species is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
