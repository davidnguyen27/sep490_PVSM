import { Input, Label } from "@/components/ui";
import { Search } from "lucide-react";

interface SearchLableProps {
  value: string;
  onChange: (value: string) => void;
}
export default function SearchLabel({ value, onChange }: SearchLableProps) {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1">
      <Label htmlFor="search" className="font-nunito-600 text-xs">
        Tìm kiếm
      </Label>
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          id="search"
          placeholder="Tìm theo tên..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-9"
        />
      </div>
    </div>
  );
}
