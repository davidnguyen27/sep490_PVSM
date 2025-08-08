import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Loader2,
  Syringe,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { formatData } from "@/shared/utils/format.utils";
import {
  VaccineDiseaseModalDetail,
  VaccineDiseaseModalUpdate,
  VaccineDiseaseModalCreate,
} from "@/modules/vaccine-disease/components";
import {
  useUpdateVaccineDisease,
  useDeleteVaccineDisease,
  useVaccineDiseaseAdd,
} from "@/modules/vaccine-disease/hooks";
import type { VaccineDisease } from "@/modules/vaccine-disease/types/vaccine-disease.type";
import type { VaccineDiseasePayload } from "@/modules/vaccine-disease/types/vaccine-disease.payload.type";

interface VaccineListProps {
  vaccines: VaccineDisease[];
  isLoading: boolean;
  diseaseId: number | null;
}

export function VaccineList({
  vaccines,
  isLoading,
  diseaseId,
}: VaccineListProps) {
  const [editingVaccineDisease, setEditingVaccineDisease] =
    useState<VaccineDisease | null>(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [viewingVaccineDiseaseId, setViewingVaccineDiseaseId] = useState<
    number | null
  >(null);
  const [openView, setOpenView] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const { mutate: updateVaccineDisease, isPending: isUpdating } =
    useUpdateVaccineDisease();
  const { mutate: deleteVaccineDisease } = useDeleteVaccineDisease();
  const { mutate: createVaccineDisease, isPending: isCreating } =
    useVaccineDiseaseAdd();

  const handleView = (vaccineDisease: VaccineDisease) => {
    setViewingVaccineDiseaseId(vaccineDisease.vaccineDiseaseId);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
    setViewingVaccineDiseaseId(null);
  };

  const handleEdit = (vaccineDisease: VaccineDisease) => {
    setEditingVaccineDisease(vaccineDisease);
    setOpenUpdate(true);
  };

  const handleUpdate = (payload: VaccineDiseasePayload) => {
    if (editingVaccineDisease?.vaccineDiseaseId) {
      updateVaccineDisease(
        {
          vaccineDiseaseId: editingVaccineDisease.vaccineDiseaseId,
          vaccineDiseaseData: payload,
        },
        {
          onSuccess: () => {
            setOpenUpdate(false);
            setEditingVaccineDisease(null);
          },
        },
      );
    }
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setEditingVaccineDisease(null);
  };

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleCreate = (payload: VaccineDiseasePayload) => {
    createVaccineDisease(payload, {
      onSuccess: () => {
        setOpenCreate(false);
      },
    });
  };

  const handleDelete = (vaccineDiseaseId: number) => {
    deleteVaccineDisease(vaccineDiseaseId);
  };

  // Render modals outside of conditional returns so they're always available
  const modals = (
    <>
      {/* Modals */}
      <VaccineDiseaseModalDetail
        open={openView}
        vaccineDiseaseId={viewingVaccineDiseaseId}
        onClose={handleCloseView}
      />

      <VaccineDiseaseModalUpdate
        open={openUpdate}
        onClose={handleCloseUpdate}
        submit={handleUpdate}
        isSubmitting={isUpdating}
        defaultValues={editingVaccineDisease}
      />

      <VaccineDiseaseModalCreate
        open={openCreate}
        onClose={handleCloseCreate}
        submit={handleCreate}
        isSubmitting={isCreating}
        defaultDiseaseId={diseaseId}
        hideDiseaseSelection={true}
      />
    </>
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Syringe className="h-5 w-5" />
              Danh sách vaccine phòng bệnh
            </CardTitle>
            {diseaseId && (
              <Button
                onClick={handleOpenCreate}
                size="sm"
                className="flex items-center gap-2"
                disabled={isLoading}
              >
                <Plus className="h-4 w-4" />
                Thêm vaccine
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-primary">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-nunito min-w-[60px] px-4 py-3 text-center text-sm text-white">
                    STT
                  </TableHead>
                  <TableHead className="font-nunito min-w-[120px] px-4 py-3 text-center text-sm text-white">
                    Mã vaccine
                  </TableHead>
                  <TableHead className="font-nunito min-w-[200px] px-4 py-3 text-center text-sm text-white">
                    Tên vaccine
                  </TableHead>
                  <TableHead className="font-nunito min-w-[250px] px-4 py-3 text-center text-sm text-white">
                    Mô tả
                  </TableHead>
                  <TableHead className="font-nunito min-w-[200px] px-4 py-3 text-center text-sm text-white">
                    Ghi chú
                  </TableHead>
                  <TableHead className="font-nunito min-w-[120px] px-4 py-3 text-center text-sm text-white">
                    Giá
                  </TableHead>
                  <TableHead className="font-nunito min-w-[120px] px-4 py-3 text-center text-sm text-white">
                    Trạng thái
                  </TableHead>
                  <TableHead className="font-nunito min-w-[120px] px-4 py-3 text-center text-sm text-white">
                    Thao tác
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={10} className="p-0">
                    <div className="flex h-32 items-center justify-center">
                      <div className="text-center">
                        <Loader2 className="text-primary mx-auto mb-2 h-6 w-6 animate-spin" />
                        <p className="font-nunito text-sm text-gray-500">
                          Đang tải danh sách vaccine...
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {modals}
      </Card>
    );
  }

  if (!vaccines.length) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Syringe className="h-5 w-5" />
              Danh sách vaccine phòng bệnh (0)
            </CardTitle>
            {diseaseId && (
              <Button
                onClick={handleOpenCreate}
                size="sm"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Thêm vaccine
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-primary">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-nunito min-w-[60px] px-4 py-3 text-center text-sm text-white">
                    STT
                  </TableHead>
                  <TableHead className="font-nunito min-w-[120px] px-4 py-3 text-center text-sm text-white">
                    Mã vaccine
                  </TableHead>
                  <TableHead className="font-nunito min-w-[200px] px-4 py-3 text-center text-sm text-white">
                    Tên vaccine
                  </TableHead>
                  <TableHead className="font-nunito min-w-[250px] px-4 py-3 text-center text-sm text-white">
                    Mô tả
                  </TableHead>
                  <TableHead className="font-nunito min-w-[200px] px-4 py-3 text-center text-sm text-white">
                    Ghi chú
                  </TableHead>
                  <TableHead className="font-nunito min-w-[120px] px-4 py-3 text-center text-sm text-white">
                    Giá
                  </TableHead>
                  <TableHead className="font-nunito min-w-[120px] px-4 py-3 text-center text-sm text-white">
                    Trạng thái
                  </TableHead>
                  <TableHead className="font-nunito min-w-[120px] px-4 py-3 text-center text-sm text-white">
                    Thao tác
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={10} className="p-0">
                    <div className="flex h-32 items-center justify-center">
                      <div className="text-center">
                        <Syringe className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                        <p className="font-nunito text-gray-500">
                          Chưa có vaccine nào phòng bệnh này
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {modals}
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Syringe className="h-5 w-5" />
            Danh sách vaccine phòng bệnh ({vaccines.length})
          </CardTitle>
          {diseaseId && (
            <Button
              onClick={handleOpenCreate}
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Thêm vaccine
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-primary">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-nunito min-w-[60px] px-4 py-3 text-center text-sm text-white">
                  STT
                </TableHead>
                <TableHead className="font-nunito min-w-[120px] px-4 py-3 text-center text-sm text-white">
                  Mã vaccine
                </TableHead>
                <TableHead className="font-nunito min-w-[200px] px-4 py-3 text-center text-sm text-white">
                  Tên vaccine
                </TableHead>
                <TableHead className="font-nunito min-w-[250px] px-4 py-3 text-center text-sm text-white">
                  Mô tả
                </TableHead>
                <TableHead className="font-nunito min-w-[200px] px-4 py-3 text-center text-sm text-white">
                  Ghi chú
                </TableHead>
                <TableHead className="font-nunito min-w-[120px] px-4 py-3 text-center text-sm text-white">
                  Giá
                </TableHead>
                <TableHead className="font-nunito min-w-[120px] px-4 py-3 text-center text-sm text-white">
                  Trạng thái
                </TableHead>
                <TableHead className="font-nunito min-w-[120px] px-4 py-3 text-center text-sm text-white">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vaccines.map((vaccineDisease, index) => {
                const vaccine = vaccineDisease.vaccineResponseDTO;

                if (!vaccine) return null;

                return (
                  <TableRow
                    key={vaccineDisease.vaccineDiseaseId}
                    className="hover:bg-accent/10 transition-colors duration-150"
                  >
                    <TableCell className="text-dark font-nunito text-center text-sm">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-dark font-nunito text-center text-sm">
                      <div className="rounded bg-gray-100 px-2 py-1 font-mono text-xs">
                        {vaccine.vaccineCode}
                      </div>
                    </TableCell>
                    <TableCell className="text-dark font-nunito max-w-48 text-center text-sm">
                      <div
                        className="truncate font-medium"
                        title={vaccine.name}
                      >
                        {vaccine.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-dark font-nunito max-w-64 text-center text-sm">
                      <div
                        className="truncate"
                        title={vaccine.description || "Không có mô tả"}
                      >
                        {vaccine.description || "Không có mô tả"}
                      </div>
                    </TableCell>
                    <TableCell className="text-dark font-nunito max-w-64 text-center text-sm">
                      <div
                        className="truncate"
                        title={vaccine.notes || "Không có ghi chú"}
                      >
                        {vaccine.notes || "Không có ghi chú"}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="font-nunito-600 text-primary text-sm">
                        {vaccine.price
                          ? formatData.formatCurrency(vaccine.price)
                          : "Chưa có giá"}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          vaccine.status === "Active"
                            ? "default"
                            : "destructive"
                        }
                        className="font-nunito"
                      >
                        {vaccine.status === "Active"
                          ? "Hoạt động"
                          : "Không hoạt động"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={() => handleView(vaccineDisease)}
                            className="cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4 text-blue-600" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEdit(vaccineDisease)}
                            className="cursor-pointer"
                          >
                            <Edit className="mr-2 h-4 w-4 text-green-600" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              vaccineDisease.vaccineDiseaseId &&
                              handleDelete(vaccineDisease.vaccineDiseaseId)
                            }
                            className="cursor-pointer text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {modals}
    </Card>
  );
}
