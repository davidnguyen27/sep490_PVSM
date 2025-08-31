import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Stethoscope,
  Info,
  Calendar,
  User,
  Edit,
  Shield,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PageBreadcrumb, PageLoader } from "@/components/shared";
import { VaccineList } from "../components/VaccineList";
import { VaccineScheduleSection } from "../components/VaccineScheduleSection";
import { useDiseaseDetail } from "../hooks/useDiseaseDetail";
import { useVaccineDiseaseByDisease } from "@/modules/vaccine-disease/hooks/useVaccineDiseaseByDisease";
import { formatData } from "@/shared/utils/format.utils";
import type { Disease } from "../types/disease.type";

// Types for better type safety
interface SpeciesConfig {
  color: string;
  emoji: string;
  label: string;
}

// Constants for better maintainability
const SPECIES_CONFIG: Record<string, SpeciesConfig> = {
  Dog: { color: "bg-amber-500", emoji: "🐕", label: "Chó" },
  Cat: { color: "bg-pink-500", emoji: "🐱", label: "Mèo" },
  Both: { color: "bg-purple-500", emoji: "🐕🐱", label: "Cả hai" },
} as const;

//  Helper functions for better code organization
const getSpeciesConfig = (species: string): SpeciesConfig => {
  return SPECIES_CONFIG[species] || SPECIES_CONFIG.Both;
};

