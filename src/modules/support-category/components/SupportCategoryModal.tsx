import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useSupportCategoryAdd } from "../hooks/useSupportCategoryAdd";
import { useSupportCategoryEdit } from "../hooks/useSupportCategoryEdit";
import type { SupportCategory } from "../types/support-category.type";
import type { SupportCategoryPayload } from "../types/support-category.payload.type";

interface SupportCategoryModalProps {
  open: boolean;
  onClose: () => void;
  category?: SupportCategory | null;
  mode: "create" | "edit";
}

export function SupportCategoryModal({
  open,
  onClose,
  category,
  mode,
}: SupportCategoryModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<SupportCategoryPayload>({
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  const createMutation = useSupportCategoryAdd();
  const updateMutation = useSupportCategoryEdit();

  const isLoading = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (mode === "edit" && category) {
      reset({
        title: category.title,
        description: category.description,
        content: category.content,
      });
    } else {
      reset({
        title: "",
        description: "",
        content: "",
      });
    }
  }, [category, mode, reset, open]);

  const onSubmit = async (data: SupportCategoryPayload) => {
    if (isLoading) return;

    if (mode === "create") {
      createMutation.mutate(data, {
        onSuccess: () => {
          onClose();
        },
      });
    } else if (mode === "edit" && category?.supportCategoryId) {
      updateMutation.mutate(
        {
          supportCategoryId: category.supportCategoryId,
          payload: data,
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
      <DialogContent className="max-w-2xl rounded-none">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Thêm danh mục hỗ trợ mới"
              : "Chỉnh sửa danh mục hỗ trợ"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <Input
              {...register("title", {
                required: "Tiêu đề không được để trống",
                minLength: {
                  value: 3,
                  message: "Tiêu đề phải có ít nhất 3 ký tự",
                },
              })}
              placeholder="Nhập tiêu đề danh mục..."
              className="rounded-none"
              disabled={isLoading}
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Mô tả <span className="text-red-500">*</span>
            </label>
            <Textarea
              {...register("description", {
                required: "Mô tả không được để trống",
                minLength: {
                  value: 10,
                  message: "Mô tả phải có ít nhất 10 ký tự",
                },
              })}
              placeholder="Nhập mô tả..."
              className="min-h-[80px] rounded-none"
              disabled={isLoading}
            />
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Nội dung chi tiết <span className="text-red-500">*</span>
            </label>
            <Textarea
              {...register("content", {
                required: "Nội dung chi tiết không được để trống",
                minLength: {
                  value: 20,
                  message: "Nội dung chi tiết phải có ít nhất 20 ký tự",
                },
              })}
              placeholder="Nhập nội dung chi tiết..."
              className="min-h-[120px] rounded-none"
              disabled={isLoading}
            />
            {errors.content && (
              <p className="text-xs text-red-500">{errors.content.message}</p>
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
