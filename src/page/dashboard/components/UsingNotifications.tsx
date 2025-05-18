import Notification from "../../../component/Notifications/NotificationsComponent";
import Spacing from "../../../component/common/Spacing";
import useNotifications from "../../../hook/Api/notifications/useNotifications";

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
      <div className="font-bold text-xl flex flex-row">
        <p style={{ color: `#6956E5` }}>Notifications </p>
        <Spacing width={5} />
        <p style={{color: 'red'}}>({getNotiData.length})</p>
      </div>
      {getNotiData?.map((item: any) => (
        <Notification name={item.title} time={item.createdAt} />
      ))}
    </div>
  );
};
export default UsingNotification;
