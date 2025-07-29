import { useQuery } from "@tanstack/react-query";
import { paymentService } from "@/modules/payments";
import type { Payment } from "../types/payment.type";

export function useDetailPayment(appointmentDetailId: number | null) {
  return useQuery<Payment>({
    queryKey: ["payment", "appointment-detail", appointmentDetailId],
    queryFn: () => paymentService.getPaymentByAppointment(appointmentDetailId),
    enabled: !!appointmentDetailId,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
