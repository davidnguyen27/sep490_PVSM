import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageBreadcrumb, TableSkeleton } from "@/components/shared";
import { useHistoryByVaccineBatch } from "../hooks";
import { formatData } from "@/shared/utils/format.utils";

export default function VaccineBatchHistoryPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const vaccineBatchId = searchParams.get("vaccineBatchId");
  const batchNumber = searchParams.get("batchNumber");

  const { data: historyData, isPending } = useHistoryByVaccineBatch(
    vaccineBatchId ? parseInt(vaccineBatchId) : null,
  );

  // Handle both single object and array responses
  const historyItems = Array.isArray(historyData)
    ? historyData
    : historyData
      ? [historyData]
      : [];

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

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="space-y-2 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-primary font-inter-700 text-3xl">
              Lịch sử nhập kho - Lô vaccine {batchNumber || "N/A"}
            </h1>
            <p className="mt-1 text-gray-600">
              Chi tiết lịch sử nhập kho của lô vaccine này
            </p>
          </div>
        </div>
        <PageBreadcrumb
          items={[
            "Trang chủ",
            "Quản lý lô vaccine",
            `Lịch sử lô ${batchNumber || "N/A"}`,
          ]}
        />
      </div>

      {/* Content */}
      <div className="space-y-6 p-6">
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-6">
            <h2 className="font-nunito-700 text-xl text-gray-900">
              Thông tin lịch sử nhập kho
            </h2>
            <p className="font-nunito-400 mt-1 text-sm text-gray-500">
              Danh sách các lần nhập kho của lô vaccine này
            </p>
          </div>

          <div className="p-6">
            {isPending ? (
              <TableSkeleton columnCount={7} />
            ) : historyItems.length > 0 ? (
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
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-4 text-gray-400">
                  <svg
                    className="h-16 w-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-nunito-600 mb-2 text-lg text-gray-900">
                  Không có lịch sử nhập kho
                </h3>
                <p className="font-nunito-400 max-w-md text-center text-gray-500">
                  Lô vaccine này chưa có lịch sử nhập kho nào trong hệ thống.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
