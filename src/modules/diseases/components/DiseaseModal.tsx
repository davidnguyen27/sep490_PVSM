import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/shared/Spinner";
import { formatData } from "@/shared/utils/format.utils";
import { useDiseaseDetail } from "../hooks/useDiseaseDetail";

interface DiseaseModalProps {
  open: boolean;
  onClose: () => void;
  diseaseId: number | null;
}

export function DiseaseModal({ open, onClose, diseaseId }: DiseaseModalProps) {
  const { data: disease, isPending, error } = useDiseaseDetail(diseaseId);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-linen z-50 max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-inter text-primary text-xl">
            Chi tiết bệnh
          </DialogTitle>
        </DialogHeader>

        {!diseaseId ? (
          <div className="py-8 text-center">
            <p className="font-nunito text-gray-500">Không có ID bệnh</p>
          </div>
        ) : isPending ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : error ? (
          <div className="py-8 text-center">
            <p className="text-danger font-nunito">
              Có lỗi xảy ra khi tải thông tin bệnh: {error.message}
            </p>
          </div>
        ) : disease ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InfoItem label="Tên bệnh" value={disease.name} />
                <InfoItem
                  label="Loài"
                  value={
                    <Badge variant="outline" className="font-nunito">
                      {disease.species === "Dog"
                        ? "Chó"
                        : disease.species === "Cat"
                          ? "Mèo"
                          : "Cả hai"}
                    </Badge>
                  }
                />
              </div>

              <InfoItem label="Mô tả" value={disease.description} />
              <InfoItem label="Triệu chứng" value={disease.symptoms} />
              <InfoItem
                label="Phương pháp điều trị"
                value={disease.treatment}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InfoItem
                  label="Trạng thái"
                  value={
                    <Badge
                      variant={
                        disease.isDeleted === "true" ? "destructive" : "default"
                      }
                      className="font-nunito"
                    >
                      {disease.isDeleted === "true"
                        ? "Không hoạt động"
                        : "Hoạt động"}
                    </Badge>
                  }
                />
                <InfoItem
                  label="Ngày tạo"
                  value={formatData.formatDateTime(disease.createdAt)}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {disease.createdBy && (
                  <InfoItem label="Người tạo" value={disease.createdBy} />
                )}
                {disease.modifiedAt && (
                  <InfoItem
                    label="Cập nhật cuối"
                    value={formatData.formatDateTime(disease.modifiedAt)}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="font-nunito text-gray-500">
              Không tìm thấy thông tin bệnh
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface InfoItemProps {
  label: string;
  value: React.ReactNode;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="space-y-1">
      <label className="font-nunito-600 text-dark text-sm">{label}</label>
      <div className="font-nunito text-dark/80 text-sm whitespace-pre-wrap">
        {value}
      </div>
    </div>
  );
}
