import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Loader2 } from "lucide-react";
import React from "react";

type Props = {
  microchipCode: string;
  onChangeCode: (value: string) => void;
  onSearch: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
};

export function MicrochipInputCard({
  microchipCode,
  onChangeCode,
  onSearch,
  onKeyPress,
  isLoading,
}: Props) {
  return (
    <Card className="rounded-none py-4">
      <CardHeader>
        <CardTitle className="font-inter-600 flex items-center gap-2">
          <Search className="h-5 w-5" /> Nhập mã microchip
        </CardTitle>
        <CardDescription className="font-nunito-400">
          Nhập mã microchip để tìm kiếm thông tin thú cưng
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              value={microchipCode}
              onChange={(e) => onChangeCode(e.target.value)}
              placeholder="Nhập mã microchip..."
              onKeyPress={onKeyPress}
              className="pl-10"
            />
          </div>
          <Button
            onClick={onSearch}
            disabled={!microchipCode.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-sm text-gray-500">
          Nhấn Enter hoặc click nút tìm kiếm để tra cứu
        </p>
      </CardContent>
    </Card>
  );
}
