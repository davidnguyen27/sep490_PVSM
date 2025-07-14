import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { formatData } from "@/shared/utils/format.utils";
import { AppStatusMapped, getBadgeColor } from "../utils/status.utils";
import TableSkeleton from "@/components/shared/TableSkeleton";
import EmptyTable from "@/components/shared/EmptyTable";
import { BadgeInfo, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/modules/auth";
import type { MicrochipAppointment } from "../types/microchip.type";
import { formatAppointmentData } from "../utils/format.utils";

interface Props {
  appointmentData: MicrochipAppointment[];
  isPending: boolean;
  currentPage: number;
  pageSize: number;
}

const tableHeaders = [
  "STT",
  "Mã lịch cấy",
  "Tên thú cưng",
  "Chủ nuôi",
  "Ngày hẹn",
  "Địa điểm",
  "Địa chỉ",
  "Trạng thái",
  "Hành động",
];

export function AppointmentTable({
  appointmentData,
  isPending,
  currentPage,
  pageSize,
}: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const basePath =
    user?.role === 2
      ? "/staff/microchip-appointments"
      : "/vet/microchip-appointments";

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
        ) : appointmentData.length > 0 ? (
          <TableBody>
            {appointmentData.map((item, idx) => (
              <TableRow
                key={item.microchip.appointmentId}
                className="hover:bg-accent/10 transition-colors duration-150"
              >
                <TableCell className="font-nunito text-dark text-center text-sm">
                  {(currentPage - 1) * pageSize + idx + 1}
                </TableCell>
                <TableCell className="font-nunito text-dark text-center text-sm">
                  {item.microchip.appointmentDetailCode}
                </TableCell>
                <TableCell className="text-primary font-nunito cursor-pointer text-center text-sm underline">
                  {item.microchip.appointment.petResponseDTO.name}
                </TableCell>
                <TableCell className="text-primary font-nunito cursor-pointer text-center text-sm underline">
                  {item.microchip.appointment.customerResponseDTO.fullName}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {formatData.formatDateTime(item.microchip.appointmentDate)}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {formatAppointmentData.formatLocation(
                    item.microchip.appointment.location,
                  )}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {item.microchip.appointment.address}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={"outline"}
                    className={cn(
                      "font-nunito cursor-pointer text-xs transition-transform hover:scale-110",
                      getBadgeColor(item.microchip.appointmentStatus),
                    )}
                    onClick={() =>
                      navigate(
                        `${basePath}/detail?appointmentId=${item.microchip.appointmentDetailId}`,
                      )
                    }
                  >
                    {AppStatusMapped[item.microchip.appointmentStatus]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <BadgeInfo
                      size={16}
                      className="text-info cursor-pointer transition-transform hover:scale-110"
                    />
                    <SquarePen
                      size={16}
                      className="text-purple cursor-pointer transition-transform hover:scale-110"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>

      {!isPending && appointmentData.length === 0 && <EmptyTable />}
    </div>
  );
}
