import React from "react";

export default function Notification({ notification, index }) {
  return (
    <div key={index} className="bg-white p-4 rounded-lg shadow">
      <p>{notification.content}</p>
    </div>
  );
}
