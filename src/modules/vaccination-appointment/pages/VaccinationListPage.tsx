import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { AppointmentTable } from "../components";
import {
  AppointmentFilter,
  PageBreadcrumb,
  SearchLabel,
  Pagination,
} from "@/components/shared";
import { useVaccinationApps } from "../hooks/useVaccinations";
import { Syringe, RotateCcw } from "lucide-react";
import VaccinationDetailPage from "./VaccinationDetailPage";
import { useVetId } from "@/shared/hooks";

export default function VaccinationAppListPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    location: "",
    status: "",
  });

  // Get vetId from localStorage
  const vetId = useVetId();

  const debouncedSearch = useDebounce(search, 500, { leading: true });

  const { data, isPending, isFetching, refetch } = useVaccinationApps({
    pageNumber: page,
    pageSize: 10,
    keyWord: debouncedSearch,
    vetId,
  });

  // Check if we should show detail page
  const appointmentId = searchParams.get("appointmentId");
  const isDetailMode = !!appointmentId;

  // If in detail mode, render VaccinationDetailPage
  if (isDetailMode) {
    return <VaccinationDetailPage />;
  }

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
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-primary font-inter-700 my-4 flex items-center gap-2 text-xl">
          <Syringe /> Tiêm chủng tại Phòng khám
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
          className="bg-primary hover:bg-secondary font-nunito ml-auto flex items-center gap-1 rounded px-3 py-2 text-sm text-white"
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
