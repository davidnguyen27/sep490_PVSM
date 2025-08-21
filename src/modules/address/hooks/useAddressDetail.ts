import { useQuery } from "@tanstack/react-query";
import type { Address } from "../types/address.type";
import { addressService } from "../services/address.service";

export function useAddressDetail(addressId: number | null) {
  return useQuery<Address | null>({
    queryKey: ["address", "detail", addressId],
    queryFn: () =>
      addressId
        ? addressService.getAddressById(addressId)
        : Promise.resolve(null),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!addressId,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
