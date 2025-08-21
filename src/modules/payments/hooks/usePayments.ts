import { useQuery } from "@tanstack/react-query";
import { paymentService } from "../services/payment.service";

interface UsePaymentsParams {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
  status?: boolean;
}

export function usePayments(params: UsePaymentsParams) {
  return useQuery({
    queryKey: ["payments", params],
    queryFn: () => paymentService.getAllPayments(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
