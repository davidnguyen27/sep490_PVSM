import type { Pet } from "../types/pet.type";
import { BadgeInfo, SquarePen, Trash2 } from "lucide-react";

// components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "@/components/shared/TableSkeleton";
import EmptyTable from "@/components/shared/EmptyTable";
import { ConfirmDelete } from "@/components/shared";
import { PetModal } from "./PetModal";

// hooks
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePetDetail, usePetDelete } from "../hooks";

interface Props {
  pets: Pet[];
  isPending: boolean;
  currentPage: number;
  pageSize: number;
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
  "Hành động",
];

export function PetTable({ pets, isPending, currentPage, pageSize }: Props) {
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data } = usePetDetail(selectedPetId);
  const petId = searchParams.get("petId");

  const { mutate: deletePet, isPending: isDeleting } = usePetDelete();

  useEffect(() => {
    if (petId) {
      setSelectedPetId(Number(petId));
      setOpenDetail(true);
    }
  }, [petId]);

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
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {isPending ? (
          <TableSkeleton columnCount={9} rowCount={pageSize} />
        ) : pets.length > 0 ? (
          <TableBody>
            {pets.map((item, idx) => (
              <TableRow
                key={item.petId}
                className="hover:bg-accent/10 transition-colors duration-150"
              >
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {(currentPage - 1) * pageSize + idx + 1}
                </TableCell>
                <TableCell className="text-dark font-nunito max-w-[140px] truncate text-center text-sm">
                  {item.petCode}
                </TableCell>
                <TableCell className="text-dark font-nunito max-w-[140px] truncate text-center text-sm">
                  {item.name}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {item.species}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {item.breed}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {item.gender}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {item.color}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {item.weight} kg
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
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
                    <SquarePen
                      size={16}
                      className="text-purple cursor-pointer transition-transform hover:scale-110"
                      onClick={() =>
                        navigate(
                          `/staff/pet-profiles/update?petId=${item.petId}`,
                          {
                            replace: false,
                          },
                        )
                      }
                    />
                    <ConfirmDelete onConfirm={() => deletePet(item.petId)}>
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
            ))}
          </TableBody>
        ) : null}
      </Table>

      {!isPending && pets.length === 0 && <EmptyTable />}

      <PetModal
        open={openDetail}
        onClose={() => {
          setOpenDetail(false);
          setSelectedPetId(null);
          navigate("/staff/pet-profiles", { replace: true });
        }}
        pet={data ?? undefined}
      />
    </div>
  );
}
