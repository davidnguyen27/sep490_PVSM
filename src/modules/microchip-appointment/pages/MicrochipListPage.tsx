import { useState } from "react";
import Pagination from "@/components/shared/Pagination";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { PageBreadcrumb, SearchLabel } from "@/components/shared";
import { useMicrochipApps } from "../hooks/useMicrochips";
import { AppointmentFilter } from "../components/AppointmentFilter";
import { AppointmentTable } from "../components/AppointmentTable";
import { Cpu } from "lucide-react";

export default function MicrochipAppListPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    location: "",
    status: "",
  });

  const debouncedSearch = useDebounce(search, 400);
  const { data, isPending, isFetching } = useMicrochipApps({
    pageNumber: page,
    pageSize: 10,
    keyWord: debouncedSearch,
  });

  const microchipApps = data?.data.pageData ?? [];
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  const filteredData = microchipApps.filter((item) => {
    const matchLocation =
      !filters.location ||
      item.microchip.appointment.location === Number(filters.location);

    const matchStatus =
      !filters.status ||
      item.microchip.appointmentStatus === Number(filters.status);

    return matchLocation && matchStatus;
  });

  return (
    <>
      <div className="space-y-1">
        <h1 className="text-primary font-inter-600 flex items-center gap-2 text-xl">
          <Cpu /> Lịch hẹn cấy microchip
        </h1>
        <PageBreadcrumb items={["Dashboard", "Lịch hẹn cấy"]} />
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
