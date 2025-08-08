import { useNavigate, useLocation } from "react-router-dom";
import type { VaccineBatch } from "../types/vaccine-batch.type";

// components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "@/components/shared/TableSkeleton";
import EmptyTable from "@/components/shared/EmptyTable";
import { VaccineBatchActionMenu } from "./VaccineBatchActionMenu";

// hooks
import { useVaccineBatchDelete } from "../hooks/useVaccineBatchDelete";

// utils
import { formatData } from "@/shared/utils/format.utils";

interface Props {
  vaccineBatches: VaccineBatch[];
  isPending: boolean;
  currentPage: number;
  pageSize: number;
}

const tableHeaders = [
  "STT",
  "Số lô",
  "Tên vắc-xin",
  "Ngày sản xuất",
  "Ngày hết hạn",
  "Số lượng",
  "Giá (VNĐ)",
  "Trạng thái",
  "Thao tác",
];

export function VaccineBatchTable({
  vaccineBatches,
  isPending,
  currentPage,
  pageSize,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: deleteVaccineBatch, isPending: isDeleting } =
    useVaccineBatchDelete();

  // Determine current route prefix (admin or staff)
  const routePrefix = location.pathname.includes("/admin")
    ? "/admin"
    : "/staff";

  const handleDelete = (vaccineBatchId: number) => {
    deleteVaccineBatch(vaccineBatchId);
  };

  const handleViewHistory = (vaccineBatchId: number, batchNumber: string) => {
    navigate(
      `${routePrefix}/vaccine-export-history?vaccineBatchId=${vaccineBatchId}&batchNumber=${encodeURIComponent(batchNumber)}`,
    );
  };

  const handleViewImportHistory = (
    vaccineBatchId: number,
    batchNumber: string,
  ) => {
    navigate(
      `${routePrefix}/vaccine-import-history?vaccineBatchId=${vaccineBatchId}&batchNumber=${encodeURIComponent(batchNumber)}`,
    );
  };

  const getStatusBadgeColor = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) {
      return "bg-red-100 text-red-800"; // Expired
    } else if (daysDiff <= 30) {
      return "bg-yellow-100 text-yellow-800"; // Expiring soon
    } else {
      return "bg-green-100 text-green-800"; // Active
    }
  };

  const getStatusText = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) {
      return "Hết hạn";
    } else if (daysDiff <= 30) {
      return "Sắp hết hạn";
    } else {
      return "Còn hạn";
    }
  };

  return (
    <div className="bg-linen shadow-md">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow className="hover:bg-transparent">
            {tableHeaders.map((header) => (
              <TableHead
                key={header}
                className="font-nunito px-4 py-2 text-center text-sm text-white"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {isPending ? (
          <TableSkeleton
            columnCount={tableHeaders.length}
            rowCount={pageSize}
          />
        ) : vaccineBatches.length > 0 ? (
          <TableBody>
            {vaccineBatches.map((item, idx) => (
              <TableRow
                key={item.vaccineBatchId}
                className="hover:bg-accent/10 transition-colors duration-150"
              >
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {(currentPage - 1) * pageSize + idx + 1}
                </TableCell>
                <TableCell className="text-dark font-nunito max-w-[140px] truncate text-center text-sm">
                  {item.batchNumber}
                </TableCell>
                <TableCell className="text-dark font-nunito max-w-[200px] truncate text-center text-sm">
                  {item.vaccineResponseDTO.name}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {formatData.formatDate(item.manufactureDate)}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {formatData.formatDate(item.expiryDate)}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {item.quantity}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {item.vaccineResponseDTO.price.toLocaleString()}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeColor(item.expiryDate)}`}
                  >
                    {getStatusText(item.expiryDate)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center">
                    <VaccineBatchActionMenu
                      batchNumber={item.batchNumber}
                      isDeleting={isDeleting}
                      onQuickView={() =>
                        navigate(`?vaccineBatchId=${item.vaccineBatchId}`, {
                          replace: false,
                        })
                      }
                      onDetailView={() =>
                        navigate(
                          `${routePrefix}/vaccine-batches?vaccineBatchId=${item.vaccineBatchId}&action=view`,
                        )
                      }
                      onEdit={() =>
                        navigate(
                          `?vaccineBatchId=${item.vaccineBatchId}&action=edit`,
                          {
                            replace: false,
                          },
                        )
                      }
                      onViewHistory={() =>
                        handleViewHistory(item.vaccineBatchId, item.batchNumber)
                      }
                      onViewImportHistory={() =>
                        handleViewImportHistory(
                          item.vaccineBatchId,
                          item.batchNumber,
                        )
                      }
                      onDelete={() => handleDelete(item.vaccineBatchId)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>

      {!isPending && vaccineBatches.length === 0 && <EmptyTable />}
    </div>
  );
}
