import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { petSchema, type PetSchema } from "../schemas/pet.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PetFormCreate } from "../components/PetFormCreate";
import { useNavigate } from "react-router-dom";
import { usePetCreation } from "../hooks/usePetCreation";
import { PageBreadcrumb, ButtonSpinner } from "@/components/shared";
import { useAuth } from "@/modules/auth";
import { getPetRoutePaths } from "../utils/pet-route.utils";
import { PawPrint, ArrowLeft, Save, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

function PetCreatePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { mutate: createPet, isPending: isCreating } = usePetCreation();

  // Get role-based paths
  const paths = getPetRoutePaths(user?.role || 2);

  // Set document title for Pet Create page
  useEffect(() => {
    document.title = "PVMS | Tạo hồ sơ thú cưng";

    return () => {
      document.title = "PVMS | Tạo hồ sơ thú cưng";
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
    if (!formData.image || !(formData.image instanceof File)) {
      form.setError("image", {
        type: "manual",
        message: "Chọn hình ảnh thú cưng!",
      });
      return;
    }

    // Format date to mm/dd/yyyy as required by backend
    const formatDateToMMDDYYYY = (dateString: string) => {
      const date = new Date(dateString);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    };

    const payload = {
      customerId: Number(formData.customerId),
      name: formData.name,
      species: formData.species,
      breed: formData.breed,
      gender: formData.gender,
      dateOfBirth: formatDateToMMDDYYYY(formData.dateOfBirth),
      placeOfBirth: formData.placeOfBirth,
      placeToLive: formData.placeToLive,
      weight: formData.weight,
      color: formData.color,
      nationality: formData.nationality,
      isSterilized: formData.isSterilized,
      image: formData.image, // Now we know this is definitely a File
    };

    createPet(payload, {
      onSuccess: () => {
        navigate(paths.base);
      },
      onError: (error) => {
        console.error("Error creating pet:", error); // Debug log
      },
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        {/* Navigation Bar */}
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate(paths.base)}
            disabled={isCreating}
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
          <div className="from-primary/10 to-secondary/10 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br">
            <PawPrint className="text-primary h-10 w-10" />
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
          <PageBreadcrumb
            items={[
              { label: "Danh sách thú cưng", path: paths.base },
              "Tạo mới",
            ]}
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="space-y-6">
        {/* Main Form Card */}
        <Card className="border-0 bg-white shadow-lg">
          <CardHeader className="from-linen to-primary/5 flex items-center border-b-0 bg-gradient-to-r py-6">
            <CardTitle className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
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
                onClick={() => console.log("Submit button clicked")} // Debug log
                className="bg-primary font-nunito-600 hover:bg-secondary flex items-center space-x-2"
              >
                {isCreating && <ButtonSpinner variant="white" size="sm" />}
                <Save className="h-4 w-4" />
                <span>{isCreating ? "Đang tạo..." : "Tạo hồ sơ"}</span>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="mx-auto">
              <PetFormCreate form={form} onSubmit={onSubmit} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PetCreatePage;
