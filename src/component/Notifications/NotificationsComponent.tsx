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
  }) => (
    
    <div className="flex items-center space-x-3 p-2 hover:bg-purple-600 bg-gray-500 rounded-lg mt-5">
      <p>📄</p>
      <div>
        <p className="text-sm text-white ">
          <span className="font-semibold">{name}</span> {action}
        </p>
        <p className="text-xs text-white ">{time}</p>
      </div>
    </div>
  );
export default Notification;
  

