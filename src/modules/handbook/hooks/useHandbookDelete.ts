import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handbookService } from "../services/handbook.service";
import type { BaseResponse } from "@/shared/types/api.type";
import type { Handbook } from "../types/handbook.type";

export function useHandbookDelete() {
  const queryClient = useQueryClient();
  return useMutation<BaseResponse<Handbook>, Error, number>({
    mutationFn: (handbookId) => handbookService.deleteHandbook(handbookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["handbooks"] });
    },
  });
}
