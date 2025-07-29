import { Badge } from "@/components/ui";

const timeSlots = [
  { id: 1, time: "08:00 - 10:00", label: "Sáng sớm" },
  { id: 2, time: "10:00 - 12:00", label: "Trưa" },
  { id: 3, time: "13:00 - 15:00", label: "Chiều sớm" },
  { id: 4, time: "15:00 - 17:00", label: "Chiều muộn" },
  { id: 5, time: "18:00 - 20:00", label: "Tối" },
];

export function VetScheduleMonthView() {
  return (
    <div className="grid grid-cols-7 gap-1">
      {/* Month header */}
      <div className="col-span-7 grid grid-cols-7 py-2 text-center text-sm font-medium">
        <div>Thứ 2</div>
        <div>Thứ 3</div>
        <div>Thứ 4</div>
        <div>Thứ 5</div>
        <div>Thứ 6</div>
        <div>Thứ 7</div>
        <div>CN</div>
      </div>

      {/* Month days - simplified implementation */}
      {Array.from({ length: 35 }, (_, i) => {
        // This is a simplified month view - would need proper calendar logic
        const day = i + 1 > 31 ? i - 30 : i + 1;
        return (
          <div
            key={i}
            className={`h-24 border p-1 ${
              day === new Date().getDate() ? "bg-blue-50" : ""
            }`}
          >
            <div className="text-sm font-medium">{day}</div>
            {day % 5 === 0 && (
              <div className="mt-1">
                <Badge variant="outline" className="bg-emerald-100 text-xs">
                  {timeSlots[0].time}
                </Badge>
              </div>
            )}
            {day % 7 === 0 && (
              <div className="mt-1">
                <Badge variant="outline" className="bg-blue-100 text-xs">
                  {timeSlots[2].time}
                </Badge>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
