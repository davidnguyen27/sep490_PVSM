import { useState } from "react";
import StaffLayout from "@/shared/layouts/StaffLayout";
import { Input, Label } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Search } from "lucide-react";
import Pagination from "@/components/shared/Pagination";
import StaffAppointmentTable from "../components/StaffAppointmentTable";
import { useAppointments } from "../hooks/useAppointments";
import { useDebounce } from "@/shared/hooks/useDebounce";

export default function StaffAppointmentPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 400);
  const { data, isPending, isFetching } = useAppointments({
    pageNumber: page,
    pageSize: 10,
    keyWord: debouncedSearch,
  });

  const pageData = data?.data.pageData ?? [];
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  return (
    <StaffLayout>
      <div className="space-y-6 p-6">
        <div className="space-y-1">
          <h1 className="text-primary font-inter-700 text-2xl">
            Tiêm chủng tại Phòng khám
          </h1>
          <div className="text-muted-foreground mt-2 flex items-center text-xs">
            <span className="font-nunito-300 cursor-pointer">
              Bảng điều khiển
            </span>
            <ChevronRight size={14} strokeWidth={1.5} className="mx-1" />
            <span className="font-nunito-300 cursor-pointer">Tiêm chủng</span>
            <ChevronRight size={14} strokeWidth={1.5} className="mx-1" />
            <span className="text-foreground font-nunito-600 cursor-pointer">
              Phòng khám
            </span>
          </div>
        </div>

        <div className="bg-linen flex flex-wrap items-end gap-4 p-4 shadow-md">
          <div className="flex w-full max-w-xs flex-col gap-1">
            <Label htmlFor="search" className="font-nunito-600 text-xs">
              Tìm kiếm
            </Label>
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                id="search"
                placeholder="Tìm theo mã lịch khám..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="status" className="font-nunito-600 text-xs">
              Trạng thái
            </Label>
            <Select
              value={status?.toString()}
              onValueChange={(value) => {
                setStatus(value === "default" ? undefined : Number(value));
                setPage(1);
              }}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Mặc định" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Mặc định</SelectItem>
                <SelectItem value="1">Đang xử lý</SelectItem>
                <SelectItem value="2">Đã xác nhận</SelectItem>
                <SelectItem value="3">Đã đến</SelectItem>
                <SelectItem value="4">Đã xử lý</SelectItem>
                <SelectItem value="9">Hoàn tất</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <StaffAppointmentTable
          appointmentData={pageData}
          isPending={isPending || isFetching}
          currentPage={page}
          pageSize={10}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </StaffLayout>
  );
}
