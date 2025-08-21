import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addressService } from "../services/address.service";
import { toast } from "sonner";

export function useAddressUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { addressId: number | null; location: string }) =>
      addressService.updateAddress(payload),
    onSuccess: () => {
      toast.success("Cập nhật địa chỉ thành công!");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : "Cập nhật địa chỉ thất bại!";
      toast.error(errorMessage);
    },
  });
}
