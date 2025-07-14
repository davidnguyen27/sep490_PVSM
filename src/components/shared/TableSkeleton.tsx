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
        <TableRow key={rowIdx}>
          {columns.map((__, colIdx) => (
            <TableCell key={colIdx}>
              <Skeleton className="h-4 w-full rounded-md" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
