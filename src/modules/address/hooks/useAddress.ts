import { useQuery } from "@tanstack/react-query";
import { addressService } from "../services/address.service";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyword?: string;
}

export function useAddresses(params: Params) {
  return useQuery({
    queryKey: ["addresses", params],
    queryFn: () => addressService.getAllAddresses(params),
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });
}
