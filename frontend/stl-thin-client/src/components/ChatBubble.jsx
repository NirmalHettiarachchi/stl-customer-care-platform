import React from "react";

export default function ChatBubble({ message, index }) {
  return (
    <div
      key={index}
      className={`chat ${
        message.sender === "agent" ? "chat-start" : "chat-end"
      }`}
    >
      <div
        className={`chat-bubble ${
          message.sender === "agent"
            ? "bg-primary text-white"
            : "bg-gray-400 text-white"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
