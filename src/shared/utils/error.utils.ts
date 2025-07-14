import { AxiosError } from "axios";

export const extractErrorMessage = (error: AxiosError): string => {
  const data = error?.response?.data as
    | { errors?: Record<string, string[]>; message?: string; title?: string }
    | undefined;

  // Status code 400
  if (data?.errors && typeof data.errors === "object") {
    const firstField = Object.keys(data.errors)[0];
    return data.errors[firstField]?.[0];
  }

  // With message
  if (data?.message) return data.message;

  // With title
  if (data?.title) return data.title;

  return error?.message || "Đã xảy ra lỗi.";
};
