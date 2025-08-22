import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { voucherService } from "../services/voucher.service";
import type { VoucherPayload } from "../types/voucher.payload.type";
import type { BaseResponse } from "@/shared/types/api.type";
import type { Voucher } from "../types/voucher.type";

export function useVouchersAdd() {
  const queryClient = useQueryClient();

  return useMutation<BaseResponse<Voucher>, Error, VoucherPayload>({
    mutationFn: (voucherData: VoucherPayload) =>
      voucherService.createVoucher(voucherData),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Tạo voucher thành công!");
        // Invalidate và refetch danh sách voucher
        queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      } else {
        toast.error(response.message || "Có lỗi xảy ra khi tạo voucher");
      }
    },
    onError: (error) => {
      console.error("Error creating voucher:", error);
      toast.error("Có lỗi xảy ra khi tạo voucher");
    },
  });
}
