import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addressService } from "../services/address.service";
import { toast } from "sonner";

export function useAddressDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addressId: number | null) =>
      addressService.deleteAddress(addressId),
    onSuccess: () => {
      toast.success("Xóa địa chỉ thành công!");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : "Xóa địa chỉ thất bại!";
      toast.error(errorMessage);
    },
  });
}
