import React, { useState } from "react";
import useNotifications from "../../../hook/Api/notifications/useNotifications";
import Notification from "../../../component/Notifications/NotificationsComponent";

interface TopStatProps {
  title: string;
  subtitle: string;
  value: string;
  bgColor: string;
}

const UsingNotification = () => {
  const { data } = useNotifications({
    where: {},
    skip: 0,
    take: 10,
  });
  const getNotiData: any = data?.flatMap((item: any) =>
    item?.data?.map((noti: any) => {
      return {
        taskId: noti.taskId,
        title: noti.changes?.title,
        createdAt: noti.createdAt,
      };
    })
  );

  return (
    <div className={` rounded-lg`}>
      <div className="font-bold text-xl">Notifications</div>
      {getNotiData?.map((item: any) => (
        <Notification name={item.title} time={item.createdAt} />
      ))}
    </div>
  );
};
export default UsingNotification;
