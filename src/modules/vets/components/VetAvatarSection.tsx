import { User } from "lucide-react";

interface VetAvatarSectionProps {
  name?: string;
}

export function VetAvatarSection({ name }: VetAvatarSectionProps) {
  return (
    <div className="text-center">
      <div className="bg-primary/10 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white shadow-lg">
        <User size={40} className="text-primary" />
      </div>
      <h2 className="font-nunito mb-2 text-xl font-bold text-gray-900">
        {name || "Bác sỹ"}
      </h2>
    </div>
  );
}
