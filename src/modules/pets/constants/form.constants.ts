// Form configuration constants
export const FORM_CONFIG = {
  IMAGE_SIZE: { width: 192, height: 192 },
  ICON_SIZE: { small: 16, medium: 20 },
  FILE_CONSTRAINTS: {
    maxSize: 5 * 1024 * 1024, // 5MB
    acceptedTypes: "image/jpeg,image/png,image/webp",
  },
} as const;

// Form options
export const SPECIES_OPTIONS = [
  { value: "Dog", label: "🐕 Chó" },
  { value: "Cat", label: "🐱 Mèo" },
] as const;

export const GENDER_OPTIONS = [
  { value: "Male", label: "♂️ Đực" },
  { value: "Female", label: "♀️ Cái" },
] as const;
