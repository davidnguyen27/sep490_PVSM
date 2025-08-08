import { PageBreadcrumb } from "@/components/shared";
import { Card, CardContent } from "@/components/ui/card";

export const ScheduleLoadingSkeleton = () => {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <PageBreadcrumb items={["Trang chủ", "Lịch làm việc"]} />

      <div className="flex items-center justify-between">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200"></div>
        <div className="flex gap-2">
          <div className="h-10 w-20 animate-pulse rounded bg-gray-200"></div>
          <div className="h-10 w-20 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200"></div>
                <div className="space-y-2">
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-6 w-8 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="h-96 animate-pulse rounded bg-gray-200"></div>
        </CardContent>
      </Card>
    </div>
  );
};
