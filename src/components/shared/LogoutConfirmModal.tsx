import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/modules/auth/hooks/use-auth-context";
import { useUserRole } from "@/shared/hooks/useUserRole";
import { icons } from "@/shared/constants/icons.constants";
import { toast } from "sonner";

interface LogoutConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LogoutConfirmModal({
  open,
  onOpenChange,
}: LogoutConfirmModalProps) {
  const { logout } = useAuth();
  const { user, roleText } = useUserRole();

  const handleConfirmLogout = () => {
    console.log("🔍 LogoutConfirmModal: handleConfirmLogout called");

    try {
      console.log("🔍 LogoutConfirmModal: Calling logout function");
      logout();
      onOpenChange(false);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đăng xuất");
      console.error("Logout error:", error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <icons.LogOut className="h-6 w-6 text-red-600" />
          </div>
          <AlertDialogTitle className="text-xl font-semibold text-gray-900">
            Xác nhận đăng xuất
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            Bạn có chắc chắn muốn đăng xuất khỏi tài khoản{" "}
            <span className="font-medium text-gray-900">{roleText}</span> này
            không?
            <br />
            <span className="text-sm text-gray-500">({user?.email})</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="flex-1">Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmLogout}
            className="flex-1 bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            <icons.LogOut className="mr-2 h-4 w-4" />
            Đăng xuất
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
