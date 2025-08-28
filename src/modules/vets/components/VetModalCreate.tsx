import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useVetCreate } from "../hooks/useVetCreate";
import { Mail, Lock, UserPlus } from "lucide-react";

// Validation schema for creating vet account
const vetCreateSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

type VetCreateFormType = {
  email: string;
  password: string;
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export function VetModalCreate({ open, onClose }: Props) {
  const createVetMutation = useVetCreate();

  const form = useForm<VetCreateFormType>({
    resolver: zodResolver(vetCreateSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: VetCreateFormType) => {
    try {
      await createVetMutation.mutateAsync({
        email: data.email,
        password: data.password,
        role: 3,
      });
      onClose();
      form.reset();
    } catch {
      // Error handled by mutation
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="bg-primary/10 mx-auto w-fit rounded-full p-3">
            <UserPlus className="text-primary h-6 w-6" />
          </div>
          <h2 className="font-nunito-700 text-dark text-2xl">
            Tạo tài khoản bác sĩ
          </h2>
          <p className="text-muted-foreground text-sm">
            Tạo tài khoản mới cho bác sĩ thú y
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-6"
          >
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-nunito-500">
                    <Mail className="mr-2 inline h-4 w-4" />
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Nhập email bác sĩ"
                      className="font-nunito-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-nunito-500">
                    <Lock className="mr-2 inline h-4 w-4" />
                    Mật khẩu
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Nhập mật khẩu"
                      className="font-nunito-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="font-nunito-500"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={createVetMutation.isPending}
                className="bg-primary hover:bg-secondary font-nunito-500"
              >
                {createVetMutation.isPending ? "Đang tạo..." : "Tạo tài khoản"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
