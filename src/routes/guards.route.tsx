import { useAuth } from "@/modules/auth";
import type { UserRole } from "@/shared/constants/roles";
import { LOGIN_ROUTES } from "@/shared/constants/routes";
import { useLocation, Navigate } from "react-router-dom";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRole: UserRole[];
}

export function RoleGuard({ children, allowedRole }: RoleGuardProps) {
  const { user, isPending } = useAuth();
  const location = useLocation();

  if (isPending) {
    return null;
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!allowedRole.includes(user.role as UserRole)) {
    return <Navigate to={LOGIN_ROUTES[user.role as UserRole]} replace />;
  }

  return <>{children}</>;
}
