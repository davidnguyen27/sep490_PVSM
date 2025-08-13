import { useState } from "react";
import { Search, Scan, CheckCircle, AlertCircle } from "lucide-react";
import { Button, Input, Label } from "@/components/ui";
import { useMicrochipByCode } from "@/modules/microchip-item";

interface MicrochipSearchProps {
  onSelect: (microchipItemId: number | null) => void;
  selectedId?: number | null;
  disabled?: boolean;
  className?: string;
  // petId?: number | null;
  // showAssignButton?: boolean;
}

export function MicrochipSearch({
  onSelect,
  selectedId,
  disabled = false,
  className,
  // petId,
  // showAssignButton = false,
}: MicrochipSearchProps) {
  const [searchCode, setSearchCode] = useState("");
  const [submittedCode, setSubmittedCode] = useState<string>("");

  const {
    data: microchipData,
    isLoading,
    error,
  } = useMicrochipByCode({
    microchipCode: submittedCode,
    status: 1, // Available status
    enabled: !!submittedCode && submittedCode.length >= 3,
  });

  // microchipData is now always the object or null
  const microchip = microchipData;

  const handleSearch = () => {
    if (!searchCode.trim() || searchCode.length < 3) return;
    setSubmittedCode(searchCode.trim());
  };

  const handleSelect = () => {
    if (microchipData?.microchipId) {
      onSelect(microchipData.microchipId);
      setSearchCode("");
    }
  };

  const renderSearchResult = () => {
    if (!submittedCode || submittedCode.length < 3) return null;

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

    if (!microchip) {
      return (
        <div className="flex items-center gap-2 rounded-md border border-yellow-200 bg-yellow-50 p-3">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <span className="text-sm text-yellow-700">
            Không tìm thấy microchip với mã "{submittedCode}"
          </span>
        </div>
      );
    }

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
              <p className="font-nunito-500">{microchip.microchipId ?? "-"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Tên:</span>
              <p className="font-nunito-500">{microchip.name ?? "-"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Mô tả:</span>
              <p className="font-nunito-500">
                {microchip.description || "Không có"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Ngày cài đặt:</span>
              <p className="font-nunito-500">
                {microchip.installationDate
                  ? new Date(microchip.installationDate).toLocaleDateString()
                  : "-"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Trạng thái:</span>
              <p className="font-nunito-500">{microchip.status ?? "-"}</p>
            </div>
          </div>

          {/* Hiển thị thông tin thú cưng nếu có */}
          {microchip.pet && (
            <div className="mt-6">
              <h4 className="font-nunito-600 mb-2 text-sm">
                Thông tin thú cưng
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Tên thú cưng:</span>
                  <p className="font-nunito-500">{microchip.pet.name ?? "-"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Mã thú cưng:</span>
                  <p className="font-nunito-500">
                    {microchip.pet.petCode ?? "-"}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Giống loài:</span>
                  <p className="font-nunito-500">
                    {microchip.pet.species ?? "-"}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Chủ nuôi:</span>
                  <p className="font-nunito-500">
                    {microchip.pet.customer?.fullName ?? "-"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-end gap-2">
            <Button
              onClick={handleSelect}
              disabled={disabled}
              className="bg-primary text-white"
            >
              <CheckCircle className="h-4 w-4" />
              Chọn microchip này
            </Button>
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
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
          </div>
          <Button
            variant="outline"
            onClick={handleSearch}
            disabled={disabled || !searchCode.trim() || searchCode.length < 3}
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
