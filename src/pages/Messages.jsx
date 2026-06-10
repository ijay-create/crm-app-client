import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import {
  getMessages,
  sendMessage,
} from "../api/messages";

import "../styles/messages.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  const [text, setText] = useState("");

  const loadMessages = async () => {
    const res = await getMessages();

    setMessages(res.data);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSend = async () => {
    if (!text) return;

    await sendMessage({
      receiverId: 1, // temporary default admin
      content: text,
    });

    setText("");

    loadMessages();
  };

  return (
    <MainLayout>
      <div className="messages">

        <h1>Inbox</h1>

        <div className="chat-box">

          {messages.map((msg) => (
            <div
              key={msg.id}
              className="msg"
            >
              {msg.content}
            </div>
          ))}

        </div>

        <div className="input-box">

          <input
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            placeholder="Type message..."
          />

          <button onClick={handleSend}>
            Send
          </button>

        </div>

      </div>
    </MainLayout>
  );
};

export default Messages;