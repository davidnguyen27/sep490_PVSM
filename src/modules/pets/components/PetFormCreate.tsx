import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import type { PetSchema } from "../schemas/pet.schema";
import {
  BasicInfoSection,
  AddressInfoSection,
  ImageStatusSection,
} from "./form";

interface Props {
  form: UseFormReturn<PetSchema>;
  onSubmit: (data: PetSchema) => void;
}

export function PetFormCreate({ form, onSubmit }: Props) {
  const [preview, setPreview] = useState("");

  return (
    <Form {...form}>
      <form
        id="pet-create-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* Basic Information */}
        <BasicInfoSection form={form} />

        <Separator />

        {/* Address Information */}
        <AddressInfoSection form={form} />

        <Separator />

        {/* Image & Status */}
        <ImageStatusSection
          form={form}
          preview={preview}
          onImageChange={setPreview}
        />
      </form>
    </Form>
  );
}
