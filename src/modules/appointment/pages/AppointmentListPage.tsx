import { useState } from "react";
import { Calendar, RotateCcw } from "lucide-react";
import {
  AppointmentFilter,
  PageBreadcrumb,
  SearchLabel,
  Pagination,
  PageLoader,
  InlineLoading,
} from "@/components/shared";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppointments } from "../hooks/useAppointments";
import { AppointmentTable } from "../components/AppointmentTable";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import AppointmentDetailPage from "./AppointmentDetailPage";

export default function AppointmentListPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    location: "",
    status: "",
    deleted: "active", // active | deleted | all
  });

  const debouncedSearch = useDebounce(search, 500, { leading: true });

  const { data, isPending, isFetching, refetch } = useAppointments({
    pageNumber: page,
    pageSize: 10,
    keyword: debouncedSearch,
  });

  // Check if we should show detail page
  const appointmentId = searchParams.get("appointmentId");
  const isDetailMode = !!appointmentId;

  // If in detail mode, render AppointmentDetailPage
  if (isDetailMode) {
    return <AppointmentDetailPage />;
  }

  const pageData = data?.data?.pageData ?? [];
  const totalPages = data?.data?.pageInfo?.totalPage ?? 1;

  // Filter data on frontend like vaccination-appointment module
  const filteredData = pageData.filter((item) => {
    const matchLocation =
      !filters.location || item.location === Number(filters.location);

    const matchStatus =
      !filters.status || item.appointmentStatus === Number(filters.status);

    let matchDeleted = true;
    if (filters.deleted === "active") matchDeleted = !item.isDeleted;
    else if (filters.deleted === "deleted") matchDeleted = !!item.isDeleted;
    // if "all" then show all

    return matchLocation && matchStatus && matchDeleted;
  });

  return (
    <PageLoader
      loading={isPending && !isFetching}
      loadingText="Đang tải danh sách lịch hẹn..."
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Calendar color="#00B8A9" />
          <h1 className="text-primary font-inter-700 text-2xl">
            Quản lý lịch hẹn
          </h1>
        </div>
        <PageBreadcrumb items={["Lịch hẹn"]} />

        <div className="flex flex-wrap items-end gap-4 p-4">
          <SearchLabel value={search} onChange={setSearch} />
          <AppointmentFilter
            location={filters.location}
            status={filters.status}
            onChange={(newFilters) => {
              setFilters((prev) => ({ ...prev, ...newFilters }));
              setPage(1);
            }}
          />
          <div className="flex min-w-[140px] flex-col gap-1">
            <Select
              value={filters.deleted}
              onValueChange={(val) => {
                setFilters((prev) => ({ ...prev, deleted: val }));
                setPage(1);
              }}
            >
              <SelectTrigger id="deleted">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Lịch hẹn đang hoạt động</SelectItem>
                <SelectItem value="deleted">Lịch hẹn đã xóa</SelectItem>
                <SelectItem value="all">Tất cả</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <button
            type="button"
            className="bg-primary hover:bg-secondary font-nunito ml-auto flex items-center gap-1 rounded px-3 py-2 text-sm text-white"
            onClick={() => refetch()}
          >
            <RotateCcw size={16} />
            Làm mới
          </button>
          {debouncedSearch && isFetching && (
            <InlineLoading text="Đang tìm kiếm..." variant="muted" size="sm" />
          )}
        </div>

        <AppointmentTable
          appointments={filteredData}
          isPending={isPending || isFetching}
          currentPage={page}
          pageSize={10}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </PageLoader>
  );
}
