interface WelcomeHeaderProps {
  pending: number;
  completed: number;
  lastUpdated?: string;
}

export default function WelcomeHeader({
  pending,
  completed,
  lastUpdated,
}: WelcomeHeaderProps) {
  return (
    <div className="from-primary border border-gray-200 bg-gradient-to-r to-teal-600 p-6 text-white shadow-sm">
      <h1 className="font-nunito-700 mb-2 text-2xl">
        Chào mừng trở lại!
      </h1>
      <p className="font-nunito-400 text-gray-100">
        Hôm nay bạn có {pending} lịch hẹn đang chờ và {completed} đã hoàn thành
      </p>
      {lastUpdated && (
        <p className="font-nunito-300 mt-2 text-xs text-gray-200">
          Cập nhật lần cuối: {new Date(lastUpdated).toLocaleString("vi-VN")}
        </p>
      )}
    </div>
  );
}
