import { useForm } from "react-hook-form";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatData } from "@/shared/utils/format.utils";

interface ScheduleFormValues {
  date: string;
  timeSlot: string;
  status: "available" | "unavailable";
}

interface VetScheduleFormProps {
  mode: "add" | "edit";
  selectedDate: Date;
  selectedSlot: number | null;
  onSubmit: (values: ScheduleFormValues) => void;
  onClose: () => void;
}

const timeSlots = [
  { id: 1, time: "08:00 - 10:00", label: "Sáng sớm" },
  { id: 2, time: "10:00 - 12:00", label: "Trưa" },
  { id: 3, time: "13:00 - 15:00", label: "Chiều sớm" },
  { id: 4, time: "15:00 - 17:00", label: "Chiều muộn" },
  { id: 5, time: "18:00 - 20:00", label: "Tối" },
];

export function VetScheduleForm({
  mode,
  selectedDate,
  selectedSlot,
  onSubmit,
  onClose,
}: VetScheduleFormProps) {
  const formatDateToYMD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDateToDMY = (date: Date) => {
    return formatData.formatDate(date.toISOString());
  };

  const form = useForm<ScheduleFormValues>({
    defaultValues: {
      date: formatDateToYMD(selectedDate),
      timeSlot: selectedSlot?.toString() || "",
      status: "available",
    },
  });

  const handleSubmit = (values: ScheduleFormValues) => {
    onSubmit(values);
    onClose();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {mode === "add"
            ? "Thêm lịch làm việc mới"
            : "Chỉnh sửa lịch làm việc"}
        </DialogTitle>
        <DialogDescription>
          {mode === "add"
            ? "Vui lòng chọn ngày và ca làm việc của bạn."
            : "Cập nhật trạng thái ca làm việc của bạn."}
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {mode === "add" ? (
            <>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày</FormLabel>
                    <FormControl>
                      <input
                        type="date"
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeSlot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ca làm việc</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn ca làm việc" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot.id} value={slot.id.toString()}>
                            {slot.time} - {slot.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Ngày:</span>
                <span className="font-semibold">
                  {formatDateToDMY(selectedDate)}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Ca làm việc:</span>
                <span className="font-semibold">
                  {selectedSlot &&
                    timeSlots.find((s) => s.id === selectedSlot)?.time}
                  {selectedSlot &&
                    ` - ${timeSlots.find((s) => s.id === selectedSlot)?.label}`}
                </span>
              </div>
            </>
          )}

          <FormField
            control={form.control}
            name="status"
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
                    <SelectItem value="available">
                      Có thể nhận lịch hẹn
                    </SelectItem>
                    <SelectItem value="unavailable">
                      Không thể nhận lịch hẹn
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">
              {mode === "add" ? "Lưu lịch làm việc" : "Cập nhật"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
