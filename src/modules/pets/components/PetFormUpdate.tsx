import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input, Button } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { PetSchema } from "../schemas/pet.schema";
import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  Dog,
  PawPrint,
  BadgeInfo,
  Heart,
  MapPin,
  Calendar,
  Weight,
  Palette,
  Globe,
  CheckCircle,
  Camera,
  Save,
  ImageIcon,
} from "lucide-react";

interface Props {
  form: UseFormReturn<PetSchema>;
  onSubmit: (data: PetSchema) => void;
}

export function PetFormUpdate({ form, onSubmit }: Props) {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const img = form.getValues("image");
    if (typeof img === "string") {
      setPreview(img);
    }
  }, [form]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Thông tin cơ bản */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary flex items-center space-x-2 text-lg">
              <PawPrint size={20} />
              <span>Thông tin cơ bản</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Tên thú cưng */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <PawPrint size={16} className="text-primary" />
                      Tên thú cưng
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tên thú cưng"
                        className="border-border focus:border-primary focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Loài */}
              <FormField
                control={form.control}
                name="species"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <Dog size={16} className="text-primary" />
                      Loài
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loài" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dog">🐕 Chó</SelectItem>
                          <SelectItem value="Cat">🐱 Mèo</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Giống */}
              <FormField
                control={form.control}
                name="breed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <BadgeInfo size={16} className="text-primary" />
                      Giống
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập giống"
                        className="border-border focus:border-primary focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Giới tính */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <Heart size={16} className="text-primary" />
                      Giới tính
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn giới tính" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">♂️ Đực</SelectItem>
                          <SelectItem value="Female">♀️ Cái</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Ngày sinh */}
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <Calendar size={16} className="text-primary" />
                      Ngày sinh
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="border-border focus:border-primary focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cân nặng */}
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <Weight size={16} className="text-primary" />
                      Cân nặng (kg)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập cân nặng"
                        type="number"
                        step="0.1"
                        className="border-border focus:border-primary focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Màu sắc */}
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem className="md:col-span-1">
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <Palette size={16} className="text-primary" />
                      Màu sắc
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập màu sắc"
                        className="border-border focus:border-primary focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Thông tin địa chỉ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary flex items-center space-x-2 text-lg">
              <MapPin size={20} />
              <span>Thông tin địa chỉ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Nơi sinh */}
              <FormField
                control={form.control}
                name="placeOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <MapPin size={16} className="text-primary" />
                      Nơi sinh
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập nơi sinh"
                        className="border-border focus:border-primary focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nơi ở hiện tại */}
              <FormField
                control={form.control}
                name="placeToLive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <MapPin size={16} className="text-primary" />
                      Nơi ở hiện tại
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập nơi ở hiện tại"
                        className="border-border focus:border-primary focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Quốc tịch */}
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <Globe size={16} className="text-primary" />
                      Quốc tịch
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập quốc tịch"
                        className="border-border focus:border-primary focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Hình ảnh và tình trạng */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary flex items-center space-x-2 text-lg">
              <Camera size={20} />
              <span>Hình ảnh & Tình trạng</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Checkbox Triệt sản */}
            <FormField
              control={form.control}
              name="isSterilized"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-y-0 space-x-3 rounded-md border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle size={16} className="text-primary" />
                      Đã triệt sản
                    </FormLabel>
                    <p className="text-muted-foreground text-sm">
                      Đánh dấu nếu thú cưng đã được triệt sản
                    </p>
                  </div>
                </FormItem>
              )}
            />

            {/* Ảnh hiện tại */}
            <div className="space-y-4">
              <FormLabel className="flex items-center gap-2 text-sm font-medium">
                <ImageIcon size={16} className="text-primary" />
                Ảnh thú cưng hiện tại
              </FormLabel>
              {preview ? (
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Ảnh thú cưng"
                      className="border-primary/30 h-48 w-48 rounded-lg border-2 border-dashed object-cover shadow-lg"
                    />
                    <div className="absolute inset-0 rounded-lg bg-black/10"></div>
                  </div>
                </div>
              ) : (
                <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Chưa có ảnh</p>
                  </div>
                </div>
              )}
            </div>

            {/* Upload ảnh mới */}
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-medium">
                    <Camera size={16} className="text-primary" />
                    Chọn ảnh mới
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleUpload}
                      className="border-border file:bg-primary hover:file:bg-primary/90 file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Nút Lưu */}
        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            size="lg"
            className="bg-primary hover:bg-primary/90 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            <Save size={18} className="mr-2" />
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </Form>
  );
}
