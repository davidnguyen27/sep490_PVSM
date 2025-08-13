import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Ticket,
  CalendarDays,
  Percent,
  Search,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { customerVoucherService as customerService } from "@/modules/customer-voucher/services/customer-voucher.service";
import type { CustomerVoucher } from "@/modules/customer-voucher/types/customer-voucher.type";
import { formatData } from "@/shared/utils/format.utils";
import { toast } from "sonner";

interface VoucherSelectionProps {
  customerId: number | null;
  onVoucherSelect: (voucher: CustomerVoucher | null) => void;
  selectedVoucher: CustomerVoucher | null;
}

export function VoucherSelection({
  customerId,
  onVoucherSelect,
  selectedVoucher,
}: VoucherSelectionProps) {
  const [vouchers, setVouchers] = useState<CustomerVoucher[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchCode, setSearchCode] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchCustomerVouchers = useCallback(async () => {
    if (!customerId) return;

    setLoading(true);
    try {
      const response =
        await customerService.getCustomerVoucherByCustomerId(customerId);
      if (Array.isArray(response)) {
        // Filter active vouchers that haven't expired
        const activeVouchers = response.filter(
          (voucher) =>
            voucher.status === 1 && // Assuming 1 is active status
            new Date(voucher.expirationDate) > new Date(),
        );
        setVouchers(activeVouchers);
      } else {
        setVouchers([]);
      }
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      toast.error("Không thể tải danh sách voucher");
      setVouchers([]);
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  // Fetch vouchers when customerId changes
  useEffect(() => {
    if (customerId) {
      fetchCustomerVouchers();
    } else {
      setVouchers([]);
    }
  }, [customerId, fetchCustomerVouchers]);

  const handleVoucherSelect = (voucher: CustomerVoucher) => {
    onVoucherSelect(voucher);
    setIsDialogOpen(false);
    toast.success("Đã áp dụng voucher thành công");
  };

  const handleRemoveVoucher = () => {
    onVoucherSelect(null);
    toast.info("Đã hủy áp dụng voucher");
  };

  const filteredVouchers = vouchers.filter(
    (voucher) =>
      voucher.voucher.voucherCode
        .toLowerCase()
        .includes(searchCode.toLowerCase()) ||
      voucher.voucher.voucherName
        .toLowerCase()
        .includes(searchCode.toLowerCase()),
  );

  return (
    <Card className="bg-linen rounded-none py-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-primary flex items-center gap-2 text-lg">
          <Ticket size={18} />
          Mã giảm giá
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selected Voucher Display */}
        {selectedVoucher ? (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" size={20} />
                <div>
                  <p className="font-medium text-green-800">
                    {selectedVoucher.voucher.voucherName}
                  </p>
                  <p className="text-sm text-green-600">
                    Mã: {selectedVoucher.voucher.voucherCode}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Giảm {selectedVoucher.voucher.discountAmount}%
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveVoucher}
                  className="text-red-600 hover:text-red-700"
                >
                  <XCircle size={16} />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* Voucher Selection Button */
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                disabled={!customerId || loading}
              >
                <Ticket size={16} />
                {loading ? "Đang tải..." : "Chọn mã giảm giá"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Ticket size={18} />
                  Chọn mã giảm giá
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm theo mã hoặc tên voucher..."
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Voucher List */}
                <div className="max-h-96 space-y-3 overflow-y-auto">
                  {loading ? (
                    <div className="py-8 text-center">
                      <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-b-2"></div>
                      <p className="mt-2 text-gray-500">Đang tải voucher...</p>
                    </div>
                  ) : filteredVouchers.length === 0 ? (
                    <div className="py-8 text-center">
                      <Ticket className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-gray-500">
                        {vouchers.length === 0
                          ? "Khách hàng không có voucher khả dụng"
                          : "Không tìm thấy voucher phù hợp"}
                      </p>
                    </div>
                  ) : (
                    filteredVouchers.map((customerVoucher) => (
                      <VoucherCard
                        key={customerVoucher.customerVoucherId}
                        customerVoucher={customerVoucher}
                        onSelect={() => handleVoucherSelect(customerVoucher)}
                      />
                    ))
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}

interface VoucherCardProps {
  customerVoucher: CustomerVoucher;
  onSelect: () => void;
}

function VoucherCard({ customerVoucher, onSelect }: VoucherCardProps) {
  const { voucher } = customerVoucher;
  const isExpiringSoon =
    new Date(voucher.expirationDate) <=
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <div
      className="hover:border-primary hover:bg-primary/5 cursor-pointer rounded-lg border border-gray-200 p-4 transition-colors"
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <h4 className="font-medium text-gray-900">{voucher.voucherName}</h4>
            {isExpiringSoon && (
              <Badge variant="destructive" className="text-xs">
                Sắp hết hạn
              </Badge>
            )}
          </div>
          <p className="mb-1 text-sm text-gray-600">
            Mã: {voucher.voucherCode}
          </p>
          <p className="text-xs text-gray-500">{voucher.description}</p>
          <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <CalendarDays size={12} />
              Hết hạn: {formatData.formatDate(voucher.expirationDate)}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Percent size={12} />
            Giảm {voucher.discountAmount}%
          </Badge>
        </div>
      </div>
    </div>
  );
}
