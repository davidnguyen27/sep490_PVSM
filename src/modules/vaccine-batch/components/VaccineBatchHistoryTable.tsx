import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/shared";
import { Package } from "lucide-react";

interface CombinedHistoryEntry {
  id: string;
  date: string;
  time: string;
  type: "import" | "export";
  receiptCode?: string;
  exportCode?: string;
  quantity: number;
  currentStock: number;
  notes?: string;
  purpose?: string;
  supplier?: string;
  status?: string;
  createdBy?: string;
}

interface VaccineBatchHistoryTableProps {
  history: CombinedHistoryEntry[];
  isLoading: boolean;
}

export function VaccineBatchHistoryTable({
  history,
  isLoading,
}: VaccineBatchHistoryTableProps) {
  if (isLoading) {
    return (
      <div className="bg-linen shadow-md">
        <TableSkeleton columnCount={10} rowCount={5} />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="bg-linen shadow-md">
        <div className="flex flex-col items-center justify-center px-8 py-16">
          <div className="mb-6 rounded-full bg-gray-50 p-4">
            <Package className="h-12 w-12 text-gray-300" />
          </div>
          <h3 className="font-inter-semibold mb-3 text-xl text-gray-900">
            Chưa có lịch sử giao dịch
          </h3>
          <p className="font-nunito-regular max-w-md text-center leading-relaxed text-gray-500">
            Lô vaccine này chưa có bất kỳ giao dịch nhập xuất kho nào trong hệ
            thống. Dữ liệu sẽ được cập nhật khi có giao dịch mới.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linen shadow-md">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              STT
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Ngày
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Giờ
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Loại giao dịch
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Mã phiếu nhập
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Mã phiếu xuất
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Số lượng nhập
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Số lượng xuất
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Tồn kho
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Ghi chú
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Mục đích
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((item, index) => (
            <TableRow
              key={item.id}
              className="hover:bg-accent/10 transition-colors duration-150"
            >
              <TableCell className="text-dark font-nunito text-center text-sm">
                {index + 1}
              </TableCell>

              <TableCell className="text-dark font-nunito text-center text-sm">
                <div className="font-nunito text-sm text-gray-900">
                  {item.date}
                </div>
              </TableCell>

              <TableCell className="text-dark font-nunito text-center text-sm">
                <div className="font-nunito text-sm text-gray-600">
                  {item.time}
                </div>
              </TableCell>

              <TableCell className="text-dark font-nunito text-center text-sm">
                <Badge
                  variant="secondary"
                  className={`font-nunito-medium ${item.type === "import"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      : "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
                    }`}
                >
                  {item.type === "import" ? "Nhập kho" : "Xuất kho"}
                </Badge>
              </TableCell>

              <TableCell className="text-dark font-nunito text-center text-sm">
                {item.type === "import" && item.receiptCode ? (
                  <Badge
                    variant="secondary"
                    className="font-nunito-medium border-emerald-200 bg-emerald-50 text-emerald-700 transition-colors hover:bg-emerald-100"
                  >
                    {item.receiptCode}
                  </Badge>
                ) : (
                  <span className="text-sm text-gray-300">—</span>
                )}
              </TableCell>

              <TableCell className="text-dark font-nunito text-center text-sm">
                {item.type === "export" && item.exportCode ? (
                  <Badge
                    variant="secondary"
                    className="font-nunito-medium border-rose-200 bg-rose-50 text-rose-700 transition-colors hover:bg-rose-100"
                  >
                    {item.exportCode}
                  </Badge>
                ) : (
                  <span className="text-sm text-gray-300">—</span>
                )}
              </TableCell>

              <TableCell className="text-dark font-nunito text-center text-sm">
                {item.type === "import" ? (
                  <span className="font-nunito rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-600">
                    +{item.quantity.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-sm text-gray-300">—</span>
                )}
              </TableCell>

              <TableCell className="text-dark font-nunito text-center text-sm">
                {item.type === "export" ? (
                  <span className="font-nunito rounded-full bg-rose-50 px-3 py-1 text-sm text-rose-600">
                    -{item.quantity.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-sm text-gray-300">—</span>
                )}
              </TableCell>

              <TableCell className="text-dark font-nunito text-center text-sm">
                <span
                  className={`font-nunito rounded-full px-3 py-1 text-sm ${item.currentStock >= 0
                      ? "bg-blue-50 text-blue-700"
                      : "bg-rose-50 text-rose-700"
                    }`}
                >
                  {item.currentStock.toLocaleString()}
                </span>
              </TableCell>

              <TableCell className="text-dark font-nunito max-w-xs text-center text-sm">
                {item.notes ? (
                  <div className={`rounded-lg px-3 py-2 ${item.type === "import"
                      ? "bg-emerald-50"
                      : "bg-rose-50"
                    }`}>
                    <span className="font-nunito text-sm leading-relaxed text-gray-700">
                      {item.notes}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-300">—</span>
                )}
              </TableCell>

              <TableCell className="text-dark font-nunito text-center text-sm">
                {item.purpose ? (
                  <div className="rounded-lg bg-amber-50 px-3 py-2">
                    <span className="font-nunito text-sm text-gray-700">
                      {item.purpose}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-300">—</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
