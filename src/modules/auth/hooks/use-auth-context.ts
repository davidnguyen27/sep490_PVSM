import { useContext } from "react";
import { AuthContext } from "@/shared/context/AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be use within AuthProvider");
  return context;
}
