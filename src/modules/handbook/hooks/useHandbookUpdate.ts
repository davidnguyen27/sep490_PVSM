import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handbookService } from "../services/handbook.service";
import type { BaseResponse } from "@/shared/types/api.type";
import type { Handbook } from "../types/handbook.type";
import type { HandbookPayload } from "../types/handbook.payload.type";

interface UpdateHandbookPayload {
  handbookId: number;
  payload: HandbookPayload;
}

export function useHandbookUpdate() {
  const queryClient = useQueryClient();
  return useMutation<BaseResponse<Handbook>, Error, UpdateHandbookPayload>({
    mutationFn: ({ handbookId, payload }) =>
      handbookService.updateHandbook(handbookId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["handbooks"] });
    },
  });
}
