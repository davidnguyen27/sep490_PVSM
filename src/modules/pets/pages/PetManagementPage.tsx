// components
import { PageBreadcrumb, SearchLabel, Pagination } from "@/components/shared";
import { PetTable, PetFilter } from "../components";
import { Button } from "@/components/ui";
import PetUpdatePage from "./PetUpdatePage";

// hooks
import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { usePets, usePetFilters } from "../hooks";
import { useSearchParams } from "react-router-dom";

// icons
import { PawPrint, RotateCcw } from "lucide-react";

export default function PetManagementPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();

  const {
    filters,
    updateGender,
    updateSpecies,
    resetFilters,
    hasActiveFilters,
  } = usePetFilters();

  // Pet data for list view
  const debouncedSearch = useDebounce(search, 500, { leading: true });
  const { data, isPending, isFetching } = usePets({
    pageNumber: page,
    pageSize: 10,
    keyWord: debouncedSearch,
    gender: filters.gender || undefined,
    species: filters.species || undefined,
  });

  // Check if we should show update page
  const action = searchParams.get("action");
  const isUpdateMode = action === "update";

  // If in update mode, render PetUpdatePage
  if (isUpdateMode) {
    return <PetUpdatePage />;
  }

  const pageData = data?.data.pageData ?? [];
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  // Reset page when filters change
  const handleGenderChange = (newGender: string) => {
    updateGender(newGender);
    setPage(1);
  };

  const handleSpeciesChange = (newSpecies: string) => {
    updateSpecies(newSpecies);
    setPage(1);
  };

  const handleResetFilters = () => {
    resetFilters();
    setPage(1);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center space-x-2">
        <PawPrint color="#00B8A9" />
        <h1 className="text-primary font-inter-700 text-2xl">
          Quản lý thú cưng
        </h1>
      </div>
      <PageBreadcrumb items={["Thú cưng"]} />

      <div className="bg-linen flex flex-wrap items-end gap-4 space-x-3 p-4 shadow-md">
        <SearchLabel value={search} onChange={setSearch} />
        <PetFilter
          gender={filters.gender}
          species={filters.species}
          onGenderChange={handleGenderChange}
          onSpeciesChange={handleSpeciesChange}
        />
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetFilters}
            className="font-nunito-500"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Xóa bộ lọc
          </Button>
        )}
      </div>

      <PetTable
        pets={pageData}
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
