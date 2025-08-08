import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/shared";
import { useVaccineDiseaseDetail } from "../hooks";
import { formatSpecies, getSpeciesVariant } from "../utils";
import { Calendar, User, Stethoscope, Syringe, Info } from "lucide-react";

interface VaccineDiseaseModalDetailProps {
  open: boolean;
  onClose: () => void;
  vaccineDiseaseId: number | null;
}

export function VaccineDiseaseModalDetail({
  open,
  onClose,
  vaccineDiseaseId,
}: VaccineDiseaseModalDetailProps) {
  const {
    data: vaccineDisease,
    isPending,
    error,
  } = useVaccineDiseaseDetail(vaccineDiseaseId);

  if (error) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-nunito-700 flex items-center gap-2 text-xl text-gray-900">
              <Info className="h-5 w-5" />
              Chi tiết vaccine
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8">
            <p className="font-nunito-600 text-red-600">
              Có lỗi xảy ra khi tải dữ liệu
            </p>
            <Button
              onClick={onClose}
              className="font-nunito-600 mt-4"
              variant="outline"
            >
              Đóng
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-nunito-700 flex items-center gap-2 text-xl text-gray-900">
            <Info className="h-5 w-5" />
            Chi tiết vaccine
          </DialogTitle>
        </DialogHeader>

        {isPending ? (
          <div className="flex items-center justify-center py-8">
            <Spinner />
            <span className="font-nunito-400 ml-2">Đang tải...</span>
          </div>
        ) : vaccineDisease ? (
          <div className="space-y-6">
            <div className="border-t border-gray-200"></div>

            {/* Vaccine Information */}
            <div className="space-y-4">
              <h3 className="font-nunito-700 flex items-center gap-2 text-lg text-gray-900">
                <Syringe className="h-5 w-5 text-blue-600" />
                Thông tin Vaccine
              </h3>

              {vaccineDisease.vaccineResponseDTO ? (
                <div className="space-y-3 rounded-lg bg-blue-50 p-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="font-nunito-600 mb-1 text-sm text-gray-500">
                        Tên vaccine
                      </p>
                      <p className="font-nunito-700 text-gray-900">
                        {vaccineDisease.vaccineResponseDTO.name}
                      </p>
                    </div>
                    <div>
                      <p className="font-nunito-600 mb-1 text-sm text-gray-500">
                        Mã vaccine
                      </p>
                      <p className="font-nunito-600 text-gray-900">
                        {vaccineDisease.vaccineResponseDTO.vaccineCode}
                      </p>
                    </div>
                  </div>

                  {vaccineDisease.vaccineResponseDTO.description && (
                    <div>
                      <p className="font-nunito-600 mb-1 text-sm text-gray-500">
                        Mô tả
                      </p>
                      <p className="font-nunito-400 text-gray-700">
                        {vaccineDisease.vaccineResponseDTO.description}
                      </p>
                    </div>
                  )}

                  {vaccineDisease.vaccineResponseDTO.price && (
                    <div>
                      <p className="font-nunito-600 mb-1 text-sm text-gray-500">
                        Giá
                      </p>
                      <p className="font-nunito-600 text-green-600">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(vaccineDisease.vaccineResponseDTO.price)}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="font-nunito-400 text-center text-gray-500">
                    Không có thông tin vaccine
                  </p>
                </div>
              )}
            </div>

            {/* Disease Information */}
            <div className="space-y-4">
              <h3 className="font-nunito-700 flex items-center gap-2 text-lg text-gray-900">
                <Stethoscope className="h-5 w-5 text-red-600" />
                Thông tin Bệnh tật
              </h3>

              {vaccineDisease.diseaseResponseDTO ? (
                <div className="space-y-3 rounded-lg bg-red-50 p-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="font-nunito-600 mb-1 text-sm text-gray-500">
                        Tên bệnh
                      </p>
                      <p className="font-nunito-700 text-gray-900">
                        {vaccineDisease.diseaseResponseDTO.name}
                      </p>
                    </div>
                    <div>
                      <p className="font-nunito-600 mb-1 text-sm text-gray-500">
                        Loài
                      </p>
                      <Badge
                        variant={getSpeciesVariant(
                          vaccineDisease.diseaseResponseDTO.species,
                        )}
                        className="font-nunito-500"
                      >
                        {formatSpecies(
                          vaccineDisease.diseaseResponseDTO.species,
                        )}
                      </Badge>
                    </div>
                  </div>

                  {vaccineDisease.diseaseResponseDTO.description && (
                    <div>
                      <p className="font-nunito-600 mb-1 text-sm text-gray-500">
                        Mô tả
                      </p>
                      <p className="font-nunito-400 text-gray-700">
                        {vaccineDisease.diseaseResponseDTO.description}
                      </p>
                    </div>
                  )}

                  {vaccineDisease.diseaseResponseDTO.symptoms && (
                    <div>
                      <p className="font-nunito-600 mb-1 text-sm text-gray-500">
                        Triệu chứng
                      </p>
                      <p className="font-nunito-400 text-gray-700">
                        {vaccineDisease.diseaseResponseDTO.symptoms}
                      </p>
                    </div>
                  )}

                  {vaccineDisease.diseaseResponseDTO.treatment && (
                    <div>
                      <p className="font-nunito-600 mb-1 text-sm text-gray-500">
                        Điều trị
                      </p>
                      <p className="font-nunito-400 text-gray-700">
                        {vaccineDisease.diseaseResponseDTO.treatment}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="font-nunito-400 text-center text-gray-500">
                    Không có thông tin bệnh tật
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Metadata */}
            <div className="space-y-4">
              <h3 className="font-nunito-700 flex items-center gap-2 text-lg text-gray-900">
                <Calendar className="h-5 w-5 text-gray-600" />
                Thông tin hệ thống
              </h3>

              <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <p className="font-nunito-600 mb-1 text-sm text-gray-500">
                      Ngày tạo
                    </p>
                    <p className="font-nunito-600 text-gray-900">
                      {new Date(vaccineDisease.createdAt).toLocaleString(
                        "vi-VN",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="font-nunito-600 mb-1 text-sm text-gray-500">
                      Người tạo
                    </p>
                    <p className="font-nunito-600 flex items-center gap-1 text-gray-900">
                      <User className="h-4 w-4" />
                      {vaccineDisease.createdBy || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <p className="font-nunito-600 mb-1 text-sm text-gray-500">
                      Ngày cập nhật
                    </p>
                    <p className="font-nunito-600 text-gray-900">
                      {new Date(vaccineDisease.modifiedAt).toLocaleString(
                        "vi-VN",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="font-nunito-600 mb-1 text-sm text-gray-500">
                      Người cập nhật
                    </p>
                    <p className="font-nunito-600 flex items-center gap-1 text-gray-900">
                      <User className="h-4 w-4" />
                      {vaccineDisease.modifiedBy || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-end pt-4">
              <Button
                onClick={onClose}
                className="font-nunito-600 bg-primary hover:bg-primary/90"
              >
                Đóng
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="font-nunito-600 text-gray-500">
              Không tìm thấy thông tin chi tiết
            </p>
            <Button
              onClick={onClose}
              className="font-nunito-600 mt-4"
              variant="outline"
            >
              Đóng
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
