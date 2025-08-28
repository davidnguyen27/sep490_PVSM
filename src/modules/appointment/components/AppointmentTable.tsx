import type { Appointment } from "@/modules/appointment/types/appointment.type";
import TableSkeleton from "@/components/shared/TableSkeleton";
import EmptyTable from "@/components/shared/EmptyTable";
import { AppStatusMapped, getBadgeColor } from "@/shared/utils/status.utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatData } from "@/shared/utils/format.utils";

import ConfirmDelete from "@/components/shared/ConfirmDelete";
import { useState } from "react";
import { useAppointmentDel } from "../hooks/useAppointmentDel";
import { BadgeInfo, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

interface Props {
  appointments: Appointment[];
  isPending: boolean;
  currentPage: number;
  pageSize: number;
}

export function AppointmentTable({
  appointments,
  isPending,
  currentPage,
  pageSize,
}: Props) {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState<Appointment | null>(null);
  const deleteMutation = useAppointmentDel();

  const handleDelete = (item: Appointment) => {
    setDeleteTarget(item);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteMutation.mutate(deleteTarget.appointmentId);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="bg-linen shadow-md">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              STT
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Mã lịch hẹn
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Khách hàng
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Địa điểm tiêm
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Địa chỉ tiêm
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Thú cưng
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Ngày hẹn
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Trạng thái
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Thao tác
            </TableHead>
          </TableRow>
        </TableHeader>

        {isPending ? (
          <TableSkeleton columnCount={9} rowCount={pageSize} />
        ) : appointments.length > 0 ? (
          <TableBody>
            {appointments.map((item, idx) => (
              <TableRow
                key={item.appointmentId || `appointment-${idx}`}
                className="hover:bg-accent/10 transition-colors duration-150"
              >
                <TableCell className="text-dark font-nunito-500 text-center text-sm">
                  {(currentPage - 1) * pageSize + idx + 1}
                </TableCell>
                <TableCell className="text-dark font-nunito-400 max-w-[140px] truncate text-center text-sm">
                  {item.appointmentCode}
                </TableCell>
                <TableCell className="text-dark font-nunito-500 max-w-[140px] truncate text-center text-sm">
                  {item.customerResponseDTO?.fullName || "-"}
                </TableCell>
                <TableCell className="text-dark font-nunito-500 max-w-[140px] truncate text-center text-sm">
                  {item.location === 1 ? "Trung tâm" : "Tại nhà"}
                </TableCell>
                <TableCell className="text-dark font-nunito-500 max-w-[140px] truncate text-center text-sm">
                  {item.address || "-"}
                </TableCell>
                <TableCell className="text-dark font-nunito-400 max-w-[140px] truncate text-center text-sm">
                  {item.petResponseDTO?.name || "-"}
                </TableCell>
                <TableCell className="text-dark font-nunito-400 text-center text-sm">
                  {formatData.formatDateTime(item.appointmentDate)}
                </TableCell>
                <TableCell className="text-dark font-nunito-400 text-center text-sm">
                  <span
                    className={`font-nunito-600 inline-block rounded-full border px-3 py-1 text-xs ${getBadgeColor(item.appointmentStatus)}`}
                  >
                    {AppStatusMapped[item.appointmentStatus] ||
                      "Không xác định"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex h-6 items-center justify-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <BadgeInfo
                            size={16}
                            className="text-info cursor-pointer align-middle transition-transform hover:scale-110"
                            style={{ verticalAlign: "middle" }}
                            onClick={() =>
                              navigate(`?appointmentId=${item.appointmentId}`, {
                                replace: false,
                              })
                            }
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-nunito">Xem chi tiết</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span>
                            <ConfirmDelete
                              onConfirm={handleConfirmDelete}
                              title="Xác nhận xóa lịch hẹn"
                              description={`Bạn có chắc chắn muốn xóa lịch hẹn "${item.appointmentCode}"?`}
                            >
                              <button
                                className="m-0 border-none bg-transparent p-0 outline-none"
                                onClick={() => handleDelete(item)}
                                disabled={deleteMutation.isPending}
                              >
                                <Trash2
                                  size={16}
                                  className="cursor-pointer align-middle text-red-500 transition-transform hover:scale-110"
                                  style={{ verticalAlign: "middle" }}
                                />
                              </button>
                            </ConfirmDelete>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-nunito">Xóa</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>

      {!isPending && appointments.length === 0 && <EmptyTable />}
    </div>
  );
}
