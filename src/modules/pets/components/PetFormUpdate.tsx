import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input, Button } from "@/components/ui";
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        {/* Tên thú cưng */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <PawPrint size={16} /> Tên thú cưng
              </FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên thú cưng" {...field} />
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
              <FormLabel className="flex items-center gap-1">
                <Dog size={16} /> Loài
              </FormLabel>
              <FormControl>
                <Input placeholder="Nhập loài" {...field} />
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
              <FormLabel className="flex items-center gap-1">
                <BadgeInfo size={16} /> Giống
              </FormLabel>
              <FormControl>
                <Input placeholder="Nhập giống" {...field} />
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
              <FormLabel className="flex items-center gap-1">
                <Heart size={16} /> Giới tính
              </FormLabel>
              <FormControl>
                <Input placeholder="Đực / Cái" {...field} />
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
              <FormLabel className="flex items-center gap-1">
                <Calendar size={16} /> Ngày sinh
              </FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Nơi sinh */}
        <FormField
          control={form.control}
          name="placeOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <MapPin size={16} /> Nơi sinh
              </FormLabel>
              <FormControl>
                <Input placeholder="Nhập nơi sinh" {...field} />
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
              <FormLabel className="flex items-center gap-1">
                <MapPin size={16} /> Nơi ở hiện tại
              </FormLabel>
              <FormControl>
                <Input placeholder="Nhập nơi ở hiện tại" {...field} />
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
              <FormLabel className="flex items-center gap-1">
                <Weight size={16} /> Cân nặng (kg)
              </FormLabel>
              <FormControl>
                <Input placeholder="Nhập cân nặng" {...field} />
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
              <FormLabel className="flex items-center gap-1">
                <Palette size={16} /> Màu sắc
              </FormLabel>
              <FormControl>
                <Input placeholder="Nhập màu sắc" {...field} />
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
              <FormLabel className="flex items-center gap-1">
                <Globe size={16} /> Quốc tịch
              </FormLabel>
              <FormControl>
                <Input placeholder="Nhập quốc tịch" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Checkbox Triệt sản */}
        <div className="mt-2 flex items-center gap-2 md:col-span-2">
          <FormField
            control={form.control}
            name="isSterilized"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                </FormControl>
                <FormLabel className="mb-0 flex items-center gap-1">
                  <CheckCircle size={16} /> Đã triệt sản
                </FormLabel>
              </FormItem>
            )}
          />
        </div>

        {/* Ảnh hiện tại */}
        <div className="mt-4 space-y-2 md:col-span-2">
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              <Camera size={16} /> Ảnh thú cưng hiện tại
            </FormLabel>
            {preview ? (
              <div className="mt-2">
                <img
                  src={preview}
                  alt="Ảnh thú cưng"
                  className="mx-auto h-32 w-32 rounded border object-cover"
                />
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">Chưa có ảnh</p>
            )}
          </FormItem>
        </div>

        {/* Upload ảnh mới */}
        <div className="md:col-span-2">
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  <Camera size={16} /> Chọn ảnh mới
                </FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*" onChange={handleUpload} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Nút Lưu */}
        <div className="flex justify-end pt-4 md:col-span-2">
          <Button type="submit">Lưu thay đổi</Button>
        </div>
      </form>
    </Form>
  );
}
