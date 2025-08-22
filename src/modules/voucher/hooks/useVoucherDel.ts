import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { voucherService } from "../services/voucher.service";
import type { BaseResponse } from "@/shared/types/api.type";
import type { Voucher } from "../types/voucher.type";

export function useVoucherDel() {
  const queryClient = useQueryClient();

  return useMutation<BaseResponse<Voucher>, Error, number | null>({
    mutationFn: (voucherId: number | null) =>
      voucherService.deleteVoucher(voucherId),
    onSuccess: (response, voucherId) => {
      if (response.success) {
        toast.success("Xóa voucher thành công!");
        // Invalidate và refetch danh sách voucher
        queryClient.invalidateQueries({ queryKey: ["vouchers"] });
        // Remove chi tiết voucher khỏi cache
        queryClient.removeQueries({ queryKey: ["voucher", voucherId] });
      } else {
        toast.error(response.message || "Có lỗi xảy ra khi xóa voucher");
      }
    },
    onError: (error) => {
      console.error("Error deleting voucher:", error);
      toast.error("Có lỗi xảy ra khi xóa voucher");
    },
  });
}
