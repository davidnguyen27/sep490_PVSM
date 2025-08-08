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
} from "lucide-react";

interface Props {
  form: UseFormReturn<PetSchema>;
  onSubmit: (data: PetSchema) => void;
}

export function PetFormUpdateCompact({ form, onSubmit }: Props) {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Tên thú cưng */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <PawPrint size={16} className="text-primary" />
                  Tên thú cưng
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập tên thú cưng"
                    className="focus:border-primary focus:ring-primary/20 h-11 rounded-lg border-gray-300 focus:ring-2"
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
                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Dog size={16} className="text-primary" />
                  Loài
                </FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="focus:border-primary focus:ring-primary/20 h-11 rounded-lg border-gray-300 focus:ring-2">
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
                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <BadgeInfo size={16} className="text-primary" />
                  Giống
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập giống"
                    className="focus:border-primary focus:ring-primary/20 h-11 rounded-lg border-gray-300 focus:ring-2"
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
                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Heart size={16} className="text-primary" />
                  Giới tính
                </FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="focus:border-primary focus:ring-primary/20 h-11 rounded-lg border-gray-300 focus:ring-2">
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
                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Calendar size={16} className="text-primary" />
                  Ngày sinh
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="focus:border-primary focus:ring-primary/20 h-11 rounded-lg border-gray-300 focus:ring-2"
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
                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Weight size={16} className="text-primary" />
                  Cân nặng (kg)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập cân nặng"
                    type="number"
                    step="0.1"
                    className="focus:border-primary focus:ring-primary/20 h-11 rounded-lg border-gray-300 focus:ring-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <MapPin size={18} className="text-primary" />
            Thông tin địa chỉ
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Nơi sinh */}
            <FormField
              control={form.control}
              name="placeOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MapPin size={16} className="text-primary" />
                    Nơi sinh
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập nơi sinh"
                      className="focus:border-primary focus:ring-primary/20 h-11 rounded-lg border-gray-300 focus:ring-2"
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
                  <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MapPin size={16} className="text-primary" />
                    Nơi ở hiện tại
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập nơi ở hiện tại"
                      className="focus:border-primary focus:ring-primary/20 h-11 rounded-lg border-gray-300 focus:ring-2"
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
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Palette size={16} className="text-primary" />
                    Màu sắc
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập màu sắc"
                      className="focus:border-primary focus:ring-primary/20 h-11 rounded-lg border-gray-300 focus:ring-2"
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
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Globe size={16} className="text-primary" />
                    Quốc tịch
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập quốc tịch"
                      className="focus:border-primary focus:ring-primary/20 h-11 rounded-lg border-gray-300 focus:ring-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Camera size={18} className="text-primary" />
            Hình ảnh & tình trạng khác
          </h3>

          {/* Checkbox Triệt sản */}
          <FormField
            control={form.control}
            name="isSterilized"
            render={({ field }) => (
              <FormItem className="mb-6 flex flex-row items-start space-y-0 space-x-3 rounded-lg border border-gray-200 p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="text-primary focus:ring-primary mt-0.5 h-5 w-5 rounded border-gray-300"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <CheckCircle size={16} className="text-primary" />
                    Đã triệt sản
                  </FormLabel>
                  <p className="text-sm text-gray-500">
                    Đánh dấu nếu thú cưng đã được triệt sản
                  </p>
                </div>
              </FormItem>
            )}
          />

          {/* Upload ảnh mới */}
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Camera size={16} className="text-primary" />
                  Chọn ảnh mới
                </FormLabel>
                {preview && (
                  <div className="mb-4 flex justify-center">
                    <img
                      src={preview}
                      alt="Ảnh thú cưng"
                      className="h-32 w-32 rounded-lg border-2 border-gray-200 object-cover shadow-sm"
                    />
                  </div>
                )}
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="file:bg-primary hover:file:bg-primary/90 h-11 border-gray-300 file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end border-t border-gray-200 pt-6">
          <Button
            type="submit"
            size="lg"
            className="from-primary to-primary/90 hover:from-primary/90 hover:to-primary rounded-lg bg-gradient-to-r px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            <Save size={18} className="mr-2" />
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </Form>
  );
}
