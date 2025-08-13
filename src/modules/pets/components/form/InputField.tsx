import React from "react";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui";
import type { UseFormReturn } from "react-hook-form";
import type { PetSchema } from "../../schemas/pet.schema";
import type { StringFieldName, IconComponent } from "../../types/form.types";
import { IconLabel } from "./IconLabel";

interface InputFieldProps {
  form: UseFormReturn<PetSchema>;
  name: StringFieldName;
  label: string;
  icon: IconComponent;
  placeholder?: string;
  type?: "text" | "number" | "date";
  step?: string;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
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
            className="border-border focus:border-primary focus:ring-primary/20 font-nunito-400"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
