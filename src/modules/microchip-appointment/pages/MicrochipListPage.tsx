import { useState } from "react";
import Pagination from "@/components/shared/Pagination";
import { useDebounce } from "@/shared/hooks/useDebounce";
import {
  AppointmentFilter,
  PageBreadcrumb,
  SearchLabel,
} from "@/components/shared";
import { useMicrochipApps } from "../hooks/useMicrochips";
import { AppointmentTable } from "../components/AppointmentTable";
import { Cpu, RotateCcw } from "lucide-react";
import { useVetId } from "@/shared/hooks";
import { useSearchParams } from "react-router-dom";
import MicrochipAppDetailPage from "./MicrochipDetailPage";

export default function MicrochipAppListPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    location: "",
    status: "",
  });

  const debouncedSearch = useDebounce(search, 500, { leading: true });
  const vetId = useVetId();

  const { data, isPending, isFetching, refetch } = useMicrochipApps({
    pageNumber: page,
    pageSize: 10,
    keyWord: debouncedSearch,
    vetId: vetId,
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

  const appointmentId = searchParams.get("appointmentId");
  const isDetailMode = !!appointmentId;

  if (isDetailMode) {
    return <MicrochipAppDetailPage />;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-primary font-inter-600 my-4 flex items-center gap-2 text-xl">
          <Cpu /> Cấy microchip
        </h1>
        <PageBreadcrumb items={["Danh sách lịch hẹn"]} />
      </div>

      <div className="flex flex-wrap items-end gap-4 p-4">
        <SearchLabel value={search} onChange={setSearch} />
        <AppointmentFilter
          location={filters.location}
          status={filters.status}
          onChange={(newFilters) => {
            setFilters(newFilters);
            setPage(1);
          }}
        />
        <button
          type="button"
          className="bg-primary hover:bg-secondary ml-auto flex items-center gap-1 rounded px-3 py-2 text-white transition"
          title="Làm mới dữ liệu"
          onClick={() => refetch()}
        >
          <RotateCcw size={16} />
          Làm mới
        </button>
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
    </div>
  );
}
