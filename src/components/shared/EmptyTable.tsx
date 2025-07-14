import { SearchX } from "lucide-react";

interface EmptyTableProps {
  keyword?: string;
}

export default function EmptyTable({ keyword }: EmptyTableProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
      <SearchX className="mb-4 h-16 w-16" strokeWidth={1.5} />
      <p className="text-lg font-semibold">No results found</p>
      {keyword && (
        <p className="mt-2 text-sm">No results matching "{keyword}"</p>
      )}
    </div>
  );
}
