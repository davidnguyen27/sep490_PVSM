import { useQuery } from "@tanstack/react-query";
import { customerService } from "../services/customer.service";
import type { Customer } from "../types/customer.type";

export function useCustomerById(customerId: number | null) {
  return useQuery<Customer | null>({
    queryKey: ["customers", "detail", customerId],
    queryFn: () => customerService.getCustomerById(customerId),
    enabled: !!customerId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
