import { Form } from "@/components/ui/form";
import type { PetSchema } from "../schemas/pet.schema";
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
  Camera,
  ImageIcon,
} from "lucide-react";
import { CustomerSelectField } from "./form/CustomerSelectField";
import { useImagePreview } from "../hooks/useImagePreview";
import { SPECIES_OPTIONS, GENDER_OPTIONS } from "../constants/form.constants";
import { InputField, SelectField } from "./form/FormFields";
import { FormSection } from "./form/FormSection";
import {
  ImagePreview,
  EmptyImagePlaceholder,
  ImageUploadField,
  SterilizationField,
} from "./form/ImageFields";

interface Props {
  form: UseFormReturn<PetSchema>;
  onSubmit: (data: PetSchema) => void;
  mode?: "create" | "update";
}

export function PetFormUpdate({ form, onSubmit, mode = "update" }: Props) {
  const { preview, handleUpload } = useImagePreview(form);

  // Disable customer selection when in update mode
  const isCustomerDisabled = mode === "update";

  return (
    <Form {...form}>
      <form
        id="pet-update-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Thông tin cơ bản */}
          <FormSection title="Thông tin cơ bản" icon={PawPrint}>
            <div className="space-y-6">
              <CustomerSelectField
                form={form}
                disabled={isCustomerDisabled}
                showSearch={!isCustomerDisabled}
                maxDisplayItems={100}
                placeholder={
                  isCustomerDisabled
                    ? "Khách hàng (không thể thay đổi)"
                    : "Chọn khách hàng"
                }
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  type="text"
                  placeholder="dd/mm/yyyy"
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
              </div>
              <InputField
                form={form}
                name="color"
                label="Màu sắc"
                icon={Palette}
                placeholder="Nhập màu sắc"
              />
            </div>
          </FormSection>

          {/* Thông tin địa chỉ */}
          <FormSection title="Thông tin địa chỉ" icon={MapPin}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              </div>
              <InputField
                form={form}
                name="nationality"
                label="Quốc tịch"
                icon={Globe}
                placeholder="Nhập quốc tịch"
              />
            </div>
          </FormSection>
        </div>

        {/* Hàng 2: Hình ảnh + Tình trạng sinh sản */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Hình ảnh */}
          <FormSection title="Hình ảnh thú cưng" icon={Camera}>
            <div className="space-y-6">
              {/* Current Image Preview */}
              <div className="space-y-4">
                <div className="font-nunito-500 flex items-center gap-2 text-sm">
                  <ImageIcon size={16} className="text-primary" />
                  Ảnh hiện tại
                </div>
                {preview ? (
                  <ImagePreview preview={preview} alt="Ảnh thú cưng" />
                ) : (
                  <EmptyImagePlaceholder />
                )}
              </div>

              {/* Image Upload */}
              <ImageUploadField form={form} onUpload={handleUpload} />
            </div>
          </FormSection>

          {/* Tình trạng & Thông tin bổ sung */}
          <FormSection title="Tình trạng & Thông tin khác" icon={Heart}>
            <div className="space-y-6">
              {/* Sterilization Status */}
              <SterilizationField form={form} />

              {/* Thông tin bổ sung có thể thêm ở đây nếu cần */}
              <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center">
                <div className="text-muted-foreground">
                  <Heart className="mx-auto mb-2 h-8 w-8" />
                  <p className="text-sm">
                    Thông tin về tình trạng sức khỏe và các đặc điểm khác của
                    thú cưng
                  </p>
                </div>
              </div>
            </div>
          </FormSection>
        </div>
      </form>
    </Form>
  );
}
