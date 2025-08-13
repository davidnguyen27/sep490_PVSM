// components
import {
  PageBreadcrumb,
  SearchLabel,
  Pagination,
  PageLoader,
  ButtonSpinner,
  InlineLoading,
} from "@/components/shared";
import { PetTable, PetFilter } from "../components";
import { Button } from "@/components/ui";
import { PetUpdatePage, PetCreatePage } from "./";

// hooks
import { useState, useEffect } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { usePets, usePetFilters } from "../hooks";
import { useSearchParams, useNavigate } from "react-router-dom";

// icons
import { PawPrint, RotateCcw, Plus } from "lucide-react";

export default function PetManagementPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    filters,
    updateGender,
    updateSpecies,
    resetFilters,
    hasActiveFilters,
  } = usePetFilters();

  // Pet data for list view - frontend sorting handles newest first
  const debouncedSearch = useDebounce(search, 500, { leading: true });
  const { data, isPending, isFetching } = usePets({
    pageNumber: page,
    pageSize: 10,
    keyWord: debouncedSearch,
    gender: filters.gender || undefined,
    species: filters.species || undefined,
  });

  // Set document title for Pet Management page
  useEffect(() => {
    document.title = "PVMS | Hồ sơ thú cưng";

    return () => {
      document.title = "PVMS | Dashboard";
    };
  }, []);

  // Check if we should show update or create page
  const action = searchParams.get("action");
  const isUpdateMode = action === "update";
  const isCreateMode = action === "create";

  // If in update mode, render PetUpdatePage
  if (isUpdateMode) {
    return <PetUpdatePage />;
  }

  // If in create mode, render PetCreatePage
  if (isCreateMode) {
    return <PetCreatePage />;
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

  const handleCreatePet = async () => {
    setIsCreating(true);
    try {
      navigate("?action=create");
    } finally {
      setTimeout(() => setIsCreating(false), 100);
    }
  };

  return (
    <PageLoader
      loading={isPending && !isFetching}
      loadingText="Đang tải danh sách thú cưng..."
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <PawPrint color="#00B8A9" />
          <h1 className="text-primary font-inter-700 text-2xl">
            Quản lý thú cưng
          </h1>
        </div>
        <PageBreadcrumb items={["Thú cưng"]} />

        <div className="bg-linen flex items-end justify-between p-4 shadow-md">
          <div className="flex items-end justify-between gap-4">
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

          {/* Search loading indicator */}
          {debouncedSearch && isFetching && (
            <InlineLoading text="Đang tìm kiếm..." variant="muted" size="sm" />
          )}

          <Button
            onClick={handleCreatePet}
            disabled={isCreating}
            className="font-nunito-600 bg-primary hover:bg-secondary text-white"
          >
            {isCreating && <ButtonSpinner variant="white" size="sm" />}
            <Plus className="mr-2 h-4 w-4" />
            {isCreating ? "Đang tạo..." : "Tạo hồ sơ thú cưng"}
          </Button>
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
    </PageLoader>
  );
}
