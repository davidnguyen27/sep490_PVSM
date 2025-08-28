import { useState } from "react";
import { NewVaccineScheduleModal } from "../components/NewVaccineScheduleModal";
import { EditVaccineScheduleModal } from "../components/EditVaccineScheduleModal";
import { DeleteVaccineScheduleModal } from "../components/DeleteVaccineScheduleModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dog, Cat, Activity, CalendarRange } from "lucide-react";
import { PageBreadcrumb } from "@/components/shared";
import { DiseaseSelector } from "../components/DiseaseSelector";
import { VaccineScheduleDisplay } from "../components/VaccineScheduleDisplay";
import { useVaccineScheduleByDisease } from "../hooks/useVaccineScheduleByDisease";
import { useVaccineScheduleDel } from "../hooks/useVaccineScheduleDel";
import type { VaccineSchedule } from "../types/vaccine-schedule.type";

type Species = "dog" | "cat";

export default function VaccineScheduleByDiseasePage() {
  const [selectedSpecies, setSelectedSpecies] = useState<Species>("dog");
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<number | null>(
    null,
  );
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editSchedule, setEditSchedule] = useState<VaccineSchedule | null>(
    null,
  );
  const [deleteSchedule, setDeleteSchedule] = useState<VaccineSchedule | null>(
    null,
  );

  const deleteMutation = useVaccineScheduleDel();

  const {
    data: scheduleData,
    isPending: isLoadingSchedules,
    error,
  } = useVaccineScheduleByDisease(selectedDiseaseId);

  const selectedDiseaseData = scheduleData?.data;
  const schedules = selectedDiseaseData?.schedules || [];
  const selectedDisease = selectedDiseaseData
    ? {
        diseaseId: selectedDiseaseData.diseaseId,
        name: selectedDiseaseData.diseaseName,
      }
    : null;

  const handleSpeciesChange = (species: Species) => {
    setSelectedSpecies(species);
    setSelectedDiseaseId(null); // Reset disease selection when species changes
  };

  const handleEditSchedule = (schedule: VaccineSchedule) => {
    setEditSchedule(schedule);
  };

  const handleDeleteSchedule = (schedule: VaccineSchedule) => {
    setDeleteSchedule(schedule);
  };

  const handleConfirmDelete = () => {
    if (deleteSchedule?.vaccinationScheduleId) {
      deleteMutation.mutate(deleteSchedule.vaccinationScheduleId, {
        onSuccess: () => {
          setDeleteSchedule(null);
        },
      });
    }
  };

  const handleViewSchedule = (schedule: VaccineSchedule) => {
    // TODO: Implement view functionality
    console.log("View schedule:", schedule);
  };

  const handleCreateNew = () => {
    setOpenCreateModal(true);
  };

  const breadcrumbItems = ["Lịch tiêm chủng"];

  if (error) {
    return (
      <div className="mx-auto p-6">
        <PageBreadcrumb items={breadcrumbItems} />
        <div className="mt-6 text-center">
          <p className="font-nunito text-danger">
            Có lỗi xảy ra khi tải dữ liệu: {error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-6">
      <NewVaccineScheduleModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        diseaseId={selectedDiseaseId}
        species={selectedSpecies}
      />
      <EditVaccineScheduleModal
        open={!!editSchedule}
        onClose={() => setEditSchedule(null)}
        schedule={editSchedule}
      />
      <DeleteVaccineScheduleModal
        isOpen={!!deleteSchedule}
        onClose={() => setDeleteSchedule(null)}
        onConfirm={handleConfirmDelete}
        schedule={deleteSchedule}
        isLoading={deleteMutation.isPending}
      />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarRange className="text-primary h-6 w-6" />
          <h1 className="font-inter-700 text-primary text-2xl">
            Quản lý lịch tiêm vắc-xin
          </h1>
        </div>
      </div>
      <PageBreadcrumb items={breadcrumbItems} />

      {/* Species Tabs */}
      <Tabs
        value={selectedSpecies}
        onValueChange={(value) => handleSpeciesChange(value as Species)}
      >
        <TabsList className="grid w-full grid-cols-2 bg-gray-200">
          <TabsTrigger
            value="dog"
            className="data-[state=active]:bg-info flex items-center gap-2 data-[state=active]:text-white"
          >
            <Dog size={18} />
            Lịch tiêm cho chó
          </TabsTrigger>
          <TabsTrigger
            value="cat"
            className="data-[state=active]:bg-warning flex items-center gap-2 data-[state=active]:text-white"
          >
            <Cat size={18} />
            Lịch tiêm cho mèo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dog" className="space-y-6">
          <Card className="bg-linen rounded-none">
            <CardHeader className="bg-info flex items-center py-2 text-white">
              <CardTitle className="font-nunito flex w-full items-center justify-center gap-2">
                <Dog size={20} />
                Quản lý lịch tiêm phòng cho chó
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Disease Selector */}
                <div className="lg:col-span-1">
                  <DiseaseSelector
                    selectedDiseaseId={selectedDiseaseId}
                    onDiseaseChange={setSelectedDiseaseId}
                    species="Dog"
                  />
                </div>

                {/* Schedule Display */}
                <div className="lg:col-span-2">
                  {selectedDiseaseId ? (
                    <VaccineScheduleDisplay
                      schedules={schedules}
                      diseaseName={selectedDisease?.name || "Không xác định"}
                      isLoading={isLoadingSchedules}
                      onEdit={handleEditSchedule}
                      onDelete={handleDeleteSchedule}
                      onView={handleViewSchedule}
                      onCreateNew={handleCreateNew}
                    />
                  ) : (
                    <Card className="h-full rounded-none">
                      <CardContent className="flex items-center justify-center p-12">
                        <div className="space-y-4 text-center">
                          <Activity className="mx-auto h-12 w-12 text-gray-300" />
                          <div>
                            <h3 className="font-nunito-500 text-dark mb-1">
                              Chọn bệnh để xem lịch tiêm
                            </h3>
                            <p className="text-sm text-gray-400">
                              Vui lòng chọn một bệnh từ danh sách bên trái để
                              xem lịch tiêm tương ứng
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cat" className="space-y-6">
          <Card className="bg-linen rounded-none">
            <CardHeader className="bg-warning flex items-center py-2 text-white">
              <CardTitle className="font-nunito flex w-full items-center justify-center gap-2">
                <Cat size={20} />
                Quản lý lịch tiêm phòng cho mèo
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Disease Selector */}
                <div className="lg:col-span-1">
                  <DiseaseSelector
                    selectedDiseaseId={selectedDiseaseId}
                    onDiseaseChange={setSelectedDiseaseId}
                    species="Cat"
                  />
                </div>

                {/* Schedule Display */}
                <div className="lg:col-span-2">
                  {selectedDiseaseId ? (
                    <VaccineScheduleDisplay
                      schedules={schedules}
                      diseaseName={selectedDisease?.name || "Không xác định"}
                      isLoading={isLoadingSchedules}
                      onEdit={handleEditSchedule}
                      onDelete={handleDeleteSchedule}
                      onView={handleViewSchedule}
                      onCreateNew={handleCreateNew}
                    />
                  ) : (
                    <Card className="h-full rounded-none">
                      <CardContent className="flex items-center justify-center p-12">
                        <div className="space-y-4 text-center">
                          <Activity className="mx-auto h-12 w-12 text-gray-300" />
                          <div>
                            <h3 className="font-nunito-500 text-dark mb-1">
                              Chọn bệnh để xem lịch tiêm
                            </h3>
                            <p className="text-sm text-gray-400">
                              Vui lòng chọn một bệnh từ danh sách bên trái để
                              xem lịch tiêm tương ứng
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
