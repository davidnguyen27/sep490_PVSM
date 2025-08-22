import { useQuery } from "@tanstack/react-query";
import { voucherService } from "../services/voucher.service";
import type { Voucher } from "../types/voucher.type";

export function useVoucherDetail(voucherId: number | null) {
  return useQuery<Voucher>({
    queryKey: ["voucher", voucherId],
    queryFn: () => voucherService.getVoucherById(voucherId),
    enabled: !!voucherId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
