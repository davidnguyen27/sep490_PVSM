import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input, Label, Button } from "@/components/ui";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import type {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormReset,
  UseFormRegister,
} from "react-hook-form";
import { UserRole } from "@/shared/constants/roles.constants";

interface AccountFormData {
  email: string;
  password: string;
  role: number;
}

interface AccountCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AccountFormData) => void;
  register: UseFormRegister<AccountFormData>;
  handleSubmit: UseFormHandleSubmit<AccountFormData>;
  reset: UseFormReset<AccountFormData>;
  control: Control<AccountFormData>;
  errors: FieldErrors<AccountFormData>;
  isPending: boolean;
}

export function AccountCreateModal({
  open,
  onOpenChange,
  onSubmit,
  register,
  handleSubmit,
  reset,
  control,
  errors,
  isPending,
}: AccountCreateModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo tài khoản mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              {...register("email", { required: "Email là bắt buộc" })}
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message as string}
              </span>
            )}
          </div>
          <div>
            <Label>Mật khẩu</Label>
            <Input
              type="password"
              {...register("password", {
                required: "Mật khẩu là bắt buộc",
              })}
            />
            {errors.password && (
              <span className="text-xs text-red-500">
                {errors.password.message as string}
              </span>
            )}
          </div>
          <div>
            <Label>Vai trò</Label>
            <Controller
              name="role"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  value={String(field.value)}
                  onValueChange={(val) => field.onChange(Number(val))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={String(UserRole.ADMIN)}>
                      Quản trị viên
                    </SelectItem>
                    <SelectItem value={String(UserRole.STAFF)}>
                      Nhân viên
                    </SelectItem>
                    <SelectItem value={String(UserRole.VET)}>Bác sĩ</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                reset();
              }}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-primary text-white"
              disabled={isPending}
            >
              {isPending ? "Đang tạo..." : "Tạo mới"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
