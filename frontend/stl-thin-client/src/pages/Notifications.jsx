import Notification from "@components/Notification";

const Notifications = () => {
  const notifications = [
    { message: "Your bill for June is due.", date: "2024-09-20" },
    { message: "International Roaming activated.", date: "2024-09-18" },
  ];

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <Notification notification={notification} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
