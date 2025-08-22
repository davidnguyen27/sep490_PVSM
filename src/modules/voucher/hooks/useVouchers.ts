import { useQuery } from "@tanstack/react-query";
import { voucherService } from "../services/voucher.service";
import type { BaseListResponse } from "@/shared/types/api.type";
import type { Voucher } from "../types/voucher.type";

interface UseVouchersParams {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
  status?: boolean;
}

export function useVouchers(params: UseVouchersParams) {
  return useQuery<BaseListResponse<Voucher>>({
    queryKey: ["vouchers", params],
    queryFn: () => voucherService.getAllVouchers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
