import { useQuery } from "@tanstack/react-query";
import { microchipAppService } from "../services/microchip.service";

export function useMicrochipAppDetail(appointmentId: number | null) {
  return useQuery({
    queryKey: ["microchips", "detail", appointmentId],
    queryFn: () => microchipAppService.getAppointmentDetail(appointmentId),
    enabled: !!appointmentId,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
