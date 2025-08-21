import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addressService } from "../services/address.service";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";

export function useAddressCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ location }: { location: string }) =>
      addressService.createAddress({ location }),
    onSuccess: () => {
      toast.success("Thêm địa chỉ thành công!");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error as AxiosError));
    },
  });
}
