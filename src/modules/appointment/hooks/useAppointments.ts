import { useQuery } from "@tanstack/react-query";
import { appointmentService } from "../services/appointment.service";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyword?: string;
  status?: boolean;
}

export function useAppointments(params: Params) {
  return useQuery({
    queryKey: ["appointments", params],
    queryFn: () => appointmentService.getAllAppointments(params),
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });
}
