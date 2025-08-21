import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handbookService } from "../services/handbook.service";
import type { BaseResponse } from "@/shared/types/api.type";
import type { Handbook } from "../types/handbook.type";
import type { HandbookPayload } from "../types/handbook.payload.type";

export function useHandbookCreate() {
  const queryClient = useQueryClient();
  return useMutation<BaseResponse<Handbook>, Error, HandbookPayload>({
    mutationFn: (payload) => handbookService.createHandbook(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["handbooks"] });
    },
  });
}
