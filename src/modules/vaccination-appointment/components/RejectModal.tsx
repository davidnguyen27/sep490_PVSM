import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

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

  const handleConfirm = () => {
    onConfirm(notes);
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lý do từ chối</DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder="Nhập lý do từ chối..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-2"
        />
        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={loading || !notes.trim()}
          >
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
