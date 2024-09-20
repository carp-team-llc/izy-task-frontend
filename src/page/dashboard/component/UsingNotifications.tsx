import React, { useState } from "react";
import useNotifications from "../../../hook/Api/notifications/useNotifications";
import NotificationsComponent from "../../../component/Notifications/NotificationsComponent";

const UsingNotification = () => {
  const { data } = useNotifications({
    where: {},
    skip: 0,
    take: 10,
  });
  const getNotiData = data?.map((item: any) => {
    return item?.data;
  });
  const getNotidata2 = getNotiData?.map((item: any) => {
    return item?.map((hi: any) => {
      return {
        id: hi?.taskId,
        name: hi?.changes?.title,
      }
    });
  });
  console.log("getNotidata2 ====> ", getNotidata2)
  return <div></div>;
};
export default UsingNotification;
