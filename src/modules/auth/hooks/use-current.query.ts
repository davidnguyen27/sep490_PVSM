import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import type { User } from "@/shared/types/user.type";

export function useCurrentUser() {
  return useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: authService.currentUser,
    enabled: !!localStorage.getItem("accessToken"),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
