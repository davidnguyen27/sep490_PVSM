import React from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  Dog,
  PawPrint,
  BadgeInfo,
  Heart,
  Calendar,
  Weight,
  Palette,
} from "lucide-react";
import type { PetSchema } from "../../schemas/pet.schema";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { CustomerSelectField } from "./CustomerSelectField";
import { FormSection } from "./FormSection";
import {
  SPECIES_OPTIONS,
  GENDER_OPTIONS,
} from "../../constants/form.constants";

interface BasicInfoSectionProps {
  form: UseFormReturn<PetSchema>;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ form }) => (
  <FormSection title="Thông tin cơ bản" icon={PawPrint}>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="md:col-span-2">
        <CustomerSelectField
          form={form}
          showSearch={true}
          maxDisplayItems={50}
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
);
