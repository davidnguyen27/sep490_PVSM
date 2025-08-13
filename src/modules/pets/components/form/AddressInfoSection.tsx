import React from "react";
import type { UseFormReturn } from "react-hook-form";
import { MapPin, Globe } from "lucide-react";
import type { PetSchema } from "../../schemas/pet.schema";
import { InputField } from "./InputField";
import { FormSection } from "./FormSection";

interface AddressInfoSectionProps {
  form: UseFormReturn<PetSchema>;
}

export const AddressInfoSection: React.FC<AddressInfoSectionProps> = ({
  form,
}) => (
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
);
