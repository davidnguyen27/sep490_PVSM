import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_ROUTES } from "@/shared/constants/routes";

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: async ({ data, message }) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      try {
        const userCurrent = await authService.currentUser();

        localStorage.setItem("user", JSON.stringify(userCurrent));
        localStorage.setItem("role", String(userCurrent.role));

        queryClient.setQueryData(["currentUser"], userCurrent);
        await queryClient.invalidateQueries({ queryKey: ["currentUser"] });

        navigate(
          DASHBOARD_ROUTES[userCurrent.role as keyof typeof DASHBOARD_ROUTES],
          { replace: true },
        );
      } catch (error) {
        toast.error(error as string);
      }

      toast.success(message);
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error as AxiosError));
    },
  });
}
