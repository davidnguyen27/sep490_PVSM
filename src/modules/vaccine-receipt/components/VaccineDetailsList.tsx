import type { Control, FieldArrayWithId } from "react-hook-form";
import { Plus } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import { VaccineDetailItem } from "./VaccineDetailItem";

// types
import type { VaccineReceiptCreateFormData } from "../schemas/vaccine-receipt.schema";
import type { VaccineBatch } from "@/modules/vaccine-batch/types/vaccine-batch.type";

interface VaccineDetailsListProps {
  control: Control<VaccineReceiptCreateFormData>;
  fields: FieldArrayWithId<VaccineReceiptCreateFormData, "details", "id">[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  vaccineBatches: VaccineBatch[];
  isLoadingBatches: boolean;
}

export function VaccineDetailsList({
  control,
  fields,
  onAddDetail,
  onRemoveDetail,
  vaccineBatches,
  isLoadingBatches,
}: VaccineDetailsListProps) {
  return (
    <div className="space-y-6">
      <div className="border-primary border-l-4 pl-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-nunito-700 text-lg text-gray-900">
              Chi tiết vaccine
            </h4>
            <p className="font-nunito-400 text-sm text-gray-500">
              Thêm thông tin các lô vaccine nhập kho
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddDetail}
            className="font-nunito-600 border-primary text-primary hover:bg-primary/5 hover:text-secondary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Thêm vaccine
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <VaccineDetailItem
            key={field.id}
            control={control}
            index={index}
            canRemove={fields.length > 1}
            onRemove={() => onRemoveDetail(index)}
            vaccineBatches={vaccineBatches}
            isLoadingBatches={isLoadingBatches}
          />
        ))}
      </div>
    </div>
  );
}
