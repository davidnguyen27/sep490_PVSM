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
import { AppStatusMapped, getBadgeColor } from "@/shared/utils/status.utils";
import TableSkeleton from "@/components/shared/TableSkeleton";
import EmptyTable from "@/components/shared/EmptyTable";
import { BadgeInfo, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { VaccinationApp } from "../types/vaccination.type";
import { useAuth } from "@/modules/auth";

interface Props {
  appointmentData: VaccinationApp[];
  isPending: boolean;
  currentPage: number;
  pageSize: number;
}

const tableHeaders = [
  "STT",
  "Mã lịch tiêm",
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
      ? "/staff/vaccination-appointments"
      : "/vet/vaccination-appointments";

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
                key={item.appointment.appointmentId}
                className="hover:bg-accent/10 transition-colors duration-150"
              >
                <TableCell className="font-nunito text-dark text-center text-sm">
                  {(currentPage - 1) * pageSize + idx + 1}
                </TableCell>
                <TableCell className="font-nunito text-dark text-center text-sm">
                  {item.appointment.appointmentCode}
                </TableCell>
                <TableCell className="text-primary font-nunito cursor-pointer text-center text-sm underline">
                  {item.appointment.petResponseDTO.name}
                </TableCell>
                <TableCell className="text-primary font-nunito cursor-pointer text-center text-sm underline">
                  {item.appointment.customerResponseDTO.fullName}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {formatData.formatDateTime(item.appointment.appointmentDate)}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {formatData.formatLocation(item.appointment.location)}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {item.appointment.address}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={"outline"}
                    className={cn(
                      "font-nunito cursor-pointer text-xs transition-transform hover:scale-110",
                      getBadgeColor(item.appointment.appointmentStatus),
                    )}
                    onClick={() =>
                      navigate(
                        `${basePath}/detail?appointmentId=${item.appointment.appointmentId}`,
                      )
                    }
                  >
                    {AppStatusMapped[item.appointment.appointmentStatus]}
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
