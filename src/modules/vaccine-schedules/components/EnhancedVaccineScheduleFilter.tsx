import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, RotateCcw, Filter, Download, Plus } from "lucide-react";
import CreateVaccineScheduleForm from "./CreateVaccineScheduleForm";

interface Props {
  keyword: string;
  species: string;
  status: string;
  onKeywordChange: (value: string) => void;
  onSpeciesChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
  hideSpecies?: boolean;
  totalResults?: number;
  onCreateSuccess?: () => void;
}

const COMMON_DISEASES = [
  "Dại",
  "Viêm gan",
  "Distemper",
  "Parvo",
  "Corona",
  "Parainfluenza",
];

export function EnhancedVaccineScheduleFilter({
  keyword,
  species,
  status,
  onKeywordChange,
  onSpeciesChange,
  onStatusChange,
  onSearch,
  onReset,
  hideSpecies = false,
  totalResults = 0,
  onCreateSuccess,
}: Props) {
  const handleQuickFilter = (disease: string) => {
    onKeywordChange(disease);
    onSearch();
  };

  return (
    <div className="space-y-4">
      {/* Main Filter Bar */}
      <div className="border-primary/20 bg-linen rounded-none border p-6 shadow-sm">
        <div className="space-y-4">
          {/* Filter Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="text-primary h-5 w-5" />
              <h3 className="font-nunito-700 text-dark text-lg">
                Bộ lọc tìm kiếm
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="font-nunito-600 text-primary border-primary hover:bg-primary/5"
              >
                <Download className="mr-1 h-4 w-4" />
                Xuất Excel
              </Button>
              <CreateVaccineScheduleForm
                defaultSpecies={species as "dog" | "cat"}
                onSuccess={onCreateSuccess}
                trigger={
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 font-nunito-600"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Thêm lịch mới
                  </Button>
                }
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div
            className={`grid grid-cols-1 ${hideSpecies ? "md:grid-cols-3" : "md:grid-cols-4"} gap-4`}
          >
            {/* Keyword Search */}
            <div className="space-y-2">
              <label className="text-dark font-nunito-700 text-sm">
                Tìm kiếm
              </label>
              <Input
                placeholder="Tìm theo tên bệnh..."
                value={keyword}
                onChange={(e) => onKeywordChange(e.target.value)}
                className="font-nunito-600 focus:border-primary border-primary/30 text-dark"
              />
            </div>

            {/* Species Filter - only show if not hidden */}
            {!hideSpecies && (
              <div className="space-y-2">
                <label className="text-dark font-nunito-600 text-sm">
                  Loài
                </label>
                <Select value={species} onValueChange={onSpeciesChange}>
                  <SelectTrigger className="font-nunito focus:border-primary border-gray-200">
                    <SelectValue placeholder="Chọn loài" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="dog">Chó</SelectItem>
                    <SelectItem value="cat">Mèo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-dark font-nunito-600 text-sm">
                Trạng thái
              </label>
              <Select value={status} onValueChange={onStatusChange}>
                <SelectTrigger className="font-nunito focus:border-primary border-gray-200">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="true">Hoạt động</SelectItem>
                  <SelectItem value="false">Không hoạt động</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <label className="text-dark font-nunito-600 text-sm">
                Thao tác
              </label>
              <div className="flex gap-2">
                <Button
                  onClick={onSearch}
                  className="bg-primary hover:bg-primary/90 font-nunito-600 flex-1 transition-all duration-200"
                  size="sm"
                >
                  <Search className="mr-1 h-4 w-4" />
                  Tìm kiếm
                </Button>
                <Button
                  onClick={onReset}
                  variant="outline"
                  className="font-nunito-600 border-gray-200 transition-all duration-200 hover:bg-gray-50"
                  size="sm"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="rounded-none border border-gray-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-nunito-700 text-dark text-sm">Bệnh phổ biến</h4>
          {totalResults > 0 && (
            <Badge
              variant="outline"
              className="font-nunito-600 text-primary border-primary"
            >
              {totalResults} kết quả
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {COMMON_DISEASES.map((disease) => (
            <Button
              key={disease}
              variant="outline"
              size="sm"
              onClick={() => handleQuickFilter(disease)}
              className={`font-nunito-500 text-xs transition-all duration-200 ${
                keyword === disease
                  ? "bg-primary border-primary text-white"
                  : "hover:border-primary hover:text-primary"
              }`}
            >
              {disease}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
