import { useQuery } from "@tanstack/react-query";
import { accountService } from "../services/account.service";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyword?: string;
  status?: boolean;
}

export function useAccounts(params: Params) {
  return useQuery({
    queryKey: ["accounts", params],
    queryFn: () => accountService.getAllAccounts(params),
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });
}
