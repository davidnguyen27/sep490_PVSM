import React from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui";
import { ImageIcon, Camera, CheckCircle } from "lucide-react";
import type { PetSchema } from "../../schemas/pet.schema";
import { IconLabel } from "./FormFields";
import { FORM_CONFIG } from "../../constants/form.constants";

interface ImagePreviewProps {
  preview: string;
  alt: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = React.memo(
  ({ preview, alt }) => (
    <div className="flex justify-center">
      <div className="relative">
        <img
          src={preview}
          alt={alt}
          className="border-primary/30 h-48 w-48 rounded-lg border-2 border-dashed object-cover shadow-lg"
          style={{
            width: FORM_CONFIG.IMAGE_SIZE.width,
            height: FORM_CONFIG.IMAGE_SIZE.height,
          }}
        />
        <div className="absolute inset-0 rounded-lg bg-black/10" />
      </div>
    </div>
  ),
);

ImagePreview.displayName = "ImagePreview";

export const EmptyImagePlaceholder: React.FC = React.memo(() => (
  <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
    <div className="text-center">
      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-500">Chưa có ảnh</p>
    </div>
  </div>
));

EmptyImagePlaceholder.displayName = "EmptyImagePlaceholder";

interface ImageUploadFieldProps {
  form: UseFormReturn<PetSchema>;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = React.memo(
  ({ form, onUpload }) => (
    <FormField
      control={form.control}
      name="image"
      render={() => (
        <FormItem>
          <IconLabel icon={Camera}>Chọn ảnh mới</IconLabel>
          <FormControl>
            <Input
              type="file"
              accept={FORM_CONFIG.FILE_CONSTRAINTS.acceptedTypes}
              onChange={onUpload}
              className="border-border file:bg-primary hover:file:bg-primary/90 file:font-nunito-600 file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:text-white"
              aria-describedby="file-constraints"
            />
          </FormControl>
          <p id="file-constraints" className="text-muted-foreground text-xs">
            Tối đa {FORM_CONFIG.FILE_CONSTRAINTS.maxSize / (1024 * 1024)}MB.
            Định dạng: JPEG, PNG, WebP
          </p>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
);

ImageUploadField.displayName = "ImageUploadField";

interface SterilizationFieldProps {
  form: UseFormReturn<PetSchema>;
}

export const SterilizationField: React.FC<SterilizationFieldProps> = React.memo(
  ({ form }) => (
    <FormField
      control={form.control}
      name="isSterilized"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-y-0 space-x-3 rounded-md border p-4">
          <FormControl>
            <input
              type="checkbox"
              checked={Boolean(field.value)}
              onChange={(e) => field.onChange(e.target.checked)}
              className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
              aria-describedby="sterilization-description"
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <IconLabel icon={CheckCircle}>Đã triệt sản</IconLabel>
            <p
              id="sterilization-description"
              className="text-muted-foreground text-sm"
            >
              Đánh dấu nếu thú cưng đã được triệt sản
            </p>
          </div>
        </FormItem>
      )}
    />
  ),
);

SterilizationField.displayName = "SterilizationField";
