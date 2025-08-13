import type { Control } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VaccineExportColdChainSection } from "./VaccineExportColdChainSection";
import type { CreateVaccineExportFormData } from "../schemas/vaccine-export.schema";
import type { VaccineBatch } from "@/modules/vaccine-batch/types/vaccine-batch.type";

interface VaccineExportDetailItemProps {
  control: Control<CreateVaccineExportFormData>;
  index: number;
  onRemove: () => void;
  canRemove: boolean;
  vaccineBatches: VaccineBatch[];
  isLoadingBatches: boolean;
  isEditMode?: boolean; // New prop to control edit mode
}

export function VaccineExportDetailItem({
  control,
  index,
  onRemove,
  canRemove,
  vaccineBatches,
  isLoadingBatches,
  isEditMode = false, // Default to false (create mode)
}: VaccineExportDetailItemProps) {
  return (
    <Card className="rounded-none border border-gray-200">
      <CardHeader className="bg-gray-50/50 py-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-nunito-600 text-base text-gray-800">
            Chi tiết vaccine #{index + 1}
          </CardTitle>
          {canRemove && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={control}
            name={`details.${index}.vaccineBatchId`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-nunito-600 text-gray-700">
                  Lô vaccine <span className="text-red-500">*</span>
                  {isEditMode && (
                    <span className="ml-2 text-xs text-gray-500">
                      (Không thể thay đổi khi cập nhật)
                    </span>
                  )}
                </FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(parseInt(value) || 0)
                  }
                  value={field.value > 0 ? field.value.toString() : ""}
                  disabled={isLoadingBatches || isEditMode}
                >
                  <FormControl>
                    <SelectTrigger
                      className={
                        isEditMode ? "cursor-not-allowed opacity-60" : ""
                      }
                    >
                      <SelectValue placeholder="Chọn lô vaccine" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vaccineBatches.map((batch) => (
                      <SelectItem
                        key={batch.vaccineBatchId}
                        value={batch.vaccineBatchId.toString()}
                      >
                        {batch.batchNumber} - {batch.vaccineResponseDTO.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`details.${index}.quantity`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-nunito-600 text-gray-700">
                  Số lượng <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    placeholder="Nhập số lượng"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 1)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={control}
            name={`details.${index}.purpose`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-nunito-600 text-gray-700">
                  Mục đích xuất <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn mục đích" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hủy">Hủy</SelectItem>
                    <SelectItem value="bán">Bán</SelectItem>
                    <SelectItem value="chuyển kho">Chuyển kho</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-end">
            <FormField
              control={control}
              name={`details.${index}.notes`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-nunito-600 text-gray-700">
                    Ghi chú
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ghi chú về chi tiết vaccine..."
                      className="min-h-[40px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Cold Chain Log Section */}
        <VaccineExportColdChainSection control={control} index={index} />
      </CardContent>
    </Card>
  );
}
