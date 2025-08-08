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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DiseasePayload } from "../types/disease.payload.type";
import { diseaseSchema, type DiseaseFormData } from "../schemas";

interface DiseaseModalCreateProps {
  open: boolean;
  onClose: () => void;
  submit: (data: DiseasePayload) => void;
  isSubmitting: boolean;
}

export function DiseaseModalCreate({
  open,
  onClose,
  submit,
  isSubmitting,
}: DiseaseModalCreateProps) {
  const form = useForm<DiseaseFormData>({
    resolver: zodResolver(diseaseSchema),
    defaultValues: {
      name: "",
      description: "",
      species: "",
      symptoms: "",
      treatment: "",
    },
  });

  const onSubmit = (data: DiseaseFormData) => {
    submit(data);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-linen max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-inter text-primary text-xl">
            Thêm bệnh mới
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-nunito-600">Tên bệnh</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tên bệnh"
                        className="font-nunito"
                        {...field}
                      />
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
                    <FormLabel className="font-nunito-600">Loài</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="font-nunito">
                          <SelectValue placeholder="Chọn loài" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Dog">Chó</SelectItem>
                        <SelectItem value="Cat">Mèo</SelectItem>
                        <SelectItem value="Both">Cả hai</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-nunito-600">Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập mô tả về bệnh"
                      className="font-nunito min-h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-nunito-600">Triệu chứng</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập các triệu chứng của bệnh"
                      className="font-nunito min-h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="treatment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-nunito-600">
                    Phương pháp điều trị
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập phương pháp điều trị"
                      className="font-nunito min-h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
                className="font-nunito"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="font-nunito"
              >
                {isSubmitting ? "Đang tạo..." : "Tạo bệnh"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
