import { useQuery } from "@tanstack/react-query";
import { appointmentService } from "../services/appointment.service";

export function useAppointmentDetail(appointmentId: number | null) {
  return useQuery({
    queryKey: ["appointment", "detail", appointmentId],
    queryFn: () => appointmentService.getAppointmentDetail(appointmentId),
    enabled: !!appointmentId,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
