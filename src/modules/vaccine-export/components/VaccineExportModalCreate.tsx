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

interface VaccineExportModalCreateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VaccineExportModalCreate({
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
          purpose: "hủy" as const,
          notes: "",
          coldChainLog: {
            logTime: new Date().toISOString(),
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
    console.log("Form data:", data);

    // Validate that all details have valid vaccine batch
    const hasInvalidBatch = data.details.some(
      (detail) => !detail.vaccineBatchId || detail.vaccineBatchId === 0,
    );

    if (hasInvalidBatch) {
      form.setError("details", {
        type: "manual",
        message: "Vui lòng chọn lô vaccine cho tất cả các mục",
      });
      return;
    }

    createVaccineExport(data, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
    });
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  const addDetail = () => {
    append({
      vaccineBatchId: 0,
      quantity: 1,
      purpose: "hủy" as const,
      notes: "",
      coldChainLog: {
        logTime: new Date().toISOString(),
        temperature: 2,
        humidity: 60,
        event: "xuất kho",
        notes: "",
      },
    });
  };

  const removeDetail = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-primary">
            Tạo phiếu xuất kho mới
          </DialogTitle>
          <DialogDescription>
            Nhập thông tin để tạo phiếu xuất kho mới cùng với chi tiết vaccine
            vào hệ thống. Bạn có thể thêm nhiều lô vaccine khác nhau trong cùng
            một phiếu xuất.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Export Date Section */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h4 className="mb-3 font-semibold text-gray-900">
                Thông tin phiếu xuất
              </h4>
              <FormField
                control={form.control}
                name="exportDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Ngày xuất kho <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        disabled={isPending}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Vaccine Details Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">
                  Chi tiết vaccine
                </h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addDetail}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Thêm vaccine
                </Button>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="rounded-lg border border-gray-200 bg-white p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h5 className="font-medium text-gray-800">
                      Vaccine #{index + 1}
                    </h5>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDetail(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`details.${index}.vaccineBatchId`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Lô vaccine <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(parseInt(value) || 0)
                            }
                            value={
                              field.value > 0 ? field.value.toString() : ""
                            }
                            disabled={isLoadingBatches}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn lô vaccine" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {vaccineBatches.map((batch) => (
                                <SelectItem
                                  key={batch.vaccineBatchId}
                                  value={batch.vaccineBatchId.toString()}
                                >
                                  {batch.batchNumber} -{" "}
                                  {batch.vaccineResponseDTO.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`details.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
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
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`details.${index}.purpose`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Mục đích <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn mục đích" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="hủy">Hủy</SelectItem>
                              <SelectItem value="bán">Bán</SelectItem>
                              <SelectItem value="chuyển kho">
                                Chuyển kho
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name={`details.${index}.notes`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ghi chú</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Nhập ghi chú (tùy chọn)"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Cold Chain Log Section */}
                  <div className="mt-4 border-t pt-4">
                    <h6 className="mb-3 text-sm font-medium text-gray-700">
                      Thông tin chuỗi lạnh
                    </h6>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name={`details.${index}.coldChainLog.temperature`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Nhiệt độ (°C){" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.1"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || 0,
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`details.${index}.coldChainLog.humidity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Độ ẩm (%) <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || 0,
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name={`details.${index}.coldChainLog.event`}
                        render={() => (
                          <FormItem>
                            <FormLabel>Sự kiện</FormLabel>
                            <FormControl>
                              <Input
                                value="Xuất kho"
                                disabled
                                className="bg-gray-100"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name={`details.${index}.coldChainLog.notes`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ghi chú chuỗi lạnh</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Nhập ghi chú về chuỗi lạnh (tùy chọn)"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <DialogFooter className="gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isPending}
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
