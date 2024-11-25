import React from 'react'

interface ActivityItem {
    user: string
    action: string
    details?: string
  }
  const activityStream: ActivityItem[] = [
    { user: "Calangthang", action: "changed the status to Doing on Làm minh hình chi tiết khi nhấn vào xem task" },
    { user: "Calangthang", action: "update description on Làm minh hình chi tiết khi nhấn vào xem task", details: "Làm minh hình chi tiết khi nhấn vào xem chi tiết task\n• Khi nhấn vào xem task sẽ hiện ra modal chi tiết task\n• Trong modal task sẽ hiện thị các thông tin chi tiết của task gồm:\ntrạng thái\n• November 05 at 16:08" },
  ]

  export default function Component() {
    return (
        <div className="col-span-2 bg-[#130b3b] rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">Activity Stream</h2>
            {activityStream.map((activity, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-bold">
                    C
                  </div>
                  <span className="text-blue-400">{activity.user}</span>
                  <span className="text-sm">{activity.action}</span>
                </div>
                {activity.details && (
                  <div className="ml-10 text-sm text-gray-400 whitespace-pre-line">
                    {activity.details}
                  </div>
                )}
              </div>
            ))}
          </div>
    )
  }