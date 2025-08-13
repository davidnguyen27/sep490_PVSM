import { useAuth } from "@/modules/auth/hooks/use-auth-context";
import { icons } from "@/shared/constants/icons.constants";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import LogoutConfirmModal from "./LogoutConfirmModal";

interface LogoutButtonProps {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
    showIcon?: boolean;
    showText?: boolean;
    confirmLogout?: boolean;
}

export default function LogoutButton({
    variant = "ghost",
    size = "default",
    className = "",
    showIcon = true,
    showText = true,
    confirmLogout = true,
}: LogoutButtonProps) {
    const { logout, user } = useAuth();
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    console.log("🔍 LogoutButton: Component rendered", {
        user: user?.email,
        confirmLogout,
        showConfirmModal
    });

    const handleLogout = () => {
        console.log("🔍 LogoutButton: handleLogout called", { confirmLogout });

        if (confirmLogout) {
            console.log("🔍 LogoutButton: Opening confirm modal");
            setShowConfirmModal(true);
            return;
        }

        try {
            console.log("🔍 LogoutButton: Calling logout function");
            logout();
            toast.success("Đăng xuất thành công");
        } catch (error) {
            toast.error("Có lỗi xảy ra khi đăng xuất");
            console.error("Logout error:", error);
        }
    };

    // Don't render if user is not logged in
    if (!user) return null;

    return (
        <>
            <Button
                variant={variant}
                size={size}
                onClick={(e) => {
                    console.log("🔍 LogoutButton: Button clicked", e);
                    handleLogout();
                }}
                className={`text-red-600 hover:bg-red-50 hover:text-red-700 ${className}`}
            >
                {showIcon && <icons.LogOut size={16} className={showText ? "mr-2" : ""} />}
                {showText && <span>Đăng xuất</span>}
            </Button>

            <LogoutConfirmModal
                open={showConfirmModal}
                onOpenChange={setShowConfirmModal}
            />
        </>
    );
}
