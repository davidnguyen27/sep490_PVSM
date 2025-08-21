import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supportCategoryService } from "../services/support-category.service";
import type { BaseResponse } from "@/shared/types/api.type";
import type { SupportCategory } from "../types/support-category.type";
import type { SupportCategoryPayload } from "../types/support-category.payload.type";

export function useSupportCategoryAdd() {
  const queryClient = useQueryClient();
  return useMutation<
    BaseResponse<SupportCategory>,
    Error,
    SupportCategoryPayload
  >({
    mutationFn: (payload) =>
      supportCategoryService.createSupportCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supportCategories"] });
    },
  });
}
