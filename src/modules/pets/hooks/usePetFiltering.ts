import { useMemo } from "react";
import type { Pet } from "../types/pet.type";
import type { PetFilters } from "./usePetFilters";

interface UsePetFilteringProps {
  pets: Pet[];
  filters: PetFilters;
}

export function usePetFiltering({ pets, filters }: UsePetFilteringProps) {
  const filteredPets = useMemo(() => {
    if (!pets || pets.length === 0) {
      return [];
    }

    let filtered = [...pets];

    // Filter by gender
    if (filters.gender) {
      filtered = filtered.filter((pet) => pet.gender === filters.gender);
    }

    // Filter by species
    if (filters.species) {
      filtered = filtered.filter((pet) => pet.species === filters.species);
    }

    // Filter by isDeleted status
    if (filters.isDeleted !== "") {
      const isDeletedFilter = filters.isDeleted === "true";
      filtered = filtered.filter((pet) => pet.isDeleted === isDeletedFilter);
    }

    return filtered;
  }, [pets, filters.gender, filters.species, filters.isDeleted]);

  return {
    filteredPets,
  };
}
