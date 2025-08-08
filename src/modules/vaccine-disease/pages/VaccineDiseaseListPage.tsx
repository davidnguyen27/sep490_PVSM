// components
import { PageBreadcrumb } from "@/components/shared";
import {
  FilterSection,
  ResultsSection,
  VaccineDiseaseModalCreate,
  VaccineDiseaseModalDetail,
} from "../components";

// hooks
import { useEffect, useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useVaccineDiseases, useVaccineDiseaseAdd } from "../hooks";

// constants
import { VACCINE_DISEASE_PAGE_SIZES } from "../constants";

// types
import type { VaccineDiseasePayload } from "../types/vaccine-disease.payload.type";

export default function VaccineDiseaseListPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedVaccineDiseaseId, setSelectedVaccineDiseaseId] = useState<
    number | null
  >(null);

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isPending, isFetching } = useVaccineDiseases({
    pageNumber: page,
    pageSize: VACCINE_DISEASE_PAGE_SIZES.DEFAULT,
    keyword: debouncedSearch,
  });

  const { mutate: createVaccineDisease, isPending: isCreating } =
    useVaccineDiseaseAdd();

  const pageData = data?.data.pageData ?? [];
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  const handleCreate = (payload: VaccineDiseasePayload) => {
    createVaccineDisease(payload, {
      onSuccess: () => {
        setOpenCreate(false);
      },
    });
  };

  const handleViewDetail = (vaccineDiseaseId: number) => {
    setSelectedVaccineDiseaseId(vaccineDiseaseId);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
    setSelectedVaccineDiseaseId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="space-y-2 bg-white p-6">
        <h1 className="text-primary font-inter-700 text-3xl">
          Quản lý mối liên kết vaccine-bệnh
        </h1>
        <PageBreadcrumb items={["Trang chủ", "Mối liên kết vaccine-bệnh"]} />
      </div>

      <FilterSection
        search={search}
        onSearchChange={setSearch}
        onCreateClick={() => setOpenCreate(true)}
      />

      <ResultsSection
        vaccineDiseases={pageData}
        isPending={isPending || isFetching}
        currentPage={page}
        pageSize={VACCINE_DISEASE_PAGE_SIZES.DEFAULT}
        searchKeyword={search}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
        onViewDetail={handleViewDetail}
      />

      <VaccineDiseaseModalCreate
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        submit={handleCreate}
        isSubmitting={isCreating}
      />

      <VaccineDiseaseModalDetail
        open={openDetail}
        onClose={handleCloseDetail}
        vaccineDiseaseId={selectedVaccineDiseaseId}
      />
    </div>
  );
}
