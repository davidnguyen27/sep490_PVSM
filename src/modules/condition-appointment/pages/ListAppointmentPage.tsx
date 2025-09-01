import {
  PageBreadcrumb,
  Pagination,
  SearchLabel,
  AppointmentFilter,
} from "@/components/shared";
import { useDebounce, useVetId } from "@/shared/hooks";
import { useEffect, useState } from "react";
import { useConditionAppointments } from "../hooks/useConditionAppointments";
import { AppointmentTable } from "../components/AppointmentTable";
import { BookCheck, RotateCcw } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import AppointmentDetailPage from "./AppointmentDetailPage";

export default function ListAppointmentPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    location: "",
    status: "",
  });

  const debouncedSearch = useDebounce(search, 500, { leading: true });
  const vetId = useVetId();

  const { data, isPending, isFetching, refetch } = useConditionAppointments({
    pageNumber: page,
    pageSize: 10,
    keyWord: debouncedSearch,
    vetId: vetId,
  });

  useEffect(() => {
    document.title = "PVMS | Lịch hẹn khám bệnh";

    return () => {
      document.title = "PVMS | Lịch hẹn khám bệnh";
    };
  }, []);

  const conditionApps = data?.data?.pageData ?? [];
  const totalPages = data?.data?.pageInfo?.totalPage ?? 1;

  const filteredData = conditionApps.filter((item) => {
    const matchLocation =
      !filters.location ||
      item.appointment.location === Number(filters.location);

    const matchStatus =
      !filters.status ||
      item.appointment.appointmentStatus === Number(filters.status);

    return matchLocation && matchStatus;
  });

  const appointmentId = searchParams.get("appointmentId");
  const isDetailMode = !!appointmentId;

  if (isDetailMode) {
    return <AppointmentDetailPage />;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-primary font-inter-700 my-4 flex items-center gap-2 text-2xl">
          <BookCheck /> Chứng nhận sức khỏe
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
