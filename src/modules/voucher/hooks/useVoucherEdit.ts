import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { voucherService } from "../services/voucher.service";
import type { VoucherPayload } from "../types/voucher.payload.type";
import type { BaseResponse } from "@/shared/types/api.type";
import type { Voucher } from "../types/voucher.type";

interface UseVoucherEditParams {
  voucherId: number | null;
  voucherData: VoucherPayload;
}

export function useVoucherEdit() {
  const queryClient = useQueryClient();

  return useMutation<BaseResponse<Voucher>, Error, UseVoucherEditParams>({
    mutationFn: ({ voucherId, voucherData }: UseVoucherEditParams) =>
      voucherService.updateVoucher(voucherId, voucherData),
    onSuccess: (response, { voucherId }) => {
      if (response.success) {
        toast.success("Cập nhật voucher thành công!");
        // Invalidate và refetch danh sách voucher
        queryClient.invalidateQueries({ queryKey: ["vouchers"] });
        // Invalidate chi tiết voucher cụ thể
        queryClient.invalidateQueries({ queryKey: ["voucher", voucherId] });
      } else {
        toast.error(response.message || "Có lỗi xảy ra khi cập nhật voucher");
      }
    },
    onError: (error) => {
      console.error("Error updating voucher:", error);
      toast.error("Có lỗi xảy ra khi cập nhật voucher");
    },
  });
}
