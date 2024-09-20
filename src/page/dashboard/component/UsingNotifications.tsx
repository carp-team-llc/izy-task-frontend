import React, { useState } from 'react'
import useNotifications from '../../../hook/Api/notifications/useNotifications'
import NotificationsComponent from '../../../component/Notifications/NotificationsComponent'



interface NotificationVariables {
    where?: any;
    skip: number;
    take: number;
}
const UsingNotification = () => {
    const [NotificationData, setNotificationData] = useState<string[]>([]);
    const {data} = useNotifications({
        where: {},
        skip: 0,
        take: 10,

    })
    const getNotiData = data?.map((item: any) => {
       
        return item.messmage
    })
    const getNotiData2 = getNotiData?.map((item: any) =>{
         return {
            name: item?.changes?.title,
            created: item?.createdAt,
        }
    })
    console.log("========>", getNotiData)
    return (
        <div></div>
    )
}
export default UsingNotification;