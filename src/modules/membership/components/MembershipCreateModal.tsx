import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useMembershipAdd } from "../hooks/useMembershipAdd";
import type { MembershipPayload } from "../types/membership.payload.type";

interface MembershipCreateModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const RANKS = [
  { value: "bronze", label: "Đồng" },
  { value: "silver", label: "Bạc" },
  { value: "gold", label: "Vàng" },
  { value: "platinum", label: "Bạch kim" },
  { value: "diamond", label: "Kim cương" },
];

export function MembershipCreateModal({
  open,
  onClose,
  onSuccess,
}: MembershipCreateModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<MembershipPayload>({
    defaultValues: {
      name: "",
      description: "",
      minPoints: 0,
      benefits: "",
      rank: "Bronze",
    },
  });
  const addMutation = useMembershipAdd();

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const onSubmit = async (values: MembershipPayload) => {
    await addMutation.mutateAsync(values);
    onSuccess?.();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-none">
        <DialogHeader>
          <DialogTitle>Thêm hạng thành viên mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Tên hạng <span className="text-red-500">*</span>
            </label>
            <Input
              {...register("name", {
                required: "Tên hạng không được để trống",
              })}
              placeholder="Nhập tên hạng"
              className="rounded-none"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Điểm tối thiểu <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              min={0}
              {...register("minPoints", {
                required: "Điểm tối thiểu không được để trống",
                min: { value: 0, message: "Điểm tối thiểu phải >= 0" },
              })}
              className="rounded-none"
            />
            {errors.minPoints && (
              <p className="mt-1 text-xs text-red-500">
                {errors.minPoints.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Hạng <span className="text-red-500">*</span>
            </label>
            <Select
              defaultValue="Bronze"
              {...register("rank", { required: true })}
              onValueChange={(val) => reset((prev) => ({ ...prev, rank: val }))}
            >
              <SelectTrigger className="rounded-none">
                <SelectValue placeholder="Chọn hạng" />
              </SelectTrigger>
              <SelectContent>
                {RANKS.map((rank) => (
                  <SelectItem key={rank.value} value={rank.value}>
                    {rank.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.rank && (
              <p className="mt-1 text-xs text-red-500">
                {errors.rank.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Quyền lợi
            </label>
            <Textarea
              {...register("benefits")}
              placeholder="Nhập quyền lợi"
              className="min-h-[60px] rounded-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Mô tả
            </label>
            <Textarea
              {...register("description")}
              placeholder="Nhập mô tả"
              className="min-h-[60px] rounded-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-none"
              onClick={onClose}
              disabled={addMutation.isPending}
            >
              Huỷ
            </Button>
            <Button
              type="submit"
              className="rounded-none"
              disabled={!isDirty || addMutation.isPending}
            >
              Thêm mới
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
