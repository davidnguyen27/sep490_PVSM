import { useMutation, useQueryClient } from "@tanstack/react-query";
import { vetService } from "../services/vet.service";
import type { BaseResponse } from "@/shared/types/api.type";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { VetAccount } from "../types/vet-account.type";

interface Params {
  email: string;
  password: string;
  role: number;
}

export function useVetCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Params) => vetService.createVet(payload),
    onSuccess: (data: BaseResponse<VetAccount>) => {
      if (data?.message) toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["vets"] });
    },
    onError: (error: AxiosError) => {
      toast.error(extractErrorMessage(error));
    },
  });
}
