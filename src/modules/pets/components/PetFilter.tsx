import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

interface Props {
  gender?: string;
  species?: string;
  onGenderChange: (gender: string) => void;
  onSpeciesChange: (species: string) => void;
}

export function PetFilter({
  gender,
  species,
  onGenderChange,
  onSpeciesChange,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            Lọc kết quả:
          </span>
        </div>

        <Select
          value={gender || "all"}
          onValueChange={(value) =>
            onGenderChange(value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="h-9 w-[140px] text-sm">
            <SelectValue placeholder="Giới tính" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả giới tính</SelectItem>
            <SelectItem value="Male">Đực</SelectItem>
            <SelectItem value="Female">Cái</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={species || "all"}
          onValueChange={(value) =>
            onSpeciesChange(value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="h-9 w-[140px] text-sm">
            <SelectValue placeholder="Loài" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả loài</SelectItem>
            <SelectItem value="Dog">Chó</SelectItem>
            <SelectItem value="Cat">Mèo</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
