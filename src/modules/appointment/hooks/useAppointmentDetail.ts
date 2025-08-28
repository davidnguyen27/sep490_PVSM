import { useQuery } from "@tanstack/react-query";
import { appointmentService } from "../services/appointment.service";
import type { Appointment } from "../types/appointment.type";

export function useAppointmentDetail(appointmentId: number | null) {
  return useQuery<Appointment | null>({
    queryKey: ["appointment", "detail", appointmentId],
    queryFn: () =>
      appointmentId
        ? appointmentService.getAppointmentById(appointmentId)
        : Promise.resolve(null),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!appointmentId,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
