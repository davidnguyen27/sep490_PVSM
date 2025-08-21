import { useQuery } from "@tanstack/react-query";
import { faqService } from "../services/faq.service";
import type { BaseListResponse } from "@/shared/types/api.type";
import type { Faq } from "../types/faq.type";

interface UseFAQsParams {
  pageNumber: number;
  pageSize: number;
  keyword?: string;
  status?: number;
}

export function useFAQs(params: UseFAQsParams) {
  return useQuery<BaseListResponse<Faq>, Error>({
    queryKey: ["faqs", params],
    queryFn: () => faqService.getAllFaq(params),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
