import { useQuery } from "@tanstack/react-query";
import type { AppointmentDetail } from "../types/appointment-detail.type";
import { microchipItemService } from "../services/microchip-item.service";

export function useAppointmentDetail(
  appointmentId: number | null,
  enabled: boolean,
) {
  return useQuery<{ success: boolean; data: AppointmentDetail } | null>({
    queryKey: ["appointment-detail", appointmentId],
    queryFn: async () => {
      if (appointmentId == null) return null;
      const data =
        await microchipItemService.getAppointmentDetail(appointmentId);
      return { success: data != null, data };
    },
    enabled: enabled && appointmentId != null,
    staleTime: 5 * 60 * 1000,
  });
}
