import { Dog, Cat, PawPrint } from "lucide-react";

interface SpeciesFilterProps {
  selectedSpecies: "All" | "Dog" | "Cat";
  onSpeciesChange: (species: "All" | "Dog" | "Cat") => void;
  dogCount: number;
  catCount: number;
  totalCount: number;
}

export function SpeciesFilter({
  selectedSpecies,
  onSpeciesChange,
  dogCount,
  catCount,
  totalCount,
}: SpeciesFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-nunito-500 text-sm text-gray-600">
        Lọc theo loài:
      </span>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSpeciesChange("All")}
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            selectedSpecies === "All"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <PawPrint size={12} /> Tất cả ({totalCount})
        </button>
        <button
          onClick={() => onSpeciesChange("Dog")}
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            selectedSpecies === "Dog"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Dog size={12} /> Chó ({dogCount})
        </button>
        <button
          onClick={() => onSpeciesChange("Cat")}
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            selectedSpecies === "Cat"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Cat size={12} /> Mèo ({catCount})
        </button>
      </div>
    </div>
  );
}
