import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Stethoscope, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PageBreadcrumb } from "@/components/shared";
import { VaccineList } from "../components/VaccineList";
import { useDiseaseDetail } from "../hooks/useDiseaseDetail";
import { useVaccineDiseaseByDisease } from "@/modules/vaccine-disease/hooks/useVaccineDiseaseByDisease";
import { formatData } from "@/shared/utils/format.utils";

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

  if (isDiseaseLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!disease || action !== "detail") {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h2 className="font-nunito-600 mb-4 text-2xl text-gray-700">
            Không tìm thấy thông tin bệnh
          </h2>
          <Button onClick={handleBack} variant="outline">
            Quay lại danh sách
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Breadcrumb */}
      <PageBreadcrumb
        items={[
          { label: "Quản lý bệnh", path: "/admin/diseases" },
          { label: disease.name },
        ]}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
          <div>
            <h1 className="font-nunito-700 text-2xl text-gray-900">
              Chi tiết bệnh: {disease.name}
            </h1>
            <p className="font-nunito text-gray-600">
              Xem thông tin chi tiết và danh sách vaccine phòng bệnh
            </p>
          </div>
        </div>

        <Badge
          variant={disease.status === "Active" ? "default" : "destructive"}
          className="font-nunito"
        >
          {disease.status === "Active" ? "Hoạt động" : "Không hoạt động"}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Thông tin chi tiết bệnh */}
        <div className="space-y-6 lg:col-span-2">
          {/* Thông tin cơ bản */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Thông tin cơ bản
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="font-nunito-600 text-sm text-gray-700">
                  Tên bệnh
                </label>
                <p className="font-nunito mt-1 text-gray-900">{disease.name}</p>
              </div>

              <Separator />

              <div>
                <label className="font-nunito-600 text-sm text-gray-700">
                  Loài động vật
                </label>
                <div className="mt-1">
                  <Badge variant="outline" className="font-nunito">
                    {disease.species === "Dog" ? "Chó" : "Mèo"}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div>
                <label className="font-nunito-600 text-sm text-gray-700">
                  Mô tả
                </label>
                <p className="font-nunito mt-1 whitespace-pre-wrap text-gray-900">
                  {disease.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Triệu chứng */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Triệu chứng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-nunito whitespace-pre-wrap text-gray-900">
                {disease.symptoms}
              </p>
            </CardContent>
          </Card>

          {/* Phương pháp điều trị */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Phương pháp điều trị
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-nunito whitespace-pre-wrap text-gray-900">
                {disease.treatment}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Thông tin bổ sung */}
        <div className="space-y-6">
          {/* Thông tin tạo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin hệ thống</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="font-nunito-600 text-sm text-gray-700">
                  Ngày tạo
                </label>
                <p className="font-nunito text-sm text-gray-900">
                  {formatData.formatDateTime(disease.createdAt)}
                </p>
              </div>

              <div>
                <label className="font-nunito-600 text-sm text-gray-700">
                  Người tạo
                </label>
                <p className="font-nunito text-sm text-gray-900">
                  {disease.createdBy}
                </p>
              </div>

              {disease.modifiedAt && (
                <>
                  <Separator />
                  <div>
                    <label className="font-nunito-600 text-sm text-gray-700">
                      Cập nhật lần cuối
                    </label>
                    <p className="font-nunito text-sm text-gray-900">
                      {formatData.formatDateTime(disease.modifiedAt)}
                    </p>
                  </div>

                  <div>
                    <label className="font-nunito-600 text-sm text-gray-700">
                      Người cập nhật
                    </label>
                    <p className="font-nunito text-sm text-gray-900">
                      {disease.modifiedBy}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Danh sách vaccine */}
      <VaccineList
        vaccines={vaccines || []}
        isLoading={isVaccinesLoading}
        diseaseId={diseaseId ? parseInt(diseaseId) : null}
      />
    </div>
  );
}
