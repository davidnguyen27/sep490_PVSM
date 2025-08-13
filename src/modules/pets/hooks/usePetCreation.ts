import { useMutation, useQueryClient } from "@tanstack/react-query";
import { petService } from "../services/pet.service";
import type { PetCreatePayload } from "../types/payload.type";
import { toast } from "sonner";

export function usePetCreation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PetCreatePayload) => petService.createPet(payload),
    onSuccess: (data) => {
      // Invalidate and refetch pets list
      queryClient.invalidateQueries({ queryKey: ["pets"] });

      // Show success message
      toast.success("Tạo hồ sơ thú cưng thành công!", {
        description: `Thú cưng "${data.data?.name}" đã được thêm vào hệ thống.`,
      });
    },
    onError: ({ message }) => {
      toast.error("Tạo hồ sơ thú cưng thất bại!", {
        description: message,
      });
    },
  });
}
