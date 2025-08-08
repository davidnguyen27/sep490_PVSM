import type {
  VaccineReceipt,
  VaccineReceiptUpdateRequest,
} from "../types/vaccine-receipt.type";
import type { VaccineReceiptUpdateFormData } from "../schemas/vaccine-receipt.schema";

/**
 * Format receipt code for display
 */
export const formatReceiptCode = (receipt: VaccineReceipt): string => {
  return receipt.receiptCode || "N/A";
};

/**
 * Format receipt date for display
 */
export const formatReceiptDate = (receipt: VaccineReceipt): string => {
  return new Date(receipt.receiptDate).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/**
 * Format created date for display
 */
export const formatCreatedDate = (receipt: VaccineReceipt): string => {
  return new Date(receipt.createdAt).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/**
 * Transform update form data to API request payload
 */
export const transformVaccineReceiptUpdateData = (
  formData: VaccineReceiptUpdateFormData,
): VaccineReceiptUpdateRequest => {
  return {
    receiptDate: formData.receiptDate.toISOString(),
  };
};

/**
 * Format status for display
 */
export const formatStatus = (isDeleted: boolean): string => {
  return isDeleted ? "Đã xóa" : "Hoạt động";
};

/**
 * Get status variant for Badge component
 */
export const getStatusVariant = (
  isDeleted: boolean,
): "default" | "destructive" => {
  return isDeleted ? "destructive" : "default";
};
