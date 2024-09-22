import React from "react";

export default function Notification({ notification, index }) {
  return (
    <div key={index} className="bg-white p-4 rounded-lg shadow">
      <p>{notification.message}</p>
      <p className="text-gray-600 text-sm">{notification.date}</p>
    </div>
  );
}
