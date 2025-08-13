import { FORM_CONFIG } from "../constants/form.constants";

/**
 * Validate if uploaded file is a valid image
 * @param file - File to validate
 * @returns boolean indicating if file is valid
 */
export const isValidImageFile = (file: File): boolean => {
  const validTypes = ["image/jpeg", "image/png", "image/webp"];
  return (
    file.size <= FORM_CONFIG.FILE_CONSTRAINTS.maxSize &&
    validTypes.includes(file.type)
  );
};

/**
 * Create image preview URL from file
 * @param file - Image file
 * @returns Object URL for preview
 */
export const createImagePreview = (file: File): string =>
  URL.createObjectURL(file);

/**
 * Format file size for display
 * @param bytes - File size in bytes
 * @returns Formatted file size string
 */
export const formatFileSize = (bytes: number): string => {
  return `${bytes / (1024 * 1024)}MB`;
};
