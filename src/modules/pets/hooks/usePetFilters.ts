import { useState } from "react";

export interface PetFilters {
  gender: string;
  species: string;
  isDeleted: string; // "true", "false", or "" for all
}

export function usePetFilters() {
  const [filters, setFilters] = useState<PetFilters>({
    gender: "",
    species: "",
    isDeleted: "",
  });

  const updateGender = (gender: string) => {
    setFilters((prev) => ({ ...prev, gender }));
  };

  const updateSpecies = (species: string) => {
    setFilters((prev) => ({ ...prev, species }));
  };

  const updateIsDeleted = (isDeleted: string) => {
    setFilters((prev) => ({ ...prev, isDeleted }));
  };

  const resetFilters = () => {
    setFilters({
      gender: "",
      species: "",
      isDeleted: "",
    });
  };

  const hasActiveFilters =
    filters.gender !== "" || filters.species !== "" || filters.isDeleted !== "";

  return {
    filters,
    updateGender,
    updateSpecies,
    updateIsDeleted,
    resetFilters,
    hasActiveFilters,
  };
}
