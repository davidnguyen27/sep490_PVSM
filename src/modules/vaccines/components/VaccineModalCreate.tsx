import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Upload, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/shared";

import {
  createVaccineSchema,
  type CreateVaccineFormData,
} from "../schemas/create-vaccine.schema";
import type { VaccinePayload } from "../types/vaccine.payload.type";

interface VaccineModalCreateProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: VaccinePayload) => void;
  isSubmitting?: boolean;
}

export const VaccineModalCreate: React.FC<VaccineModalCreateProps> = ({
  open,
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CreateVaccineFormData>({
    resolver: zodResolver(createVaccineSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      notes: "",
    },
  });

  // Handle form submission
  const handleFormSubmit = async (data: CreateVaccineFormData) => {
    try {
      const payload: VaccinePayload = {
        name: data.name.trim(),
        description: data.description.trim(),
        price: data.price,
        image: data.image, // Already validated as File by schema
        notes: data.notes?.trim() || "",
      };

      await onSubmit(payload);
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("image", file, { shouldValidate: true });

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // Don't clear the form value as it needs to be File type, just clear preview
  };

  // Handle modal close
  const handleClose = () => {
    reset();
    setImagePreview(null);
    onClose();
  };

  // Format price display
  const formatPrice = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "");
    setValue("price", parseInt(value) || 0, { shouldValidate: true });
  };

  const priceValue = watch("price");
  const displayPrice = priceValue ? formatPrice(priceValue.toString()) : "";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="modal-scrollbar max-h-[90vh] max-w-2xl overflow-y-auto rounded-none">
        <DialogHeader>
          <DialogTitle className="text-primary font-nunito-700 mb-4 text-xl">
            Thêm vaccine mới
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Vaccine Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="font-nunito-500 text-sm">
              Tên vaccine <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Nhập tên vaccine"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="font-nunito-500 text-sm">
              Mô tả <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Nhập mô tả vaccine"
              rows={4}
              {...register("description")}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price" className="font-nunito-500 text-sm">
              Giá (VNĐ) <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="price"
                placeholder="0"
                value={displayPrice}
                onChange={handlePriceChange}
                className={errors.price ? "border-red-500" : ""}
              />
              <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500">
                VNĐ
              </span>
            </div>
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="font-nunito-500 text-sm">
              Hình ảnh <span className="text-red-500">*</span>
            </Label>

            <div className="flex flex-col gap-4">
              {imagePreview ? (
                <div className="relative mx-auto h-32 w-32">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full rounded-lg border object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="hover:border-primary cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors"
                >
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Nhấn để chọn hình ảnh
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    PNG, JPG, WEBP tối đa 5MB
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {!imagePreview && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Chọn hình ảnh
                </Button>
              )}
            </div>

            {errors.image && (
              <p className="text-sm text-red-500">{errors.image.message}</p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="font-nunito-500 text-sm">
              Ghi chú
            </Label>
            <Textarea
              id="notes"
              placeholder="Nhập ghi chú (tùy chọn)"
              rows={3}
              {...register("notes")}
              className={errors.notes ? "border-red-500" : ""}
            />
            {errors.notes && (
              <p className="text-sm text-red-500">{errors.notes.message}</p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[100px]"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Đang tạo...
                </>
              ) : (
                "Tạo vaccine"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
