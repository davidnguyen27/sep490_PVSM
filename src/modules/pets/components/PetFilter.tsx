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
  isDeleted?: string;
  onGenderChange: (gender: string) => void;
  onSpeciesChange: (species: string) => void;
  onIsDeletedChange: (isDeleted: string) => void;
}

export function PetFilter({
  gender,
  species,
  isDeleted,
  onGenderChange,
  onSpeciesChange,
  onIsDeletedChange,
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

        <Select
          value={isDeleted || "all"}
          onValueChange={(value) =>
            onIsDeletedChange(value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="font-nunito-500 h-9 w-[160px] text-sm">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="font-nunito-500">
              Tất cả trạng thái
            </SelectItem>
            <SelectItem value="false" className="font-nunito-500">
              Đang hoạt động
            </SelectItem>
            <SelectItem value="true" className="font-nunito-500">
              Đã xóa
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
