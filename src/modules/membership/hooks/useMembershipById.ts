import { useQuery } from "@tanstack/react-query";
import { membershipService } from "../service/membership.service";

export function useMembershipById(membershipId: number | null) {
  return useQuery({
    queryKey: ["membership", membershipId],
    queryFn: () => membershipService.getMemberShipById(membershipId),
    enabled: !!membershipId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
