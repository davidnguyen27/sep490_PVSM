import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { paymentService } from "../services/payment.service";

export function usePaymentDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentId: number) => paymentService.deletePayment(paymentId),
    onSuccess: () => {
      // Invalidate and refetch payments list
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      toast.success("Xóa thanh toán thành công!");
    },
    onError: (error: unknown) => {
      const errorMessage =
        (
          error as {
            response?: { data?: { message?: string } };
            message?: string;
          }
        )?.response?.data?.message ||
        (error as { message?: string })?.message ||
        "Có lỗi xảy ra khi xóa thanh toán";
      toast.error(errorMessage);
    },
  });
}
