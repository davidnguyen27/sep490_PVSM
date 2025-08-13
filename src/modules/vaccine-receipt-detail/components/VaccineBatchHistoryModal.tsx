import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useHistoryByVaccineBatch } from "../hooks";
import { formatData } from "@/shared/utils/format.utils";

interface VaccineBatchHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vaccineBatchId: number | null;
  batchNumber?: string;
}

export function VaccineBatchHistoryModal({
  open,
  onOpenChange,
  vaccineBatchId,
  batchNumber,
}: VaccineBatchHistoryModalProps) {
  const { data: historyData, isPending } =
    useHistoryByVaccineBatch(vaccineBatchId);

  // API now returns array directly
  const historyItems = historyData || [];

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "hoạt động":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Hoạt động
          </Badge>
        );
      case "expired":
      case "hết hạn":
        return <Badge variant="destructive">Hết hạn</Badge>;
      case "damaged":
      case "hư hỏng":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Hư hỏng
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] max-w-6xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="font-nunito-700 text-xl text-gray-900">
            Lịch sử nhập kho - Lô vaccine {batchNumber}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {isPending ? (
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
              <TableSkeleton columnCount={7} />
            </div>
          ) : historyItems.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/80">
                    <TableHead className="font-nunito-700 text-gray-900">
                      STT
                    </TableHead>
                    <TableHead className="font-nunito-700 text-gray-900">
                      Mã phiếu nhập
                    </TableHead>
                    <TableHead className="font-nunito-700 text-gray-900">
                      Ngày nhập
                    </TableHead>
                    <TableHead className="font-nunito-700 text-gray-900">
                      Số lượng
                    </TableHead>
                    <TableHead className="font-nunito-700 text-gray-900">
                      Nhà cung cấp
                    </TableHead>
                    <TableHead className="font-nunito-700 text-gray-900">
                      Trạng thái
                    </TableHead>
                    <TableHead className="font-nunito-700 text-gray-900">
                      Ghi chú
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historyItems.map((item, index) => (
                    <TableRow
                      key={item.vaccineReceiptDetailId || index}
                      className="hover:bg-gray-50/50"
                    >
                      <TableCell className="font-nunito-600 text-gray-800">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-nunito-700 text-primary text-lg">
                            {item.vaccineReceipt?.receiptCode || "N/A"}
                          </p>
                          <p className="font-nunito-400 text-xs text-gray-500">
                            ID: {item.vaccineReceiptId}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="font-nunito-600 text-gray-900">
                        {formatData.formatDate(
                          item.vaccineReceipt?.receiptDate,
                        )}
                      </TableCell>
                      <TableCell className="font-nunito-600 text-gray-900">
                        {item.quantity?.toLocaleString() || 0}
                      </TableCell>
                      <TableCell className="font-nunito-600 text-gray-900">
                        {item.suppiler || "N/A"}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(item.vaccineStatus)}
                      </TableCell>
                      <TableCell className="font-nunito-400 max-w-[200px] truncate text-gray-600">
                        {item.notes || "Không có ghi chú"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex items-center justify-center py-8">
              <p className="font-nunito-400 text-gray-500">
                Không có lịch sử nhập kho cho lô vaccine này
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
