import { useForm } from "react-hook-form";
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
import type { Pet } from "../types/pet.type";
import { petSchema, type PetSchema } from "../schemas/pet.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, type ChangeEvent } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  submit?: (payload: PetSchema) => void;
  isSubmitting?: boolean;
  defaultValues: Pet;
}
export function PetModalUpdate({
  open,
  onClose,
  submit,
  isSubmitting = false,
  defaultValues,
}: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    defaultValues?.image ?? null,
  );
  const form = useForm<PetSchema>({
    resolver: zodResolver(petSchema),
    ...defaultValues,
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      form.setValue("image", file); // save file to form
    }
  };

  const handleSubmit = (values: PetSchema) => {
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
      <DialogContent className="max-w-2xl space-y-4 px-6 py-4">
        <DialogHeader>
          <DialogTitle className="text-primary font-nunito-700 text-2xl">
            Cập nhật thú cưng
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên thú cưng</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nhập tên thú cưng" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="species"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loài</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ví dụ: chó, mèo, ..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giống</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ví dụ: mèo anh lông ngắn, chihuahua, ..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giới tính</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn giới tính" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem {...field} value="gender" />
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày sinh</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value) || 0)
                      }
                      placeholder="Chọn ngày sinh thú cưng"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="placeToLive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nơi sống</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nhập nơi sống" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="placeOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nơi sinh</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nhập nơi sinh" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cân nặng</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Nhập cân nặng"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Màu lông</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Màu lông" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quốc tịch</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Quốc tịch" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isSterilized"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tình trạng triệt sản</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn giới tính" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem {...field} value="isSterilized" />
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Hình ảnh</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-3">
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Ảnh xem trước"
                          className="h-32 w-32 rounded border object-cover"
                        />
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e)}
                      />
                    </div>
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
