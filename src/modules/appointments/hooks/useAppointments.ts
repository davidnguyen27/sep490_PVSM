import { useQuery } from "@tanstack/react-query";
import { appointmentService } from "../services/appointment.service";

export function useAppointments(params: {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
}) {
  return useQuery({
    queryKey: ["appointments", params],
    queryFn: () => appointmentService.getAllAppointments(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });
}
