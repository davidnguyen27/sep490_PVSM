import type { PetSchema } from "../schemas/pet.schema";

// Type definitions for form fields
export type StringFieldName = Extract<
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

export type SelectFieldName = Extract<keyof PetSchema, "species" | "gender">;

// Icon component type
export type IconComponent = React.ComponentType<{
  size: number;
  className?: string;
}>;
