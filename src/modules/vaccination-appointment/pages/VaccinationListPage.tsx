import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { AppointmentTable } from "../components";
import {
  AppointmentFilter,
  PageBreadcrumb,
  SearchLabel,
  Pagination,
} from "@/components/shared";
import { useVaccinationApps } from "../hooks/useVaccinations";
import { Syringe } from "lucide-react";

export default function VaccinationAppListPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    location: "",
    status: "",
  });

  const debouncedSearch = useDebounce(search, 500, { leading: true });
  const { data, isPending, isFetching } = useVaccinationApps({
    pageNumber: page,
    pageSize: 10,
    keyWord: debouncedSearch,
  });

  const vaccinationApps = data?.data.pageData ?? [];
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  const filteredData = vaccinationApps.filter((item) => {
    const matchLocation =
      !filters.location ||
      item.appointment.location === Number(filters.location);

    const matchStatus =
      !filters.status ||
      item.appointment.appointmentStatus === Number(filters.status);

    return matchLocation && matchStatus;
  });

  return (
    <>
      <div className="space-y-1">
        <h1 className="text-primary font-inter-600 flex items-center gap-2 text-xl">
          <Syringe /> Tiêm chủng tại Phòng khám
        </h1>
        <PageBreadcrumb items={["Trang chủ", "Danh sách lịch hẹn"]} />
      </div>

      <div className="bg-linen flex flex-wrap items-end gap-4 p-4 shadow-md">
        <SearchLabel value={search} onChange={setSearch} />
        <AppointmentFilter
          location={filters.location}
          status={filters.status}
          onChange={(newFilters) => {
            setFilters(newFilters);
            setPage(1);
          }}
        />
      </div>

      <AppointmentTable
        appointmentData={filteredData}
        isPending={isPending || isFetching}
        currentPage={page}
        pageSize={10}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </>
  );
}
