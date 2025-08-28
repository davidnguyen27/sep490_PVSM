import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
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
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useVets } from "@/modules/vets/hooks/useVets";
import { useStaffCreateSchedule } from "../hooks/useStaffCreateSchedule";
import { useStaffUpdateSchedule } from "../hooks/useStaffUpdateSchedule";
import type { VetSchedule } from "../types/vet-schedule.type";

interface StaffScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  existingSchedule?: VetSchedule | null;
  selectedDate?: Date;
}

interface FormData {
  vetId: string;
  scheduleDate: Date;
  slotNumbers: number[];
  status: string;
}

// Constants
const timeSlots = [
  { id: 8, time: "08:00 - 09:00", label: "Ca 1" },
  { id: 9, time: "09:00 - 10:00", label: "Ca 2" },
  { id: 10, time: "10:00 - 11:00", label: "Ca 3" },
  { id: 11, time: "11:00 - 12:00", label: "Ca 4" },
  { id: 13, time: "13:00 - 14:00", label: "Ca 5" },
  { id: 14, time: "14:00 - 15:00", label: "Ca 6" },
  { id: 15, time: "15:00 - 16:00", label: "Ca 7" },
  { id: 16, time: "16:00 - 17:00", label: "Ca 8" },
];

const statusOptions = [
  { value: "1", label: "Trống", color: "bg-green-100 text-green-800" },
  { value: "2", label: "Trễ hẹn", color: "bg-orange-100 text-orange-800" },
  { value: "3", label: "Đã đặt", color: "bg-blue-100 text-blue-800" },
];

