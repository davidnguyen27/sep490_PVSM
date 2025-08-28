import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Upload, ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/shared";
import type { VaccinePayload } from "../types/vaccine.payload.type";
import type { Vaccine } from "../types/vaccine.type";
import {
  updateVaccineSchema,
  type UpdateVaccineFormData,
} from "../schemas/update-vaccine.schema";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: VaccinePayload) => void;
  isSubmitting: boolean;
  defaultValues?: Vaccine;
}

export function VaccineUpdateModal({
  open,
  onClose,
  onSubmit,
  isSubmitting,
  defaultValues,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateVaccineFormData>({
    resolver: zodResolver(updateVaccineSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      notes: "",
      image: null,
    },
  });

  const watchedImage = watch("image");
  const currentImageUrl =
    typeof watchedImage === "string" ? watchedImage : null;
  const previewUrl =
    watchedImage instanceof File
      ? URL.createObjectURL(watchedImage)
      : currentImageUrl;

  // Reset form when modal opens/closes or defaultValues change
  useEffect(() => {
    if (open && defaultValues) {
      reset({
        name: defaultValues.name || "",
        description: defaultValues.description || "",
        price: defaultValues.price || 0,
        notes: defaultValues.notes || "",
        image: defaultValues.image || null,
      });
    } else if (!open) {
      reset();
    }
  }, [open, defaultValues, reset]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn file hình ảnh");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước file không được vượt quá 5MB");
        return;
      }

      setValue("image", file);
    }
  };

  const handleRemoveImage = () => {
    setValue("image", null);
  };

  const handleFormSubmit = (data: UpdateVaccineFormData) => {
    // Convert form data to VaccinePayload
    const payload: VaccinePayload = {
      name: data.name,
      description: data.description,
      price: data.price,
      notes: data.notes || "",
      image: data.image || defaultValues?.image || null,
    };

    onSubmit(payload);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-none">
        <DialogHeader>
          <DialogTitle className="text-primary font-nunito-700 mb-4 text-xl">
            Cập nhật vaccine
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Vaccine Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-nunito-500 text-sm">
                  Tên vaccine <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Nhập tên vaccine"
                  className="w-full"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price" className="font-nunito-500 text-sm">
                  Giá (VNĐ) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="1000"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="Nhập giá vaccine"
                  className="w-full"
                  disabled={isSubmitting}
                />
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="font-nunito-500 text-sm"
                >
                  Mô tả <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Nhập mô tả vaccine"
                  className="min-h-[100px] w-full resize-none"
                  disabled={isSubmitting}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="font-nunito-500 text-sm">Hình ảnh</Label>

                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-48 w-full rounded-lg border-2 border-dashed border-gray-300 object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={handleRemoveImage}
                      disabled={isSubmitting}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex h-48 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100">
                    <ImageIcon className="mb-2 h-12 w-12 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">Chọn hình ảnh</p>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    disabled={isSubmitting}
                  />
                  <Label
                    htmlFor="image-upload"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    {previewUrl ? "Thay đổi ảnh" : "Tải ảnh lên"}
                  </Label>
                </div>

                {errors.image && (
                  <p className="text-sm text-red-500">{errors.image.message}</p>
                )}

                <p className="text-xs text-gray-500">
                  Định dạng: JPG, PNG. Kích thước tối đa: 5MB
                </p>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="font-nunito-500 text-sm">
                  Ghi chú
                </Label>
                <Textarea
                  id="notes"
                  {...register("notes")}
                  placeholder="Nhập ghi chú (tùy chọn)"
                  className="min-h-[80px] w-full resize-none"
                  disabled={isSubmitting}
                />
                {errors.notes && (
                  <p className="text-sm text-red-500">{errors.notes.message}</p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-6"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[120px] px-6"
            >
              {isSubmitting ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Đang cập nhật...
                </>
              ) : (
                "Cập nhật"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
