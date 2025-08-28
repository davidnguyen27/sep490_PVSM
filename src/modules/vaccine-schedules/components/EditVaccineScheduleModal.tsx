import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVaccineScheduleUpdate } from "../hooks/useVaccineScheduleUpdate";
import type { VaccineSchedule } from "../types/vaccine-schedule.type";

interface EditVaccineScheduleModalProps {
  open: boolean;
  onClose: () => void;
  schedule: VaccineSchedule | null;
  onSuccess?: () => void;
}

export function EditVaccineScheduleModal({
  open,
  onClose,
  schedule,
  onSuccess,
}: EditVaccineScheduleModalProps) {
  const [doseNumber, setDoseNumber] = useState(1);
  const [ageInterval, setAgeInterval] = useState(0);
  const updateMutation = useVaccineScheduleUpdate();

  useEffect(() => {
    if (schedule) {
      setDoseNumber(schedule.doseNumber);
      setAgeInterval(schedule.ageInterval);
    }
  }, [schedule]);

  if (!schedule) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(
      {
        scheduleId: schedule.vaccinationScheduleId,
        scheduleData: {
          diseaseId: schedule.diseaseId,
          species: schedule.species,
          ageInterval,
        },
      },
      {
        onSuccess: () => {
          onClose();
          onSuccess?.();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-none">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-primary font-inter-600">
            Cập nhật lịch tiêm
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-nunito-500 mb-1 block text-sm">
              Số mũi tiêm
            </label>
            <Input
              type="number"
              min={1}
              value={doseNumber}
              onChange={(e) => setDoseNumber(Number(e.target.value))}
              required
              disabled
            />
          </div>
          <div>
            <label className="font-nunito-500 mb-1 block text-sm">
              Tuổi (tuần) tiêm
            </label>
            <Input
              type="number"
              min={0}
              value={ageInterval}
              onChange={(e) => setAgeInterval(Number(e.target.value))}
              required
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={updateMutation.isPending}
            >
              Huỷ
            </Button>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Đang lưu..." : "Cập nhật"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
