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
import { useFAQCreate } from "../hooks/useFAQCreate";
import { useFAQUpdate } from "../hooks/useFAQUpdate";
import type { Faq } from "../types/faq.type";

interface FAQModalProps {
  open: boolean;
  onClose: () => void;
  faq?: Faq | null;
  mode: "create" | "edit";
}

interface FormData {
  question: string;
  answer: string;
}

export function FAQModal({ open, onClose, faq, mode }: FAQModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const createMutation = useFAQCreate();
  const updateMutation = useFAQUpdate();

  const isLoading = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (mode === "edit" && faq) {
      reset({
        question: faq.question,
        answer: faq.answer,
      });
    } else {
      reset({
        question: "",
        answer: "",
      });
    }
  }, [faq, mode, reset, open]);

  const onSubmit = async (data: FormData) => {
    if (isLoading) return;

    if (mode === "create") {
      createMutation.mutate(data, {
        onSuccess: () => {
          onClose();
        },
      });
    } else if (mode === "edit" && faq?.faqItemId) {
      updateMutation.mutate(
        {
          faqId: faq.faqItemId,
          question: data.question,
          answer: data.answer,
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
            {mode === "create" ? "Thêm FAQ mới" : "Chỉnh sửa FAQ"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Câu hỏi <span className="text-red-500">*</span>
            </label>
            <Input
              {...register("question", {
                required: "Câu hỏi không được để trống",
                minLength: {
                  value: 5,
                  message: "Câu hỏi phải có ít nhất 5 ký tự",
                },
              })}
              placeholder="Nhập câu hỏi..."
              className="rounded-none"
              disabled={isLoading}
            />
            {errors.question && (
              <p className="text-xs text-red-500">{errors.question.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Câu trả lời <span className="text-red-500">*</span>
            </label>
            <Textarea
              {...register("answer", {
                required: "Câu trả lời không được để trống",
                minLength: {
                  value: 10,
                  message: "Câu trả lời phải có ít nhất 10 ký tự",
                },
              })}
              placeholder="Nhập câu trả lời..."
              className="min-h-[120px] rounded-none"
              disabled={isLoading}
            />
            {errors.answer && (
              <p className="text-xs text-red-500">{errors.answer.message}</p>
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
