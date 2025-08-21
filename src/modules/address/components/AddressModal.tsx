import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAddressCreate } from "../hooks/useAddressCreate";
import { useAddressUpdate } from "../hooks/useAddressUpdate";
import type { Address } from "../types/address.type";

interface AddressModalProps {
  open: boolean;
  onClose: () => void;
  address?: Address | null;
  mode: "create" | "edit";
}

interface FormData {
  location: string;
}

export function AddressModal({
  open,
  onClose,
  address,
  mode,
}: AddressModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      location: "",
    },
  });

  const createMutation = useAddressCreate();
  const updateMutation = useAddressUpdate();

  const isLoading = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (mode === "edit" && address) {
      reset({
        location: address.location,
      });
    } else {
      reset({
        location: "",
      });
    }
  }, [address, mode, reset, open]);

  const onSubmit = async (data: FormData) => {
    if (isLoading) return;
    if (mode === "create") {
      createMutation.mutate(
        { location: data.location },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    } else if (mode === "edit" && address?.addressId) {
      updateMutation.mutate(
        {
          addressId: address.addressId,
          location: data.location,
        },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-none">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Thêm địa chỉ mới" : "Chỉnh sửa địa chỉ"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Địa chỉ <span className="text-red-500">*</span>
            </label>
            <Input
              {...register("location", {
                required: "Địa chỉ không được để trống",
                minLength: {
                  value: 3,
                  message: "Địa chỉ phải có ít nhất 3 ký tự",
                },
              })}
              placeholder="Nhập địa chỉ..."
              className="rounded-none"
              disabled={isLoading}
            />
            {errors.location && (
              <p className="text-xs text-red-500">{errors.location.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-none"
              onClick={onClose}
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 rounded-none"
              disabled={!isDirty || isLoading}
            >
              {isLoading
                ? "Đang xử lý..."
                : mode === "create"
                  ? "Thêm mới"
                  : "Cập nhật"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
