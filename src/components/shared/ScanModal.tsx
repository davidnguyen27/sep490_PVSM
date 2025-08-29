import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Scan } from "lucide-react";

interface ScanModalProps {
  isOpen: boolean;
  scannedCode: string;
  onCodeChange: (code: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const ScanModal: React.FC<ScanModalProps> = ({
  isOpen,
  scannedCode,
  onCodeChange,
  onSubmit,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scan className="text-primary h-5 w-5" />
            Tra cứu microchip
          </DialogTitle>
          <DialogDescription>
            Nhập mã microchip để tìm kiếm thông tin thú cưng
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Manual Input Mode */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-nunito-500 text-sm">Mã microchip</label>
              <div className="flex gap-2">
                <Input
                  value={scannedCode}
                  onChange={(e) => onCodeChange(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && scannedCode.trim()) {
                      onSubmit();
                    }
                  }}
                  placeholder="Nhập mã microchip..."
                  className="flex-1"
                  autoFocus
                />
                <Button
                  onClick={onSubmit}
                  disabled={!scannedCode.trim()}
                  className="bg-primary hover:bg-secondary"
                >
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end space-x-2 border-t pt-4">
            <Button variant="outline" onClick={onClose}>
              Đóng
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScanModal;
export type { ScanModalProps };
