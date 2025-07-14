import { useQuery } from "@tanstack/react-query";
import { customerService } from "../services/customer.service";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
}

export function useCustomers(params: Params) {
  return useQuery({
    queryKey: ["customers"],
    queryFn: () => customerService.getAllCustomers(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });
}
