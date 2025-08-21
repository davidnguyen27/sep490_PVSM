import { useState } from "react";
import { useSearchParams } from "react-router-dom";

// components
import PageBreadcrumb from "@/components/shared/PageBreadcrumb";
import Pagination from "@/components/shared/Pagination";
import { EnhancedVaccineScheduleFilter } from "../components/EnhancedVaccineScheduleFilter";
import { StatsCard } from "../components/StatsCard";
import { EnhancedDiseaseCard } from "../components/EnhancedDiseaseCard";
import { BulkOperations } from "../components/BulkOperations";
import {
  MasterDetailLayout,
  AdvancedAnalytics,
  ViewModeSwitcher,
  EnhancedTableView,
  type ViewMode,
} from "../components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// hooks
import { useVaccineSchedules } from "../hooks/useVaccineSchedules";
import type { VaccineSchedule } from "../types/vaccine-schedule.type";
import {
  Cat,
  Dog,
  Activity,
  Calendar,
  AlertCircle,
  Calendar1,
} from "lucide-react";

// constants
const PAGE_SIZE = 10;

export default function VaccineScheduleListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab state
  const [activeTab, setActiveTab] = useState(
    searchParams.get("species") || "dog",
  );

  // Filter states
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "all");

  // Bulk operations state
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // View mode state for Phase 2
  const [viewMode, setViewMode] = useState<ViewMode>("cards");

  // Pagination state
  const currentPage = Number(searchParams.get("page")) || 1;

  // API params for current tab
  const speciesKeyword = activeTab === "dog" ? "Dog" : "Cat";
  const combinedKeyword = keyword
    ? `${keyword} ${speciesKeyword}`
    : speciesKeyword;

  const apiParams = {
    pageNumber: currentPage,
    pageSize: PAGE_SIZE,
    keyWord: combinedKeyword,
    status: status === "all" ? undefined : status === "true",
  };

  const { data, isPending, error } = useVaccineSchedules(apiParams);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams);
    params.set("species", tab);
    params.set("page", "1");
    setSearchParams(params);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    params.set("species", activeTab);
    if (status !== "all") params.set("status", status);
    params.set("page", "1");
    setSearchParams(params);
  };

  const handleReset = () => {
    setKeyword("");
    setStatus("all");
    const params = new URLSearchParams();
    params.set("species", activeTab);
    params.set("page", "1");
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
  };

  const handleCreateSuccess = () => {
    console.log("Create success - handling UI update");
    // The useVaccineScheduleCreate hook already invalidates the query
    // So we just need to reset to page 1 to see the new item
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    setSearchParams(params);
  };

  // Bulk operations handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = schedules
        .map((s: VaccineSchedule) => s.vaccinationScheduleId?.toString())
        .filter((id): id is string => id !== undefined);
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  };

  const handleBulkEdit = () => {
    console.log("Bulk edit:", selectedItems);
    // TODO: Implement bulk edit functionality
  };

  const handleBulkDelete = () => {
    console.log("Bulk delete:", selectedItems);
    // TODO: Implement bulk delete functionality
  };

  const handleBulkExport = () => {
    console.log("Bulk export:", selectedItems);
    // TODO: Implement bulk export functionality
  };

  const handleBulkDuplicate = () => {
    console.log("Bulk duplicate:", selectedItems);
    // TODO: Implement bulk duplicate functionality
  };

  const handleBulkActivate = () => {
    console.log("Bulk activate:", selectedItems);
    // TODO: Implement bulk activate functionality
  };

  const handleBulkDeactivate = () => {
    console.log("Bulk deactivate:", selectedItems);
    // TODO: Implement bulk deactivate functionality
  };

  const schedules = data?.data?.pageData || [];
  const totalItems = data?.data?.pageInfo?.totalItem || 0;
  const totalPages = data?.data?.pageInfo?.totalPage || 0;

  // Group schedules by disease - one card per disease
  const groupedSchedules = schedules.reduce(
    (
      acc: Record<
        string,
        { disease: VaccineSchedule["disease"]; schedules: VaccineSchedule[] }
      >,
      schedule: VaccineSchedule,
    ) => {
      // Use disease ID as the unique key to ensure one card per disease
      const diseaseId = schedule.disease.diseaseId?.toString() || "unknown";
      if (!acc[diseaseId]) {
        acc[diseaseId] = {
          disease: schedule.disease,
          schedules: [],
        };
      }
      acc[diseaseId].schedules.push(schedule);
      return acc;
    },
    {} as Record<
      string,
      { disease: VaccineSchedule["disease"]; schedules: VaccineSchedule[] }
    >,
  );

  // Sort schedules within each disease group by dose number
  Object.values(groupedSchedules).forEach((group) => {
    group.schedules.sort((a, b) => a.doseNumber - b.doseNumber);
  });

  // Debug logging
  console.log("Grouped schedules:", groupedSchedules);
  console.log("Total diseases in cards:", Object.keys(groupedSchedules).length);

  // Calculate dashboard stats
  const totalDiseases = Object.keys(groupedSchedules).length;
  const activeSchedules = schedules.length; // All displayed schedules are active
  const totalDoses = schedules.reduce((acc, s) => acc + s.doseNumber, 0);

  const breadcrumbItems = ["Lịch tiêm chủng"];

  if (error) {
    return (
      <div className="mx-auto p-6">
        <PageBreadcrumb items={breadcrumbItems} />
        <div className="mt-6 text-center">
          <p className="font-nunito text-red-500">
            Có lỗi xảy ra khi tải dữ liệu: {error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <div className="mt-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar1 color="#00B8A9" />
            <h1 className="font-inter-700 text-primary text-xl">
              Quản lý lịch tiêm chủng
            </h1>
          </div>

          <PageBreadcrumb items={breadcrumbItems} />
        </div>

        {/* Overview Dashboard */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatsCard
            title="Tổng số bệnh"
            value={totalDiseases}
            icon={<Activity className="h-5 w-5" />}
            description={`Được quản lý cho ${activeTab === "dog" ? "chó" : "mèo"}`}
            color="primary"
          />
          <StatsCard
            title="Lịch tiêm hiện có"
            value={activeSchedules}
            icon={<Calendar className="h-5 w-5" />}
            description="Đang được áp dụng"
            color="info"
          />
          <StatsCard
            title="Tổng liều tiêm"
            value={totalDoses}
            icon={<AlertCircle className="h-5 w-5" />}
            description="Trên tất cả bệnh"
            color="warning"
          />
        </div>

        {/* Modern Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="bg-linen border-primary/20 grid w-full grid-cols-2 rounded-none border">
            <TabsTrigger
              value="dog"
              className="font-nunito-700 data-[state=active]:bg-info text-dark gap-1 rounded-none transition-all duration-300 data-[state=active]:text-white"
            >
              <Dog size={18} /> Lịch tiêm cho chó
            </TabsTrigger>
            <TabsTrigger
              value="cat"
              className="font-nunito-700 data-[state=active]:bg-warning data-[state=active]:text-dark text-dark gap-1 rounded-none transition-all duration-300"
            >
              <Cat size={18} /> Lịch tiêm cho mèo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dog" className="mt-6 space-y-6">
            <Card className="from-linen rounded-none bg-gradient-to-r to-white shadow-lg">
              <CardHeader className="from-info to-secondary bg-gradient-to-r text-white">
                <CardTitle className="font-inter-700 flex items-center gap-2 py-1.5 text-xl">
                  <Dog size={20} /> Lịch tiêm phòng cho chó
                  <Badge
                    variant="outline"
                    className="font-nunito-600 border-white/50 bg-white/20 text-white"
                  >
                    {totalItems} lịch tiêm
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Enhanced Filter */}
                <EnhancedVaccineScheduleFilter
                  keyword={keyword}
                  species={activeTab}
                  status={status}
                  onKeywordChange={setKeyword}
                  onSpeciesChange={() => {}} // No species change in tab view
                  onStatusChange={setStatus}
                  onSearch={handleSearch}
                  onReset={handleReset}
                  hideSpecies={true}
                  totalResults={totalItems}
                  onCreateSuccess={handleCreateSuccess}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cat" className="mt-6 space-y-6">
            <Card className="border-warning/30 from-linen bg-gradient-to-r to-white shadow-lg">
              <CardHeader className="from-warning text-dark bg-gradient-to-r to-yellow-500">
                <CardTitle className="font-inter-700 flex items-center gap-2 text-xl">
                  <Cat /> Lịch tiêm phòng cho mèo
                  <Badge
                    variant="outline"
                    className="border-dark/30 bg-dark/10 text-dark font-nunito-600"
                  >
                    {totalItems} lịch tiêm
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Enhanced Filter */}
                <EnhancedVaccineScheduleFilter
                  keyword={keyword}
                  species={activeTab}
                  status={status}
                  onKeywordChange={setKeyword}
                  onSpeciesChange={() => {}} // No species change in tab view
                  onStatusChange={setStatus}
                  onSearch={handleSearch}
                  onReset={handleReset}
                  hideSpecies={true}
                  totalResults={totalItems}
                  onCreateSuccess={handleCreateSuccess}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* View Mode Switcher */}
        <ViewModeSwitcher
          currentMode={viewMode}
          onModeChange={setViewMode}
          totalItems={totalItems}
          selectedItems={selectedItems.length}
        />

        {/* Results Summary & Bulk Operations */}
        {viewMode !== "analytics" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-dark font-nunito-600 text-sm">
                {isPending
                  ? "Đang tải..."
                  : `Hiển thị ${schedules.length} trong tổng số ${totalItems} lịch tiêm`}
              </p>
            </div>

            {/* Bulk Operations */}
            <BulkOperations
              selectedItems={selectedItems}
              totalItems={schedules.length}
              onSelectAll={handleSelectAll}
              onBulkEdit={handleBulkEdit}
              onBulkDelete={handleBulkDelete}
              onBulkExport={handleBulkExport}
              onBulkDuplicate={handleBulkDuplicate}
              onBulkActivate={handleBulkActivate}
              onBulkDeactivate={handleBulkDeactivate}
            />
          </div>
        )}

        {/* Content based on view mode */}
        {!isPending && schedules.length > 0 ? (
          <>
            {viewMode === "cards" && (
              <div className="space-y-6">
                {Object.entries(groupedSchedules)
                  .sort(([, a], [, b]) =>
                    a.disease.name.localeCompare(b.disease.name),
                  )
                  .map(([diseaseId, group], index) => (
                    <EnhancedDiseaseCard
                      key={diseaseId}
                      diseaseName={group.disease.name}
                      disease={group.disease}
                      schedules={group.schedules}
                      activeTab={activeTab as "dog" | "cat"}
                      currentPage={currentPage}
                      pageSize={PAGE_SIZE}
                      defaultExpanded={index < 2}
                    />
                  ))}
              </div>
            )}

            {viewMode === "table" && (
              <EnhancedTableView
                schedules={schedules}
                activeTab={activeTab as "dog" | "cat"}
                selectedItems={selectedItems}
                onSelectionChange={setSelectedItems}
              />
            )}

            {viewMode === "master-detail" && (
              <MasterDetailLayout
                groupedSchedules={groupedSchedules}
                activeTab={activeTab as "dog" | "cat"}
                currentPage={currentPage}
                pageSize={PAGE_SIZE}
              />
            )}

            {viewMode === "analytics" && (
              <AdvancedAnalytics
                schedules={schedules}
                groupedSchedules={groupedSchedules}
                activeTab={activeTab as "dog" | "cat"}
              />
            )}
          </>
        ) : !isPending ? (
          <Card className="bg-linen border-primary/20 border py-12 text-center">
            <CardContent>
              <div className="mb-4 text-6xl">
                {activeTab === "dog" ? <Dog size={18} /> : <Cat size={18} />}
              </div>
              <h3 className="font-inter-700 text-dark mb-2 text-xl">
                Chưa có lịch tiêm nào
              </h3>
              <p className="font-nunito-500 text-dark/70">
                Hiện tại chưa có lịch tiêm phòng nào cho{" "}
                {activeTab === "dog" ? "chó" : "mèo"}
              </p>
            </CardContent>
          </Card>
        ) : null}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
