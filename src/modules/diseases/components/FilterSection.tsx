import { PlusCircle, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui";

interface FilterSectionProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedSpecies: "All" | "Dog" | "Cat";
  onSpeciesChange: (species: "All" | "Dog" | "Cat") => void;
  dogCount: number;
  catCount: number;
  totalCount: number;
  onCreateClick: () => void;
}

export function FilterSection({
  search,
  onSearchChange,
  selectedSpecies,
  onSpeciesChange,
  dogCount,
  catCount,
  totalCount,
  onCreateClick,
}: FilterSectionProps) {
  return (
    <div className="from-linen to-linen/80 border-b border-gray-100 bg-gradient-to-r shadow-sm">
      <div className="p-6">
        <div className="flex flex-col gap-6">
          {/* Top row: Search and Create button */}
          <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end">
            <div className="max-w-lg flex-1">
              <label className="font-nunito-600 mb-3 block text-sm text-gray-700">
                <Search className="mr-2 inline h-4 w-4" />
                Tìm kiếm bệnh
              </label>
              <div className="group relative">
                <Search className="group-focus-within:text-primary absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Nhập tên bệnh để tìm kiếm..."
                  className="font-nunito-400 focus:border-primary focus:ring-primary/10 w-full rounded-xl border border-gray-200 bg-white/80 py-3 pr-4 pl-12 text-sm backdrop-blur-sm transition-all duration-300 placeholder:text-gray-400 hover:border-gray-300 focus:bg-white focus:ring-4 focus:outline-none"
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            </div>

            <Button
              className="font-nunito-600 bg-primary hover:bg-primary/90 transform rounded-xl px-6 py-3 whitespace-nowrap shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              onClick={onCreateClick}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Thêm bệnh mới
            </Button>
          </div>

          {/* Bottom row: Species filter */}
          <div className="rounded-xl border border-gray-100 bg-white/50 p-4 backdrop-blur-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="font-nunito-600 flex items-center gap-2 text-sm text-gray-700">
                <Filter className="text-primary h-4 w-4" />
                <span>Lọc theo loài:</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onSpeciesChange("All")}
                  className={`font-nunito-500 inline-flex transform items-center gap-2 rounded-xl px-5 py-2.5 text-sm transition-all duration-300 hover:scale-105 ${
                    selectedSpecies === "All"
                      ? "bg-primary shadow-primary/25 text-white shadow-lg"
                      : "hover:border-primary/30 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md"
                  }`}
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-current opacity-80" />
                  Tất cả ({totalCount})
                </button>
                <button
                  onClick={() => onSpeciesChange("Dog")}
                  className={`font-nunito-500 inline-flex transform items-center gap-2 rounded-xl px-5 py-2.5 text-sm transition-all duration-300 hover:scale-105 ${
                    selectedSpecies === "Dog"
                      ? "bg-primary shadow-primary/25 text-white shadow-lg"
                      : "border border-gray-200 bg-white text-gray-700 hover:border-amber-300 hover:bg-gray-50 hover:shadow-md"
                  }`}
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  Chó ({dogCount})
                </button>
                <button
                  onClick={() => onSpeciesChange("Cat")}
                  className={`font-nunito-500 inline-flex transform items-center gap-2 rounded-xl px-5 py-2.5 text-sm transition-all duration-300 hover:scale-105 ${
                    selectedSpecies === "Cat"
                      ? "bg-primary shadow-primary/25 text-white shadow-lg"
                      : "border border-gray-200 bg-white text-gray-700 hover:border-pink-300 hover:bg-gray-50 hover:shadow-md"
                  }`}
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-pink-500" />
                  Mèo ({catCount})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
