import React, { useMemo, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { User, Search, AlertCircle, RefreshCw } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { PetSchema } from "../../schemas/pet.schema";
import {
  useCustomerSearch,
  useCustomers,
  type CustomerOption,
} from "../../hooks/useCustomers";
import InlineLoading from "@/components/shared/InlineLoading";

interface CustomerSelectFieldProps {
  form: UseFormReturn<PetSchema>;
  disabled?: boolean;
  placeholder?: string;
  showSearch?: boolean;
  maxDisplayItems?: number;
}

// ✅ Separate component cho Customer Item để optimize re-renders
const CustomerItem = React.memo(
  ({ customer }: { customer: CustomerOption }) => (
    <div className="flex flex-col">
      <div className="text-sm font-medium">{customer.fullData.fullName}</div>
      <div className="text-muted-foreground flex items-center gap-1 text-xs">
        <span>Mã: {customer.customerCode}</span>
        {customer.fullData.phoneNumber && (
          <span>• {customer.fullData.phoneNumber}</span>
        )}
      </div>
    </div>
  ),
);

CustomerItem.displayName = "CustomerItem";

// ✅ Error state component với retry action
const ErrorState = React.memo(
  ({ error, onRetry }: { error: string; onRetry: () => void }) => (
    <div className="space-y-2 p-4 text-center">
      <div className="text-destructive flex items-center justify-center gap-2">
        <AlertCircle className="h-4 w-4" />
        <span className="text-sm">{error}</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onRetry}
        className="h-8 text-xs"
      >
        <RefreshCw className="mr-1 h-3 w-3" />
        Thử lại
      </Button>
    </div>
  ),
);

ErrorState.displayName = "ErrorState";

// ✅ Main component với advanced features
export const CustomerSelectField: React.FC<CustomerSelectFieldProps> = ({
  form,
  disabled = false,
  placeholder = "Chọn khách hàng",
  showSearch = true,
  maxDisplayItems = 100,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Conditional hook usage based on search
  const baseQuery = useCustomers({
    enabled: !showSearch || searchTerm === "",
    pageSize: maxDisplayItems,
  });

  const searchQuery = useCustomerSearch(searchTerm);

  // ✅ Smart query selection
  const activeQuery = showSearch && searchTerm ? searchQuery : baseQuery;
  const { customers, loading, error, refetch } = activeQuery;

  // ✅ Memoized filtered customers để tránh re-computation
  const displayCustomers = useMemo(() => {
    return customers.slice(0, maxDisplayItems);
  }, [customers, maxDisplayItems]);

  // ✅ Selected customer info for display
  const selectedCustomer = useMemo(() => {
    const currentValue = form.watch("customerId");
    return customers.find((c) => c.value === currentValue);
  }, [customers, form]);

  return (
    <FormField
      control={form.control}
      name="customerId"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Khách hàng
            {loading && <InlineLoading size="xs" />}
          </FormLabel>

          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={disabled}
            onOpenChange={setIsOpen}
          >
            <FormControl>
              <SelectTrigger className={error ? "border-destructive" : ""}>
                <SelectValue placeholder={placeholder} className="text-left">
                  {selectedCustomer && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {selectedCustomer.fullData.fullName}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        ({selectedCustomer.customerCode})
                      </span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
            </FormControl>

            <SelectContent className="w-[400px]">
              {/* ✅ Search input khi enable */}
              {showSearch && (
                <div className="border-b p-2">
                  <div className="relative">
                    <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                    <Input
                      placeholder="Tìm kiếm khách hàng..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-9 pl-8"
                      autoFocus={isOpen}
                    />
                  </div>
                </div>
              )}

              {/* ✅ Content area */}
              <div className="max-h-[300px] overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-center">
                    <InlineLoading text="Đang tải khách hàng..." />
                  </div>
                ) : error ? (
                  <ErrorState error={error} onRetry={refetch} />
                ) : displayCustomers.length === 0 ? (
                  <div className="text-muted-foreground p-4 text-center text-sm">
                    {searchTerm
                      ? "Không tìm thấy khách hàng"
                      : "Không có khách hàng nào"}
                  </div>
                ) : (
                  <>
                    {displayCustomers.map((customer) => (
                      <SelectItem
                        key={customer.value}
                        value={customer.value}
                        className="hover:bg-accent cursor-pointer"
                      >
                        <CustomerItem customer={customer} />
                      </SelectItem>
                    ))}

                    {/* ✅ Show count if there are more items */}
                    {customers.length > maxDisplayItems && (
                      <div className="text-muted-foreground border-t p-2 text-center text-xs">
                        Hiển thị {maxDisplayItems} trong {customers.length}{" "}
                        khách hàng
                      </div>
                    )}
                  </>
                )}
              </div>
            </SelectContent>
          </Select>

          <FormMessage />

          {/* ✅ Helper text */}
          {selectedCustomer && (
            <p className="text-muted-foreground text-xs">
              Đã chọn: {selectedCustomer.fullData.fullName}
              {selectedCustomer.fullData.phoneNumber &&
                ` • ${selectedCustomer.fullData.phoneNumber}`}
            </p>
          )}
        </FormItem>
      )}
    />
  );
};
