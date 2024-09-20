import React from 'react'
interface NotificationProps {
    name: string;
    action: string;
    time: string;
    avatar: string;
  }


const Notification: React.FC<NotificationProps> = ({
    name,
    action,
    time,
    avatar,
  }) => (
    <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg">
      <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
      <div>
        <p className="text-sm text-white">
          <span className="font-semibold">{name}</span> {action}
        </p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  );
  

export default function NotificationsComponent() {
  return (
    <div className="bg-[#1a1f37] rounded-lg p-4">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Notifications</h2>
      <a href="#" className="text-purple-500 text-sm">
        View All
      </a>
    </div>
    <div className="space-y-2">
      <Notification
        name="Ellie"
        action="joined team developers"
        time="2 mins ago"
        avatar="/placeholder.svg?height=40&width=40"
      />
      <Notification
        name="Jenny"
        action="joined team HR"
        time="1 hour ago"
        avatar="/placeholder.svg?height=40&width=40"
      />
      <Notification
        name="Adam"
        action="got employee of the month"
        time="2 hours ago"
        avatar="/placeholder.svg?height=40&width=40"
      />
    </div>
  </div>
  )
}
