import { Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui";
import { VACCINE_DISEASE_MESSAGES } from "../constants";

interface FilterSectionProps {
  search: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
}

export function FilterSection({
  search,
  onSearchChange,
  onCreateClick,
}: FilterSectionProps) {
  return (
    <div className="from-linen to-linen/80 border-b border-gray-100 bg-gradient-to-r shadow-sm">
      <div className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end">
            <div className="max-w-lg flex-1">
              <label className="font-nunito-600 mb-3 block text-sm text-gray-700">
                <Search className="mr-2 inline h-4 w-4" />
                Tìm kiếm mối liên kết vaccine-bệnh
              </label>
              <div className="group relative">
                <Search className="group-focus-within:text-primary absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors" />
                <input
                  type="text"
                  placeholder={VACCINE_DISEASE_MESSAGES.SEARCH_PLACEHOLDER}
                  className="font-nunito-400 focus:border-primary focus:ring-primary/10 w-full rounded-xl border border-gray-200 bg-white/80 py-3 pr-4 pl-12 text-sm backdrop-blur-sm transition-all duration-300 placeholder:text-gray-400 hover:border-gray-300 focus:bg-white focus:ring-4 focus:outline-none"
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            </div>

            <Button
              className="font-nunito-600 bg-primary hover:bg-primary/90 transform rounded-xl px-6 py-3 whitespace-nowrap shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              onClick={onCreateClick}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Tạo mối liên kết
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
