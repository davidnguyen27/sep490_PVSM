import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Search,
  PawPrint,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useDiseases } from "@/modules/diseases";

interface Props {
  selectedDiseaseId: number | null;
  onSelect: (diseaseId: number) => void;
  disabled?: boolean;
}

export function DiseaseChoiceCard({
  selectedDiseaseId,
  onSelect,
  disabled,
}: Props) {
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isFetching } = useDiseases({
    pageNumber: 1,
    pageSize: 100,
    keyWord: debouncedSearch,
  });

  const diseases = data?.data.pageData || [];

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
              <div className="text-muted-foreground font-nunito py-4 text-center">
                Không tìm thấy bệnh
              </div>
            ) : (
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
                        className="font-nunito-600 gap-1 text-xs"
                      >
                        <PawPrint size={12} />{" "}
                        {disease.species === "Dog" ? "Chó" : "Mèo"}
                      </Badge>
                    </div>

                    {selectedDiseaseId === disease.diseaseId && (
                      <CheckCircle2 className="text-primary absolute top-2 right-2 size-5" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
