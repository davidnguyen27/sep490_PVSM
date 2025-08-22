import React from "react";
import type { UseFormReturn } from "react-hook-form";
import {
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
import type { PetSchema } from "../../schemas/pet.schema";
import { FORM_CONFIG } from "../../constants/form.constants";

// Types
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

// Icon Label component
interface IconLabelProps {
  icon: React.ComponentType<{ size: number; className?: string }>;
  children: React.ReactNode;
}

export const IconLabel: React.FC<IconLabelProps> = React.memo(
  ({ icon: Icon, children }) => (
    <FormLabel className="font-nunito-500 flex items-center gap-2 text-sm">
      <Icon size={FORM_CONFIG.ICON_SIZE.small} className="text-primary" />
      {children}
    </FormLabel>
  ),
);

IconLabel.displayName = "IconLabel";

// Select Field component
interface SelectFieldProps {
  form: UseFormReturn<PetSchema>;
  name: SelectFieldName;
  label: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  placeholder: string;
  options: readonly { value: string; label: string }[];
}

export const SelectField: React.FC<SelectFieldProps> = React.memo(
  ({ form, name, label, icon, placeholder, options }) => (
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
  ),
);

SelectField.displayName = "SelectField";

// Input Field component
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

export const InputField: React.FC<InputFieldProps> = React.memo(
  ({
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
  ),
);

InputField.displayName = "InputField";
