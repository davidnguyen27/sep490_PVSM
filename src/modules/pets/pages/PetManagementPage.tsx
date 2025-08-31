// components
import {
  PageBreadcrumb,
  SearchLabel,
  Pagination,
  PageLoader,
  ButtonSpinner,
} from "@/components/shared";
import { PetTable, PetFilter } from "../components";
import { PetUpdatePage, PetCreatePage } from "./";

// hooks
import { useState, useEffect } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { usePets, usePetFilters } from "../hooks";
import { useSearchParams, useNavigate } from "react-router-dom";

// icons
import { PawPrint, Plus, RefreshCw } from "lucide-react";

export default function PetManagementPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [sttSortOrder, setSttSortOrder] = useState<"asc" | "desc" | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { filters, updateGender, updateSpecies, updateIsDeleted } =
    usePetFilters();

  // Pet data for list view - fetch with large pageSize to get most data
  const debouncedSearch = useDebounce(search, 500, { leading: true });
  const { data, isPending, refetch } = usePets({
    pageNumber: 1,
    pageSize: 1000, // Get a large amount of data
    keyWord: debouncedSearch,
    gender: filters.gender || undefined,
    species: filters.species || undefined,
  });

  const allPets = data?.data.pageData ?? [];

  // Sort by petId in descending order (newest first) and then apply filters
  const sortedAndFilteredData = allPets
    .sort((a, b) => b.petId - a.petId)
    .filter((pet) => {
      const matchGender = !filters.gender || pet.gender === filters.gender;
      const matchSpecies = !filters.species || pet.species === filters.species;
      const matchDeleted =
        filters.isDeleted === "" ||
        pet.isDeleted === (filters.isDeleted === "true");

      return matchGender && matchSpecies && matchDeleted;
    });

  // Add STT numbers to all data first
  const dataWithSTT = sortedAndFilteredData.map((pet, index) => ({
    ...pet,
    sttNumber: index + 1,
  }));

  // Apply STT sorting if order is set (sort all data, not just current page)
  let sortedDataWithSTT = dataWithSTT;
  if (sttSortOrder) {
    sortedDataWithSTT = dataWithSTT.sort((a, b) => {
      if (sttSortOrder === "asc") {
        return a.sttNumber - b.sttNumber;
      } else {
        return b.sttNumber - a.sttNumber;
      }
    });

    // Re-assign STT numbers after sorting to maintain sequential order
    sortedDataWithSTT = sortedDataWithSTT.map((pet, index) => ({
      ...pet,
      sttNumber: index + 1,
    }));
  }

  // Frontend pagination after sorting
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pageData = sortedDataWithSTT.slice(startIndex, endIndex);

  const frontendTotalPages = Math.ceil(sortedDataWithSTT.length / pageSize);

  // Reset page to 1 when search changes
  useEffect(() => {
    if (debouncedSearch !== search) {
      setPage(1);
    }
  }, [debouncedSearch, search]);

  // Set document title for Pet Management page
  useEffect(() => {
    document.title = "PVMS | Hồ sơ thú cưng";

    return () => {
      document.title = "PVMS | Hồ sơ thú cưng";
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

  const totalPages = frontendTotalPages;

  // Reset page when filters change
  const handleFiltersChange = (newFilters: {
    gender: string;
    species: string;
    isDeleted: string;
  }) => {
    updateGender(newFilters.gender);
    updateSpecies(newFilters.species);
    updateIsDeleted(newFilters.isDeleted);
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

  // Handle STT sorting
  const handleSttSort = () => {
    if (sttSortOrder === null || sttSortOrder === "desc") {
      setSttSortOrder("asc");
    } else {
      setSttSortOrder("desc");
    }
    setPage(1); // Always reset to first page when sorting to see the results
  };

  return (
    <PageLoader
      loading={isPending}
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

        <div className="flex flex-wrap items-end gap-4 p-4">
          <SearchLabel value={search} onChange={setSearch} />
          <PetFilter
            gender={filters.gender}
            species={filters.species}
            isDeleted={filters.isDeleted}
            onChange={handleFiltersChange}
          />
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              className="bg-primary hover:bg-secondary font-nunito flex items-center gap-1 rounded px-3 py-2 text-sm text-white"
              onClick={() => refetch()}
            >
              <RefreshCw size={16} />
              Làm mới
            </button>
            <button
              onClick={handleCreatePet}
              disabled={isCreating}
              className="font-nunito-600 bg-primary hover:bg-secondary flex items-center gap-1 rounded px-3 py-2 text-sm text-white"
            >
              {isCreating && <ButtonSpinner variant="white" size="sm" />}
              <Plus className="h-4 w-4" />
              {isCreating ? "Đang tạo..." : "Tạo hồ sơ thú cưng"}
            </button>
          </div>
        </div>

        <PetTable
          pets={pageData}
          isPending={isPending}
          pageSize={pageSize}
          sttSortOrder={sttSortOrder}
          onSttSort={handleSttSort}
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
