import { useCurrentUser } from "@/modules/auth/hooks/use-current.query";
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
    localStorage.clear();
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
