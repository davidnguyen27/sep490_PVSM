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
        <div className="flex items-center gap-4">
          <Filter size={16} className="text-gray-500" />
          <span className="font-nunito-600 text-sm text-gray-700">
            Lọc kết quả:
          </span>
        </div>

        <Select
          value={gender || "all"}
          onValueChange={(value) =>
            onGenderChange(value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="font-nunito-500 h-9 w-[140px] text-sm">
            <SelectValue placeholder="Giới tính" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="font-nunito-500">
              Tất cả giới tính
            </SelectItem>
            <SelectItem value="Male" className="font-nunito-500">
              Đực
            </SelectItem>
            <SelectItem value="Female" className="font-nunito-500">
              Cái
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={species || "all"}
          onValueChange={(value) =>
            onSpeciesChange(value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="font-nunito-500 h-9 w-[140px] text-sm">
            <SelectValue placeholder="Loài" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="font-nunito-500">
              Tất cả loài
            </SelectItem>
            <SelectItem value="Dog" className="font-nunito-500">
              Chó
            </SelectItem>
            <SelectItem value="Cat" className="font-nunito-500">
              Mèo
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
