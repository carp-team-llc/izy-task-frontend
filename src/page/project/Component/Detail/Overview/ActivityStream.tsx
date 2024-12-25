import React from "react";
import useActivityStream from "../../../../../hook/Api/project/useActivityStream";

interface ActivityItem {
  user: string;
  action: string;
  details?: string;
}

export default function Component() {
  const { data: activityStream } = useActivityStream({
    projectId: "67448f2abee60d40683d398b",
    where: {},
    skip: 0,
    take: 10,
  });

  return (
    <div className="col-span-2 bg-[#130b3b] rounded-lg p-4 sm:p-2">
      <h2 className="text-lg font-bold mb-4 sm:text-md sm:mb-2">Activity Stream</h2>
      <div className="space-y-4">
        {activityStream.map((activity: any, index: number) => (
          <div key={index} className="mb-4 sm:mb-2">
            <div className="flex items-center gap-2 mb-2 sm:gap-1">
              <div className="w-8 h-8 sm:w-6 sm:h-6 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-bold">
                C
              </div>
              <span className="text-blue-400 text-sm sm:text-xs">{activity.actionName}</span>
              <span className="text-sm sm:text-xs text-gray-400">{activity.activity.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
