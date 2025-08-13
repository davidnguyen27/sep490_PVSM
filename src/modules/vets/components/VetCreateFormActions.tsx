import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ButtonSpinner } from "@/components/shared";

interface VetCreateFormActionsProps {
  onClose: () => void;
  isSubmitting: boolean;
}

export function VetCreateFormActions({
  onClose,
  isSubmitting,
}: VetCreateFormActionsProps) {
  return (
    <div className="flex items-center justify-end gap-3 border-t pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onClose}
        className="font-nunito"
      >
        Hủy
      </Button>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="font-nunito bg-primary hover:bg-secondary text-white"
      >
        {isSubmitting && <ButtonSpinner variant="white" size="sm" />}
        {isSubmitting ? (
          "Đang tạo..."
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" />
            Tạo bác sỹ
          </>
        )}
      </Button>
    </div>
  );
}
