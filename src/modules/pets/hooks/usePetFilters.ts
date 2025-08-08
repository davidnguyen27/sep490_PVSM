import { useState } from "react";

export interface PetFilters {
  gender: string;
  species: string;
}

export function usePetFilters() {
  const [filters, setFilters] = useState<PetFilters>({
    gender: "",
    species: "",
  });

  const updateGender = (gender: string) => {
    setFilters((prev) => ({ ...prev, gender }));
  };

  const updateSpecies = (species: string) => {
    setFilters((prev) => ({ ...prev, species }));
  };

  const resetFilters = () => {
    setFilters({
      gender: "",
      species: "",
    });
  };

  const hasActiveFilters = filters.gender !== "" || filters.species !== "";

  return {
    filters,
    updateGender,
    updateSpecies,
    resetFilters,
    hasActiveFilters,
  };
}
