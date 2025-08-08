import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Package, Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
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

import { useAddVaccineExportDetail } from "../hooks/useAddVaccineExportDetail";
import { useVaccineBatches } from "@/modules/vaccine-batch/hooks";
import type { VaccineExportDetailPayload } from "../types/payload.type";
import type { VaccineBatch } from "@/modules/vaccine-batch/types/vaccine-batch.type";

// Form schema
const addVaccineExportDetailSchema = z.object({
  vaccineBatchId: z.number().min(1, "Vui lòng chọn lô vaccine"),
  quantity: z.number().min(1, "Số lượng phải lớn hơn 0"),
  purpose: z.string().min(1, "Vui lòng nhập mục đích"),
  notes: z.string().optional(),
  // Cold chain log
  temperature: z.number().min(-50).max(50),
  humidity: z.number().min(0).max(100),
  event: z.string().min(1, "Vui lòng nhập sự kiện"),
  coldChainNotes: z.string().optional(),
});

type FormData = z.infer<typeof addVaccineExportDetailSchema>;

interface AddVaccineExportDetailModalProps {
  vaccineExportId: number;
  trigger?: React.ReactNode;
}

export function AddVaccineExportDetailModal({
  vaccineExportId,
  trigger,
}: AddVaccineExportDetailModalProps) {
  const [open, setOpen] = useState(false);
  const { data: vaccineBatches, isPending: isLoadingBatches } =
    useVaccineBatches({
      pageNumber: 1,
      pageSize: 100,
      keyWord: "",
    });
  const { mutate: addVaccineExportDetail, isPending } =
    useAddVaccineExportDetail();

  const form = useForm<FormData>({
    resolver: zodResolver(addVaccineExportDetailSchema),
    defaultValues: {
      vaccineBatchId: 0,
      quantity: 1,
      purpose: "",
      notes: "",
      temperature: 2,
      humidity: 60,
      event: "Xuất kho",
      coldChainNotes: "",
    },
  });

  const selectedBatchId = form.watch("vaccineBatchId");
  const selectedBatch = vaccineBatches?.data?.pageData?.find(
    (batch: VaccineBatch) => batch.vaccineBatchId === selectedBatchId,
  );

  const onSubmit = (data: FormData) => {
    const payload: VaccineExportDetailPayload = {
      vaccineExportId: vaccineExportId,
      vaccineBatchId: data.vaccineBatchId,
      quantity: data.quantity,
      purpose: data.purpose,
      notes: data.notes || "",
      coldChainLog: {
        vaccineBatchId: data.vaccineBatchId,
        logTime: new Date().toISOString(),
        temperature: data.temperature,
        humidity: data.humidity,
        event: data.event,
        notes: data.coldChainNotes || "",
      },
    };

    addVaccineExportDetail(payload, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            Thêm lô vaccine
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package size={20} />
            Thêm lô vaccine vào xuất kho
          </DialogTitle>
          <DialogDescription>
            Thêm thông tin lô vaccine cần xuất kho và ghi log chuỗi lạnh
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Vaccine Batch Selection */}
              <FormField
                control={form.control}
                name="vaccineBatchId"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Lô vaccine *</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value?.toString()}
                      disabled={isLoadingBatches}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn lô vaccine" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vaccineBatches?.data?.pageData?.map(
                          (batch: VaccineBatch) => (
                            <SelectItem
                              key={batch.vaccineBatchId}
                              value={batch.vaccineBatchId!.toString()}
                            >
                              {batch.batchNumber} -{" "}
                              {batch.vaccineResponseDTO?.name}
                              (SL: {batch.quantity})
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Selected Batch Info */}
              {selectedBatch && (
                <div className="col-span-2 rounded-lg bg-blue-50 p-4">
                  <h4 className="mb-2 font-medium text-blue-900">
                    Thông tin lô vaccine đã chọn
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700">Số lô:</span>{" "}
                      <span className="font-medium">
                        {selectedBatch.batchNumber}
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-700">Tên vaccine:</span>{" "}
                      <span className="font-medium">
                        {selectedBatch.vaccineResponseDTO?.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-700">Số lượng hiện có:</span>{" "}
                      <span className="font-medium">
                        {selectedBatch.quantity}
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-700">Hạn sử dụng:</span>{" "}
                      <span className="font-medium">
                        {new Date(selectedBatch.expiryDate).toLocaleDateString(
                          "vi-VN",
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quantity */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số lượng xuất *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max={selectedBatch?.quantity || 999}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Purpose */}
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mục đích *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn mục đích" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Hủy lô">Hủy lô</SelectItem>
                        <SelectItem value="Chuyển kho">Chuyển kho</SelectItem>
                        <SelectItem value="Bán">Bán</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Notes */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Ghi chú</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Nhập ghi chú thêm..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Cold Chain Log Section */}
            <div className="border-t pt-4">
              <h3 className="mb-4 font-medium text-gray-900">
                Thông tin chuỗi lạnh
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Temperature */}
                <FormField
                  control={form.control}
                  name="temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nhiệt độ (°C) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          min="-50"
                          max="50"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
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
                  name="humidity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Độ ẩm (%) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
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
                  name="event"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sự kiện *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn sự kiện" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Xuất kho">Xuất kho</SelectItem>
                          <SelectItem value="Vận chuyển">Vận chuyển</SelectItem>
                          <SelectItem value="Nhập kho">Nhập kho</SelectItem>
                          <SelectItem value="Kiểm tra">Kiểm tra</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Cold Chain Notes */}
                <FormField
                  control={form.control}
                  name="coldChainNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ghi chú chuỗi lạnh</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ghi chú về điều kiện bảo quản..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Thêm vào xuất kho
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
