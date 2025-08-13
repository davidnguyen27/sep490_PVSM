import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { customerService } from "../services/customer.service";
import type { AxiosError } from "axios";
import { extractErrorMessage } from "@/shared/utils/error.utils";

export function useCustomerDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customerId: number) =>
      customerService.deleteCustomer(customerId),
    onSuccess: ({ message }) => {
      // Invalidate and refetch customers list
      queryClient.invalidateQueries({ queryKey: ["customers"] });

      toast.success(message || "Xóa khách hàng thành công!");
    },
    onError: (error: AxiosError) => {
      toast.error(extractErrorMessage(error));
    },
  });
}
