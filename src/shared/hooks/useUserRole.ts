import { useAuth } from "@/modules/auth/hooks/use-auth-context";

/**
 * Hook để kiểm tra role của user và cung cấp thông tin về role
 */
export function useUserRole() {
    const { user } = useAuth();

    const isAdmin = user?.role === 1;
    const isStaff = user?.role === 2;
    const isVet = user?.role === 3;

    const getRoleText = (): string => {
        if (!user) return "Khách";
        switch (user.role) {
            case 1:
                return "Quản trị viên";
            case 2:
                return "Nhân viên";
            case 3:
                return "Bác sĩ thú y";
            default:
                return "Người dùng";
        }
    };

    const getRoleSlug = (): string => {
        if (!user) return "guest";
        switch (user.role) {
            case 1:
                return "admin";
            case 2:
                return "staff";
            case 3:
                return "vet";
            default:
                return "customer";
        }
    };

    const hasPermission = (allowedRoles: number[]): boolean => {
        if (!user) return false;
        return allowedRoles.includes(user.role);
    };

    return {
        user,
        isAdmin,
        isStaff,
        isVet,
        isLoggedIn: !!user,
        role: user?.role,
        roleText: getRoleText(),
        roleSlug: getRoleSlug(),
        hasPermission,
    };
}
