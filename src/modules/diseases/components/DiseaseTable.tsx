import {
  Edit,
  Trash2,
  Eye,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TableSkeleton from "@/components/shared/TableSkeleton";
import EmptyTable from "@/components/shared/EmptyTable";
import ConfirmDelete from "@/components/shared/ConfirmDelete";
import { DiseaseModalUpdate } from "./DiseaseModalUpdate";

// hooks
import { useDeleteDisease } from "../hooks/useDeleteDisease";
import { useUpdateDisease } from "../hooks/useUpdateDisease";

// types
import type { Disease } from "../types/disease.type";
import type { DiseasePayload } from "../types/disease.payload.type";

// utils
import { formatData } from "@/shared/utils/format.utils";

interface DiseaseTableProps {
  diseases: (Disease & { sttNumber: number })[];
  isPending: boolean;
  pageSize: number;
  searchKeyword?: string;
  sttSortOrder?: "asc" | "desc" | null;
  onSttSort?: () => void;
  onRefetch?: () => void;
}

export function DiseaseTable({
  diseases,
  isPending,
  pageSize,
  searchKeyword,
  sttSortOrder,
  onSttSort,
  onRefetch,
}: DiseaseTableProps) {
  const [editingDisease, setEditingDisease] = useState<Disease | null>(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const navigate = useNavigate();

  const { mutate: deleteDisease, isPending: isDeleting } = useDeleteDisease();
  const { mutate: updateDisease, isPending: isUpdating } = useUpdateDisease();

  // Function to get sort icon based on current sort order
  const getSortIcon = () => {
    if (sttSortOrder === "asc") return <ArrowUp size={14} />;
    if (sttSortOrder === "desc") return <ArrowDown size={14} />;
    return <ArrowUpDown size={14} />;
  };

  const handleView = (disease: Disease) => {
    navigate(`/admin/diseases?diseaseId=${disease.diseaseId}&action=detail`);
  };

  const handleEdit = (disease: Disease) => {
    setEditingDisease(disease);
    setOpenUpdate(true);
  };

  const handleUpdate = (payload: DiseasePayload) => {
    if (editingDisease?.diseaseId) {
      updateDisease(
        {
          diseaseId: editingDisease.diseaseId,
          diseaseData: payload,
        },
        {
          onSuccess: () => {
            setOpenUpdate(false);
            setEditingDisease(null);
            // Refetch data after successful update
            if (onRefetch) {
              onRefetch();
            }
          },
        },
      );
    }
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setEditingDisease(null);
  };

  const handleDelete = (diseaseId: number) => {
    deleteDisease(diseaseId, {
      onSuccess: () => {
        // Refetch data after successful deletion
        if (onRefetch) {
          onRefetch();
        }
      },
    });
  };

  if (isPending) {
    return (
      <div className="bg-linen shadow-md">
        <Table>
          <TableHeader className="bg-primary">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
                STT
              </TableHead>
              <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
                Tên bệnh
              </TableHead>
              <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
                Loài
              </TableHead>
              <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
                Triệu chứng
              </TableHead>
              <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
                Trạng thái
              </TableHead>
              <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
                Ngày tạo
              </TableHead>
              <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableSkeleton columnCount={7} rowCount={pageSize} />
        </Table>
      </div>
    );
  }

  return (
    <div className="bg-linen shadow-md">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              <button
                onClick={onSttSort}
                className="flex items-center justify-center gap-1 hover:text-gray-200"
                disabled={!onSttSort}
              >
                STT
                {onSttSort && getSortIcon()}
              </button>
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Tên bệnh
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Loài
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Triệu chứng
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Trạng thái
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Ngày tạo
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Thao tác
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!diseases.length ? (
            <TableRow>
              <TableCell colSpan={7} className="p-0">
                <EmptyTable keyword={searchKeyword} />
              </TableCell>
            </TableRow>
          ) : (
            diseases.map((disease) => (
              <TableRow
                key={disease.diseaseId}
                className="hover:bg-accent/10 transition-colors duration-150"
              >
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {disease.sttNumber}
                </TableCell>
                <TableCell className="text-dark font-nunito max-w-48 text-center text-sm">
                  <div className="truncate" title={disease.name}>
                    {disease.name}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="font-nunito">
                    {disease.species === "Dog" ? "Chó" : "Mèo"}
                  </Badge>
                </TableCell>
                <TableCell className="text-dark font-nunito max-w-64 text-center text-sm">
                  <div className="truncate" title={disease.symptoms}>
                    {disease.symptoms}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={
                      disease.isDeleted === "true" ? "destructive" : "default"
                    }
                    className="font-nunito"
                  >
                    {disease.isDeleted === "true"
                      ? "Không hoạt động"
                      : "Hoạt động"}
                  </Badge>
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {formatData.formatDateTime(disease.createdAt)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <Eye
                      size={16}
                      className="text-info cursor-pointer transition-transform hover:scale-110"
                      onClick={() => handleView(disease)}
                    />
                    <Edit
                      size={16}
                      className="text-purple cursor-pointer transition-transform hover:scale-110"
                      onClick={() => handleEdit(disease)}
                    />
                    <ConfirmDelete
                      onConfirm={() => handleDelete(disease.diseaseId!)}
                    >
                      <Trash2
                        size={16}
                        className={`cursor-pointer transition-transform hover:scale-110 ${
                          isDeleting
                            ? "pointer-events-none opacity-50"
                            : "text-danger"
                        }`}
                      />
                    </ConfirmDelete>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <DiseaseModalUpdate
        open={openUpdate}
        onClose={handleCloseUpdate}
        submit={handleUpdate}
        isSubmitting={isUpdating}
        defaultValues={editingDisease}
      />
    </div>
  );
}
