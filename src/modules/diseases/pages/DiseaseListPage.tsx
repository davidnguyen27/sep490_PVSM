// components
import {
  PageBreadcrumb,
  SearchLabel,
  Pagination,
  PageLoader,
  ButtonSpinner,
} from "@/components/shared";
import { DiseaseTable } from "../components";
import { DiseaseModalCreate } from "../components";

// hooks
import { useEffect, useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useDiseasesWithFilter } from "../hooks/useDiseasesWithFilter";
import { useCreateDisease } from "../hooks/useCreateDisease";
import { useDiseaseStats } from "../hooks/useDiseaseStats";

// icons
import { Activity, Plus, RefreshCw, Filter } from "lucide-react";

// types
import type { DiseasePayload } from "../types/disease.payload.type";

export default function DiseaseListPage() {
  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedSpecies, setSelectedSpecies] = useState<"All" | "Dog" | "Cat">(
    "All",
  );
  const [isCreatingButton, setIsCreatingButton] = useState(false);
  const [sttSortOrder, setSttSortOrder] = useState<"asc" | "desc" | null>(null);

  const debouncedSearch = useDebounce(search, 500, { leading: true });

  // Reset page to 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedSpecies]);

  // Set document title
  useEffect(() => {
    document.title = "PVMS | Quản lý bệnh tật";

    return () => {
      document.title = "PVMS | Quản lý bệnh tật";
    };
  }, []);

  const { mutate: createDisease, isPending: isCreating } = useCreateDisease();

  // Fetch diseases with large pageSize for frontend processing
  const { data, isPending, isFetching, refetch } = useDiseasesWithFilter({
    pageNumber: 1,
    pageSize: 1000, // Get a large amount of data
    keyWord: debouncedSearch,
    species: "All", // Always fetch all species for frontend filtering
  });

  const { data: statsData } = useDiseaseStats();

  const allDiseases = data?.data.pageData ?? [];

  // Apply species filter on frontend
  const filteredData = allDiseases.filter((disease) => {
    if (selectedSpecies === "All") return true;
    return disease.species === selectedSpecies;
  });

  // Add STT numbers to all data first
  const dataWithSTT = filteredData.map((disease, index) => ({
    ...disease,
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
    sortedDataWithSTT = sortedDataWithSTT.map((disease, index) => ({
      ...disease,
      sttNumber: index + 1,
    }));
  }

  // Frontend pagination after sorting
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pageData = sortedDataWithSTT.slice(startIndex, endIndex);

  const frontendTotalPages = Math.ceil(sortedDataWithSTT.length / pageSize);
  const totalPages = frontendTotalPages;

  // Sử dụng thống kê từ API
  const dogCount = statsData?.dogCount ?? 0;
  const catCount = statsData?.catCount ?? 0;
  const totalCount = statsData?.totalCount ?? 0;

  const handleCreate = (payload: DiseasePayload) => {
    createDisease(payload, {
      onSuccess: () => {
        setOpenCreate(false);
        // Refetch data after successful creation
        refetch();
      },
    });
  };

  const handleCreateClick = async () => {
    setIsCreatingButton(true);
    try {
      setOpenCreate(true);
    } finally {
      setTimeout(() => setIsCreatingButton(false), 100);
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
      loadingText="Đang tải danh sách bệnh tật..."
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Activity color="#00B8A9" />
          <h1 className="text-primary font-inter-700 text-2xl">
            Quản lý bệnh tật
          </h1>
        </div>
        <PageBreadcrumb items={["Bệnh tật"]} />

        <div className="flex flex-wrap items-end gap-4 p-4">
          <SearchLabel value={search} onChange={setSearch} />

          {/* Species Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-nunito-600 flex items-center gap-2 text-sm text-gray-700">
              <Filter className="text-primary h-4 w-4" />
              Loài:
            </span>
            <button
              onClick={() => setSelectedSpecies("All")}
              className={`font-nunito-500 rounded-lg px-3 py-2 text-sm transition-all ${
                selectedSpecies === "All"
                  ? "bg-primary text-white"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Tất cả ({totalCount})
            </button>
            <button
              onClick={() => setSelectedSpecies("Dog")}
              className={`font-nunito-500 rounded-lg px-3 py-2 text-sm transition-all ${
                selectedSpecies === "Dog"
                  ? "bg-primary text-white"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Chó ({dogCount})
            </button>
            <button
              onClick={() => setSelectedSpecies("Cat")}
              className={`font-nunito-500 rounded-lg px-3 py-2 text-sm transition-all ${
                selectedSpecies === "Cat"
                  ? "bg-primary text-white"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Mèo ({catCount})
            </button>
          </div>

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
              onClick={handleCreateClick}
              disabled={isCreatingButton}
              className="font-nunito-600 bg-primary hover:bg-secondary flex items-center gap-1 rounded px-3 py-2 text-sm text-white"
            >
              {isCreatingButton && <ButtonSpinner variant="white" size="sm" />}
              <Plus className="h-4 w-4" />
              {isCreatingButton ? "Đang tạo..." : "Thêm bệnh mới"}
            </button>
          </div>
        </div>

        <DiseaseTable
          diseases={pageData}
          isPending={isPending || isFetching}
          pageSize={pageSize}
          searchKeyword={search}
          sttSortOrder={sttSortOrder}
          onSttSort={handleSttSort}
          onRefetch={refetch}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>

      <DiseaseModalCreate
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        submit={handleCreate}
        isSubmitting={isCreating}
      />
    </PageLoader>
  );
}
