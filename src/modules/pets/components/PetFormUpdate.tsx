import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { PetSchema } from "../schemas/pet.schema";
import React, { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  Dog,
  PawPrint,
  BadgeInfo,
  Heart,
  MapPin,
  Calendar,
  Weight,
  Palette,
  Globe,
  CheckCircle,
  Camera,
  ImageIcon,
} from "lucide-react";
import { CustomerSelectField } from "./form/CustomerSelectField";

interface Props {
  form: UseFormReturn<PetSchema>;
  onSubmit: (data: PetSchema) => void;
}

// Constants
const FORM_CONFIG = {
  IMAGE_SIZE: { width: 192, height: 192 }, // 48 * 4 = 192px (h-48 w-48)
  ICON_SIZE: { small: 16, medium: 20 },
  FILE_CONSTRAINTS: {
    maxSize: 5 * 1024 * 1024, // 5MB
    acceptedTypes: "image/jpeg,image/png,image/webp",
    acceptedTypesArray: ["image/jpeg", "image/png", "image/webp"] as const,
  },
} as const;

const SPECIES_OPTIONS = [
  { value: "Dog", label: "🐕 Chó" },
  { value: "Cat", label: "🐱 Mèo" },
] as const;

const GENDER_OPTIONS = [
  { value: "Male", label: "♂️ Đực" },
  { value: "Female", label: "♀️ Cái" },
] as const;

// Type definitions
type StringFieldName = Extract<
  keyof PetSchema,
  | "name"
  | "breed"
  | "dateOfBirth"
  | "weight"
  | "color"
  | "placeOfBirth"
  | "placeToLive"
  | "nationality"
>;
type SelectFieldName = Extract<keyof PetSchema, "species" | "gender">;

// Utility functions
const isValidImageFile = (file: File): boolean => {
  const validTypes = ["image/jpeg", "image/png", "image/webp"];
  return (
    file.size <= FORM_CONFIG.FILE_CONSTRAINTS.maxSize &&
    validTypes.includes(file.type)
  );
};

const createImagePreview = (file: File): string => URL.createObjectURL(file);

// Helper Components
interface IconLabelProps {
  icon: React.ComponentType<{ size: number; className?: string }>;
  children: React.ReactNode;
}

const IconLabel: React.FC<IconLabelProps> = ({ icon: Icon, children }) => (
  <FormLabel className="flex items-center gap-2 text-sm font-medium">
    <Icon size={FORM_CONFIG.ICON_SIZE.small} className="text-primary" />
    {children}
  </FormLabel>
);

interface SelectFieldProps {
  form: UseFormReturn<PetSchema>;
  name: SelectFieldName;
  label: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  placeholder: string;
  options: readonly { value: string; label: string }[];
}

