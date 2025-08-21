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
import { useEffect, useState } from "react";
import { useHandbookCreate } from "../hooks/useHandbookCreate";
import { useHandbookUpdate } from "../hooks/useHandbookUpdate";
import type { Handbook } from "../types/handbook.type";
import type { HandbookPayload } from "../types/handbook.payload.type";

interface HandbookModalProps {
  open: boolean;
  onClose: () => void;
  handbook?: Handbook | null;
  mode: "create" | "edit";
}

interface FormData {
  title: string;
  introduction: string;
  highlight: string;
  content: string;
  importantNote: string;
  imageFile?: FileList;
}

export function HandbookModal({
  open,
  onClose,
  handbook,
  mode,
}: HandbookModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      introduction: "",
      highlight: "",
      content: "",
      importantNote: "",
    },
  });

  const createMutation = useHandbookCreate();
  const updateMutation = useHandbookUpdate();

  const isLoading = createMutation.isPending || updateMutation.isPending;
  const imageFile = watch("imageFile");

  useEffect(() => {
    if (mode === "edit" && handbook) {
      reset({
        title: handbook.title,
        introduction: handbook.introduction,
        highlight: handbook.highlight,
        content: handbook.content,
        importantNote: handbook.importantNote,
      });
      setImagePreview(handbook.imageUrl);
    } else {
      reset({
        title: "",
        introduction: "",
        highlight: "",
        content: "",
        importantNote: "",
      });
      setImagePreview(null);
    }
  }, [handbook, mode, reset, open]);

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const file = imageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [imageFile]);

  const onSubmit = async (data: FormData) => {
    if (isLoading) return;

    const payload: HandbookPayload = {
      title: data.title,
      introduction: data.introduction,
      highlight: data.highlight,
      content: data.content,
      importantNote: data.importantNote,
      imageUrl: data.imageFile?.[0] || handbook?.imageUrl || "",
    };

    if (mode === "create") {
      createMutation.mutate(payload, {
        onSuccess: () => {
          onClose();
        },
      });
    } else if (mode === "edit" && handbook?.handbookId) {
      updateMutation.mutate(
        {
          handbookId: handbook.handbookId,
          payload,
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
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto rounded-none">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Thêm Handbook mới" : "Chỉnh sửa Handbook"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register("title", {
                    required: "Tiêu đề không được để trống",
                    minLength: {
                      value: 5,
                      message: "Tiêu đề phải có ít nhất 5 ký tự",
                    },
                  })}
                  placeholder="Nhập tiêu đề handbook..."
                  className="rounded-none"
                  disabled={isLoading}
                />
                {errors.title && (
                  <p className="text-xs text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Điểm nổi bật <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register("highlight", {
                    required: "Điểm nổi bật không được để trống",
                  })}
                  placeholder="Nhập điểm nổi bật..."
                  className="rounded-none"
                  disabled={isLoading}
                />
                {errors.highlight && (
                  <p className="text-xs text-red-500">
                    {errors.highlight.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Giới thiệu <span className="text-red-500">*</span>
                </label>
                <Textarea
                  {...register("introduction", {
                    required: "Giới thiệu không được để trống",
                  })}
                  placeholder="Nhập giới thiệu..."
                  className="min-h-[100px] rounded-none"
                  disabled={isLoading}
                />
                {errors.introduction && (
                  <p className="text-xs text-red-500">
                    {errors.introduction.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Hình ảnh
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  {...register("imageFile")}
                  className="rounded-none"
                  disabled={isLoading}
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-32 w-32 rounded border object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Nội dung <span className="text-red-500">*</span>
                </label>
                <Textarea
                  {...register("content", {
                    required: "Nội dung không được để trống",
                    minLength: {
                      value: 50,
                      message: "Nội dung phải có ít nhất 50 ký tự",
                    },
                  })}
                  placeholder="Nhập nội dung chi tiết..."
                  className="min-h-[200px] rounded-none"
                  disabled={isLoading}
                />
                {errors.content && (
                  <p className="text-xs text-red-500">
                    {errors.content.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Lưu ý quan trọng
                </label>
                <Textarea
                  {...register("importantNote")}
                  placeholder="Nhập lưu ý quan trọng..."
                  className="min-h-[120px] rounded-none"
                  disabled={isLoading}
                />
                {errors.importantNote && (
                  <p className="text-xs text-red-500">
                    {errors.importantNote.message}
                  </p>
                )}
              </div>
            </div>
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
