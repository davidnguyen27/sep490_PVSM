import { useQuery } from "@tanstack/react-query";
import { vetScheduleService } from "../services/vet-schedule.service";
import type { VetSchedule } from "../types/vet-schedule.type";

interface UseScheduleByVetOptions {
  enabled?: boolean;
}

export function useScheduleByVet(options: UseScheduleByVetOptions = {}) {
  // Lấy vetId từ localStorage
  const getVetIdFromLocalStorage = (): number | null => {
    try {
      const userData = localStorage.getItem("user");
      console.log("=== useScheduleByVet Debug ===");
      console.log("userData from localStorage:", userData);

      if (userData) {
        const user = JSON.parse(userData);
        console.log("parsed user:", user);
        console.log("user.vetId:", user?.vetId);
        return user?.vetId || null;
      }
      console.log("No userData found in localStorage");
      return null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  };

  const vetId = getVetIdFromLocalStorage();
  console.log("Final vetId:", vetId);

  const queryResult = useQuery<VetSchedule[], Error>({
    queryKey: ["vet-schedules", "by-vet", vetId],
    queryFn: async () => {
      console.log("Calling API with vetId:", vetId);
      const result = await vetScheduleService.getVetScheduleByVetId(vetId);
      console.log("API response:", result);
      return result;
    },
    enabled: vetId !== null && (options.enabled ?? true),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  console.log("Query result:", queryResult);
  console.log("============================");

  return queryResult;
}
