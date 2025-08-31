import { useEffect, useState } from "react";
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

  // Reset page to 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    document.title = "PVMS | Danh sách lịch tiêm chủng";

    return () => {
      document.title = "PVMS | Danh sách lịch tiêm chủng";
    };
  }, []);

  // Fetch with a large pageSize to get most data, then paginate on frontend
  const { data, isPending, isFetching, refetch } = useVaccinationApps({
    pageNumber: 1,
    pageSize: 1000, // Get a large amount of data
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

  const allVaccinationApps = data?.data.pageData ?? [];

  // Sort by appointmentId in descending order (newest first) and then apply filters
  const sortedAndFilteredData = allVaccinationApps
    .sort((a, b) => b.appointment.appointmentId - a.appointment.appointmentId)
    .filter((item) => {
      const matchLocation =
        !filters.location ||
        item.appointment.location === Number(filters.location);

      const matchStatus =
        !filters.status ||
        item.appointment.appointmentStatus === Number(filters.status);

      return matchLocation && matchStatus;
    });

  // Frontend pagination
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = sortedAndFilteredData.slice(startIndex, endIndex);
  const frontendTotalPages = Math.ceil(sortedAndFilteredData.length / pageSize);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-primary font-inter-700 my-4 flex items-center gap-2 text-2xl">
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
        appointmentData={paginatedData}
        isPending={isPending || isFetching}
        currentPage={page}
        pageSize={pageSize}
      />

      <Pagination
        currentPage={page}
        totalPages={frontendTotalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
