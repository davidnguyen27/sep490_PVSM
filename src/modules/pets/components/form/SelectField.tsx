import React from "react";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UseFormReturn } from "react-hook-form";
import type { PetSchema } from "../../schemas/pet.schema";
import type { SelectFieldName, IconComponent } from "../../types/form.types";
import { IconLabel } from "./IconLabel";

interface SelectFieldProps {
  form: UseFormReturn<PetSchema>;
  name: SelectFieldName;
  label: string;
  icon: IconComponent;
  placeholder: string;
  options: readonly { value: string; label: string }[];
}

export const SelectField: React.FC<SelectFieldProps> = ({
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
            <SelectTrigger className="font-nunito-400 focus:border-primary focus:ring-primary/20">
              <SelectValue
                placeholder={placeholder}
                className="font-nunito-400"
              />
            </SelectTrigger>
            <SelectContent className="font-nunito-400">
              {options.map(({ value, label }) => (
                <SelectItem
                  key={value}
                  value={value}
                  className="font-nunito-400"
                >
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
