import { icons } from "@/shared/constants/icons.constants";

interface Activity {
  id: number;
  title: string;
  description: string;
  time: string;
  iconName: keyof typeof icons;
  color: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

export default function RecentActivities({
  activities,
}: RecentActivitiesProps) {
  return (
    <div className="border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md lg:col-span-2">
      <div className="border-b border-gray-200 p-6">
        <h2 className="font-inter-600 text-lg text-gray-900">
          Hoạt động gần đây
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => {
            const IconComponent = icons[activity.iconName];
            return (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className={`p-2 ${activity.color}`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-nunito-600 text-sm text-gray-900">
                    {activity.title}
                  </p>
                  <p className="font-nunito-400 text-sm text-gray-600">
                    {activity.description}
                  </p>
                  <p className="font-nunito-300 mt-1 text-xs text-gray-500">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export type { Activity };
