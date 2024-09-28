import Notification from "@components/Notification";
import { useEffect, useState } from "react";
import { getNotifications } from "@api/NotificationAPI";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const Notifications = ({
  setViewNotificationCount,
  setHasNewNotifications,
}) => {
  const authHeader = useAuthHeader();
  const headers = {
    Authorization: authHeader,
  };
  const [allNotifications, setAllNotifications] = useState([]);
  const checkNotifications = async () => {
    try {
      let res = await getNotifications(headers);
      let newNotifications = res.data;
      setHasNewNotifications(false);
      setAllNotifications(newNotifications);
      setViewNotificationCount(newNotifications.length);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    clearInterval(window.localStorage.getItem("intervalId"));
    checkNotifications();
  }, []);

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <div className="space-y-4">
        {allNotifications.map((notification, index) => (
          <Notification notification={notification} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
