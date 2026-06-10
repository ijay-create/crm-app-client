import { useState } from "react";
import API from "../api/axios";
import "../styles/AIFloatingButton.css";

export default function AIFloatingButton() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    setLoading(true);

    try {
      const res = await API.post("/ai/chat", {
        prompt: input,
      });

      const aiMsg = {
        role: "ai",
        text: res.data.reply || "No response",
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "AI service error 😢" },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="ai-fab-button"
        onClick={() => setOpen(!open)}
      >
        🤖
      </button>

      {/* Chat Box */}
      {open && (
        <div className="ai-chat-box">

          {/* Header */}
          <div className="ai-chat-header">
            AI Assistant
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(false)}
            >
              ✕
            </span>
          </div>

          {/* Messages */}
          <div className="ai-chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`ai-msg ${m.role}`}>
                {m.text}
              </div>
            ))}

            {loading && (
              <div className="ai-msg ai">
                Thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="ai-chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask CRM anything..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}