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
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <p>{notification.message}</p>
            <p className="text-gray-600 text-sm">{notification.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
