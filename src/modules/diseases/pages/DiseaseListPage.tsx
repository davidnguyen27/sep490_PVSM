// components
import { PageBreadcrumb } from "@/components/shared";
import {
  DiseaseModalCreate,
  FilterSection,
  ResultsSection,
} from "../components";

// hooks
import { useEffect, useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useDiseasesWithFilter } from "../hooks/useDiseasesWithFilter";
import { useCreateDisease } from "../hooks/useCreateDisease";
import { useDiseaseStats } from "../hooks/useDiseaseStats";

// types
import type { DiseasePayload } from "../types/disease.payload.type";

export default function DiseaseListPage() {
  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedSpecies, setSelectedSpecies] = useState<"All" | "Dog" | "Cat">(
    "All",
  );

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedSpecies]);

  const { mutate: createDisease, isPending: isCreating } = useCreateDisease();
  const { data, isPending, isFetching } = useDiseasesWithFilter({
    pageNumber: page,
    pageSize: 10,
    keyWord: debouncedSearch,
    species: selectedSpecies,
  });
  const { data: statsData } = useDiseaseStats();

  const pageData = data?.data.pageData ?? [];
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  // Sử dụng thống kê từ API
  const dogCount = statsData?.dogCount ?? 0;
  const catCount = statsData?.catCount ?? 0;
  const totalCount = statsData?.totalCount ?? 0;

  const handleCreate = (payload: DiseasePayload) => {
    createDisease(payload, {
      onSuccess: () => {
        setOpenCreate(false);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="space-y-2 bg-white p-6">
        <h1 className="text-primary font-inter-700 text-3xl">
          Quản lý bệnh tật
        </h1>
        <PageBreadcrumb items={["Bệnh tật"]} />
      </div>

      <FilterSection
        search={search}
        onSearchChange={setSearch}
        selectedSpecies={selectedSpecies}
        onSpeciesChange={setSelectedSpecies}
        dogCount={dogCount}
        catCount={catCount}
        totalCount={totalCount}
        onCreateClick={() => setOpenCreate(true)}
      />

      <ResultsSection
        diseases={pageData}
        isPending={isPending || isFetching}
        currentPage={page}
        pageSize={10}
        searchKeyword={search}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
        selectedSpecies={selectedSpecies}
      />

      <DiseaseModalCreate
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        submit={handleCreate}
        isSubmitting={isCreating}
      />
    </div>
  );
}
