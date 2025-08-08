import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Search,
  PawPrint,
  Cat,
  Dog,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useDiseases } from "@/modules/diseases";

interface Props {
  selectedDiseaseId: number | null;
  onSelect: (diseaseId: number | null) => void;
  disabled?: boolean;
  petSpecies?: "Dog" | "Cat";
}

export function DiseaseChoiceCard({
  selectedDiseaseId,
  onSelect,
  disabled,
  petSpecies,
}: Props) {
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState<"All" | "Dog" | "Cat">(
    petSpecies ? petSpecies : "All",
  );

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isFetching } = useDiseases({
    pageNumber: 1,
    pageSize: 100,
    keyWord: debouncedSearch,
  });

  // Lọc bệnh theo loài thú cưng
  const diseases = (data?.data.pageData || []).filter((disease) => {
    if (selectedSpecies === "All") return true;
    return disease.species === selectedSpecies;
  });

  // Tính toán số lượng bệnh theo loài để hiển thị badge
  const dogDiseaseCount = (data?.data.pageData || []).filter(
    (disease) => disease.species === "Dog",
  ).length;

  const catDiseaseCount = (data?.data.pageData || []).filter(
    (disease) => disease.species === "Cat",
  ).length;

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

            {/* Species filter */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Filter size={14} /> Lọc theo loài:
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSpecies("All")}
                  disabled={disabled}
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedSpecies === "All"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <PawPrint size={12} /> Tất cả (
                  {(data?.data.pageData || []).length})
                </button>
                <button
                  onClick={() => setSelectedSpecies("Dog")}
                  disabled={disabled}
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedSpecies === "Dog"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <Dog size={12} /> Chó ({dogDiseaseCount})
                </button>
                <button
                  onClick={() => setSelectedSpecies("Cat")}
                  disabled={disabled}
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedSpecies === "Cat"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <Cat size={12} /> Mèo ({catDiseaseCount})
                </button>

                {petSpecies && (
                  <div className="ml-auto">
                    <Badge className="border-blue-200 bg-blue-100 text-blue-800">
                      <PawPrint size={12} className="mr-1" />
                      Thú cưng đăng ký: {petSpecies === "Dog" ? "Chó" : "Mèo"}
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {/* List */}
            {isLoading || isFetching ? (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="h-24 rounded-xl bg-[#FFFDFB]"
                  />
                ))}
              </div>
            ) : diseases.length === 0 ? (
              <div className="rounded-md border border-yellow-100 bg-yellow-50 p-4 text-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  {search ? (
                    <>
                      <Search className="text-yellow-500" size={24} />
                      <p className="font-nunito text-yellow-700">
                        Không tìm thấy bệnh phù hợp với từ khóa "{search}"
                      </p>
                    </>
                  ) : selectedSpecies !== "All" ? (
                    <>
                      <PawPrint className="text-yellow-500" size={24} />
                      <p className="font-nunito text-yellow-700">
                        Không có bệnh nào dành cho{" "}
                        {selectedSpecies === "Dog" ? "chó" : "mèo"}
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
                      setSelectedSpecies("All");
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
                {selectedSpecies !== "All" && (
                  <div className="mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/30"
                      >
                        <span className="mr-1">
                          {selectedSpecies === "Dog" ? (
                            <Dog size={12} />
                          ) : (
                            <Cat size={12} />
                          )}
                        </span>
                        Đang lọc: {selectedSpecies === "Dog" ? "Chó" : "Mèo"}
                      </Badge>
                      <button
                        className="text-xs text-gray-500 hover:text-gray-700"
                        onClick={() => setSelectedSpecies("All")}
                        disabled={disabled}
                      >
                        Xóa bộ lọc
                      </button>
                    </div>
                  </div>
                )}

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
