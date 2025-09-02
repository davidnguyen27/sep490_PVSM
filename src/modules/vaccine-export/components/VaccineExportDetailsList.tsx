import type { Control, FieldArrayWithId } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { VaccineExportDetailItem } from "./VaccineExportDetailItem";
import type { CreateVaccineExportFormData } from "../schemas/vaccine-export.schema";
import type { VaccineBatch } from "@/modules/vaccine-batch/types/vaccine-batch.type";

interface VaccineExportDetailsListProps {
  control: Control<CreateVaccineExportFormData>;
  fields: FieldArrayWithId<CreateVaccineExportFormData, "details", "id">[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  vaccineBatches: VaccineBatch[];
  isLoadingBatches: boolean;
  isEditMode?: boolean; // Add prop to control edit mode
}

export function VaccineExportDetailsList({
  control,
  fields,
  onAddDetail,
  onRemoveDetail,
  vaccineBatches,
  isLoadingBatches,
  isEditMode = false, // Default to false (create mode)
}: VaccineExportDetailsListProps) {
  return (
    <div className="space-y-4">
      <div className="border-primary border-l-4 pl-4">
        <h4 className="font-nunito-700 text-lg text-gray-900">
          Chi tiết vaccine xuất kho
        </h4>
        <p className="font-nunito-400 text-sm text-gray-500">
          Thêm các lô vaccine cần xuất khỏi kho
        </p>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <VaccineExportDetailItem
            key={field.id}
            control={control}
            index={index}
            onRemove={() => onRemoveDetail(index)}
            canRemove={fields.length > 1}
            vaccineBatches={vaccineBatches}
            isLoadingBatches={isLoadingBatches}
            isEditMode={isEditMode}
          />
        ))}

        {/* Chỉ hiển thị nút thêm chi tiết khi không ở chế độ edit */}
        {!isEditMode && (
          <div className="flex justify-center pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onAddDetail}
              className="font-nunito-600 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Thêm chi tiết vaccine
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
