import { useAuth } from "@/modules/auth/hooks/use-auth-context";
import { icons } from "@/shared/constants/icons.constants";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface LogoutButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
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
}: LogoutButtonProps) {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    try {
      logout();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đăng xuất");
      console.error("Logout error:", error);
    }
  };

  if (!user) return null;

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      className={`text-red-600 hover:bg-red-50 hover:text-red-700 ${className}`}
    >
      {showIcon && (
        <icons.LogOut size={16} className={showText ? "mr-2" : ""} />
      )}
      {showText && <span>Đăng xuất</span>}
    </Button>
  );
}
