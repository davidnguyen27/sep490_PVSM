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
import { formatData } from "@/shared/utils/format.utils";
import { Package } from "lucide-react";

interface CombinedHistoryEntry {
  id: string;
  date: string;
  importCode?: string;
  exportCode?: string;
  importDate?: string;
  exportDate?: string;
  importQuantity?: number;
  exportQuantity?: number;
  currentStock: number;
  importNotes?: string;
  exportNotes?: string;
  exportPurpose?: string;
  supplier?: string;
  importStatus?: string;
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
              Mã phiếu nhập
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Mã phiếu xuất
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Ngày nhập
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Ngày xuất
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
              Mục đích xuất
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
                {item.importCode ? (
                  <Badge
                    variant="secondary"
                    className="font-nunito-medium border-emerald-200 bg-emerald-50 text-emerald-700 transition-colors hover:bg-emerald-100"
                  >
                    {item.importCode}
                  </Badge>
                ) : (
                  <span className="text-sm text-gray-300">—</span>
                )}
              </TableCell>

              <TableCell className="text-dark font-nunito text-center text-sm">
                {item.exportCode ? (
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
                {item.importDate ? (
                  <div className="space-y-1">
                    <div className="font-nunito text-sm text-gray-900">
                      {formatData.formatDate(item.importDate)}
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-gray-300">—</span>
                )}
              </TableCell>

              <TableCell className="text-dark font-nunito text-center text-sm">
                {item.exportDate ? (
                  <div className="font-nunito text-sm text-gray-900">
                    {formatData.formatDate(item.exportDate)}
                  </div>
                ) : (
                  <span className="text-sm text-gray-300">—</span>
                )}
              </TableCell>

              <TableCell className="text-dark font-nunito text-center text-sm">
                {item.importQuantity ? (
                  <span className="font-nunito rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-600">
                    +{item.importQuantity.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-sm text-gray-300">—</span>
                )}
              </TableCell>

              <TableCell className="text-dark font-nunito text-center text-sm">
                {item.exportQuantity ? (
                  <span className="font-nunito rounded-full bg-rose-50 px-3 py-1 text-sm text-rose-600">
                    -{item.exportQuantity.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-sm text-gray-300">—</span>
                )}
              </TableCell>

              <TableCell className="text-dark font-nunito text-center text-sm">
                <span
                  className={`font-nunito rounded-full px-3 py-1 text-sm ${
                    item.currentStock >= 0
                      ? "bg-blue-50 text-blue-700"
                      : "bg-rose-50 text-rose-700"
                  }`}
                >
                  {item.currentStock.toLocaleString()}
                </span>
              </TableCell>

              <TableCell className="text-dark font-nunito max-w-xs text-center text-sm">
                {item.importNotes || item.exportNotes ? (
                  <div className="space-y-2">
                    {item.importNotes && (
                      <div className="rounded-lg bg-emerald-50 px-3 py-2">
                        <span className="font-nunito mb-1 block text-xs text-emerald-700">
                          Nhập kho:
                        </span>
                        <span className="font-nunito text-sm leading-relaxed text-gray-700">
                          {item.importNotes}
                        </span>
                      </div>
                    )}
                    {item.exportNotes && (
                      <div className="rounded-lg bg-rose-50 px-3 py-2">
                        <span className="font-nunito mb-1 block text-xs text-rose-700">
                          Xuất kho:
                        </span>
                        <span className="font-nunito text-sm leading-relaxed text-gray-700">
                          {item.exportNotes}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-sm text-gray-300">—</span>
                )}
              </TableCell>

              <TableCell className="text-dark font-nunito text-center text-sm">
                {item.exportPurpose ? (
                  <div className="rounded-lg bg-amber-50 px-3 py-2">
                    <span className="font-nunito text-sm text-gray-700">
                      {item.exportPurpose}
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
