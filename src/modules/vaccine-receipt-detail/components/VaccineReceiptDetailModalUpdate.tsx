import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect } from "react";

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

// hooks
import { useUpdateVaccineReceiptDetail } from "../hooks/useUpdate";
import { useAllVaccineBatches } from "@/modules/vaccine-batch/hooks";

// schemas
import {
  vaccineReceiptDetailCreateSchema,
  type VaccineReceiptDetailCreateFormData,
} from "../schemas/vaccine-receipt-detail.schema";

// types
import type { VaccineReceiptDetail } from "../types/vaccine-receipt-detal.type";

interface VaccineReceiptDetailModalUpdateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: VaccineReceiptDetail | null;
  receiptCode: string;
}

export function VaccineReceiptDetailModalUpdate({
  open,
  onOpenChange,
  data,
  receiptCode,
}: VaccineReceiptDetailModalUpdateProps) {
  const form = useForm<VaccineReceiptDetailCreateFormData>({
    resolver: zodResolver(vaccineReceiptDetailCreateSchema),
    defaultValues: {
      vaccineReceiptId: data?.vaccineReceiptId || 0,
      vaccineBatchId: 0,
      suppiler: "",
      quantity: 1,
      vaccineStatus: "active",
      notes: "",
      coldChainLog: {
        vaccineBatchId: 0,
        logTime: new Date().toISOString(),
        temperature: 2,
        humidity: 60,
        event: "storage",
        notes: "",
      },
    },
  });

  const { mutate: updateDetail, isPending } = useUpdateVaccineReceiptDetail();

  // Get all vaccine batches for dropdown
  const { data: vaccineBatchesResponse, isLoading: isLoadingBatches } =
    useAllVaccineBatches();
  const vaccineBatches = vaccineBatchesResponse?.data?.pageData || [];

  // Set form values when data changes
  useEffect(() => {
    if (data && open) {
      form.reset({
        vaccineReceiptId: data.vaccineReceiptId || 0,
        vaccineBatchId: data.vaccineBatch?.vaccineBatchId || 0,
        suppiler: data.suppiler || "",
        quantity: data.quantity || 1,
        vaccineStatus: data.vaccineStatus || "active",
        notes: data.notes || "",
        coldChainLog: {
          vaccineBatchId: data.vaccineBatch?.vaccineBatchId || 0,
          logTime: new Date().toISOString(),
          temperature: 2,
          humidity: 60,
          event: "storage",
          notes: "",
        },
      });
    }
  }, [data, open, form]);

  const handleSubmit = (formData: VaccineReceiptDetailCreateFormData) => {
    // Debug logging
    console.log("Form data:", formData);
    console.log("Update data:", data);

    // Validate data
    if (!data?.vaccineReceiptDetailId) {
      toast.error("Lỗi", {
        description:
          "ID vaccine receipt detail không hợp lệ. Vui lòng thử lại.",
      });
      return;
    }

    // Validate vaccineBatchId
    if (!formData.vaccineBatchId || formData.vaccineBatchId === 0) {
      toast.error("Lỗi", {
        description: "Vui lòng chọn lô vaccine.",
      });
      return;
    }

    // Set vaccineBatchId for coldChainLog
    const payload = {
      vaccineReceiptId: formData.vaccineReceiptId,
      vaccineBatchId: formData.vaccineBatchId,
      suppiler: formData.suppiler,
      quantity: formData.quantity,
      vaccineStatus: formData.vaccineStatus,
      notes: formData.notes || "",
      coldChainLog: {
        vaccineBatchId: formData.vaccineBatchId,
        logTime: formData.coldChainLog.logTime,
        temperature: formData.coldChainLog.temperature,
        humidity: formData.coldChainLog.humidity,
        event: formData.coldChainLog.event,
        notes: formData.coldChainLog.notes || "",
      },
    };

    console.log("API Payload:", payload);

    updateDetail(
      {
        vaccineReceiptDetailId: data.vaccineReceiptDetailId,
        payload,
      },
      {
        onSuccess: () => {
          form.reset();
          onOpenChange(false);
        },
      },
    );
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-primary">
            Cập nhật vaccine trong phiếu nhập
          </DialogTitle>
          <DialogDescription>
            Cập nhật thông tin vaccine chi tiết trong phiếu nhập {receiptCode}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Phiếu nhập info */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-nunito-600 text-sm text-gray-600">
                    Phiếu nhập vaccine
                  </p>
                  <p className="font-nunito-700 text-primary text-lg">
                    {receiptCode}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-nunito-400 text-xs text-gray-500">
                    ID: {data?.vaccineReceiptDetailId}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="vaccineBatchId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Lô vaccine <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(parseInt(value) || 0)
                      }
                      value={field.value > 0 ? field.value.toString() : ""}
                      disabled={isLoadingBatches}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              isLoadingBatches
                                ? "Đang tải..."
                                : "Chọn lô vaccine"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[200px]">
                        {vaccineBatches.map((batch) => (
                          <SelectItem
                            key={batch.vaccineBatchId}
                            value={batch.vaccineBatchId.toString()}
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {batch.batchNumber}
                              </span>
                              <span className="text-xs text-gray-500">
                                {batch.vaccineResponseDTO.name} - Số lượng:{" "}
                                {batch.quantity}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                        {vaccineBatches.length === 0 && !isLoadingBatches && (
                          <SelectItem value="no-data" disabled>
                            Không có lô vaccine nào
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Số lượng <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Nhập số lượng"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="suppiler"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nhà cung cấp <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên nhà cung cấp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vaccineStatus"
                render={({ field }) => (
                  <FormItem style={{ display: 'none' }}>
                    <FormControl>
                      <Input type="hidden" {...field} value="active" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
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

            {/* Cold Chain Log Section */}
            <div className="border-t pt-4">
              <h4 className="font-nunito-600 mb-3 text-sm text-gray-700">
                Thông tin chuỗi lạnh
              </h4>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="coldChainLog.temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nhiệt độ (°C) <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="2-8°C"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="coldChainLog.humidity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Độ ẩm (%) <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="60%"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="coldChainLog.event"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Sự kiện <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại sự kiện" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="storage">Nhập tồn kho</SelectItem>
                        <SelectItem value="transport">Nhập kho lô mới</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coldChainLog.notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ghi chú chuỗi lạnh</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ghi chú về chuỗi lạnh (tùy chọn)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                {isPending ? "Đang cập nhật..." : "Cập nhật"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
