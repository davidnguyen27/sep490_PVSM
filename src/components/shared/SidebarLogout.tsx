import { useAuth } from "@/modules/auth/hooks/use-auth-context";
import { icons } from "@/shared/constants/icons.constants";
import { useState } from "react";
import LogoutConfirmModal from "./LogoutConfirmModal";

interface SidebarLogoutProps {
    isCollapsed?: boolean;
    className?: string;
}

export default function SidebarLogout({
    isCollapsed = false,
    className = "",
}: SidebarLogoutProps) {
    const { user } = useAuth();
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleLogoutClick = () => {
        setShowConfirmModal(true);
    };

    // Don't render if user is not logged in
    if (!user) return null;

    const isMobile = window.innerWidth < 1024;
    const shouldShowText = !isCollapsed || isMobile;

    return (
        <>
            <div className={`mt-auto border-t border-gray-200 pt-4 ${className}`}>
                <button
                    onClick={handleLogoutClick}
                    className={`flex w-full items-center rounded-lg py-2.5 text-sm font-nunito-500 transition-all duration-200 text-red-600 hover:bg-red-50 hover:text-red-700 ${isCollapsed && !isMobile ? "justify-center px-2" : "px-3 space-x-3"
                        }`}
                >
                    <span className="flex-shrink-0">
                        <icons.LogOut size={20} />
                    </span>
                    {shouldShowText && <span className="truncate">Đăng xuất</span>}
                </button>
            </div>

            <LogoutConfirmModal
                open={showConfirmModal}
                onOpenChange={setShowConfirmModal}
            />
        </>
    );
}
