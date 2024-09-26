import React from 'react'
interface NotificationProps {
    name?: string;
    action?: string;
    time?: string;
    avatar?: string;
  }


const Notification: React.FC<NotificationProps> = ({
    name,
    action,
    time,
    avatar,
  }) => (
    
    <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 bg-white rounded-lg mt-5">
      <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
      <div>
        <p className="text-sm text-black ">
          <span className="font-semibold">{name}</span> {action}
        </p>
        <p className="text-xs text-gray-400 ">{time}</p>
      </div>
    </div>
  );
export default Notification;
  

