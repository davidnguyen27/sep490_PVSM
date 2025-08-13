import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerService } from "../services/customer.service";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";
import type { CustomerPayload } from "../types/customer.payload.type";

interface UpdateCustomerParams {
  customerId: number;
  payload: CustomerPayload;
}

export function useCustomerUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ customerId, payload }: UpdateCustomerParams) =>
      customerService.updateCustomer(customerId, payload),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["customers", "detail"] });
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error as AxiosError));
    },
  });
}
