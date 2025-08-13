import { cn } from "@/lib/utils";
import Spinner from "./Spinner";

interface CardLoadingProps {
  title?: string;
  className?: string;
}

export default function CardLoading({
  title = "Đang tải...",
  className,
}: CardLoadingProps) {
  return (
    <div
      className={cn(
        "flex min-h-[200px] flex-col items-center justify-center space-y-4 rounded-lg border bg-white p-6 shadow-sm",
        className,
      )}
    >
      <Spinner size="lg" variant="primary" showPulse />
      <p className="font-nunito-500 text-muted-foreground text-sm">{title}</p>
    </div>
  );
}
