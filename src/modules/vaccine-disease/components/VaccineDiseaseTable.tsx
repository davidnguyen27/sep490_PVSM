import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { Badge, Button } from "@/components/ui";
import { EmptyTable, TableSkeleton } from "@/components/shared";
import { Eye } from "lucide-react";
import type { VaccineDisease } from "../types/vaccine-disease.type";
import {
  formatVaccineName,
  formatDiseaseName,
  formatSpecies,
  formatStatus,
  getStatusVariant,
  getSpeciesVariant,
} from "../utils";

interface VaccineDiseaseTableProps {
  data: VaccineDisease[];
  isPending: boolean;
  onViewDetail: (vaccineDiseaseId: number) => void;
}

export function VaccineDiseaseTable({
  data,
  isPending,
  onViewDetail,
}: VaccineDiseaseTableProps) {
  if (isPending) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
        <TableSkeleton columnCount={7} />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
        <EmptyTable />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/80">
            <TableHead className="font-nunito-700 text-gray-900">STT</TableHead>
            <TableHead className="font-nunito-700 text-gray-900">
              Vaccine
            </TableHead>
            <TableHead className="font-nunito-700 text-gray-900">
              Bệnh tật
            </TableHead>
            <TableHead className="font-nunito-700 text-gray-900">
              Loài
            </TableHead>
            <TableHead className="font-nunito-700 text-gray-900">
              Ngày tạo
            </TableHead>
            <TableHead className="font-nunito-700 text-gray-900">
              Trạng thái
            </TableHead>
            <TableHead className="font-nunito-700 text-center text-gray-900">
              Thao tác
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={item.vaccineDiseaseId}
              className="hover:bg-gray-50/50"
            >
              <TableCell className="font-nunito-600 text-gray-800">
                {index + 1}
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <p className="font-nunito-600 text-gray-900">
                    {formatVaccineName(item)}
                  </p>
                  {item.vaccineResponseDTO?.vaccineCode && (
                    <p className="font-nunito-400 text-xs text-gray-500">
                      Mã: {item.vaccineResponseDTO.vaccineCode}
                    </p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <p className="font-nunito-600 text-gray-900">
                    {formatDiseaseName(item)}
                  </p>
                  {item.diseaseResponseDTO?.diseaseId && (
                    <p className="font-nunito-400 text-xs text-gray-500">
                      ID: {item.diseaseResponseDTO.diseaseId}
                    </p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {item.diseaseResponseDTO?.species && (
                  <Badge
                    variant={getSpeciesVariant(item.diseaseResponseDTO.species)}
                    className="font-nunito-500"
                  >
                    {formatSpecies(item.diseaseResponseDTO.species)}
                  </Badge>
                )}
              </TableCell>
              <TableCell className="font-nunito-400 text-gray-600">
                {new Date(item.createdAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                <Badge
                  variant={getStatusVariant(item.isDeleted)}
                  className="font-nunito-500"
                >
                  {formatStatus(item.isDeleted)}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetail(item.vaccineDiseaseId!)}
                  className="font-nunito-500 hover:border-blue-300 hover:bg-blue-50"
                >
                  <Eye className="mr-1 h-4 w-4" />
                  Chi tiết
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
