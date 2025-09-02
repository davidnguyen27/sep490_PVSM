import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
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
import { Plus, Trash2 } from "lucide-react";

// hooks
import { useVaccineExportAdd } from "../hooks/useVaccineExportAdd";
import { useAllVaccineBatches } from "@/modules/vaccine-batch/hooks";

// schemas
import { createVaccineExportSchema } from "../schemas/vaccine-export.schema";

// types
import type { CreateVaccineExportFormData } from "../schemas/vaccine-export.schema";
import type { VaccineBatch } from "@/modules/vaccine-batch/types/vaccine-batch.type";

interface VaccineExportModalCreateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VaccineExportModalCreateNew({
  open,
  onOpenChange,
}: VaccineExportModalCreateProps) {
  const form = useForm<CreateVaccineExportFormData>({
    resolver: zodResolver(createVaccineExportSchema),
    defaultValues: {
      exportDate: new Date().toISOString().split("T")[0],
      details: [
        {
          vaccineBatchId: 0,
          quantity: 1,
          purpose: "hủy lô",
          notes: "",
          coldChainLog: {
            temperature: 2,
            humidity: 60,
            event: "xuất kho",
            notes: "",
          },
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "details",
  });

  const { mutate: createVaccineExport, isPending } = useVaccineExportAdd();
  const { data: vaccineBatchesResponse, isLoading: isLoadingBatches } =
    useAllVaccineBatches();

  const vaccineBatches = vaccineBatchesResponse?.data?.pageData || [];

  const handleSubmit = (data: CreateVaccineExportFormData) => {
    createVaccineExport(data, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
    });
  };

  const addDetail = () => {
    append({
      vaccineBatchId: 0,
      quantity: 1,
      purpose: "hủy lô",
      notes: "",
      coldChainLog: {
        temperature: 2,
        humidity: 60,
        event: "xuất kho",
        notes: "",
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tạo phiếu xuất kho vaccine</DialogTitle>
          <DialogDescription>
            Tạo phiếu xuất kho vaccine với thông tin chi tiết
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Export Date */}
            <FormField
              control={form.control}
              name="exportDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày xuất kho</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Export Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Chi tiết xuất kho</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addDetail}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm chi tiết
                </Button>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative space-y-4 rounded-lg border p-4"
                >
                  {/* Remove Button */}
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Vaccine Batch */}
                    <FormField
                      control={form.control}
                      name={`details.${index}.vaccineBatchId`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lô vaccine</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(parseInt(value))
                              }
                              value={field.value.toString()}
                              disabled={isLoadingBatches}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn lô vaccine" />
                              </SelectTrigger>
                              <SelectContent>
                                {vaccineBatches.map((batch: VaccineBatch) => (
                                  <SelectItem
                                    key={batch.vaccineBatchId}
                                    value={batch.vaccineBatchId.toString()}
                                  >
                                    {batch.batchNumber} -{" "}
                                    {batch.vaccineResponseDTO?.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Quantity */}
                    <FormField
                      control={form.control}
                      name={`details.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số lượng</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Purpose */}
                  <FormField
                    control={form.control}
                    name={`details.${index}.purpose`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mục đích</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn mục đích" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hủy lô">Hủy lô</SelectItem>
                              <SelectItem value="điều phối">
                                Điều phối
                              </SelectItem>
                              <SelectItem value="tiêm phòng">
                                Tiêm phòng
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Notes */}
                  <FormField
                    control={form.control}
                    name={`details.${index}.notes`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ghi chú</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Cold Chain Log */}
                  <div className="border-t pt-4">
                    <h4 className="mb-3 font-medium">Nhật ký chuỗi lạnh</h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {/* Temperature */}
                      <FormField
                        control={form.control}
                        name={`details.${index}.coldChainLog.temperature`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nhiệt độ (°C)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.1"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Humidity */}
                      <FormField
                        control={form.control}
                        name={`details.${index}.coldChainLog.humidity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Độ ẩm (%)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Event */}
                      <FormField
                        control={form.control}
                        name={`details.${index}.coldChainLog.event`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sự kiện</FormLabel>
                            <FormControl>
                              <Input {...field} value="Xuất kho" disabled />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Cold Chain Notes */}
                    <FormField
                      control={form.control}
                      name={`details.${index}.coldChainLog.notes`}
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>Ghi chú chuỗi lạnh</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Đang tạo..." : "Tạo phiếu xuất"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
