import { useState } from "react";
import { Search, Scan, CheckCircle, AlertCircle, Link } from "lucide-react";
import { Button, Input, Label } from "@/components/ui";
import {
  useMicrochipByCode,
  useAssignMicrochip,
} from "@/modules/microchip-item";
import { useDebounce } from "@/shared/hooks/useDebounce";

interface MicrochipSearchProps {
  onSelect: (microchipItemId: number | null) => void;
  selectedId?: number | null;
  disabled?: boolean;
  className?: string;
  petId?: number | null;
  showAssignButton?: boolean;
}

export function MicrochipSearch({
  onSelect,
  selectedId,
  disabled = false,
  className,
  petId,
  showAssignButton = false,
}: MicrochipSearchProps) {
  const [searchCode, setSearchCode] = useState("");

  const debouncedSearch = useDebounce(searchCode, 500);

  const {
    data: microchipData,
    isLoading,
    error,
  } = useMicrochipByCode({
    microchipCode: debouncedSearch,
    status: 1, // Available status
    enabled: !!debouncedSearch && debouncedSearch.length >= 3,
  });

  const { mutate: assignMicrochip, isPending: isAssigning } =
    useAssignMicrochip({
      onSuccess: () => {
        if (microchipData?.data?.microchipItemId) {
          onSelect(microchipData.data.microchipItemId);
          setSearchCode("");
        }
      },
    });

  const handleSearch = () => {
    if (!searchCode.trim()) return;
    // Manual search logic can be added here if needed
  };

  const handleSelect = () => {
    if (microchipData?.data?.microchipItemId) {
      onSelect(microchipData.data.microchipItemId);
      setSearchCode("");
    }
  };

  const handleAssignToPet = () => {
    if (!microchipData?.data?.microchipItemId || !petId) {
      return;
    }

    assignMicrochip({
      microchipItemId: microchipData.data.microchipItemId,
      petId: petId,
    });
  };

  const renderSearchResult = () => {
    if (!debouncedSearch || debouncedSearch.length < 3) return null;

    if (isLoading) {
      return (
        <div className="flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 p-3">
          <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <span className="text-sm text-blue-700">Đang tìm kiếm...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <span className="text-sm text-red-700">
            Có lỗi xảy ra khi tìm kiếm
          </span>
        </div>
      );
    }

    if (!microchipData?.data) {
      return (
        <div className="flex items-center gap-2 rounded-md border border-yellow-200 bg-yellow-50 p-3">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <span className="text-sm text-yellow-700">
            Không tìm thấy microchip với mã "{debouncedSearch}"
          </span>
        </div>
      );
    }

    const microchip = microchipData.data;
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 p-3">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-700">Tìm thấy microchip!</span>
        </div>

        <div className="rounded-md border border-gray-200 bg-white p-4">
          <h4 className="font-nunito-600 mb-3 text-sm">Thông tin microchip</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Mã microchip:</span>
              <p className="font-nunito-500">
                {microchip.microchipResponse?.microchipCode}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Tên:</span>
              <p className="font-nunito-500">
                {microchip.microchipResponse?.name}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Mô tả:</span>
              <p className="font-nunito-500">
                {microchip.description || "Không có"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Giá:</span>
              <p className="font-nunito-500 text-primary">
                {microchip.microchipResponse?.price?.toLocaleString()} VND
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button
              onClick={handleSelect}
              disabled={disabled}
              className="bg-primary text-white"
            >
              <CheckCircle className="h-4 w-4" />
              Chọn microchip này
            </Button>

            {showAssignButton && petId && (
              <Button
                onClick={handleAssignToPet}
                disabled={disabled || isAssigning}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Link className="h-4 w-4" />
                {isAssigning ? "Đang gắn..." : "Gắn vào thú cưng"}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <Label htmlFor="microchip-search" className="font-nunito-600 text-sm">
          Tìm kiếm microchip
        </Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              id="microchip-search"
              type="text"
              placeholder="Nhập mã microchip..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              disabled={disabled}
              className="pl-10"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
          <Button
            variant="outline"
            onClick={handleSearch}
            disabled={disabled || !searchCode.trim()}
            className="shrink-0"
          >
            <Scan className="h-4 w-4" />
            Tìm kiếm
          </Button>
        </div>
        <p className="text-muted-foreground text-xs">
          Nhập ít nhất 3 ký tự để bắt đầu tìm kiếm
        </p>
      </div>

      {renderSearchResult()}

      {selectedId && (
        <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span className="font-nunito-500 text-sm text-blue-700">
                Đã chọn microchip ID: {selectedId}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelect(null)}
              disabled={disabled}
            >
              Hủy chọn
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
