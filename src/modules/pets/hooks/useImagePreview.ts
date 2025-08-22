import { useState, useEffect, useCallback } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PetSchema } from "../schemas/pet.schema";
import { FORM_CONFIG } from "../constants/form.constants";

// Utility functions
export const isValidImageFile = (file: File): boolean => {
  const validTypes = ["image/jpeg", "image/png", "image/webp"];
  return (
    file.size <= FORM_CONFIG.FILE_CONSTRAINTS.maxSize &&
    validTypes.includes(file.type)
  );
};

export const createImagePreview = (file: File): string =>
  URL.createObjectURL(file);

// Custom hook for image preview management
export const useImagePreview = (form: UseFormReturn<PetSchema>) => {
  const [preview, setPreview] = useState<string>("");

  const watchedImage = form.watch("image");

  // Memoized update function to prevent unnecessary re-renders
  const updatePreview = useCallback((img: File | string | undefined) => {
    if (!img) {
      setPreview("");
      return;
    }

    if (typeof img === "string") {
      // Image from database (URL string)
      setPreview(img);
    } else if (img instanceof File) {
      // New uploaded file
      const newPreview = createImagePreview(img);
      setPreview(newPreview);

      // Cleanup previous object URL to prevent memory leaks
      return () => URL.revokeObjectURL(newPreview);
    }
  }, []);

  // Handle initial image load
  useEffect(() => {
    const img = form.getValues("image");
    const cleanup = updatePreview(img);
    return cleanup;
  }, [form, updatePreview]);

  // Watch for form changes to update preview
  useEffect(() => {
    const cleanup = updatePreview(watchedImage);
    return cleanup;
  }, [watchedImage, updatePreview]);

  // Handle file upload
  const handleUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file
      if (!isValidImageFile(file)) {
        console.error("Invalid file type or size");
        // You might want to show a toast notification here
        return;
      }

      // Set new file
      form.setValue("image", file);
    },
    [form],
  );

  return {
    preview,
    handleUpload,
  };
};
