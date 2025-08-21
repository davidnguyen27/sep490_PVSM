import { useQuery } from "@tanstack/react-query";
import { paymentService } from "../services/payment.service";

export function usePaymentDetail(paymentId: number | null) {
  return useQuery({
    queryKey: ["payment-detail", paymentId],
    queryFn: () =>
      paymentId !== null
        ? paymentService.getPaymentById(paymentId)
        : Promise.resolve(null),
    enabled: paymentId !== null,
    staleTime: 5 * 60 * 1000,
  });
}
