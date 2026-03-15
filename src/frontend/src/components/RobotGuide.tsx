import { RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bot, Send, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type * as THREE from "three";

interface ChatMessage {
  id: number;
  role: "ai" | "user";
  text: string;
}

const GREETING =
  "Hi! I'm STAI, your Supply Chain AI. Ask me anything about the app!";

const knowledgeBase: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["dashboard", "home", "kpi", "overview"],
    answer:
      "The Dashboard shows live KPIs (total suppliers, active shipments, inventory value), a weekly shipments bar chart, low-stock alerts, and recent activity for Soujanya S.",
  },
  {
    keywords: [
      "inventory",
      "stock",
      "lpg",
      "food",
      "pharma",
      "medical",
      "electronics",
    ],
    answer:
      "The Inventory screen tracks LPG cylinders, bulk tanks, food, medical, electronics, and raw materials. Cards are color-coded green/orange/red for stock levels, with filter chips by category.",
  },
  {
    keywords: ["supplier", "supplier directory", "country", "countries"],
    answer:
      "The Suppliers tab has 50+ global suppliers with star ratings, country flags, and status badges. You can add new suppliers or view full supplier details.",
  },
  {
    keywords: ["order", "purchase", "po", "approve", "reject"],
    answer:
      "In Purchase Orders you can create POs, filter by status, and Approve or Reject them. You must View Details before approving or rejecting. Rejections require a reason, which is shown on the card.",
  },
  {
    keywords: ["alert", "warning", "notification", "bell"],
    answer:
      "Alerts shows severity-colored cards for stock warnings and system updates. Bell notifications in the top bar track all admin actions like approvals, rejections, and new POs.",
  },
  {
    keywords: ["message", "chat", "broadcast"],
    answer:
      "The Messages screen provides a chat interface for the team. Admins can send broadcasts to all users.",
  },
  {
    keywords: ["analytics", "forecast", "performance", "chart"],
    answer:
      "Analytics shows KPI summary cards, bar charts for monthly trends, a donut chart for delivery status, and supplier performance bars.",
  },
  {
    keywords: ["demand", "insight", "regional", "region"],
    answer:
      "Demand Insights shows regional demand cards and a comparison bar chart to help you forecast supply needs across different areas.",
  },
  {
    keywords: ["admin", "approval", "queue", "review"],
    answer:
      "The Admin Approval Queue lists pending user and access requests. You must View Details before approving or rejecting any request.",
  },
  {
    keywords: ["role", "permission", "access", "manager", "operator", "viewer"],
    answer:
      "There are 4 roles: Admin (full access), Manager (create POs, monitor inventory), Operator (update inventory, scan barcodes), and Viewer (read-only).",
  },
  {
    keywords: ["login", "register", "signup", "sign in", "password"],
    answer:
      "Login and Register screens use a dark card UI with a role dropdown and show/hide password toggle.",
  },
  {
    keywords: ["barcode", "scan"],
    answer:
      "Operators can use the Scan Barcode feature from the FAB (floating action button) to look up inventory items quickly.",
  },
  {
    keywords: ["fab", "quick", "action", "create", "add"],
    answer:
      "The floating action button (FAB) opens a speed-dial with 4 quick actions: Add Inventory, Create PO, Add Supplier, and Scan Barcode.",
  },
  {
    keywords: ["app details", "about", "documentation", "doc"],
    answer:
      "The App Details page (under the Admin sidebar) documents all 11 screens, 4 roles, 5 supported industries, key features, and the design theme.",
  },
  {
    keywords: ["industry", "energy", "pharmaceutical", "raw material"],
    answer:
      "SupplyTrack AI supports 5 industries: Energy (LPG), Food Supply Chain, Pharmaceuticals, Electronics, and Raw Materials.",
  },
];

function getAIResponse(userInput: string): string {
  const lower = userInput.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.answer;
    }
  }
  return "I'm not sure about that. You can ask me about the Dashboard, Inventory, Suppliers, Purchase Orders, Alerts, Analytics, Roles, or any other part of the app!";
}

function speak(text: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1.1;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
}

function RobotMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(timeRef.current * 1.2) * 0.08;
      groupRef.current.rotation.y = timeRef.current * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      <RoundedBox args={[0.7, 0.6, 0.5]} radius={0.08} position={[0, 0.75, 0]}>
        <meshStandardMaterial color="#00D4AA" metalness={0.3} roughness={0.4} />
      </RoundedBox>
      <mesh position={[-0.15, 0.8, 0.26]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial
          color="white"
          emissive="white"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0.15, 0.8, 0.26]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial
          color="white"
          emissive="white"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[-0.15, 0.8, 0.32]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#0A1628" />
      </mesh>
      <mesh position={[0.15, 0.8, 0.32]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#0A1628" />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.25, 8]} />
        <meshStandardMaterial color="#A0AEC0" />
      </mesh>
      <mesh position={[0, 1.24, 0]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial
          color="#EF4444"
          emissive="#EF4444"
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.8, 0.75, 0.45]} />
        <meshStandardMaterial color="#1E3A5F" metalness={0.2} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.15, 0.23]}>
        <boxGeometry args={[0.35, 0.25, 0.02]} />
        <meshStandardMaterial
          color="#00D4AA"
          emissive="#00D4AA"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[-0.55, 0.15, 0]}>
        <boxGeometry args={[0.2, 0.55, 0.2]} />
        <meshStandardMaterial color="#1E3A5F" metalness={0.2} roughness={0.6} />
      </mesh>
      <mesh position={[0.55, 0.15, 0]}>
        <boxGeometry args={[0.2, 0.55, 0.2]} />
        <meshStandardMaterial color="#1E3A5F" metalness={0.2} roughness={0.6} />
      </mesh>
      <mesh position={[-0.22, -0.55, 0]}>
        <boxGeometry args={[0.25, 0.5, 0.25]} />
        <meshStandardMaterial color="#0A1628" metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[0.22, -0.55, 0]}>
        <boxGeometry args={[0.25, 0.5, 0.25]} />
        <meshStandardMaterial color="#0A1628" metalness={0.3} roughness={0.5} />
      </mesh>
    </group>
  );
}

