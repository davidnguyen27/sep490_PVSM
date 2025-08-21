import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supportCategoryService } from "../services/support-category.service";
import type { BaseResponse } from "@/shared/types/api.type";
import type { SupportCategory } from "../types/support-category.type";
import type { SupportCategoryPayload } from "../types/support-category.payload.type";

interface UpdateSupportCategoryPayload {
  supportCategoryId: number;
  payload: SupportCategoryPayload;
}

export function useSupportCategoryEdit() {
  const queryClient = useQueryClient();
  return useMutation<
    BaseResponse<SupportCategory>,
    Error,
    UpdateSupportCategoryPayload
  >({
    mutationFn: ({ supportCategoryId, payload }) =>
      supportCategoryService.updateSupportCategory(supportCategoryId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supportCategories"] });
    },
  });
}
