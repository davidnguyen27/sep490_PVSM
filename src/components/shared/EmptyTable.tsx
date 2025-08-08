import { SearchX } from "lucide-react";

interface EmptyTableProps {
  keyword?: string;
}

export default function EmptyTable({ keyword }: EmptyTableProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
      <SearchX className="mb-4 h-16 w-16" strokeWidth={1.5} />
      <p className="font-nunito text-lg font-semibold">
        {keyword ? "Không tìm thấy kết quả" : "Chưa có dữ liệu"}
      </p>
      {keyword && (
        <p className="font-nunito mt-2 text-sm">
          Không tìm thấy kết quả cho "{keyword}"
        </p>
      )}
    </div>
  );
}
