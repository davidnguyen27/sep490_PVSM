import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ButtonSpinner } from "@/components/shared";
import type { VaccineSchedule } from "../types/vaccine-schedule.type";

interface UpdateVaccineScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: {
    diseaseId: number | null;
    species: string;
    ageInterval: number;
  }) => void;
  schedule: VaccineSchedule | null;
  isLoading?: boolean;
}

export const UpdateVaccineScheduleModal = ({
  isOpen,
  onClose,
  onUpdate,
  schedule,
  isLoading = false,
}: UpdateVaccineScheduleModalProps) => {
  const [formData, setFormData] = useState({
    diseaseId: null as number | null,
    species: "",
    ageInterval: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (schedule) {
      setFormData({
        diseaseId: schedule.diseaseId,
        species: schedule.species,
        ageInterval: schedule.ageInterval,
      });
      setErrors({});
    }
  }, [schedule]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.species) {
      newErrors.species = "Vui lòng chọn loài";
    }

    if (!formData.ageInterval || formData.ageInterval < 1) {
      newErrors.ageInterval = "Khoảng cách phải lớn hơn 0 tuần";
    }

    if (formData.ageInterval > 52) {
      newErrors.ageInterval = "Khoảng cách không được vượt quá 52 tuần";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onUpdate(formData);
  };

  const handleClose = () => {
    setFormData({
      diseaseId: null,
      species: "",
      ageInterval: 0,
    });
    setErrors({});
    onClose();
  };

  if (!schedule) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Cập nhật lịch tiêm</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin lịch tiêm cho bệnh "{schedule.disease.name}"
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Disease Name (Read-only) */}
          <div className="space-y-2">
            <Label>Tên bệnh</Label>
            <Input
              value={schedule.disease.name}
              disabled
              className="bg-gray-50"
            />
          </div>

          {/* Dose Number (Read-only) */}
          <div className="space-y-2">
            <Label>Liều thứ</Label>
            <Input
              value={schedule.doseNumber.toString()}
              disabled
              className="bg-gray-50"
            />
          </div>

          {/* Species */}
          <div className="space-y-2">
            <Label htmlFor="species">
              Loài <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.species}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, species: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn loài" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dog">Chó</SelectItem>
                <SelectItem value="Cat">Mèo</SelectItem>
              </SelectContent>
            </Select>
            {errors.species && (
              <p className="text-sm text-red-500">{errors.species}</p>
            )}
          </div>

          {/* Age Interval */}
          <div className="space-y-2">
            <Label htmlFor="ageInterval">
              Khoảng cách (tuần) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="ageInterval"
              type="number"
              min={1}
              max={52}
              value={formData.ageInterval}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  ageInterval: parseInt(e.target.value) || 0,
                }))
              }
              placeholder="Nhập khoảng cách (tuần)"
            />
            {errors.ageInterval && (
              <p className="text-sm text-red-500">{errors.ageInterval}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <ButtonSpinner /> : "Cập nhật"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
