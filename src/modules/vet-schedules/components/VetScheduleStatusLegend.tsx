export function VetScheduleStatusLegend() {
  const statusItems = [
    { color: "bg-emerald-500", label: "Có thể nhận lịch hẹn" },
    { color: "bg-gray-400", label: "Không thể nhận lịch hẹn" },
    { color: "bg-blue-500", label: "Đã có lịch hẹn" },
    { color: "bg-purple-500", label: "Đã hoàn thành" },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-3 text-lg font-semibold">Giải thích trạng thái</h3>
      <div className="space-y-2">
        {statusItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`h-4 w-4 rounded-full ${item.color}`}></div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
