import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVaccinationUpdateById } from "../hooks/useVaccinationUpdateById";
import {
  updateVaccinationAppointmentSchema,
  type UpdateVaccinationAppointmentForm,
} from "../schemas/vaccination.schema";
import type { VaccinationApp } from "../types/vaccination.type";
import type { VaccinationPayload } from "../types/vaccination.payload.type";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  appointment: VaccinationApp | null;
}

export function UpdateAppointmentModal({
  isOpen,
  onClose,
  appointment,
}: Props) {
  const updateMutation = useVaccinationUpdateById();

  const form = useForm<UpdateVaccinationAppointmentForm>({
    resolver: zodResolver(updateVaccinationAppointmentSchema),
    defaultValues: {
      appointmentDate: appointment?.appointment.appointmentDate
        ? new Date(appointment.appointment.appointmentDate)
        : new Date(),
      serviceType: appointment?.appointment.serviceType || 1,
      location: appointment?.appointment.location || 1,
      address: appointment?.appointment.address || "",
      diseaseId: null,
    },
  });

  // Reset form when appointment changes
  useEffect(() => {
    if (appointment) {
      form.reset({
        appointmentDate: new Date(appointment.appointment.appointmentDate),
        serviceType: appointment.appointment.serviceType,
        location: appointment.appointment.location,
        address: appointment.appointment.address,
        diseaseId: null,
      });
    }
  }, [appointment, form]);

  const onSubmit = async (data: UpdateVaccinationAppointmentForm) => {
    if (!appointment) return;

    const payload: VaccinationPayload = {
      appointment: {
        customerId: appointment.appointment.customerResponseDTO.customerId,
        petId: appointment.appointment.petResponseDTO.petId,
        appointmentDate: data.appointmentDate.toISOString(),
        serviceType: data.serviceType,
        location: data.location,
        address: data.address,
      },
      updateDiseaseForAppointmentDTO: {
        diseaseId: data.diseaseId || null,
      },
    };

    try {
      await updateMutation.mutateAsync({
        appointmentId: appointment.appointment.appointmentId,
        payload,
      });
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-inter-600 text-xl">
            Cập nhật lịch hẹn tiêm vắc-xin
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Appointment Date & Time */}
            <FormField
              control={form.control}
              name="appointmentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày & giờ hẹn</FormLabel>
                  <FormControl>
                    <input
                      type="datetime-local"
                      className="input input-bordered w-full"
                      value={
                        field.value
                          ? (() => {
                              // format to yyyy-MM-ddTHH:mm for input
                              const d = field.value as Date;
                              const pad = (n: number) =>
                                n.toString().padStart(2, "0");
                              return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
                            })()
                          : ""
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val ? new Date(val) : null);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Service Type */}
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại dịch vụ</FormLabel>
                  <Select
                    value={field.value.toString()}
                    onValueChange={(value) => field.onChange(parseInt(value))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại dịch vụ" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">
                        Tiêm vắc-xin tại phòng khám
                      </SelectItem>
                      <SelectItem value="2">Tiêm vắc-xin tại nhà</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa điểm</FormLabel>
                  <Select
                    value={field.value.toString()}
                    onValueChange={(value) => field.onChange(parseInt(value))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn địa điểm" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Phòng khám VaxPet</SelectItem>
                      <SelectItem value="2">Tại nhà khách hàng</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Nhập địa chỉ chi tiết"
                      rows={3}
                    />
                  </FormControl>
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
                  <FormLabel>Bệnh cần tiêm phòng</FormLabel>
                  <Select
                    value={field.value?.toString() || ""}
                    onValueChange={(value) =>
                      field.onChange(value ? parseInt(value) : null)
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn bệnh cần tiêm phòng" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Dại</SelectItem>
                      <SelectItem value="2">Parvovirus</SelectItem>
                      <SelectItem value="3">Distemper</SelectItem>
                      <SelectItem value="4">Hepatitis</SelectItem>
                      <SelectItem value="5">Parainfluenza</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={updateMutation.isPending}
                className="bg-primary hover:bg-secondary"
              >
                {updateMutation.isPending ? "Đang cập nhật..." : "Cập nhật"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
