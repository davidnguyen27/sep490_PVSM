import { useQuery } from "@tanstack/react-query";
import { vaccinationService } from "../services/vaccination.service";

export function useVaccinationDetail(appointmentId: number | null) {
  return useQuery({
    queryKey: ["vaccination", "detail", appointmentId],
    queryFn: () => vaccinationService.getAppointmentById(appointmentId),
    enabled: !!appointmentId,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
