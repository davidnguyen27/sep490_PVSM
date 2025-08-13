import { useQuery } from "@tanstack/react-query";
import { customerService } from "../services/customer.service";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
}

export function useCustomers(params: Params) {
  return useQuery({
    queryKey: ["customers", params], // Dynamic query key for better caching
    queryFn: () => customerService.getAllCustomers(params),
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
