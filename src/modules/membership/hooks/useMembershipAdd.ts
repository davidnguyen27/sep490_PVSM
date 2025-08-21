import { useMutation } from "@tanstack/react-query";
import { membershipService } from "../service/membership.service";
import type { MembershipPayload } from "../types/membership.payload.type";
import type { Membership } from "../types/membership.type";
import type { BaseListResponse } from "@/shared/types/api.type";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";

export function useMembershipAdd() {
  return useMutation<BaseListResponse<Membership>, unknown, MembershipPayload>({
    mutationFn: (payload) => membershipService.createMembership(payload),
    onSuccess: ({ message }) => {
      toast.success(message || "Tạo hạng thành viên thành công!");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error as AxiosError));
    },
  });
}
