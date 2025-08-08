import type { VaccineDisease } from "../types/vaccine-disease.type";
import type { Vaccine } from "@/modules/vaccines/types/vaccine.type";
import type { Disease } from "@/modules/diseases/types/disease.type";

/**
 * Format vaccine name for display
 */
export const formatVaccineName = (vaccineDisease: VaccineDisease): string => {
  if (!vaccineDisease.vaccineResponseDTO) return "N/A";
  return vaccineDisease.vaccineResponseDTO.name;
};

/**
 * Format disease name for display
 */
export const formatDiseaseName = (vaccineDisease: VaccineDisease): string => {
  if (!vaccineDisease.diseaseResponseDTO) return "N/A";
  return vaccineDisease.diseaseResponseDTO.name;
};

/**
 * Format species for display
 */
export const formatSpecies = (species?: string): string => {
  switch (species) {
    case "Dog":
      return "Chó";
    case "Cat":
      return "Mèo";
    default:
      return "N/A";
  }
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

/**
 * Get species variant for Badge component
 */
export const getSpeciesVariant = (
  species?: string,
): "default" | "secondary" => {
  return species === "Dog" ? "default" : "secondary";
};

/**
 * Check if a vaccine-disease relationship already exists
 */
export const isDuplicateRelationship = (
  existingRelationships: VaccineDisease[],
  vaccineId: number,
  diseaseId: number,
): boolean => {
  return existingRelationships.some(
    (relationship) =>
      relationship.vaccineId === vaccineId &&
      relationship.diseaseId === diseaseId &&
      !relationship.isDeleted,
  );
};

/**
 * Get vaccine name by ID
 */
export const getVaccineNameById = (
  vaccines: Vaccine[],
  vaccineId: number,
): string => {
  const vaccine = vaccines.find((v) => v.vaccineId === vaccineId);
  return vaccine?.name || "N/A";
};

/**
 * Get disease name by ID
 */
export const getDiseaseNameById = (
  diseases: Disease[],
  diseaseId: number,
): string => {
  const disease = diseases.find((d) => d.diseaseId === diseaseId);
  return disease?.name || "N/A";
};
