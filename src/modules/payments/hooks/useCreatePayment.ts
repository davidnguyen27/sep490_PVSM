import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";
import { paymentService } from "../services/payment.service";
import { usePaymentStore } from "../store/usePaymentStore";

export function useCreatePayment() {
  const queryClient = useQueryClient();
  const { setPaymentLoading, setPaymentError, setPaymentId } =
    usePaymentStore();

  return useMutation({
    mutationKey: ["payment", "create"],
    mutationFn: paymentService.createPayment,
    onSuccess: (response) => {
      setPaymentId(response.data?.paymentId || null);
      queryClient.invalidateQueries({ queryKey: ["payment"] });
      toast.success(response.message);
    },
    onMutate: () => {
      setPaymentLoading(true);
      setPaymentError(null);
    },
    onError: (error) => {
      setPaymentError(extractErrorMessage(error as AxiosError));
      toast.error(extractErrorMessage(error as AxiosError));
    },
  });
}
