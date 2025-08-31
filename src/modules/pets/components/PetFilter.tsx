import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  gender: string;
  species: string;
  isDeleted: string;
  onChange: (filters: {
    gender: string;
    species: string;
    isDeleted: string;
  }) => void;
}

export function PetFilter({ gender, species, isDeleted, onChange }: Props) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <Label htmlFor="gender" className="font-nunito-600 text-xs">
          Giới tính
        </Label>
        <Select
          value={gender || "default"}
          onValueChange={(val) => {
            onChange({
              gender: val === "default" ? "" : val,
              species,
              isDeleted,
            });
          }}
        >
          <SelectTrigger id="gender">
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Tất cả</SelectItem>
            <SelectItem value="Male">Đực</SelectItem>
            <SelectItem value="Female">Cái</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="species" className="font-nunito-600 text-xs">
          Loài
        </Label>
        <Select
          value={species || "default"}
          onValueChange={(val) =>
            onChange({
              gender,
              species: val === "default" ? "" : val,
              isDeleted,
            })
          }
        >
          <SelectTrigger id="species">
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Tất cả</SelectItem>
            <SelectItem value="Dog">Chó</SelectItem>
            <SelectItem value="Cat">Mèo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="isDeleted" className="font-nunito-600 text-xs">
          Trạng thái
        </Label>
        <Select
          value={isDeleted || "default"}
          onValueChange={(val) =>
            onChange({
              gender,
              species,
              isDeleted: val === "default" ? "" : val,
            })
          }
        >
          <SelectTrigger id="isDeleted">
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Tất cả</SelectItem>
            <SelectItem value="false">Đang hoạt động</SelectItem>
            <SelectItem value="true">Đã xóa</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
