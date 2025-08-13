import { useCurrentUser } from "@/modules/auth/hooks/use-current.query";
import { clearAuthData } from "@/shared/utils/auth-storage.utils";
import type { User } from "@/shared/types/user.type";
import type { ReactNode } from "react";
import { createContext, useCallback, useEffect } from "react";

interface AuthContextType {
  user: User | undefined;
  isPending: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isPending, isFetched } = useCurrentUser();

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", String(user.role));
    }
  }, [user]);

  const logout = useCallback(() => {
    console.log("🔍 AuthContext: logout function called");

    // Xóa các token và thông tin user khỏi localStorage bằng utility function
    clearAuthData();
    console.log("🔍 AuthContext: clearAuthData completed");

    // Có thể giữ lại các preferences khác nếu cần
    // localStorage.removeItem("sidebar-is-collapsed");
    // localStorage.removeItem("sidebar-open-menus");

    // Redirect về trang landing
    console.log("🔍 AuthContext: Redirecting to /");
    window.location.href = "/";
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: isFetched ? user : undefined, isPending, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
