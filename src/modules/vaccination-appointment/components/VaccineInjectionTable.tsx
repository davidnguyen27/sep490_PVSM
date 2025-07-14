import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type VaccineBatch } from "@/modules/vaccine-batch";
import { useVaccineBatchForVaccine } from "@/modules/vaccine-batch/hooks/useVaccineBatchForVaccine";
import type { Vaccine } from "@/modules/vaccines";
import { useVaccineByDisease } from "@/modules/vaccines/hooks/useVaccineByDisease";
import {
  Lock,
  Syringe,
  PackageOpen,
  FileText,
  BadgeDollarSign,
} from "lucide-react";
import { useState } from "react";

interface Props {
  disabled?: boolean;
  onChange?: (batch: VaccineBatch | null) => void;
  canEdit?: boolean;
  diseaseId: number;
}

export function VaccineInjectionTable({
  disabled,
  onChange,
  canEdit,
  diseaseId,
}: Props) {
  const [selectedVaccineId, setSelectedVaccineId] = useState<number | null>(
    null,
  );
  const [selectedBatch, setSelectedBatch] = useState<VaccineBatch | null>(null);

  const { data: vaccineData, isLoading: isLoadingVaccine } =
    useVaccineByDisease(diseaseId);
  const vaccineList = Array.isArray(vaccineData) ? vaccineData : [];

  const { data: batchData, isLoading: isLoadingBatch } =
    useVaccineBatchForVaccine(selectedVaccineId!);
  const batchList = batchData ? [batchData] : [];

  const handleSelectVaccine = (id: string) => {
    setSelectedVaccineId(Number(id));
    setSelectedBatch(null);
    onChange?.(null);
  };

  const handleSelectBatch = (id: string) => {
    const batchId = Number(id);
    const batch = batchList.find((b) => b.vaccineBatchId === batchId) || null;
    setSelectedBatch(batch);
    onChange?.(batch);
  };

  return (
    <Card className="bg-linen relative rounded-none">
      {disabled && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
          <div className="flex flex-col items-center text-gray-500">
            <Lock className="mb-2 h-8 w-8" />
            <span>Bạn không có quyền chỉnh sửa</span>
          </div>
        </div>
      )}

      <CardContent className="space-y-4 p-6">
        {/* Header */}
        <h2 className="font-nunito-700 text-primary flex items-center gap-2 text-lg underline">
          <Syringe size={16} />
          Thông tin vaccine
        </h2>

        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <span className="text-dark font-nunito-600 flex items-center gap-1 text-xs">
              <PackageOpen size={14} />
              Loại vaccine
            </span>
            <Select
              onValueChange={handleSelectVaccine}
              disabled={disabled || canEdit || isLoadingVaccine}
              value={selectedVaccineId?.toString() ?? ""}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    isLoadingVaccine ? "Đang tải..." : "Chọn vaccine"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {vaccineList.map((vaccine: Vaccine) => (
                  <SelectItem
                    key={vaccine.vaccineId}
                    value={vaccine.vaccineId.toString()}
                  >
                    {vaccine.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-dark font-nunito-600 flex items-center gap-1 text-xs">
              <PackageOpen size={14} />
              Chọn lô vaccine
            </span>
            <Select
              onValueChange={handleSelectBatch}
              disabled={
                disabled ||
                canEdit ||
                !selectedVaccineId ||
                isLoadingBatch ||
                batchList.length === 0
              }
              value={
                selectedBatch?.vaccineBatchId
                  ? selectedBatch.vaccineBatchId.toString()
                  : ""
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    !selectedVaccineId
                      ? "Chọn loại vaccine trước"
                      : isLoadingBatch
                        ? "Đang tải lô vaccine..."
                        : "Chọn lô vaccine"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {batchList.map((batch) => (
                  <SelectItem
                    key={batch.vaccineBatchId}
                    value={batch.vaccineBatchId.toString()}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {batch.vaccineResponseDTO.name}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {batch.quantity ?? 0} liều còn lại
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-dark font-nunito-600 flex items-center gap-1 text-xs">
              <FileText size={14} />
              Mô tả vaccine
            </span>
            <Input
              value={selectedBatch?.vaccineResponseDTO.description ?? ""}
              placeholder="Mô tả"
              readOnly
              disabled
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-dark font-nunito-600 flex items-center gap-1 text-xs">
              <BadgeDollarSign size={14} />
              Giá lô vaccine
            </span>
            <Input
              value={
                selectedBatch?.vaccineResponseDTO.price
                  ? `${selectedBatch.vaccineResponseDTO.price.toLocaleString()} VND`
                  : ""
              }
              placeholder="Giá"
              readOnly
              disabled
            />
          </div>
        </div>

        <div className="font-nunito-700 text-primary text-right text-base">
          Tổng cộng:{" "}
          {selectedBatch?.vaccineResponseDTO.price
            ? `${selectedBatch.vaccineResponseDTO.price.toLocaleString()} VND`
            : "0 VND"}
        </div>
      </CardContent>
    </Card>
  );
}