const SelectField: React.FC<SelectFieldProps> = ({
  form,
  name,
  label,
  icon,
  placeholder,
  options,
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <IconLabel icon={icon}>{label}</IconLabel>
        <FormControl>
          <Select value={field.value || ""} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

interface InputFieldProps {
  form: UseFormReturn<PetSchema>;
  name: StringFieldName;
  label: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  placeholder?: string;
  type?: "text" | "number" | "date";
  step?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  form,
  name,
  label,
  icon,
  placeholder,
  type = "text",
  step,
  className,
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className={className}>
        <IconLabel icon={icon}>{label}</IconLabel>
        <FormControl>
          <Input
            {...field}
            value={field.value || ""}
            type={type}
            step={step}
            placeholder={placeholder}
            className="border-border focus:border-primary focus:ring-primary/20"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

interface FormSectionProps {
  title: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  icon: Icon,
  children,
}) => (
  <Card className="rounded-none shadow-sm">
    <CardHeader>
      <CardTitle className="text-primary flex items-center space-x-2 text-lg">
        <Icon size={FORM_CONFIG.ICON_SIZE.medium} />
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

interface ImagePreviewProps {
  preview: string;
  alt: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ preview, alt }) => (
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
);

const EmptyImagePlaceholder: React.FC = () => (
  <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
    <div className="text-center">
      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-500">Chưa có ảnh</p>
    </div>
  </div>
);

export function PetFormUpdate({ form, onSubmit }: Props) {
  const [preview, setPreview] = useState("");

  // ✅ Enhanced effect to handle both File objects and URL strings
  useEffect(() => {
    const img = form.getValues("image");

    if (img) {
      if (typeof img === "string") {
        // Image from database (URL string)
        setPreview(img);
      } else if (img instanceof File) {
        // New uploaded file
        setPreview(createImagePreview(img));
      }
    } else {
      // No image
      setPreview("");
    }
  }, [form]);

  // ✅ Watch for form changes to update preview
  const watchedImage = form.watch("image");

  useEffect(() => {
    if (watchedImage) {
      if (typeof watchedImage === "string") {
        setPreview(watchedImage);
      } else if (watchedImage instanceof File) {
        setPreview(createImagePreview(watchedImage));
      }
    } else {
      setPreview("");
    }
  }, [watchedImage]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!isValidImageFile(file)) {
      console.error("Invalid file type or size");
      return;
    }

    // Set new file and update preview
    form.setValue("image", file);
    setPreview(createImagePreview(file));
  };

  return (
    <Form {...form}>
      <form
        id="pet-update-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* Basic Information */}
        <FormSection title="Thông tin cơ bản" icon={PawPrint}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <CustomerSelectField
                form={form}
                showSearch={false}
                maxDisplayItems={100}
              />
            </div>
            <InputField
              form={form}
              name="name"
              label="Tên thú cưng"
              icon={PawPrint}
              placeholder="Nhập tên thú cưng"
            />
            <SelectField
              form={form}
              name="species"
              label="Loài"
              icon={Dog}
              placeholder="Chọn loài"
              options={SPECIES_OPTIONS}
            />
            <InputField
              form={form}
              name="breed"
              label="Giống"
              icon={BadgeInfo}
              placeholder="Nhập giống"
            />
            <SelectField
              form={form}
              name="gender"
              label="Giới tính"
              icon={Heart}
              placeholder="Chọn giới tính"
              options={GENDER_OPTIONS}
            />
            <InputField
              form={form}
              name="dateOfBirth"
              label="Ngày sinh"
              icon={Calendar}
              type="date"
            />
            <InputField
              form={form}
              name="weight"
              label="Cân nặng (kg)"
              icon={Weight}
              placeholder="Nhập cân nặng"
              type="number"
              step="0.1"
            />
            <InputField
              form={form}
              name="color"
              label="Màu sắc"
              icon={Palette}
              placeholder="Nhập màu sắc"
            />
          </div>
        </FormSection>

        <Separator />

        {/* Address Information */}
        <FormSection title="Thông tin địa chỉ" icon={MapPin}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputField
              form={form}
              name="placeOfBirth"
              label="Nơi sinh"
              icon={MapPin}
              placeholder="Nhập nơi sinh"
            />
            <InputField
              form={form}
              name="placeToLive"
              label="Nơi ở hiện tại"
              icon={MapPin}
              placeholder="Nhập nơi ở hiện tại"
            />
            <InputField
              form={form}
              name="nationality"
              label="Quốc tịch"
              icon={Globe}
              placeholder="Nhập quốc tịch"
              className="md:col-span-2"
            />
          </div>
        </FormSection>

        <Separator />

        {/* Image & Status */}
        <FormSection title="Hình ảnh & Tình trạng" icon={Camera}>
          <div className="space-y-6">
            {/* Sterilization Status */}
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

            {/* Current Image Preview */}
            <div className="space-y-4">
              <IconLabel icon={ImageIcon}>Ảnh thú cưng hiện tại</IconLabel>
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
                  <IconLabel icon={Camera}>Chọn ảnh mới</IconLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept={FORM_CONFIG.FILE_CONSTRAINTS.acceptedTypes}
                      onChange={handleUpload}
                      className="border-border file:bg-primary hover:file:bg-primary/90 file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                      aria-describedby="file-constraints"
                    />
                  </FormControl>
                  <p
                    id="file-constraints"
                    className="text-muted-foreground text-xs"
                  >
                    Tối đa{" "}
                    {FORM_CONFIG.FILE_CONSTRAINTS.maxSize / (1024 * 1024)}MB.
                    Định dạng: JPEG, PNG, WebP
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormSection>
      </form>
    </Form>
  );
}
