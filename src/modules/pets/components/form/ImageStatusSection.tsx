import React from "react";
import type { UseFormReturn } from "react-hook-form";
import { CheckCircle, Camera, ImageIcon } from "lucide-react";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui";
import type { PetSchema } from "../../schemas/pet.schema";
import { FormSection } from "./FormSection";
import { IconLabel } from "./IconLabel";
import { ImagePreview, EmptyImagePlaceholder } from "./ImagePreview";
import { FORM_CONFIG } from "../../constants/form.constants";
import {
  isValidImageFile,
  createImagePreview,
  formatFileSize,
} from "../../utils/form.utils";

interface ImageStatusSectionProps {
  form: UseFormReturn<PetSchema>;
  preview: string;
  onImageChange: (preview: string) => void;
}

export const ImageStatusSection: React.FC<ImageStatusSectionProps> = ({
  form,
  preview,
  onImageChange,
}) => {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!isValidImageFile(file)) {
      // TODO: Show error toast
      return;
    }

    form.setValue("image", file);
    onImageChange(createImagePreview(file));
  };

  return (
    <FormSection title="Hình ảnh & Tình trạng" icon={Camera}>
      <div className="space-y-6">
        {/* Sterilization Status */}
        <FormField
          control={form.control}
          name="isSterilized"
          render={({ field }) => (
            <FormItem className="border-border bg-linen flex flex-row items-center space-y-0 space-x-3 rounded-md border p-4">
              <FormControl>
                <input
                  type="checkbox"
                  checked={Boolean(field.value)}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="border-border text-primary focus:ring-primary h-4 w-4 rounded"
                  aria-describedby="sterilization-description"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <IconLabel icon={CheckCircle}>Đã triệt sản</IconLabel>
                <p
                  id="sterilization-description"
                  className="text-muted-foreground font-nunito-400 text-sm"
                >
                  Đánh dấu nếu thú cưng đã được triệt sản
                </p>
              </div>
            </FormItem>
          )}
        />

        {/* Current Image Preview */}
        <div className="space-y-4">
          <IconLabel icon={ImageIcon}>Ảnh thú cưng</IconLabel>
          {preview ? (
            <ImagePreview preview={preview} alt="Ảnh thú cưng" />
          ) : (
            <EmptyImagePlaceholder />
          )}
        </div>

        {/* Image Upload */}
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <IconLabel icon={Camera}>Chọn ảnh</IconLabel>
              <FormControl>
                <Input
                  type="file"
                  accept={FORM_CONFIG.FILE_CONSTRAINTS.acceptedTypes}
                  onChange={handleUpload}
                  className="border-border font-nunito-400 file:bg-primary file:font-nunito-600 hover:file:bg-secondary file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:text-white"
                  aria-describedby="file-constraints"
                />
              </FormControl>
              <p
                id="file-constraints"
                className="text-muted-foreground font-nunito-400 text-xs"
              >
                Tối đa {formatFileSize(FORM_CONFIG.FILE_CONSTRAINTS.maxSize)}.
                Định dạng: JPEG, PNG, WebP
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  );
};
