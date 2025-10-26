import React, { useState } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([
    { id: 1, from: "Alice", text: "Hey, how are you?" },
    { id: 2, from: "Bob", text: "Did you see the new listing?" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage) return;
    setMessages([...messages, { id: messages.length + 1, from: "You", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Messages</h1>

      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-lg shadow-sm ${
              msg.from === "You" ? "bg-blue-100 self-end" : "bg-white self-start"
            }`}
          >
            <strong>{msg.from}: </strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded-lg border border-gray-300"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;
