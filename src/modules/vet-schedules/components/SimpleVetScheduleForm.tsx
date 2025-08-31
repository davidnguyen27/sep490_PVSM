import { useState, useEffect } from "react";
import { Button } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui";
import { X, Clock, Calendar as CalendarIcon } from "lucide-react";
import { useCreateSchedule } from "../hooks/useCreateSchedule";
import { useUpdateSchedule } from "../hooks/useUpdateSchedule";
import { format } from "date-fns";
import type { VetSchedulePayload } from "../types/vet-schedule.payload.type";
import type { VetSchedule } from "../types/vet-schedule.type";

interface SimpleVetScheduleFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
  selectedSlot?: number;
  existingSchedule?: VetSchedule;
  mode?: "add" | "edit";
}

export function SimpleVetScheduleForm({
  isOpen,
  onClose,
  selectedDate,
  selectedSlot,
  existingSchedule,
  mode = "add",
}: SimpleVetScheduleFormProps) {
  const [formData, setFormData] = useState({
    date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
    selectedSlots: [] as number[],
    status: 1, // 1: Trống (available)
  });

  const { mutate: createSchedule, isPending: isCreating } = useCreateSchedule();
  const { mutate: updateSchedule, isPending: isUpdating } = useUpdateSchedule();

  const isPending = isCreating || isUpdating;

  // Cập nhật form khi props thay đổi
  useEffect(() => {
    if (selectedDate) {
      setFormData((prev) => ({
        ...prev,
        date: format(selectedDate, "yyyy-MM-dd"),
      }));
    }
  }, [selectedDate]);

  // Load dữ liệu existing schedule khi edit mode
  useEffect(() => {
    if (mode === "edit" && existingSchedule) {
      setFormData({
        date: existingSchedule.scheduleDate.split("T")[0],
        selectedSlots: [existingSchedule.slotNumber],
        status: existingSchedule.status,
      });
    } else if (mode === "add") {
      // Reset form khi switch về add mode
      setFormData({
        date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
        selectedSlots: selectedSlot ? [selectedSlot] : [],
        status: 1,
      });
    }
  }, [mode, existingSchedule, selectedDate, selectedSlot]);

  const timeSlots = [
    { value: 8, label: "08:00 - 09:00", period: "Ca 1" },
    { value: 9, label: "09:00 - 10:00", period: "Ca 2" },
    { value: 10, label: "10:00 - 11:00", period: "Ca 3" },
    { value: 11, label: "11:00 - 12:00", period: "Ca 4" },
    { value: 13, label: "13:00 - 14:00", period: "Ca 5" },
    { value: 14, label: "14:00 - 15:00", period: "Ca 6" },
    { value: 15, label: "15:00 - 16:00", period: "Ca 7" },
    { value: 16, label: "16:00 - 17:00", period: "Ca 8" },
  ];

  const handleSlotToggle = (slotValue: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedSlots: prev.selectedSlots.includes(slotValue)
        ? prev.selectedSlots.filter((slot) => slot !== slotValue)
        : [...prev.selectedSlots, slotValue],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date || formData.selectedSlots.length === 0) {
      return;
    }

    // Lấy vetId từ localStorage (giống như useScheduleByVet)
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const vetId = user?.vetId;

    if (!vetId) {
      console.error("Không tìm thấy vetId");
      return;
    }

    const payload: VetSchedulePayload = {
      vetId,
      schedules: [
        {
          scheduleDate: formData.date,
          slotNumbers: formData.selectedSlots,
        },
      ],
      status: formData.status,
    };

    const onSuccessCallback = () => {
      onClose();
      // Reset form
      setFormData({
        date: "",
        selectedSlots: [],
        status: 1,
      });
    };

    if (mode === "edit") {
      updateSchedule(payload, {
        onSuccess: onSuccessCallback,
      });
    } else {
      createSchedule(payload, {
        onSuccess: onSuccessCallback,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CalendarIcon className="h-4 w-4" />
              {mode === "add"
                ? "Thêm lịch làm việc"
                : "Chỉnh sửa lịch làm việc"}
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date Selection */}
            <div className="space-y-2">
              <Label
                htmlFor="date"
                className="font-nunito-500 flex items-center gap-2 text-sm"
              >
                <CalendarIcon className="h-4 w-4" />
                Ngày làm việc
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, date: e.target.value }))
                }
                className="w-full"
                required
              />
            </div>

            {/* Time Slot Selection */}
            <div className="space-y-2">
              <Label
                htmlFor="timeSlot"
                className="font-nunito-500 flex items-center gap-2 text-sm"
              >
                <Clock className="h-4 w-4" />
                Ca làm việc
              </Label>
              <div className="space-y-1">
                {timeSlots.map((slot) => (
                  <label
                    key={slot.value}
                    className={`flex cursor-pointer items-center rounded-lg border p-2 transition-colors ${
                      formData.selectedSlots.includes(slot.value)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.selectedSlots.includes(slot.value)}
                      onChange={() => handleSlotToggle(slot.value)}
                      className="mr-3 text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="font-nunito-500 text-sm text-gray-900">
                        {slot.label}
                      </div>
                      <div className="text-xs text-gray-500">{slot.period}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Status Selection */}
            <div className="space-y-2">
              <Label htmlFor="status" className="font-nunito-500 text-sm">
                Trạng thái
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <label
                  className={`flex cursor-pointer items-center justify-center rounded-lg border p-2 transition-colors ${
                    formData.status === 1
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value="1"
                    checked={formData.status === 1}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        status: 1,
                      }))
                    }
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="mx-auto mb-1 h-3 w-3 rounded-full bg-green-500"></div>
                    <div className="font-nunito-500 text-xs">Trống</div>
                  </div>
                </label>

                <label
                  className={`flex cursor-pointer items-center justify-center rounded-lg border p-2 transition-colors ${
                    formData.status === 0
                      ? "border-gray-500 bg-gray-50 text-gray-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value="0"
                    checked={formData.status === 0}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        status: 0,
                      }))
                    }
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="mx-auto mb-1 h-3 w-3 rounded-full bg-gray-400"></div>
                    <div className="font-nunito-500 text-xs">Không có lịch</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-3">
              <Button
                type="submit"
                className="flex-1"
                size="sm"
                disabled={
                  !formData.date ||
                  formData.selectedSlots.length === 0 ||
                  isPending
                }
              >
                {isPending
                  ? mode === "edit"
                    ? "Đang cập nhật..."
                    : "Đang tạo..."
                  : mode === "add"
                    ? "Tạo lịch"
                    : "Cập nhật"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                size="sm"
                disabled={isPending}
              >
                Hủy
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
