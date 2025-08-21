import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Syringe, PackageOpen, FileText, BadgeDollarSign } from "lucide-react";

import { useVaccinationStore } from "../store/useVaccinationStore";
import { useVaccineBatchByVaccine } from "@/modules/vaccine-batch/hooks/useVaccineBatchByVaccine";
import { useVaccineBatchById } from "@/modules/vaccine-batch/hooks/useVaccineBatchById";
import { useMemo, useState, useEffect } from "react";
import { useVaccineByDisease } from "@/modules/vaccines/hooks/useVaccineByDisease";
import type { VaccineBatch } from "@/modules/vaccine-batch";
import type { Vaccine } from "@/modules/vaccines";

interface Props {
  disabled?: boolean;
  canEdit?: boolean;
  diseaseId: number | null;
}

export function VaccineInjectionTable({ disabled, canEdit, diseaseId }: Props) {
  const selectedVaccineBatchId = useVaccinationStore(
    (s) => s.formData.selectedVaccineBatchId,
  );
  const setSelectedVaccineBatchId = useVaccinationStore(
    (s) => s.setSelectedVaccineBatchId,
  );

  const [selectedVaccineId, setSelectedVaccineId] = useState<number | null>(
    null,
  );

  // Step 1: Get vaccine list by disease
  const { data: vaccines, isLoading: isVaccineLoading } = useVaccineByDisease(
    diseaseId!,
  );

  // Nếu có selectedVaccineBatchId, lấy thông tin của lô vaccine đó
  const { data: savedBatchDetail, isLoading: isSavedBatchLoading } =
    useVaccineBatchById(selectedVaccineBatchId || null);

  // Nếu có savedBatchDetail và chưa chọn vaccineId, sử dụng vaccineId từ savedBatchDetail
  const defaultVaccineId = useMemo(() => {
    if (savedBatchDetail && !selectedVaccineId) {
      return savedBatchDetail.vaccineResponseDTO?.vaccineId;
    }
    if (Array.isArray(vaccines)) return vaccines[0]?.vaccineId;
    return vaccines?.vaccineId;
  }, [vaccines, savedBatchDetail, selectedVaccineId]);

  const vaccineId = selectedVaccineId ?? defaultVaccineId;

  // Đồng bộ vaccine ID từ savedBatchDetail khi có
  useEffect(() => {
    if (
      savedBatchDetail &&
      savedBatchDetail.vaccineResponseDTO?.vaccineId &&
      !selectedVaccineId
    ) {
      setSelectedVaccineId(savedBatchDetail.vaccineResponseDTO.vaccineId);
    }
  }, [savedBatchDetail, selectedVaccineId]);

  // Step 2: Get batch list by vaccineId
  const { data: vaccineBatches, isLoading: isBatchLoading } =
    useVaccineBatchByVaccine(vaccineId ?? 0);

  // Find selected batch from the list or use saved batch detail
  const selectedBatch = useMemo(() => {
    // Nếu đã có savedBatchDetail, ưu tiên sử dụng
    if (savedBatchDetail) {
      return savedBatchDetail;
    }

    // Nếu không, tìm trong danh sách batches hiện tại
    if (Array.isArray(vaccineBatches)) {
      return vaccineBatches.find(
        (batch: VaccineBatch) =>
          batch.vaccineBatchId === selectedVaccineBatchId,
      );
    }

    // Nếu vaccineBatches không phải là mảng mà là object
    if (
      vaccineBatches &&
      selectedVaccineBatchId === vaccineBatches.vaccineBatchId
    ) {
      return vaccineBatches;
    }

    return undefined;
  }, [vaccineBatches, selectedVaccineBatchId, savedBatchDetail]);

  const handleSelectBatch = (id: string) => {
    setSelectedVaccineBatchId(Number(id));
  };

  const handleSelectVaccine = (id: string) => {
    setSelectedVaccineId(Number(id));
    setSelectedVaccineBatchId(null);
  };

  return (
    <Card className="bg-linen relative rounded-none">
      <CardContent className="space-y-4 p-6">
        <h2 className="font-nunito-700 text-primary flex items-center gap-2 text-lg underline">
          <Syringe size={16} />
          Thông tin vaccine
        </h2>

        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          {/* Vaccine select */}
          <div className="flex flex-col gap-2">
            <span className="text-dark font-nunito-600 flex items-center gap-1 text-xs">
              <PackageOpen size={14} />
              Vaccine
            </span>
            <Select
              onValueChange={handleSelectVaccine}
              disabled={disabled || canEdit}
              value={vaccineId?.toString() ?? ""}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    isVaccineLoading ? "Đang tải..." : "Chọn vaccine"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {Array.isArray(vaccines) && vaccines.length > 0 ? (
                  vaccines.map((vaccine: Vaccine) => (
                    <SelectItem
                      key={vaccine.vaccineId}
                      value={vaccine.vaccineId?.toString() ?? ""}
                    >
                      {vaccine.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    Không có vaccine
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Batch select */}
          <div className="flex flex-col gap-2">
            <span className="text-dark font-nunito-600 flex items-center gap-1 text-xs">
              <PackageOpen size={14} />
              Lô vaccine
            </span>
            <Select
              onValueChange={handleSelectBatch}
              disabled={disabled || canEdit || !vaccineId}
              value={selectedVaccineBatchId?.toString() ?? ""}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    isVaccineLoading || isBatchLoading || isSavedBatchLoading
                      ? "Đang tải..."
                      : "Chọn lô vaccine"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {Array.isArray(vaccineBatches) ? (
                  vaccineBatches.filter(
                    (batch: VaccineBatch) => batch.quantity > 0,
                  ).length > 0 ? (
                    vaccineBatches
                      .filter((batch: VaccineBatch) => batch.quantity > 0)
                      .map((batch: VaccineBatch) => (
                        <SelectItem
                          key={batch.vaccineBatchId}
                          value={batch.vaccineBatchId.toString()}
                        >
                          {batch.vaccineResponseDTO.name} –{" "}
                          {batch.quantity ?? 0} liều
                        </SelectItem>
                      ))
                  ) : (
                    <SelectItem value="none" disabled>
                      Không có lô vaccine phù hợp
                    </SelectItem>
                  )
                ) : vaccineBatches && vaccineBatches.quantity > 0 ? (
                  <SelectItem value={vaccineBatches.vaccineBatchId.toString()}>
                    {vaccineBatches.vaccineResponseDTO.name} –{" "}
                    {vaccineBatches.quantity ?? 0} liều
                  </SelectItem>
                ) : (
                  <SelectItem value="none" disabled>
                    Không có lô vaccine phù hợp
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Vaccine description */}
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

          {/* Vaccine price */}
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