const renderSpeciesBadge = (species: string) => {
  const config = getSpeciesConfig(species);
  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 w-3 rounded-full ${config.color}`} />
      <Badge variant="outline" className="font-nunito">
        {config.emoji} {config.label}
      </Badge>
    </div>
  );
};

const renderEmptyState = (handleBack: () => void) => (
  <div className="space-y-6">
    <div className="flex items-center space-x-2">
      <Activity color="#00B8A9" />
      <h1 className="text-primary font-inter-700 text-2xl">
        Không tìm thấy thông tin bệnh
      </h1>
    </div>
    <PageBreadcrumb items={["Bệnh tật", "Chi tiết"]} />

    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 py-12">
      <Activity className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="font-nunito-600 mt-4 text-lg text-gray-900">
        Không tìm thấy thông tin bệnh
      </h3>
      <p className="font-nunito mt-2 text-gray-500">
        Bệnh không tồn tại hoặc đã bị xóa khỏi hệ thống.
      </p>
      <Button onClick={handleBack} variant="outline" className="mt-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Quay lại danh sách
      </Button>
    </div>
  </div>
);

const renderActionBar = (
  disease: Disease,
  handleBack: () => void,
  handleEdit: () => void,
) => (
  <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-white p-4 shadow-sm">
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        onClick={handleBack}
        className="font-nunito flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại danh sách
      </Button>

      <div className="hidden h-6 border-l border-gray-300 sm:block" />

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500" />
          <span className="font-nunito-600 text-lg text-gray-900">
            {disease.name}
          </span>
        </div>
        <Badge
          variant={disease.status === "Active" ? "default" : "destructive"}
          className="font-nunito"
        >
          {disease.status === "Active" ? "Hoạt động" : "Không hoạt động"}
        </Badge>
      </div>
    </div>

    <div className="flex items-center gap-2">
      <Button
        onClick={handleEdit}
        className="font-nunito-600 bg-primary hover:bg-secondary flex items-center gap-2"
      >
        <Edit className="h-4 w-4" />
        Chỉnh sửa
      </Button>
    </div>
  </div>
);

export default function DiseaseDetailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const diseaseId = searchParams.get("diseaseId");
  const action = searchParams.get("action");

  const { data: disease, isLoading: isDiseaseLoading } = useDiseaseDetail(
    diseaseId ? parseInt(diseaseId) : null,
  );

  const { data: vaccines, isLoading: isVaccinesLoading } =
    useVaccineDiseaseByDisease(diseaseId ? parseInt(diseaseId) : null);

  const handleBack = () => {
    navigate("/admin/diseases");
  };

  const handleEdit = () => {
    // Navigate to edit mode - will be implemented later
    console.log("Edit disease:", diseaseId);
  };

  // Set document title
  React.useEffect(() => {
    if (disease) {
      document.title = `PVMS | Chi tiết bệnh - ${disease.name}`;
    }
    return () => {
      document.title = "PVMS | Quản lý bệnh tật";
    };
  }, [disease]);

  if (isDiseaseLoading) {
    return (
      <PageLoader
        loading={true}
        loadingText="Đang tải thông tin chi tiết bệnh..."
      >
        <div />
      </PageLoader>
    );
  }

  if (!disease || action !== "detail") {
    return renderEmptyState(handleBack);
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Activity color="#00B8A9" />
          <h1 className="text-primary font-inter-700 text-2xl">
            Chi tiết bệnh tật
          </h1>
        </div>
        <PageBreadcrumb
          items={[
            { label: "Bệnh tật", path: "/admin/diseases" },
            { label: disease.name },
          ]}
        />
      </div>

      {/* Action Bar */}
      {renderActionBar(disease, handleBack, handleEdit)}

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column - Main Information */}
        <div className="space-y-6 lg:col-span-8">
          {/* Overview Card */}
          <Card className="border-l-4 border-l-blue-500 py-4">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="rounded-lg bg-blue-100 p-2">
                  <Info className="h-5 w-5 text-blue-600" />
                </div>
                Thông tin tổng quan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="font-nunito-600 text-sm tracking-wide text-gray-600 uppercase">
                    Tên bệnh
                  </label>
                  <p className="font-nunito-600 text-lg text-gray-900">
                    {disease.name}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="font-nunito-600 text-sm tracking-wide text-gray-600 uppercase">
                    Loài động vật
                  </label>
                  {renderSpeciesBadge(disease.species)}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-nunito-600 text-sm tracking-wide text-gray-600 uppercase">
                  Mô tả bệnh
                </label>
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="font-nunito leading-relaxed whitespace-pre-wrap text-gray-900">
                    {disease.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Symptoms Card */}
          <Card className="border-l-4 border-l-red-500 py-4">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="rounded-lg bg-red-100 p-2">
                  <Stethoscope className="h-5 w-5 text-red-600" />
                </div>
                Triệu chứng lâm sàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="font-nunito leading-relaxed whitespace-pre-wrap text-gray-900">
                  {disease.symptoms}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Treatment Card */}
          <Card className="border-l-4 border-l-green-500 py-4">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="rounded-lg bg-green-100 p-2">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                Phương pháp điều trị
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="font-nunito leading-relaxed whitespace-pre-wrap text-gray-900">
                  {disease.treatment}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Metadata & Actions */}
        <div className="space-y-6 lg:col-span-4">
          {/* System Information */}
          <Card className="border-l-4 border-l-purple-500 py-6">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-2">
                  <Shield className="h-4 w-4 text-purple-600" />
                </div>
                Thông tin hệ thống
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                  <Calendar className="h-4 w-4 flex-shrink-0 text-gray-500" />
                  <div className="min-w-0 flex-1">
                    <p className="font-nunito-600 text-sm text-gray-600">
                      Ngày tạo
                    </p>
                    <p className="font-nunito truncate text-sm text-gray-900">
                      {formatData.formatDateTime(disease.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                  <User className="h-4 w-4 flex-shrink-0 text-gray-500" />
                  <div className="min-w-0 flex-1">
                    <p className="font-nunito-600 text-sm text-gray-600">
                      Người tạo
                    </p>
                    <p className="font-nunito truncate text-sm text-gray-900">
                      {disease.createdBy}
                    </p>
                  </div>
                </div>

                {disease.modifiedAt && (
                  <>
                    <Separator />
                    <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3">
                      <Calendar className="h-4 w-4 flex-shrink-0 text-blue-500" />
                      <div className="min-w-0 flex-1">
                        <p className="font-nunito-600 text-sm text-blue-600">
                          Cập nhật cuối
                        </p>
                        <p className="font-nunito truncate text-sm text-gray-900">
                          {formatData.formatDateTime(disease.modifiedAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3">
                      <User className="h-4 w-4 flex-shrink-0 text-blue-500" />
                      <div className="min-w-0 flex-1">
                        <p className="font-nunito-600 text-sm text-blue-600">
                          Người cập nhật
                        </p>
                        <p className="font-nunito truncate text-sm text-gray-900">
                          {disease.modifiedBy}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-l-4 border-l-indigo-500 py-6">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3">
                <div className="rounded-lg bg-indigo-100 p-2">
                  <Activity className="h-4 w-4 text-indigo-600" />
                </div>
                Thống kê nhanh
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                <div className="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 text-center">
                  <div className="font-nunito-700 text-2xl text-blue-600">
                    {vaccines?.length || 0}
                  </div>
                  <div className="font-nunito-600 text-sm text-blue-600">
                    Vaccine liên quan
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Vaccine List Section */}
      <VaccineList
        vaccines={vaccines || []}
        isLoading={isVaccinesLoading}
        diseaseId={diseaseId ? parseInt(diseaseId) : null}
      />

      {/* Vaccine Schedule Section */}
      <VaccineScheduleSection
        diseaseId={diseaseId ? parseInt(diseaseId) : null}
        diseaseName={disease.name}
        diseaseSpecies={disease.species}
      />
    </div>
  );
}
