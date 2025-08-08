import { useQuery } from "@tanstack/react-query";
import { vaccineService } from "../services/vaccine.service";
import type { Vaccine } from "../types/vaccine.type";

interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useVaccineDetail = (vaccineId: number | null) => {
  return useQuery<Vaccine, ApiError>({
    queryKey: ["vaccine", vaccineId],
    queryFn: () => {
      if (!vaccineId) {
        throw new Error("Vaccine ID is required");
      }
      return vaccineService.getVaccineById(vaccineId);
    },
    enabled: !!vaccineId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
