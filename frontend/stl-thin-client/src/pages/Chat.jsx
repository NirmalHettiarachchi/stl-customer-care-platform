import { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "agent", text: "Hello! How can I assist you today?" },
    { sender: "customer", text: "I need help with my bill payment." },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      setMessages([...messages, { sender: "customer", text: newMessage }]);
      setNewMessage("");
      // Simulate agent's reply after a short delay
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "agent",
            text: "Please provide your account number for verification.",
          },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-secondary">
      <div className="flex-grow p-6 overflow-y-auto bg-gray-200 rounded-lg shadow-lg">
        <div className="space-y-4">
          {messages.map((message, index) => (
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
          ))}
        </div>
      </div>
      <form
        onSubmit={sendMessage}
        className="p-4 bg-white flex items-center space-x-2 border-t"
      >
        <input
          type="text"
          className="input input-bordered flex-grow bg-gray-200"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn bg-primary hover:bg-primary-dark text-white">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
