import { useMutation, useQueryClient } from "@tanstack/react-query";
import { petService } from "../services/pet.service";
import type { PetCreatePayload } from "../types/payload.type";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { extractErrorMessage } from "@/shared/utils/error.utils";

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
    onError: (error) => {
      toast.error("Tạo hồ sơ thú cưng thất bại!", {
        description: extractErrorMessage(error as AxiosError),
      });
    },
  });
}
