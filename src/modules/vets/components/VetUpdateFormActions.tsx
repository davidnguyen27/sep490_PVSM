import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { ButtonSpinner } from "@/components/shared";

interface VetUpdateFormActionsProps {
  onClose: () => void;
  isSubmitting: boolean;
}

export function VetUpdateFormActions({
  onClose,
  isSubmitting,
}: VetUpdateFormActionsProps) {
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
          "Đang lưu..."
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Lưu thay đổi
          </>
        )}
      </Button>
    </div>
  );
}
