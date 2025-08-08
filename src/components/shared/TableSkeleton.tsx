import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  columnCount: number;
  rowCount?: number;
}

export default function TableSkeleton({ columnCount, rowCount = 10 }: Props) {
  const columns = Array.from({ length: columnCount });

  return (
    <TableBody>
      {Array.from({ length: rowCount }).map((_, rowIdx) => (
        <TableRow key={rowIdx} className="hover:bg-accent/10">
          {columns.map((__, colIdx) => (
            <TableCell key={colIdx} className="px-4 py-3">
              <Skeleton className="h-4 w-full rounded-md bg-gray-200" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
