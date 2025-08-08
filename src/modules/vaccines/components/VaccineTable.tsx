import { useNavigate, useSearchParams } from "react-router-dom";
import type { Vaccine } from "../types/vaccine.type";
import { BadgeInfo, SquarePen, Trash2 } from "lucide-react";

// components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TableSkeleton from "@/components/shared/TableSkeleton";
import EmptyTable from "@/components/shared/EmptyTable";
import { ConfirmDeleteVaccine } from "./ConfirmDeleteVaccine";
import { VaccineDetailModal } from "./VaccineDetailModal";
import { VaccineUpdateModal } from "./VaccineUpdateModal";
import { formatData } from "@/shared/utils/format.utils";

// hooks
import { useDeleteVaccine, useVaccineDetail, useUpdateVaccine } from "../hooks";

interface Props {
  vaccines: Vaccine[];
  isPending: boolean;
  currentPage: number;
  pageSize: number;
}

const tableHeaders = [
  "STT",
  "Hình ảnh",
  "Mã vaccine",
  "Tên vaccine",
  "Mô tả",
  "Giá (VNĐ)",
  "Trạng thái",
  "Hành động",
];

export function VaccineTable({
  vaccines,
  isPending,
  currentPage,
  pageSize,
}: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const vaccineId = searchParams.get("vaccineId");
  const action = searchParams.get("action");

  const { mutate: deleteVaccine, isPending: isDeleting } = useDeleteVaccine();
  const { mutate: updateVaccine, isPending: isUpdating } = useUpdateVaccine();

  // Vaccine detail modal logic
  const { data: vaccineDetail, isFetching } = useVaccineDetail(
    vaccineId ? Number(vaccineId) : null,
  );
  const openDetail = Boolean(vaccineId) && action !== "edit";
  const openUpdate = Boolean(vaccineId) && action === "edit";
  const handleDelete = (vaccineId: number) => {
    deleteVaccine(vaccineId);
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
        ) : vaccines.length > 0 ? (
          <TableBody>
            {vaccines.map((item, idx) => (
              <TableRow
                key={item.vaccineId}
                className="hover:bg-accent/10 transition-colors duration-150"
              >
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {(currentPage - 1) * pageSize + idx + 1}
                </TableCell>
                <TableCell className="text-center">
                  {item.image ? (
                    <div className="flex justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200">
                        <span className="text-xs text-gray-400">No img</span>
                      </div>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-dark font-nunito max-w-[140px] truncate text-center text-sm">
                  {item.vaccineCode}
                </TableCell>
                <TableCell className="text-dark font-nunito max-w-[140px] truncate text-center text-sm">
                  {item.name}
                </TableCell>
                <TableCell className="text-dark font-nunito max-w-[200px] truncate text-center text-sm">
                  {item.description}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {formatData.formatCurrency(item.price)}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={
                      item.status === "Active"
                        ? "default"
                        : item.status === "Inactive"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {item.status === "Active"
                      ? "Hoạt động"
                      : item.status === "Inactive"
                        ? "Không hoạt động"
                        : item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <BadgeInfo
                      size={16}
                      className="text-info cursor-pointer transition-transform hover:scale-110"
                      onClick={() =>
                        navigate(`?vaccineId=${item.vaccineId}`, {
                          replace: false,
                        })
                      }
                    />
                    <SquarePen
                      size={16}
                      className="text-purple cursor-pointer transition-transform hover:scale-110"
                      onClick={() =>
                        navigate(`?vaccineId=${item.vaccineId}&action=edit`, {
                          replace: false,
                        })
                      }
                    />
                    <ConfirmDeleteVaccine
                      onConfirm={() => handleDelete(item.vaccineId!)}
                      vaccineName={item.name}
                      isDeleting={isDeleting}
                    >
                      <Trash2
                        size={16}
                        className={`cursor-pointer transition-transform hover:scale-110 ${
                          isDeleting
                            ? "pointer-events-none opacity-50"
                            : "text-danger"
                        }`}
                      />
                    </ConfirmDeleteVaccine>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>

      {!isPending && vaccines.length === 0 && <EmptyTable />}

      {/* Vaccine Detail Modal */}
      <VaccineDetailModal
        open={openDetail}
        onClose={() => navigate("/admin/vaccines", { replace: true })}
        vaccine={vaccineDetail}
        isLoading={isFetching}
      />

      {/* Vaccine Update Modal */}
      {openUpdate && vaccineDetail && (
        <VaccineUpdateModal
          open={openUpdate}
          onClose={() => navigate("/admin/vaccines", { replace: true })}
          onSubmit={(payload) =>
            updateVaccine({
              vaccineId: Number(vaccineId),
              payload,
            })
          }
          isSubmitting={isUpdating}
          defaultValues={vaccineDetail}
        />
      )}
    </div>
  );
}
