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

interface Props {
  open: boolean;
  onClose: () => void;
  submit?: (payload: MicrochipSchema) => void;
  isSubmitting?: boolean;
}

export function MicrochipModalCreate({
  open,
  onClose,
  submit,
  isSubmitting = false,
}: Props) {
  const form = useForm<MicrochipSchema>({
    resolver: zodResolver(microchipSchema),
    defaultValues: {
      microchipCode: "",
      name: "",
      description: "",
      price: 0,
      notes: "",
      petId: 0, // Mặc định petId = 0
      // itemName và itemDescription đã bị loại bỏ khỏi form
      location: "",
      installationDate: new Date().toISOString().split("T")[0], // Ngày hiện tại
    },
  });

  const handleSubmit = (values: MicrochipSchema) => {
    submit?.(values);
    form.reset();
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
      <DialogContent className="max-h-[90vh] max-w-4xl space-y-4 overflow-y-auto rounded-none px-6 py-4">
        <DialogHeader>
          <DialogTitle className="text-primary font-nunito-700 mb-4 text-xl">
            Thêm mới microchip
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {/* Microchip Basic Info */}
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
