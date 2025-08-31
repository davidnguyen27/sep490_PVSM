import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Search,
  PawPrint,
  Cat,
  Dog,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useDiseaseBySpecies } from "@/modules/diseases/hooks/useDiseaseBySpecies";

interface Props {
  selectedDiseaseId: number | null;
  onSelect: (diseaseId: number | null) => void;
  disabled?: boolean;
  appointment?: {
    petResponseDTO?: {
      species?: string;
    };
  };
}

export function DiseaseChoiceCard({
  selectedDiseaseId,
  onSelect,
  disabled,
  appointment,
}: Props) {
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Normalize species to 'Dog' or 'Cat' (supports both English and Vietnamese, case-insensitive)
  const normalizeSpecies = (value?: string) => {
    if (!value) return undefined;
    const v = value.trim().toLowerCase();
    if (v === "dog" || v === "chó") return "Dog";
    if (v === "cat" || v === "mèo") return "Cat";
    return undefined;
  };
  const species = normalizeSpecies(appointment?.petResponseDTO?.species);

  const debouncedSearch = useDebounce(search, 400);

  // Track if we're currently searching (when search input differs from debounced value)
  React.useEffect(() => {
    if (search !== debouncedSearch && search.trim() !== "") {
      // Add a small delay to avoid skeleton flashing for very short searches
      const timer = setTimeout(() => setIsSearching(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [search, debouncedSearch]);

  const {
    data: diseasesData,
    isLoading,
    isFetching,
  } = useDiseaseBySpecies(species || "");

  const diseases = React.useMemo(() => {
    if (!species || !diseasesData) return [];
    const keyword = debouncedSearch.trim().toLowerCase();
    return diseasesData.filter((disease) =>
      disease.name.toLowerCase().includes(keyword),
    );
  }, [species, diseasesData, debouncedSearch]);

  return (
    <Card className="bg-linen rounded-none">
      <CardContent className="space-y-4 p-6">
        {/* Header */}
        <div
          className="flex cursor-pointer items-center justify-between border-b pb-3"
          onClick={() => setOpen(!open)}
        >
          <h2 className="text-primary font-nunito-700 text-lg underline">
            Xác nhận bệnh
          </h2>
          {open ? (
            <ChevronUp
              size={20}
              className="text-primary transition-transform"
            />
          ) : (
            <ChevronDown
              size={20}
              className="text-primary transition-transform"
            />
          )}
        </div>

        {/* Content */}
        {open && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <input
                placeholder="Tìm kiếm bệnh..."
                className="focus:border-primary w-full rounded-md border border-[#E3E3E3] bg-[#FAFAFA] py-2 pr-3 pl-9 text-sm transition-shadow outline-none focus:shadow-md"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                disabled={disabled}
              />
            </div>

            {/* Show species badge or warning if species is missing */}
            {species ? (
              <div className="flex items-center justify-end">
                <Badge className="font-nunito border-blue-200 bg-blue-100 text-blue-800">
                  <PawPrint size={12} className="mr-1" />
                  Loài: {species === "Dog" ? "Chó" : "Mèo"}
                </Badge>
              </div>
            ) : (
              <div className="rounded-md border border-red-100 bg-red-50 p-4 text-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <PawPrint className="text-red-500" size={24} />
                  <p className="font-nunito text-red-700">
                    No pet species information found in this appointment.
                  </p>
                </div>
              </div>
            )}

            {/* List */}
            {!species ? null : isLoading || isFetching || isSearching ? (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="animate-pulse rounded-xl border border-[#E3E3E3] bg-[#FFFDFB] p-4 shadow-sm"
                  >
                    <Skeleton className="mb-2 h-5 w-3/4 bg-gray-200" />
                    <Skeleton className="mb-2 h-4 w-full bg-gray-200" />
                    <Skeleton className="mb-3 h-4 w-2/3 bg-gray-200" />
                    <Skeleton className="h-6 w-16 rounded-full bg-gray-200" />
                  </div>
                ))}
              </div>
            ) : diseases.length === 0 ||
              !diseasesData ||
              diseasesData.length === 0 ? (
              <div className="rounded-md border border-yellow-100 bg-yellow-50 p-4 text-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  {search ? (
                    <>
                      <Search className="text-yellow-500" size={24} />
                      <p className="font-nunito text-yellow-700">
                        Không tìm thấy bệnh phù hợp với từ khóa "{search}"
                      </p>
                    </>
                  ) : !diseasesData || diseasesData.length === 0 ? (
                    <>
                      <PawPrint className="text-yellow-500" size={24} />
                      <p className="font-nunito text-yellow-700">
                        Không có dữ liệu bệnh nào cho loài{" "}
                        {species === "Dog"
                          ? "chó"
                          : species === "Cat"
                            ? "mèo"
                            : "này"}{" "}
                        trong hệ thống
                      </p>
                    </>
                  ) : (
                    <>
                      <PawPrint className="text-yellow-500" size={24} />
                      <p className="font-nunito text-yellow-700">
                        Không có dữ liệu bệnh nào trong hệ thống
                      </p>
                    </>
                  )}
                  <button
                    onClick={() => {
                      setSearch("");
                    }}
                    className="text-primary mt-2 text-sm font-medium hover:underline"
                    disabled={disabled}
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {diseases.map((disease) => (
                    <div
                      key={disease.diseaseId}
                      className={`hover:border-primary relative flex h-full ${
                        disabled
                          ? "cursor-not-allowed opacity-60"
                          : "cursor-pointer"
                      } flex-col rounded-xl border bg-[#FFFDFB] p-4 shadow-sm transition-all ${
                        selectedDiseaseId === disease.diseaseId
                          ? "border-primary ring-primary/30 ring-2"
                          : "border-[#E3E3E3]"
                      }`}
                      onClick={() => {
                        if (disabled) return;
                        onSelect(disease.diseaseId);
                      }}
                    >
                      <h3 className="font-nunito-700 text-dark mb-1">
                        {disease.name}
                      </h3>
                      <p className="text-muted-foreground font-nunito mb-2 line-clamp-2 text-sm">
                        {disease.description}
                      </p>

                      <div className="mt-auto pt-2">
                        <Badge
                          variant="outline"
                          className={`font-nunito-600 gap-1 text-xs ${
                            disease.species === "Dog"
                              ? "border-blue-200 bg-blue-50 text-blue-700"
                              : "border-pink-200 bg-pink-50 text-pink-700"
                          }`}
                        >
                          {disease.species === "Dog" ? (
                            <Dog size={12} />
                          ) : (
                            <Cat size={12} />
                          )}{" "}
                          {disease.species === "Dog" ? "Chó" : "Mèo"}
                        </Badge>
                      </div>

                      {selectedDiseaseId === disease.diseaseId && (
                        <CheckCircle2 className="text-primary absolute top-2 right-2 size-5" />
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
