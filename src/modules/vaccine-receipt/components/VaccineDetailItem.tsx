import type { Control } from "react-hook-form";
import { Trash2 } from "lucide-react";

// components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColdChainLogSection } from "./ColdChainLogSection";

// types
import type { VaccineReceiptCreateFormData } from "../schemas/vaccine-receipt.schema";
import type { VaccineBatch } from "@/modules/vaccine-batch/types/vaccine-batch.type";

interface VaccineDetailItemProps {
  control: Control<VaccineReceiptCreateFormData>;
  index: number;
  canRemove: boolean;
  onRemove: () => void;
  vaccineBatches: VaccineBatch[];
  isLoadingBatches: boolean;
}

export function VaccineDetailItem({
  control,
  index,
  canRemove,
  onRemove,
  vaccineBatches,
  isLoadingBatches,
}: VaccineDetailItemProps) {
  return (
    <div className="rounded-none border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
            <span className="font-nunito-700 text-primary text-sm">
              {index + 1}
            </span>
          </div>
          <h5 className="font-nunito-700 text-lg text-gray-800">
            Vaccine #{index + 1}
          </h5>
        </div>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={control}
          name={`details.${index}.vaccineBatchId`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-nunito-600 text-sm text-gray-700">
                Lô vaccine <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value) || 0)}
                value={field.value > 0 ? field.value.toString() : ""}
                disabled={isLoadingBatches}
              >
                <FormControl>
                  <SelectTrigger className="font-nunito-500 focus:ring-primary/20 focus:ring-2">
                    <SelectValue placeholder="Chọn lô vaccine" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vaccineBatches.map((batch) => (
                    <SelectItem
                      key={batch.vaccineBatchId}
                      value={batch.vaccineBatchId.toString()}
                      className="font-nunito-500"
                    >
                      {batch.batchNumber} - {batch.vaccineResponseDTO.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="font-nunito-400" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`details.${index}.quantity`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-nunito-600 text-sm text-gray-700">
                Số lượng <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || 1)
                  }
                  className="font-nunito-500 focus:ring-primary/20 focus:ring-2"
                  placeholder="Nhập số lượng"
                />
              </FormControl>
              <FormMessage className="font-nunito-400" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`details.${index}.suppiler`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-nunito-600 text-sm text-gray-700">
                Nhà cung cấp <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập tên nhà cung cấp"
                  {...field}
                  className="font-nunito-500 focus:ring-primary/20 focus:ring-2"
                />
              </FormControl>
              <FormMessage className="font-nunito-400" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`details.${index}.vaccineStatus`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-nunito-600 text-sm text-gray-700">
                Trạng thái <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="font-nunito-500 focus:ring-primary/20 focus:ring-2">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active" className="font-nunito-500">
                    Hoạt động
                  </SelectItem>
                  <SelectItem value="inactive" className="font-nunito-500">
                    Không hoạt động
                  </SelectItem>
                  <SelectItem value="expired" className="font-nunito-500">
                    Hết hạn
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="font-nunito-400" />
            </FormItem>
          )}
        />
      </div>

      <div className="mt-6">
        <FormField
          control={control}
          name={`details.${index}.notes`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-nunito-600 text-sm text-gray-700">
                Ghi chú
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nhập ghi chú (tùy chọn)"
                  {...field}
                  className="font-nunito-500 focus:ring-primary/20 min-h-20 resize-none focus:ring-2"
                />
              </FormControl>
              <FormMessage className="font-nunito-400" />
            </FormItem>
          )}
        />
      </div>

      <ColdChainLogSection control={control} index={index} />
    </div>
  );
}
