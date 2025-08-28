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
import { Controller, useForm } from "react-hook-form";
import { UserRole } from "@/shared/constants/roles.constants";
import { useAccountUpdate } from "../hooks/useAccountUpdate";
import type { Account } from "../types/account.type";
import { useEffect } from "react";

interface AccountUpdateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: Account | null;
}

export function AccountUpdateModal({
  open,
  onOpenChange,
  account,
}: AccountUpdateModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: account?.email || "",
      role: account?.role || UserRole.STAFF,
      isVerify: true,
    },
  });
  const updateAccount = useAccountUpdate();

  useEffect(() => {
    reset({
      email: account?.email || "",
      role: account?.role || UserRole.STAFF,
      isVerify: true,
    });
  }, [account, open, reset]);

  const onSubmit = (data: {
    email: string;
    role: number;
    isVerify: boolean;
  }) => {
    if (!account?.accountId) return;
    updateAccount.mutate(
      {
        accountId: account.accountId,
        email: data.email,
        role: data.role,
        isVerify: data.isVerify,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cập nhật tài khoản</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              {...register("email", { required: "Email là bắt buộc" })}
              disabled
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message as string}
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
          <div>
            <Label>Xác thực</Label>
            <Controller
              name="isVerify"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="ml-2"
                />
              )}
            />
            <span className="ml-2 text-sm">Đã xác thực</span>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-primary text-white"
              disabled={updateAccount.isPending}
            >
              {updateAccount.isPending ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