let msgCounter = 1;

export default function RobotGuide() {
  const [visible, setVisible] = useState(true);
  const [chatOpen, setChatOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 0, role: "ai", text: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const ttsRef = useRef(ttsEnabled);
  ttsRef.current = ttsEnabled;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasSpokenGreeting = useRef(false);

  useEffect(() => {
    if (!hasSpokenGreeting.current && ttsRef.current) {
      hasSpokenGreeting.current = true;
      speak(GREETING);
    }
  }, []);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = {
      id: msgCounter++,
      role: "user",
      text: trimmed,
    };
    const aiText = getAIResponse(trimmed);
    const aiMsg: ChatMessage = { id: msgCounter++, role: "ai", text: aiText };
    setChatMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
    if (ttsRef.current) speak(aiText);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const toggleTts = () => {
    setTtsEnabled((prev) => {
      if (prev) window.speechSynthesis?.cancel();
      return !prev;
    });
  };

  return (
    <>
      {/* Toggle button */}
      <button
        type="button"
        data-ocid="robot.toggle"
        onClick={() => {
          setVisible((v) => {
            if (v) window.speechSynthesis?.cancel();
            return !v;
          });
        }}
        style={{
          position: "fixed",
          bottom: 80,
          right: 88,
          zIndex: 50,
          width: 42,
          height: 42,
          borderRadius: "50%",
          background: visible ? "#00D4AA" : "#1E3A5F",
          border: "2px solid #00D4AA",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 12px rgba(0,212,170,0.3)",
          transition: "background 0.2s",
        }}
        aria-label={visible ? "Hide STAI" : "Show STAI"}
      >
        <Bot size={20} color={visible ? "#0A1628" : "#00D4AA"} />
      </button>

      {visible && (
        <div
          style={{
            position: "fixed",
            bottom: 72,
            right: 16,
            zIndex: 49,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 0,
            pointerEvents: "none",
          }}
        >
          {/* Chat panel */}
          {chatOpen && (
            <div
              style={{
                background: "#1E1E1E",
                border: "1.5px solid #00D4AA",
                borderRadius: 14,
                marginBottom: 8,
                width: 270,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
                pointerEvents: "auto",
                maxHeight: 380,
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  borderBottom: "1px solid #2D3748",
                  background: "#0A1628",
                }}
              >
                <span
                  style={{ color: "#00D4AA", fontSize: 12, fontWeight: 700 }}
                >
                  STAI Assistant
                </span>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <button
                    type="button"
                    data-ocid="robot.tts.toggle"
                    onClick={toggleTts}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: ttsEnabled ? "#00D4AA" : "#718096",
                      padding: 0,
                      lineHeight: 1,
                    }}
                    aria-label={ttsEnabled ? "Mute voice" : "Enable voice"}
                  >
                    {ttsEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
                  </button>
                  <button
                    type="button"
                    data-ocid="robot.chat.close_button"
                    onClick={() => setChatOpen(false)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#718096",
                      padding: 0,
                      lineHeight: 1,
                    }}
                    aria-label="Close chat"
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "10px 10px 4px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  minHeight: 0,
                  maxHeight: 260,
                }}
              >
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      display: "flex",
                      justifyContent:
                        msg.role === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        background: msg.role === "user" ? "#00D4AA" : "#2D3748",
                        color: msg.role === "user" ? "#0A1628" : "#E2E8F0",
                        borderRadius:
                          msg.role === "user"
                            ? "12px 12px 2px 12px"
                            : "12px 12px 12px 2px",
                        padding: "7px 10px",
                        fontSize: 11.5,
                        lineHeight: 1.5,
                        maxWidth: "85%",
                        wordBreak: "break-word",
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderTop: "1px solid #2D3748",
                  padding: "6px 8px",
                  gap: 6,
                  background: "#121212",
                }}
              >
                <input
                  data-ocid="robot.chat.input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                  }}
                  placeholder="Ask me anything..."
                  style={{
                    flex: 1,
                    background: "#1E1E1E",
                    border: "1px solid #2D3748",
                    borderRadius: 8,
                    color: "#E2E8F0",
                    fontSize: 11.5,
                    padding: "5px 8px",
                    outline: "none",
                  }}
                />
                <button
                  type="button"
                  data-ocid="robot.chat.submit_button"
                  onClick={sendMessage}
                  style={{
                    background: "#00D4AA",
                    border: "none",
                    borderRadius: 8,
                    padding: "5px 8px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-label="Send message"
                >
                  <Send size={13} color="#0A1628" />
                </button>
              </div>
            </div>
          )}

          {/* Robot 3D model */}
          <button
            type="button"
            style={{
              width: 140,
              height: 180,
              pointerEvents: "auto",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
              display: "block",
            }}
            onClick={() => setChatOpen((v) => !v)}
            aria-label="Toggle STAI chat"
          >
            <Canvas
              camera={{ position: [0, 0.3, 3.5], fov: 35 }}
              style={{ background: "transparent" }}
              gl={{ alpha: true }}
            >
              <ambientLight intensity={0.6} />
              <pointLight
                position={[2, 3, 2]}
                intensity={1.2}
                color="#00D4AA"
              />
              <pointLight
                position={[-2, 1, 1]}
                intensity={0.4}
                color="#4A90D9"
              />
              <RobotMesh />
            </Canvas>
          </button>
        </div>
      )}
    </>
  );
}
