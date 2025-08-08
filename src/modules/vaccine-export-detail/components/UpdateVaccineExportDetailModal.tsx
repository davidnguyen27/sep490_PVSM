import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/shared";
import { formatData } from "@/shared/utils/format.utils";
import { useUpdateExportDetail } from "../hooks/useUpdateExportDetail";
import { useExportDetailById } from "../hooks";
import type { VaccineExportDetailPayload } from "../types/payload.type";

// Schema validation
const updateVaccineExportDetailSchema = z.object({
  quantity: z.number().min(1, "Số lượng phải lớn hơn 0"),
  purpose: z.string().min(1, "Vui lòng nhập mục đích"),
  notes: z.string().optional(),
  temperature: z.number().min(-50).max(50),
  humidity: z.number().min(0).max(100),
  event: z.string().min(1, "Vui lòng nhập sự kiện"),
  coldChainNotes: z.string().optional(),
});

type FormData = z.infer<typeof updateVaccineExportDetailSchema>;

interface UpdateVaccineExportDetailModalProps {
  trigger?: React.ReactNode;
  exportDetailId: number;
}

export function UpdateVaccineExportDetailModal({
  trigger,
  exportDetailId,
}: UpdateVaccineExportDetailModalProps) {
  const [open, setOpen] = useState(false);

  const { data: exportDetail, isPending: isLoadingDetail } =
    useExportDetailById(open ? exportDetailId : null);

  const { mutate: updateExportDetail, isPending } = useUpdateExportDetail();

  const form = useForm<FormData>({
    resolver: zodResolver(updateVaccineExportDetailSchema),
    defaultValues: {
      quantity: 1,
      purpose: "",
      notes: "",
      temperature: 2,
      humidity: 60,
      event: "Cập nhật xuất kho",
      coldChainNotes: "",
    },
  });

  // Load dữ liệu vào form khi có exportDetail
  useEffect(() => {
    if (exportDetail && open) {
      form.reset({
        quantity: exportDetail.quantity,
        purpose: exportDetail.purpose,
        notes: exportDetail.notes || "",
        temperature: 2,
        humidity: 60,
        event: "Cập nhật xuất kho",
        coldChainNotes: "",
      });
    }
  }, [exportDetail, open, form]);

  const onSubmit = (data: FormData) => {
    const payload: VaccineExportDetailPayload = {
      vaccineExportId: exportDetail?.vaccineExportId || 0,
      vaccineBatchId: exportDetail?.vaccineBatchId || 0,
      quantity: data.quantity,
      purpose: data.purpose,
      notes: data.notes || "",
      coldChainLog: {
        vaccineBatchId: exportDetail?.vaccineBatchId || 0,
        logTime: new Date().toISOString(),
        temperature: data.temperature,
        humidity: data.humidity,
        event: data.event,
        notes: data.coldChainNotes || "",
      },
    };

    updateExportDetail(
      { exportDetailId, payload },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="flex items-center gap-2">
            <Edit size={16} />
            Cập nhật
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit size={20} />
            Cập nhật chi tiết xuất kho
          </DialogTitle>
        </DialogHeader>

        {isLoadingDetail ? (
          <div className="flex h-96 items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Current Export Detail Info */}
              {exportDetail && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Thông tin hiện tại
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">
                          Lô vaccine hiện tại:
                        </span>
                        <p className="font-medium text-blue-600">
                          {exportDetail.vaccineBatch?.batchNumber || "N/A"}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Tên vaccine:</span>
                        <p className="font-medium">
                          {exportDetail.vaccineBatch?.vaccineResponseDTO
                            ?.name || "N/A"}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Số lượng đã xuất:</span>
                        <p className="font-medium text-green-600">
                          {exportDetail.quantity} đơn vị
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Mục đích:</span>
                        <p className="font-medium">{exportDetail.purpose}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Current Vaccine Batch Info */}
              {exportDetail?.vaccineBatch && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Thông tin lô vaccine
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Số lô:</span>
                        <p className="font-medium text-blue-600">
                          {exportDetail.vaccineBatch.batchNumber}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Tên vaccine:</span>
                        <p className="font-medium">
                          {exportDetail.vaccineBatch.vaccineResponseDTO?.name}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Số lượng tồn:</span>
                        <p className="font-medium">
                          {exportDetail.vaccineBatch.quantity} đơn vị
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Hạn sử dụng:</span>
                        <p className="font-medium">
                          {formatData.formatDate(
                            exportDetail.vaccineBatch.expiryDate,
                          )}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Mã vaccine:</span>
                        <p className="font-medium">
                          {
                            exportDetail.vaccineBatch.vaccineResponseDTO
                              ?.vaccineCode
                          }
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Ngày sản xuất:</span>
                        <p className="font-medium">
                          {formatData.formatDate(
                            exportDetail.vaccineBatch.manufactureDate,
                          )}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Export Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Thông tin xuất kho</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                              max={exportDetail?.vaccineBatch?.quantity || 999}
                              placeholder="Nhập số lượng"
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

                    <FormField
                      control={form.control}
                      name="purpose"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mục đích xuất kho *</FormLabel>
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
                              <SelectItem value="Tiêm chủng">
                                Tiêm chủng
                              </SelectItem>
                              <SelectItem value="Chuyển kho">
                                Chuyển kho
                              </SelectItem>
                              <SelectItem value="Xuất bán">Xuất bán</SelectItem>
                              <SelectItem value="Hỏng hóc">Hỏng hóc</SelectItem>
                              <SelectItem value="Hết hạn">Hết hạn</SelectItem>
                              <SelectItem value="Khác">Khác</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
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
                            placeholder="Nhập ghi chú (nếu có)"
                            className="resize-none"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Cold Chain Log */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ghi log chuỗi lạnh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="temperature"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nhiệt độ (°C) *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="-50"
                              max="50"
                              step="0.1"
                              placeholder="2"
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
                              placeholder="60"
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

                    <FormField
                      control={form.control}
                      name="event"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sự kiện *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn sự kiện" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Cập nhật xuất kho">
                                Cập nhật xuất kho
                              </SelectItem>
                              <SelectItem value="Kiểm tra nhiệt độ">
                                Kiểm tra nhiệt độ
                              </SelectItem>
                              <SelectItem value="Chuyển kho">
                                Chuyển kho
                              </SelectItem>
                              <SelectItem value="Bảo trì thiết bị">
                                Bảo trì thiết bị
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="coldChainNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ghi chú chuỗi lạnh</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Nhập ghi chú về điều kiện bảo quản"
                            className="resize-none"
                            rows={2}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Separator />

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isPending}
                >
                  Hủy
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Spinner />
                      Đang cập nhật...
                    </>
                  ) : (
                    <>
                      <Edit size={16} />
                      Cập nhật
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
