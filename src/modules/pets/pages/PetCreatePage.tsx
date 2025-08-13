import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { petSchema, type PetSchema } from "../schemas/pet.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PetFormCreate } from "../components";
import { useNavigate } from "react-router-dom";
import { usePetCreation } from "../hooks/usePetCreation";
import { PageLoader, PageBreadcrumb } from "@/components/shared";
import { useAuth } from "@/modules/auth";
import { getPetRoutePaths } from "../utils/pet-route.utils";
import { PawPrint, ArrowLeft, Save, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

export default function PetCreatePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { mutate: createPet, isPending: isCreating } = usePetCreation();

  // Get role-based paths
  const paths = getPetRoutePaths(user?.role || 2);

  // Set document title for Pet Create page
  useEffect(() => {
    document.title = "PVMS | Tạo hồ sơ thú cưng";

    return () => {
      document.title = "PVMS | Hồ sơ thú cưng";
    };
  }, []);

  const form = useForm<PetSchema>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      customerId: "",
      name: "",
      species: "",
      breed: "",
      gender: "",
      dateOfBirth: "",
      placeOfBirth: "",
      placeToLive: "",
      weight: "",
      color: "",
      nationality: "",
      isSterilized: false,
      image: undefined,
    },
  });

  const onSubmit = (formData: PetSchema) => {
    const payload = {
      customerId: Number(formData.customerId),
      name: formData.name,
      species: formData.species,
      breed: formData.breed,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      placeOfBirth: formData.placeOfBirth,
      placeToLive: formData.placeToLive,
      weight: formData.weight,
      color: formData.color,
      nationality: formData.nationality,
      isSterilized: formData.isSterilized,
      image: formData.image instanceof File ? formData.image : undefined,
    };

    createPet(payload, {
      onSuccess: () => {
        navigate(paths.base);
      },
    });
  };

  return (
    <PageLoader loading={isCreating}>
      <div className="min-h-screen">
        {/* Header Section */}
        <div className="mb-8">
          {/* Navigation Bar */}
          <div className="mb-6 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(paths.base)}
              className="hover:text-primary font-nunito-500 text-muted-foreground flex items-center space-x-2 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Quay lại danh sách</span>
            </Button>

            <Badge
              variant="outline"
              className="border-primary font-nunito-500 text-primary bg-white"
            >
              <Plus className="mr-1 h-3 w-3" />
              Chế độ tạo mới
            </Badge>
          </div>

          {/* Page Title */}
          <div className="mb-6 text-center">
            <div className="mb-4 flex items-center justify-center">
              <div className="bg-primary/10 rounded-full p-3">
                <PawPrint className="text-primary h-8 w-8" />
              </div>
            </div>
            <h1 className="font-nunito-700 text-dark mb-2 text-3xl">
              Tạo hồ sơ thú cưng mới
            </h1>
            <p className="font-nunito-400 text-muted-foreground mx-auto max-w-2xl">
              Nhập đầy đủ thông tin để tạo hồ sơ mới cho thú cưng
            </p>
          </div>

          {/* Breadcrumb */}
          <div className="flex justify-center">
            <PageBreadcrumb items={["Quản lý thú cưng", "Tạo mới"]} />
          </div>
        </div>

        {/* Form Section */}
        <div className="space-y-6">
          {/* Main Form Card */}
          <Card className="rounded-none border-0 bg-white shadow-lg">
            <CardHeader className="from-linen to-primary/5 border-b-0 bg-gradient-to-r py-6">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 rounded-lg p-2">
                    <PawPrint className="text-primary h-5 w-5" />
                  </div>
                  <span className="font-nunito-600 text-dark text-xl">
                    Thông tin thú cưng mới
                  </span>
                </div>
                <Button
                  type="submit"
                  form="pet-create-form"
                  disabled={isCreating}
                  className="bg-primary font-nunito-600 hover:bg-secondary flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{isCreating ? "Đang tạo..." : "Tạo hồ sơ"}</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="mx-auto max-w-4xl">
                <PetFormCreate form={form} onSubmit={onSubmit} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLoader>
  );
}
