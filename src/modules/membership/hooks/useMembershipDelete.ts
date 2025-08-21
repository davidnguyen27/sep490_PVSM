import { useMutation, useQueryClient } from "@tanstack/react-query";
import { membershipService } from "../service/membership.service";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";

export function useMembershipDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (membershipId: number | null) =>
      membershipService.deleteMembership(membershipId),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["memberships"] });
    },
    onError: (error) => toast.error(extractErrorMessage(error as AxiosError)),
  });
}
