import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (notes: string) => void;
  loading?: boolean;
}

export function RejectModal({
  open,
  onClose,
  onConfirm,
  loading = false,
}: Props) {
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const MAX_LENGTH = 300;

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_LENGTH) {
      setNotes(value);
      setError("");
    } else {
      setError(`Lý do không được vượt quá ${MAX_LENGTH} ký tự`);
    }
  };

  const handleConfirm = () => {
    if (!notes.trim()) {
      setError("Vui lòng nhập lý do từ chối");
      return;
    }

    if (notes.length > MAX_LENGTH) {
      setError(`Lý do không được vượt quá ${MAX_LENGTH} ký tự`);
      return;
    }

    onConfirm(notes);
    setNotes("");
    setError("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center gap-2 text-red-500">
            <AlertTriangle className="h-5 w-5" />
            <DialogTitle className="text-xl">Từ chối lịch hẹn</DialogTitle>
          </div>
          <DialogDescription className="mt-2 text-gray-500">
            Vui lòng cho biết lý do từ chối lịch hẹn để khách hàng được thông
            báo.
          </DialogDescription>
        </DialogHeader>

        <div className="py-3">
          <div className="space-y-2">
            <Label htmlFor="rejection-reason" className="text-sm font-medium">
              Lý do từ chối <span className="text-red-500">*</span>
            </Label>

            <div className="mb-3 grid grid-cols-2 gap-2">
              {[
                "Thú cưng chưa đủ điều kiện sức khỏe",
                "Lịch đã kín trong ngày hẹn",
                "Thú cưng cần khám trước khi tiêm",
                "Thông tin không hợp lệ",
              ].map((reason) => (
                <button
                  key={reason}
                  type="button"
                  onClick={() => {
                    if ((notes + reason).length <= MAX_LENGTH) {
                      setNotes(notes ? `${notes}\n${reason}` : reason);
                      setError("");
                    } else {
                      setError(
                        `Không thể thêm lý do này vì vượt quá ${MAX_LENGTH} ký tự`,
                      );
                    }
                  }}
                  className="rounded-md border border-gray-200 px-2 py-1 text-left text-xs hover:border-red-200 hover:bg-red-50"
                >
                  {reason}
                </button>
              ))}
            </div>

            <div className="relative">
              <Textarea
                id="rejection-reason"
                placeholder="Ví dụ: Thú cưng chưa đủ điều kiện sức khỏe để tiêm vaccine..."
                value={notes}
                onChange={handleNotesChange}
                maxLength={MAX_LENGTH}
                className={`min-h-[120px] resize-none border-gray-300 focus:border-red-300 focus:ring focus:ring-red-100 ${!notes.trim() && "border-red-200 bg-red-50"}`}
              />
              {notes.length > 0 && (
                <button
                  className="absolute top-2 right-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  onClick={() => setNotes("")}
                  type="button"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="flex flex-col gap-1">
              {error && (
                <p className="text-xs font-medium text-red-500">{error}</p>
              )}
              <p className="flex justify-between text-xs text-gray-500">
                <span>Vui lòng cung cấp lý do cụ thể và rõ ràng</span>
                <span
                  className={`${notes.length > MAX_LENGTH * 0.8 ? "font-medium text-red-500" : "text-gray-400"}`}
                >
                  {notes.length}/{MAX_LENGTH} ký tự
                </span>
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-2 flex items-center gap-2 border-t pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 hover:bg-gray-50 hover:text-gray-800"
          >
            Quay lại
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={loading || !notes.trim()}
            className={`bg-red-600 transition-all hover:bg-red-700 ${loading ? "opacity-80" : ""}`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Đang xử lý...
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <AlertTriangle size={16} />
                Xác nhận từ chối
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
