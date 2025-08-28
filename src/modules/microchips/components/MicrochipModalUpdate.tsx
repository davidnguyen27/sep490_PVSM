import { useForm } from "react-hook-form";
import {
  microchipSchema,
  type MicrochipSchema,
} from "../schemas/microchip.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
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
import { Input, Button } from "@/components/ui";
import { Textarea } from "@/components/ui/textarea";
import type { MicrochipPayload } from "../types/payload.type";

interface Props {
  open: boolean;
  onClose: () => void;
  submit?: (payload: MicrochipSchema) => void;
  isSubmitting?: boolean;
  defaultValues: MicrochipPayload;
}

export function MicrochipModalUpdate({
  open,
  onClose,
  submit,
  isSubmitting = false,
  defaultValues,
}: Props) {
  const form = useForm<MicrochipSchema>({
    resolver: zodResolver(microchipSchema),
    defaultValues: {
      microchipCode: defaultValues?.microchipCode ?? "",
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      price: defaultValues?.price ?? 0,
      notes: defaultValues?.notes ?? "",
      petId: defaultValues?.createMicrochipItemRequest?.petId ?? 0,
      location: defaultValues?.createMicrochipItemRequest?.location ?? "",
      installationDate:
        defaultValues?.createMicrochipItemRequest?.installationDate ??
        new Date().toISOString().split("T")[0],
    },
  });

  const handleSubmit = (values: MicrochipSchema) => {
    submit?.(values);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
          form.reset();
        }
      }}
    >
      <DialogContent className="max-w-2xl space-y-4 rounded-none px-6 py-4">
        <DialogHeader>
          <DialogTitle className="text-primary font-nunito-700 mb-4 text-xl">
            Cập nhật microchip
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="microchipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã microchip</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nhập mã microchip" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên microchip</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nhập tên microchip" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá tiền (VNĐ)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value) || 0)
                      }
                      placeholder="Nhập giá tiền"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả ngắn</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Mô tả ngắn" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vị trí</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nhập vị trí cài đặt" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="installationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày cài đặt</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      placeholder="Chọn ngày cài đặt"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Ghi chú</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} placeholder="Ghi chú" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 md:col-span-2">
              <Button
                variant="destructive"
                onClick={onClose}
                type="button"
                disabled={isSubmitting}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Đang lưu..." : "Lưu"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
