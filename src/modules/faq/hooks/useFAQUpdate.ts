import { useMutation, useQueryClient } from "@tanstack/react-query";
import { faqService } from "../services/faq.service";
import type { BaseResponse } from "@/shared/types/api.type";
import type { Faq } from "../types/faq.type";

interface UpdateFaqPayload {
  faqId: number;
  question: string;
  answer: string;
}

export function useFAQUpdate() {
  const queryClient = useQueryClient();
  return useMutation<BaseResponse<Faq>, Error, UpdateFaqPayload>({
    mutationFn: ({ faqId, question, answer }) =>
      faqService.updateFaq(faqId, { question, answer }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
  });
}
