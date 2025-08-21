import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, RotateCcw } from "lucide-react";

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
}

export function VaccineScheduleFilter({
  keyword,
  species,
  status,
  onKeywordChange,
  onSpeciesChange,
  onStatusChange,
  onSearch,
  onReset,
  hideSpecies = false,
}: Props) {
  return (
    <div className="border-primary/20 bg-linen rounded-xl border p-6 shadow-sm">
      <div
        className={`grid grid-cols-1 ${hideSpecies ? "md:grid-cols-3" : "md:grid-cols-4"} gap-4`}
      >
        {/* Keyword Search */}
        <div className="space-y-2">
          <label className="text-dark font-nunito-700 text-sm">Tìm kiếm</label>
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
            <label className="text-dark font-nunito-600 text-sm">Loài</label>
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
          <label className="text-dark font-nunito-600 text-sm">Thao tác</label>
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
  );
}
