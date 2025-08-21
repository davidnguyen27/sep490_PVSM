import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";
import type { MembershipPayload } from "../types/membership.payload.type";
import { membershipService } from "../service/membership.service";

interface Params {
  payload: MembershipPayload;
  membershipId: number | null;
}

export function useMembershipUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, membershipId }: Params) =>
      membershipService.updateMembership(membershipId, payload),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["memberships", "detail"] });
    },
    onError: (error) => toast.error(extractErrorMessage(error as AxiosError)),
  });
}
