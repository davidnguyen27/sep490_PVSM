import type { Pet } from "../types/pet.type";
import {
  BadgeInfo,
  SquarePen,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

// components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TableSkeleton from "@/components/shared/TableSkeleton";
import EmptyTable from "@/components/shared/EmptyTable";
import { ConfirmDelete } from "@/components/shared";
import { PetModal } from "./PetModal";

// hooks
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePetDetail, usePetDelete } from "../hooks";
import { useAuth } from "@/modules/auth";

// utils
import { getPetRoutePaths } from "../utils/pet-route.utils";

interface Props {
  pets: (Pet & { sttNumber: number })[];
  isPending: boolean;
  pageSize: number;
  sttSortOrder: "asc" | "desc" | null;
  onSttSort: () => void;
}

const tableHeaders = [
  "STT",
  "Mã thú cưng",
  "Tên thú cưng",
  "Loài",
  "Giống",
  "Giới tính",
  "Màu sắc",
  "Cân nặng (kg)",
  "Thao tác",
];

export function PetTable({
  pets,
  isPending,
  pageSize,
  sttSortOrder,
  onSttSort,
}: Props) {
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Data is already sorted and has STT numbers
  const sortedPetsWithSTT = pets;

  const { data, isLoading: isPetDetailLoading } = usePetDetail(selectedPetId);
  const petId = searchParams.get("petId");
  const action = searchParams.get("action");

  const { mutate: deletePet, isPending: isDeleting } = usePetDelete();

  // Get role-based paths
  const paths = getPetRoutePaths(user?.role || 2); // Default to staff role

  useEffect(() => {
    if (petId && action !== "update") {
      setSelectedPetId(Number(petId));
      setOpenDetail(true);
    }
  }, [petId, action]);

  return (
    <div className="bg-linen shadow-md">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow className="hover:bg-transparent">
            {tableHeaders.map((header) => (
              <TableHead
                key={header}
                className="font-nunito px-4 py-2 text-center text-sm text-white"
              >
                {header === "STT" ? (
                  <div className="flex items-center justify-center gap-1">
                    <span>{header}</span>
                    <button
                      onClick={onSttSort}
                      className="flex items-center justify-center rounded p-1 transition-colors hover:bg-white/10"
                      title="Sắp xếp theo STT"
                    >
                      {sttSortOrder === "asc" ? (
                        <ArrowUp size={14} className="text-white" />
                      ) : sttSortOrder === "desc" ? (
                        <ArrowDown size={14} className="text-white" />
                      ) : (
                        <ArrowUpDown size={14} className="text-white/70" />
                      )}
                    </button>
                  </div>
                ) : (
                  header
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {isPending ? (
          <TableSkeleton columnCount={9} rowCount={pageSize} />
        ) : pets.length > 0 ? (
          <TableBody>
            {sortedPetsWithSTT.map((item) => {
              return (
                <TableRow
                  key={item.petId}
                  className="hover:bg-accent/10 transition-colors duration-150"
                >
                  <TableCell className="text-dark font-nunito-500 text-center text-sm">
                    {item.sttNumber}
                  </TableCell>
                  <TableCell className="text-dark font-nunito-400 max-w-[140px] truncate text-center text-sm">
                    {item.petCode}
                  </TableCell>
                  <TableCell className="text-dark font-nunito-500 max-w-[140px] truncate text-center text-sm">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-dark font-nunito-400 text-center text-sm">
                    {item.species === "Dog" ? "Chó" : "Mèo"}
                  </TableCell>
                  <TableCell className="text-dark font-nunito-400 text-center text-sm">
                    {item.breed}
                  </TableCell>
                  <TableCell className="text-dark font-nunito-400 text-center text-sm">
                    {item.gender === "Male" ? "Đực" : "Cái"}
                  </TableCell>
                  <TableCell className="text-dark font-nunito-400 text-center text-sm">
                    {item.color}
                  </TableCell>
                  <TableCell className="text-dark font-nunito-400 text-center text-sm">
                    {item.weight} kg
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-3">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <BadgeInfo
                              size={16}
                              className="text-info cursor-pointer transition-transform hover:scale-110"
                              onClick={() => {
                                setSelectedPetId(item.petId);
                                setOpenDetail(true);
                                navigate(`?petId=${item.petId}`, {
                                  replace: false,
                                });
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-nunito">Chi tiết</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SquarePen
                              size={16}
                              className="text-purple cursor-pointer transition-transform hover:scale-110"
                              onClick={() =>
                                navigate(
                                  `${paths.base}?petId=${item.petId}&action=update`,
                                  {
                                    replace: false,
                                  },
                                )
                              }
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-nunito">Chỉnh sửa</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <ConfirmDelete
                              onConfirm={() => deletePet(item.petId)}
                              title="Xóa thú cưng"
                              description="Bạn có chắc chắn muốn xóa thú cưng này? Hành động này không thể hoàn tác."
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
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-nunito">Xóa</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        ) : null}
      </Table>

      {!isPending && pets.length === 0 && <EmptyTable />}

      <PetModal
        open={openDetail}
        onClose={() => {
          setOpenDetail(false);
          setSelectedPetId(null);
          navigate(paths.base, { replace: true });
        }}
        pet={data ?? undefined}
        isLoading={isPetDetailLoading}
      />
    </div>
  );
}
