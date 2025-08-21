import { useState } from "react";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useMicrochipByCode } from "../hooks/useMicrochipByCode";
import { PageBreadcrumb } from "@/components/shared";
import type { MicrochipItemByCode } from "../types/microchip-item-by-code.type";
import { MicrochipInputCard } from "../components/MicrochipInputCard";
import { MicrochipResultCard } from "../components/MicrochipResultCard";

export default function ScanMicrochipPage() {
  const { microchipCode: paramMicrochipCode } = useParams<{
    microchipCode?: string;
  }>();
  const [microchipCode, setMicrochipCode] = useState(paramMicrochipCode || "");
  const [searchCode, setSearchCode] = useState(paramMicrochipCode || "");

  const {
    data: petInfo,
    isLoading,
    error,
  }: {
    data: MicrochipItemByCode | undefined;
    isLoading: boolean;
    error: unknown;
  } = useMicrochipByCode({
    microchipCode: searchCode,
    enabled: !!searchCode,
  });

  const handleManualSearch = () => {
    if (microchipCode.trim()) {
      setSearchCode(microchipCode.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleManualSearch();
    }
  };

  return (
    <div className="space-y-6">
      <PageBreadcrumb items={["Tra cứu microchip"]} />

      <div className="space-y-6">
        <div>
          <h1 className="font-inter-700 text-primary flex items-center gap-2 text-2xl">
            <Search className="h-6 w-6" /> Tra cứu microchip
          </h1>
          <p className="font-nunito-400 mt-2 text-gray-600">
            Tìm kiếm thông tin thú cưng bằng mã microchip
          </p>
        </div>

        <MicrochipInputCard
          microchipCode={microchipCode}
          onChangeCode={setMicrochipCode}
          onSearch={handleManualSearch}
          onKeyPress={handleKeyPress}
          isLoading={isLoading}
        />

        {searchCode && (
          <div className="space-y-4">
            <h2 className="font-inter-700 text-xl">Kết quả tìm kiếm</h2>
            <MicrochipResultCard
              searchCode={searchCode}
              isLoading={isLoading}
              error={error}
              petInfo={petInfo}
            />
          </div>
        )}
      </div>
    </div>
  );
}
