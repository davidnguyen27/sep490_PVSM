import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Activity, Search } from "lucide-react";
import { useDiseases } from "@/modules/diseases/hooks/useDiseases";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface DiseaseSelectorProps {
  selectedDiseaseId: number | null;
  onDiseaseChange: (diseaseId: number | null) => void;
  species?: "Dog" | "Cat" | "All";
}

export function DiseaseSelector({
  selectedDiseaseId,
  onDiseaseChange,
  species = "All",
}: DiseaseSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: diseasesData, isPending } = useDiseases({
    pageNumber: 1,
    pageSize: 100, // Get all diseases
    keyWord: searchTerm,
  });

  const diseases = diseasesData?.data?.pageData || [];

  // Filter diseases by species if specified
  const filteredDiseases =
    species === "All"
      ? diseases
      : diseases.filter(
          (disease) => disease.species?.toLowerCase() === species.toLowerCase(),
        );

  const selectedDisease = filteredDiseases.find(
    (d) => d.diseaseId === selectedDiseaseId,
  );

  return (
    <Card className="border-primary/20 rounded-none">
      <CardHeader className="from-primary/10 to-secondary/10 flex items-center bg-gradient-to-r py-1.5">
        <CardTitle className="text-primary font-nunito flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Chọn bệnh để xem lịch tiêm
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 p-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Tìm kiếm bệnh..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Disease Selector */}
        <div className="space-y-2">
          <label className="font-nunito-500 text-sm text-gray-700">
            Bệnh <span className="text-danger">*</span>
          </label>
          <Select
            value={selectedDiseaseId?.toString() || ""}
            onValueChange={(value) =>
              onDiseaseChange(value ? Number(value) : null)
            }
            disabled={isPending}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={isPending ? "Đang tải..." : "Chọn bệnh"}
              />
            </SelectTrigger>
            <SelectContent>
              {filteredDiseases.length > 0 ? (
                filteredDiseases.map((disease) => (
                  <SelectItem
                    key={disease.diseaseId}
                    value={disease.diseaseId?.toString() || ""}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span>{disease.name}</span>
                      {disease.species && (
                        <Badge variant="default" className="ml-2 text-xs">
                          {disease.species === "Dog" ? "Chó" : "Mèo"}
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value="no-data">
                  {isPending ? "Đang tải..." : "Không có dữ liệu"}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Selected Disease Info */}
        {selectedDisease && (
          <div className="rounded-md bg-blue-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" />
              <span className="font-nunito-700 text-blue-900">
                Bệnh đã chọn
              </span>
            </div>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-nunito-700">Tên bệnh:</span>{" "}
                {selectedDisease.name}
              </p>
              {selectedDisease.species && (
                <p>
                  <span className="font-nunito-700">Loài:</span>{" "}
                  {selectedDisease.species === "Dog" ? "Chó" : "Mèo"}
                </p>
              )}
              {selectedDisease.description && (
                <p>
                  <span className="font-nunito-700">Mô tả:</span>{" "}
                  {selectedDisease.description}
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