export function StaffScheduleModal({
  isOpen,
  onClose,
  mode,
  existingSchedule,
  selectedDate,
}: StaffScheduleModalProps) {
  const [selectedSlots, setSelectedSlots] = useState<number[]>(
    existingSchedule ? [existingSchedule.slotNumber] : [],
  );

  // Tính toán ngày mặc định cho scheduleDate khi tạo mới
  const defaultScheduleDate = useMemo(() => {
    let result = new Date();
    if (mode === "add") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate) {
        const sel = new Date(selectedDate);
        sel.setHours(0, 0, 0, 0);
        if (sel <= today) {
          // Nếu là hôm nay hoặc quá khứ, lấy ngày mai
          result = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        } else {
          // Nếu là tương lai, lấy selectedDate
          result = selectedDate;
        }
      } else {
        // Không có selectedDate, lấy ngày mai
        result = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      }
    } else if (existingSchedule) {
      result = new Date(existingSchedule.scheduleDate);
    }
    return result;
  }, [mode, selectedDate, existingSchedule]);

  const form = useForm<FormData>({
    defaultValues: {
      vetId: existingSchedule?.vetId?.toString() || "",
      scheduleDate: defaultScheduleDate,
      slotNumbers: existingSchedule ? [existingSchedule.slotNumber] : [],
      status: existingSchedule?.status?.toString() || "1",
    },
  });

  // Update form when existingSchedule changes
  useEffect(() => {
    if (existingSchedule) {
      form.setValue("vetId", existingSchedule.vetId?.toString() || "");
      form.setValue("scheduleDate", new Date(existingSchedule.scheduleDate));
      form.setValue("slotNumbers", [existingSchedule.slotNumber]);
      form.setValue("status", existingSchedule.status?.toString() || "1");
      setSelectedSlots([existingSchedule.slotNumber]);
    } else {
      // Khi tạo mới, sử dụng defaultScheduleDate thay vì new Date()
      form.reset({
        vetId: "",
        scheduleDate: defaultScheduleDate,
        slotNumbers: [],
        status: "1",
      });
      setSelectedSlots([]);
    }
  }, [existingSchedule, form, defaultScheduleDate]);

  // Hooks
  const { data: vetsResponse, isLoading: isLoadingVets } = useVets({
    pageNumber: 1,
    pageSize: 100, // Lấy nhiều bác sĩ
    keyWord: "",
  });

  const { mutate: createSchedule, isPending: isCreating } =
    useStaffCreateSchedule();
  const { mutate: updateSchedule, isPending: isUpdating } =
    useStaffUpdateSchedule();

  const vets = vetsResponse?.data?.pageData || [];
  const isLoading = isCreating || isUpdating;

  const handleSlotToggle = (slotId: number) => {
    setSelectedSlots((prev) => {
      const newSlots = prev.includes(slotId)
        ? prev.filter((id) => id !== slotId)
        : [...prev, slotId];

      form.setValue("slotNumbers", newSlots);
      return newSlots;
    });
  };

  const onSubmit = (data: FormData) => {
    if (mode === "add") {
      // Tạo lịch làm việc mới cho multiple slots
      data.slotNumbers.forEach((slotNumber) => {
        createSchedule({
          vetId: parseInt(data.vetId),
          scheduleDate: format(data.scheduleDate, "yyyy-MM-dd"),
          slotNumber,
          status: parseInt(data.status),
        });
      });
    } else {
      // Cập nhật lịch làm việc (chỉ 1 slot)
      if (existingSchedule && data.slotNumbers.length === 1) {
        updateSchedule({
          vetId: parseInt(data.vetId),
          scheduleDate: format(data.scheduleDate, "yyyy-MM-dd"),
          slotNumber: data.slotNumbers[0],
          status: parseInt(data.status),
        });
      }
    }

    // Reset form và đóng modal
    form.reset();
    setSelectedSlots([]);
    onClose();
  };

  const handleClose = () => {
    form.reset();
    setSelectedSlots([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="text-primary h-5 w-5" />
            {mode === "add"
              ? "Tạo lịch làm việc mới"
              : "Chỉnh sửa lịch làm việc"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Chọn bác sĩ */}
              <FormField
                control={form.control}
                name="vetId"
                rules={{ required: "Vui lòng chọn bác sĩ" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Chọn bác sĩ
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn bác sĩ thú y" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingVets ? (
                          <div className="flex items-center justify-center p-4">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="ml-2">Đang tải...</span>
                          </div>
                        ) : vets.length === 0 ? (
                          <div className="p-4 text-center text-gray-500">
                            Không có bác sĩ nào
                          </div>
                        ) : (
                          vets.map((vet) => (
                            <SelectItem
                              key={vet.vetId}
                              value={vet.vetId.toString()}
                            >
                              <div className="flex flex-col">
                                <span className="font-medium">{vet.name}</span>
                                <span className="text-sm text-gray-500">
                                  {vet.specialization} - {vet.vetCode}
                                </span>
                              </div>
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Chọn ngày */}
              <FormField
                control={form.control}
                name="scheduleDate"
                rules={{ required: "Vui lòng chọn ngày" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Chọn ngày
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy", { locale: vi })
                            ) : (
                              <span>Chọn ngày</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return (
                              date <= today || date < new Date("1900-01-01")
                            );
                          }}
                          initialFocus
                          locale={vi}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Chọn trạng thái */}
            <FormField
              control={form.control}
              name="status"
              rules={{ required: "Vui lòng chọn trạng thái" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng thái</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          <div className="flex items-center gap-2">
                            <Badge className={status.color}>
                              {status.label}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Chọn ca làm việc */}
            <FormField
              control={form.control}
              name="slotNumbers"
              rules={{
                required: "Vui lòng chọn ít nhất một ca làm việc",
                validate: (value) =>
                  value.length > 0 || "Vui lòng chọn ít nhất một ca làm việc",
              }}
              render={() => (
                <FormItem>
                  <FormLabel>
                    Chọn ca làm việc
                    {mode === "edit" && (
                      <span className="ml-2 text-sm text-gray-500">
                        (Chế độ chỉnh sửa - chỉ chọn 1 ca)
                      </span>
                    )}
                  </FormLabel>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {timeSlots.map((slot) => (
                      <div
                        key={slot.id}
                        onClick={() => {
                          if (mode === "edit") {
                            // Chỉ cho phép chọn 1 slot khi edit
                            setSelectedSlots([slot.id]);
                            form.setValue("slotNumbers", [slot.id]);
                          } else {
                            handleSlotToggle(slot.id);
                          }
                        }}
                        className={cn(
                          "hover:border-primary cursor-pointer rounded-lg border p-3 text-center transition-all",
                          selectedSlots.includes(slot.id)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-gray-200 hover:bg-gray-50",
                        )}
                      >
                        <div className="font-medium">{slot.label}</div>
                        <div className="text-sm text-gray-500">{slot.time}</div>
                      </div>
                    ))}
                  </div>
                  {selectedSlots.length > 0 && (
                    <div className="mt-2">
                      <span className="text-sm text-gray-600">
                        Đã chọn: {selectedSlots.length} ca làm việc
                        {mode === "add" && selectedSlots.length > 1 && (
                          <span className="ml-1 text-blue-600">
                            (Sẽ tạo {selectedSlots.length} lịch làm việc)
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isLoading || selectedSlots.length === 0}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === "add" ? "Tạo lịch" : "Cập nhật"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
