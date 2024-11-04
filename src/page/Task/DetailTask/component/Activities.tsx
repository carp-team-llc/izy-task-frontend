import React from "react";
interface ActivityItem {
  action: string;
  date: string;
}

const Activities: React.FC = () => {
  const activities: ActivityItem[] = [
    { action: "Create task", date: "10 days ago" },
    { action: "Update task", date: "5 days ago" },
    { action: "Update status to: Doing", date: "5 days ago" },
    { action: "Update status to: Completed", date: "2 days ago" },
  ];
  return (
    <div className="border-t border-gray-700 pt-4">
      <h2 className="text-sm font-semibold mb-2">Activity</h2>
      <div className="space-y-2">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center mr-2">
              <span className="text-[12px]">CT</span>
            </div>
            <div>
              <p className="text-sm">{activity.action}</p>
              <p className="text-[12px] text-gray-400">{activity.date}</p>
            </div>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
};
export default Activities;
