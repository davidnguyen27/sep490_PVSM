import { AuthProvider } from "./AuthContext";
import { SidebarProvider } from "./SidebarContext";

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </AuthProvider>
  );
}
