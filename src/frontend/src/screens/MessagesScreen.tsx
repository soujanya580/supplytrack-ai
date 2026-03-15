import { Megaphone, Send } from "lucide-react";
import { useState } from "react";
import { messages } from "../data/mockData";

const contacts = [
  {
    id: "op1",
    name: "Ravi Kumar",
    role: "Operator",
    initials: "RK",
    color: "#3B82F6",
    unread: 1,
    lastMsg: "Minimum 200 units needed...",
  },
  {
    id: "mgr1",
    name: "Priya Sharma",
    role: "Manager",
    initials: "PS",
    color: "#8B5CF6",
    unread: 0,
    lastMsg: "Raising a PO immediately...",
  },
  {
    id: "mgr2",
    name: "Arjun Mehta",
    role: "Manager",
    initials: "AM",
    color: "#F97316",
    unread: 0,
    lastMsg: "All good on my end.",
  },
  {
    id: "op2",
    name: "Sanjay Patel",
    role: "Operator",
    initials: "SP",
    color: "#22C55E",
    unread: 0,
    lastMsg: "Inventory updated.",
  },
];

const roleColor: Record<string, string> = {
  Admin: "#00D4AA",
  Manager: "#8B5CF6",
  Operator: "#3B82F6",
  System: "#718096",
};

export default function MessagesScreen() {
  const [activeContact, setActiveContact] = useState("op1");
  const [input, setInput] = useState("");
  const [msgList, setMsgList] = useState(messages);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMsgList((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        senderId: "admin",
        senderName: "Soujanya S",
        senderRole: "Admin",
        content: input,
        messageType: "Text",
        timestamp: "Just now",
      },
    ]);
    setInput("");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 120px)",
        overflow: "hidden",
      }}
    >
      {/* Contact List */}
      <div
        style={{
          width: 260,
          borderRight: "1px solid #2A2A2A",
          background: "#1A1A1A",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "16px", borderBottom: "1px solid #2A2A2A" }}>
          <h2
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "white",
              margin: "0 0 4px",
            }}
          >
            Messages
          </h2>
          <p style={{ fontSize: 12, color: "#718096", margin: 0 }}>
            Team Communication
          </p>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {contacts.map((c, i) => (
            <button
              type="button"
              key={c.id}
              data-ocid={`messages.contact.${i + 1}.button`}
              onClick={() => setActiveContact(c.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 16px",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                background:
                  activeContact === c.id
                    ? "rgba(0,212,170,0.08)"
                    : "transparent",
                borderLeft:
                  activeContact === c.id
                    ? "3px solid #00D4AA"
                    : "3px solid transparent",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: c.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {c.initials}
              </div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{ fontSize: 13, fontWeight: 600, color: "white" }}
                  >
                    {c.name}
                  </span>
                  {c.unread > 0 && (
                    <span
                      style={{
                        background: "#00D4AA",
                        borderRadius: "50%",
                        width: 18,
                        height: 18,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        color: "#0A1628",
                        fontWeight: 700,
                      }}
                    >
                      {c.unread}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#718096",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {c.lastMsg}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Chat Header */}
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid #2A2A2A",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#1A1A1A",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {(() => {
              const c = contacts.find((x) => x.id === activeContact);
              return c ? (
                <>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: c.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    {c.initials}
                  </div>
                  <div>
                    <div
                      style={{ fontSize: 14, fontWeight: 600, color: "white" }}
                    >
                      {c.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#718096" }}>
                      {c.role}
                    </div>
                  </div>
                </>
              ) : null;
            })()}
          </div>
          <button
            type="button"
            data-ocid="messages.broadcast.button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 14px",
              borderRadius: 8,
              background: "#EF444420",
              border: "1px solid #EF444440",
              color: "#EF4444",
              fontSize: 12,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            <Megaphone size={13} /> Broadcast
          </button>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {msgList.map((msg, i) => {
            const isMe = msg.senderId === "admin";
            const isSystem = msg.messageType === "SystemMessage";
            if (isSystem)
              return (
                <div
                  key={msg.id}
                  data-ocid={`messages.item.${i + 1}`}
                  style={{ textAlign: "center" }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: "#718096",
                      background: "#1E1E1E",
                      padding: "4px 12px",
                      borderRadius: 12,
                      border: "1px solid #2A2A2A",
                    }}
                  >
                    {msg.content} &bull; {msg.timestamp}
                  </span>
                </div>
              );
            return (
              <div
                key={msg.id}
                data-ocid={`messages.item.${i + 1}`}
                style={{
                  display: "flex",
                  flexDirection: isMe ? "row-reverse" : "row",
                  gap: 10,
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: roleColor[msg.senderRole] || "#718096",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  {msg.senderName.charAt(0)}
                </div>
                <div style={{ maxWidth: "65%" }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#718096",
                      marginBottom: 3,
                      textAlign: isMe ? "right" : "left",
                    }}
                  >
                    <span
                      style={{
                        color: roleColor[msg.senderRole] || "#718096",
                        fontWeight: 600,
                      }}
                    >
                      {msg.senderName}
                    </span>{" "}
                    &bull; {msg.senderRole} &bull; {msg.timestamp}
                  </div>
                  <div
                    style={{
                      padding: "10px 14px",
                      borderRadius: isMe
                        ? "14px 14px 4px 14px"
                        : "14px 14px 14px 4px",
                      background: isMe
                        ? "#00D4AA"
                        : msg.messageType === "AlertNotification"
                          ? "#EF444420"
                          : "#1E1E1E",
                      color: isMe
                        ? "#0A1628"
                        : msg.messageType === "AlertNotification"
                          ? "#EF4444"
                          : "#E0E0E0",
                      fontSize: 13,
                      lineHeight: 1.5,
                      border:
                        msg.messageType === "AlertNotification"
                          ? "1px solid #EF444440"
                          : "none",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid #2A2A2A",
            display: "flex",
            gap: 10,
            background: "#1A1A1A",
          }}
        >
          <input
            data-ocid="messages.compose.input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: "10px 16px",
              borderRadius: 10,
              background: "#2A2A2A",
              border: "1px solid #333",
              color: "white",
              fontSize: 14,
              outline: "none",
            }}
          />
          <button
            type="button"
            data-ocid="messages.send.button"
            onClick={sendMessage}
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              background: "#00D4AA",
              border: "none",
              color: "#0A1628",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
