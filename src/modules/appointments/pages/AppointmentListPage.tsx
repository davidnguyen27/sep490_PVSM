import { useState } from "react";
import Pagination from "@/components/shared/Pagination";
import { useAppointments } from "../hooks/useAppointments";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { AppointmentTable } from "../../vaccination-appointment/components/AppointmentTable";
import { PageBreadcumb, SearchLabel } from "@/components/shared";
import { AppointmentFilter } from "../../vaccination-appointment/components/AppointmentFilter";

export default function AppointmentListPage() {
  const [search, setSearch] = useState("");
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
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-primary font-inter-700 text-2xl">
          Tiêm chủng tại Phòng khám
        </h1>
        <PageBreadcumb items={["Bảng điều khiển", "Lịch hẹn tiêm"]} />
      </div>

      <div className="bg-linen flex flex-wrap items-end gap-4 p-4 shadow-md">
        <SearchLabel value={search} onChange={setSearch} />
        <AppointmentFilter />
      </div>

      <AppointmentTable
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
  );
}
