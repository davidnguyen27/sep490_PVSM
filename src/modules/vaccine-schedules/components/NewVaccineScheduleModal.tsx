import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVaccineScheduleCreate } from "../hooks/useVaccineScheduleCreate";
import type { VaccineSchedulePayload } from "../types/vaccine-schedule.payload.type";

interface NewVaccineScheduleModalProps {
  open: boolean;
  onClose: () => void;
  diseaseId: number | null;
  species: "dog" | "cat";
  onSuccess?: () => void;
}

export function NewVaccineScheduleModal({
  open,
  onClose,
  diseaseId,
  species,
  onSuccess,
}: NewVaccineScheduleModalProps) {
  const [doseNumber, setDoseNumber] = useState(1);
  const [ageInterval, setAgeInterval] = useState(0);
  const createMutation = useVaccineScheduleCreate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diseaseId) return;
    const payload: VaccineSchedulePayload = {
      diseaseId,
      species: species === "dog" ? "Dog" : "Cat",
      doseNumber,
      ageInterval,
    };
    createMutation.mutate(payload, {
      onSuccess: () => {
        onClose();
        setDoseNumber(1);
        setAgeInterval(0);
        onSuccess?.();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm mới lịch tiêm</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Số mũi tiêm
            </label>
            <Input
              type="number"
              min={1}
              value={doseNumber}
              onChange={(e) => setDoseNumber(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
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
              disabled={createMutation.isPending}
            >
              Huỷ
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Đang lưu..." : "Thêm mới"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
