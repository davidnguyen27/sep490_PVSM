import { useQuery } from "@tanstack/react-query";
import { membershipService } from "../service/membership.service";
import type { BaseListResponse } from "@/shared/types/api.type";
import type { Membership } from "../types/membership.type";

interface UseMembershipsParams {
  pageNumber: number;
  pageSize: number;
  keyword?: string;
  status?: number;
}

export const useMemberships = (params: UseMembershipsParams) => {
  const {
    data,
    isLoading: isPending,
    error,
    refetch,
    isFetching,
  } = useQuery<BaseListResponse<Membership>>({
    queryKey: [
      "memberships",
      params.pageNumber,
      params.pageSize,
      params.keyword,
      params.status,
    ],
    queryFn: () => membershipService.getMembershipList(params),
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isPending,
    isFetching,
    error,
    refetch,
  };
};
