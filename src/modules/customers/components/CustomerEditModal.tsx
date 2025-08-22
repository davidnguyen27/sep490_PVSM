import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Button,
} from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { User, Phone, Mail, MapPin, Calendar, UserCheck } from "lucide-react";
import type { Customer } from "../types/customer.type";
import { customerUpdateSchema, type CustomerUpdateSchema } from "../schemas";

// Format date yyyy-mm-dd -> dd/mm/yyyy
function formatDateToDMY(dateStr?: string) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  if (!y || !m || !d) return dateStr;
  return `${d}/${m}/${y}`;
}
// Format date dd/mm/yyyy -> yyyy-mm-dd
function formatDateToYMD(dateStr: string) {
  const [d, m, y] = dateStr.split("/");
  if (!d || !m || !y) return dateStr;
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

interface Props {
  open: boolean;
  onClose: () => void;
  customer: Customer | null;
  onSubmit: (data: CustomerUpdateSchema) => void;
  isLoading?: boolean;
}

export function CustomerEditModal({
  open,
  onClose,
  customer,
  onSubmit,
  isLoading = false,
}: Props) {
  const form = useForm<CustomerUpdateSchema>({
    resolver: zodResolver(customerUpdateSchema),
    defaultValues: {
      fullName: "",
      userName: "",
      phoneNumber: "",
      email: "",
      dateOfBirth: "",
      gender: "Male",
      address: "",
    },
  });

  // Reset form when customer data changes
  useEffect(() => {
    if (customer) {
      form.reset({
        fullName: customer.fullName || "",
        userName: customer.userName || "",
        phoneNumber: customer.phoneNumber || "",
        email: customer.accountResponseDTO?.email || "",
        dateOfBirth: formatDateToDMY(customer.dateOfBirth),
        gender: (customer.gender as "Male" | "Female") || "Male",
        address: customer.address || "",
      });
    }
  }, [customer, form]);

  const handleSubmit = (data: CustomerUpdateSchema) => {
    // Convert dateOfBirth to yyyy-mm-dd before submit
    const submitData = {
      ...data,
      dateOfBirth: formatDateToYMD(data.dateOfBirth),
    };
    onSubmit(submitData);
  };

  const handleClose = () => {
    form.reset({
      fullName: "",
      userName: "",
      phoneNumber: "",
      email: "",
      dateOfBirth: "",
      gender: "Male",
      address: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary font-nunito-700 mb-4 flex items-center gap-2 text-lg">
            <User size={20} />
            Chỉnh sửa thông tin khách hàng
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="font-nunito space-y-6"
          >
            {/* Show loading state when fetching customer data */}
            {!customer && isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="border-primary mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2"></div>
                  <p className="text-muted-foreground font-nunito text-sm">
                    Đang tải thông tin khách hàng...
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User size={16} className="text-primary" />
                        Họ và tên
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập họ và tên"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* User Name */}
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <UserCheck size={16} className="text-green-600" />
                        Tên đăng nhập
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập tên đăng nhập"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone size={16} className="text-blue-600" />
                        Số điện thoại
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập số điện thoại"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  disabled
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Mail size={16} className="text-purple-600" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Nhập email"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date of Birth */}
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Calendar size={16} className="text-orange-600" />
                        Ngày sinh
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="dd/mm/yyyy"
                          disabled={isLoading}
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giới tính</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn giới tính" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Nam</SelectItem>
                          <SelectItem value="Female">Nữ</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {/* Address - only show when not loading */}
            {(customer || !isLoading) && (
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin size={16} className="text-red-600" />
                      Địa chỉ
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Nhập địa chỉ đầy đủ"
                        disabled={isLoading}
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}{" "}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="font-nunito-500 min-w-[100px]"
              >
                {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
