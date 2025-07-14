import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages === 0) return null;

  const renderPages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }

    return pages.map((page, idx) =>
      page === "..." ? (
        <PaginationItem key={`ellipsis-${idx}`}>
          <PaginationEllipsis />
        </PaginationItem>
      ) : (
        <PaginationItem key={page}>
          <button
            onClick={() => onPageChange(page)}
            className={cn(
              "font-nunito flex h-8 min-w-8 items-center justify-center rounded-md border text-sm transition-colors",
              currentPage === page
                ? "bg-primary border-primary text-white"
                : "text-foreground border-input hover:bg-muted border bg-white",
            )}
          >
            {page}
          </button>
        </PaginationItem>
      ),
    );
  };

  return (
    <ShadPagination>
      <PaginationContent className="justify-end">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            className={cn(
              currentPage === 1 && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>

        {renderPages()}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            className={cn(
              currentPage === totalPages && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadPagination>
  );
}
