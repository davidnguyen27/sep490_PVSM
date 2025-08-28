import { Button } from "@/components/ui/button";
import { icons } from "@/shared/constants/icons.constants";
import { AlertTriangle } from "lucide-react";

interface ExpiringBatch {
  id: number;
  name: string;
  batchNumber: string;
  expiryDate: string;
  daysUntilExpiry: number;
  vaccineId: number;
}

interface NotificationDropdownProps {
  isOpen: boolean;
  expiringBatches: ExpiringBatch[];
  onNavigate: (path: string) => void;
  onClose: () => void;
}

const NOTIFICATION_STYLES = {
  dropdown:
    "absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 shadow-lg z-50 rounded-lg",
  header:
    "flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg",
  item: "flex items-center justify-between px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-200 cursor-pointer",
} as const;

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  expiringBatches,
  onNavigate,
  onClose,
}) => {
  if (!isOpen) return null;

  const formatExpiryMessage = (daysUntilExpiry: number) => {
    if (daysUntilExpiry === 0) {
      return "Hết hạn hôm nay";
    } else if (daysUntilExpiry === 1) {
      return "Hết hạn ngày mai";
    } else {
      return `Còn ${daysUntilExpiry} ngày hết hạn`;
    }
  };

  const getAlertIcon = (daysUntilExpiry: number) => {
    if (daysUntilExpiry <= 1) {
      return <AlertTriangle size={16} className="text-red-500" />;
    } else {
      return <AlertTriangle size={16} className="text-orange-500" />;
    }
  };

  return (
    <div className={NOTIFICATION_STYLES.dropdown}>
      {/* Header */}
      <div className={NOTIFICATION_STYLES.header}>
        <div className="flex items-center space-x-2">
          <icons.Bell size={16} className="text-primary" />
          <span className="font-inter-600 text-sm text-gray-900">
            Thông báo
          </span>
        </div>
        <span className="bg-primary rounded-full px-2 py-1 text-xs text-white">
          {expiringBatches.length}
        </span>
      </div>

      {/* Content */}
      <div className="max-h-72 overflow-y-auto">
        {expiringBatches.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">
            Không có lô vắc-xin nào sắp hết hạn.
          </div>
        ) : (
          expiringBatches.map((batch: ExpiringBatch) => (
            <div key={batch.id} className={NOTIFICATION_STYLES.item}>
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  {getAlertIcon(batch.daysUntilExpiry)}
                </div>
                <div className="flex-1">
                  <div className="font-nunito-600 text-sm text-gray-900">
                    {batch.name} - Lô {batch.batchNumber}
                  </div>
                  <div className="font-nunito-400 mt-1 text-xs text-gray-500">
                    {formatExpiryMessage(batch.daysUntilExpiry)}
                  </div>
                  <div className="font-nunito-400 text-xs text-gray-400">
                    Hết hạn:{" "}
                    {new Date(batch.expiryDate).toLocaleDateString("vi-VN")}
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="ml-3 px-2 py-1 text-xs"
                onClick={() => {
                  onNavigate("/admin/vaccine-batch");
                  onClose();
                }}
              >
                Xem
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {expiringBatches.length > 0 && (
        <div className="border-t border-gray-200 p-3">
          <button
            className="text-primary hover:text-primary-dark font-nunito-500 w-full text-center text-sm"
            onClick={() => {
              onNavigate("/admin/vaccine-batch");
              onClose();
            }}
          >
            Xem tất cả thông báo
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
export type { ExpiringBatch, NotificationDropdownProps };
