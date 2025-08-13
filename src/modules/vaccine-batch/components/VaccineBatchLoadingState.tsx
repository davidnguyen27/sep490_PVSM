import { Package2, TrendingUp, TrendingDown, Archive } from "lucide-react";

export function VaccineBatchLoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/30">
      {/* Header Loading */}
      <div className="border-b border-gray-100 bg-gradient-to-br from-white via-white to-gray-50/30">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-6 flex items-start gap-6">
            <div className="h-14 w-14 animate-pulse rounded-xl bg-gray-200"></div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gray-100 p-3">
                  <Package2 className="h-6 w-6 text-gray-300" />
                </div>
                <div className="h-8 w-80 animate-pulse rounded-lg bg-gray-200"></div>
              </div>
              <div className="h-4 w-96 animate-pulse rounded bg-gray-100"></div>
              <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-gray-100"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Loading */}
      <div className="container mx-auto space-y-8 px-6 py-8">
        {/* Statistics Loading */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-blue-200 to-purple-200"></div>
            <div className="h-6 w-48 animate-pulse rounded bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: TrendingUp, color: "bg-emerald-50" },
              { icon: TrendingDown, color: "bg-rose-50" },
              { icon: Archive, color: "bg-blue-50" },
              { icon: Package2, color: "bg-purple-50" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`${item.color} animate-pulse rounded-2xl border border-gray-100 p-6`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="h-4 w-20 rounded bg-gray-200"></div>
                    <div className="rounded-lg bg-gray-200 p-2">
                      <Icon className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-8 w-16 rounded bg-gray-200"></div>
                    <div className="h-3 w-24 rounded bg-gray-100"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Table Loading */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-emerald-200 to-blue-200"></div>
            <div className="h-6 w-56 animate-pulse rounded bg-gray-200"></div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="p-8">
              {/* Table Header Loading */}
              <div className="mb-6 grid grid-cols-10 gap-4 rounded-xl bg-gray-50 p-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-4 animate-pulse rounded bg-gray-200"
                  ></div>
                ))}
              </div>

              {/* Table Rows Loading */}
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="grid grid-cols-10 gap-4 rounded-lg p-4 hover:bg-gray-50"
                  >
                    {Array.from({ length: 10 }).map((_, colIndex) => (
                      <div
                        key={colIndex}
                        className={`h-4 animate-pulse rounded bg-gray-100 ${
                          colIndex === 0
                            ? "w-8"
                            : colIndex < 3
                              ? "w-20"
                              : "w-full"
                        }`}
                        style={{
                          animationDelay: `${(rowIndex * 10 + colIndex) * 50}ms`,
                        }}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
