import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// ...existing code...
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Stethoscope,
  Clock,
  Syringe,
  Loader2,
  Dog,
  Cat,
} from "lucide-react";
import { useVaccineScheduleCreate } from "../hooks/useVaccineScheduleCreate";
import { useDiseaseBySpecies } from "../../diseases/hooks/useDiseaseBySpecies";
import type { VaccineSchedulePayload } from "../types/vaccine-schedule.payload.type";
import type { Disease } from "../../diseases/types/disease.type";

import {
  createVaccineScheduleSchema,
  type CreateVaccineScheduleFormData,
} from "../schemas/vaccine-schedule.schema";

interface CreateVaccineScheduleFormProps {
  defaultSpecies?: "dog" | "cat";
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

export default function CreateVaccineScheduleForm({
  defaultSpecies = "dog",
  onSuccess,
  trigger,
}: CreateVaccineScheduleFormProps) {
  const [open, setOpen] = useState(false);
  const createMutation = useVaccineScheduleCreate();

  const form = useForm<CreateVaccineScheduleFormData>({
    resolver: zodResolver(createVaccineScheduleSchema),
    defaultValues: {
      species: defaultSpecies,
      doseNumber: 1,
      ageInterval: 8,
    },
  });

  const selectedSpecies = form.watch("species");

  // Convert form species to API species format
  const apiSpecies = selectedSpecies === "dog" ? "Dog" : "Cat";

  const { data: diseases = [], isLoading: isLoadingDiseases } =
    useDiseaseBySpecies(apiSpecies) as { data: Disease[]; isLoading: boolean };

  // Reset disease selection when species changes
  useEffect(() => {
    form.resetField("diseaseId"); // Reset disease field when species changes
  }, [selectedSpecies, form]);

  const onSubmit = async (data: CreateVaccineScheduleFormData) => {
    // Đảm bảo species luôn là 'Dog' hoặc 'Cat' khi gửi lên API
    const payload: VaccineSchedulePayload = {
      diseaseId: data.diseaseId,
      species: data.species === "dog" ? "Dog" : "Cat",
      doseNumber: data.doseNumber,
      ageInterval: data.ageInterval,
    };

    try {
      await createMutation.mutateAsync(payload);
      setOpen(false);
      form.reset();
      onSuccess?.();
    } catch {
      // Error is handled by the mutation
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <Plus size={16} />
            Thêm lịch tiêm
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Stethoscope className="text-primary" size={24} />
            Tạo lịch tiêm mới
          </DialogTitle>
          <DialogDescription>
            Tạo lịch tiêm phòng cho thú cưng. Vui lòng điền đầy đủ thông tin bên
            dưới.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Species Selection */}
              <FormField
                control={form.control}
                name="species"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Loài
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={createMutation.isPending}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loài" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dog">
                          <div className="flex items-center gap-2">
                            <Dog size={18} /> Chó
                          </div>
                        </SelectItem>
                        <SelectItem value="cat">
                          <div className="flex items-center gap-2">
                            <Cat size={18} /> Mèo
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Disease Selection */}
              <FormField
                control={form.control}
                name="diseaseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Bệnh cần phòng
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      disabled={createMutation.isPending || isLoadingDiseases}
                      open={undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              isLoadingDiseases
                                ? "Đang tải danh sách bệnh..."
                                : diseases.length === 0
                                  ? "Không có bệnh nào"
                                  : "Chọn bệnh cần phòng"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingDiseases ? (
                          <div className="flex items-center justify-center p-4">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Đang tải...
                          </div>
                        ) : diseases.length === 0 ? (
                          <div className="text-muted-foreground flex items-center justify-center p-4">
                            Không có bệnh nào cho{" "}
                            {selectedSpecies === "dog" ? "chó" : "mèo"}
                          </div>
                        ) : (
                          diseases
                            .filter((disease) => disease.diseaseId !== null)
                            .map((disease) => (
                              <SelectItem
                                key={disease.diseaseId}
                                value={disease.diseaseId!.toString()}
                              >
                                {disease.name}
                              </SelectItem>
                            ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {isLoadingDiseases
                        ? "Đang tải danh sách bệnh..."
                        : diseases.length === 0
                          ? "Không có bệnh nào cho loài này"
                          : `${diseases.length} bệnh có sẵn cho ${selectedSpecies === "dog" ? "chó" : "mèo"}`}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Dose Number */}
              <FormField
                control={form.control}
                name="doseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Syringe size={16} />
                      Mũi tiêm thứ
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        placeholder="Nhập số mũi tiêm"
                        disabled={createMutation.isPending}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Số mũi tiêm cần thiết (1-10 mũi)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Age Interval */}
              <FormField
                control={form.control}
                name="ageInterval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Clock size={16} />
                      Khoảng cách tuổi (tuần)
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="520"
                        placeholder="Nhập khoảng cách tuổi"
                        disabled={createMutation.isPending}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Khoảng cách tuổi giữa các mũi tiêm (1-520 tuần)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Preview Card */}
            {form.watch("diseaseId") && (
              <Card className="border-primary/20 bg-primary/5 rounded-none py-3">
                <CardHeader className="pb-3">
                  <CardTitle className="font-nunito-600 text-lg">
                    Xem trước lịch tiêm
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-nunito">Loài:</span>{" "}
                      {selectedSpecies === "dog" ? "🐕 Chó" : "🐱 Mèo"}
                    </div>
                    <div>
                      <span className="font-nunito">Bệnh:</span>{" "}
                      {diseases.find(
                        (d) => d.diseaseId === form.watch("diseaseId"),
                      )?.name || "Chưa chọn"}
                    </div>
                    <div>
                      <span className="font-nunito">Số mũi tiêm:</span>{" "}
                      {form.watch("doseNumber")} mũi
                    </div>
                    <div>
                      <span className="font-nunito">Khoảng cách:</span>{" "}
                      {form.watch("ageInterval")} tuần
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={createMutation.isPending}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={!form.formState.isValid || createMutation.isPending}
                className="gap-2"
              >
                {createMutation.isPending && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Tạo lịch tiêm
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
