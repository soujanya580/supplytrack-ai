import {
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  CheckSquare,
  Info,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  Plus,
  ShoppingCart,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Screen } from "../App";
import type { StoredUser } from "../utils/auth";
import { useNotificationStore } from "../utils/notificationStore";

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  currentUser: StoredUser;
}

const typeColors: Record<string, string> = {
  approve: "#22C55E",
  reject: "#EF4444",
  create: "#00D4AA",
  view: "#F97316",
  info: "#718096",
};

const navItems = [
  { id: "dashboard" as Screen, label: "Home", icon: LayoutDashboard },
  { id: "inventory" as Screen, label: "Inventory", icon: Package },
  { id: "suppliers" as Screen, label: "Suppliers", icon: Building2 },
  { id: "orders" as Screen, label: "Orders", icon: ShoppingCart },
  { id: "analytics" as Screen, label: "Analytics", icon: BarChart3 },
  { id: "alerts" as Screen, label: "Alerts", icon: Bell },
  { id: "messages" as Screen, label: "Messages", icon: MessageSquare },
];

const fabItems = [
  { label: "New Supplier", icon: Building2, color: "#3B82F6" },
  { label: "Purchase Order", icon: ShoppingCart, color: "#8B5CF6" },
  { label: "Inventory Item", icon: Package, color: "#F97316" },
  { label: "Alert Report", icon: AlertTriangle, color: "#EF4444" },
];

function userInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
}

export default function Layout({
  children,
  currentScreen,
  onNavigate,
  onLogout,
  currentUser,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const { notifications, markAllRead, unreadCount } = useNotificationStore();
  const count = unreadCount();

  const initials = userInitials(currentUser.name);
  const displayRole =
    currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);

  // Close notification panel when clicking outside
  useEffect(() => {
    if (!notifOpen) return;
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [notifOpen]);

  const handleBellClick = () => {
    const next = !notifOpen;
    setNotifOpen(next);
    if (next) markAllRead();
  };

  const sidebarNavBtn = (
    id: Screen,
    label: string,
    Icon: React.FC<{ size?: number }>,
    active: boolean,
    badge?: { count: number; bg: string; color: string },
  ) => (
    <button
      type="button"
      key={id}
      data-ocid={`nav.${id}.link`}
      onClick={() => onNavigate(id)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        background: active ? "rgba(0,212,170,0.15)" : "transparent",
        color: active ? "#00D4AA" : "#A0AEC0",
        fontWeight: active ? 600 : 400,
        fontSize: 14,
        marginBottom: 2,
        textAlign: "left",
        borderLeft: active ? "3px solid #00D4AA" : "3px solid transparent",
      }}
    >
      <Icon size={18} />
      {label}
      {badge && (
        <span
          style={{
            marginLeft: "auto",
            background: badge.bg,
            borderRadius: 10,
            padding: "1px 7px",
            fontSize: 11,
            color: badge.color,
            fontWeight: 700,
          }}
        >
          {badge.count}
        </span>
      )}
    </button>
  );

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "#121212",
      }}
    >
      {/* Desktop Sidebar */}
      <aside
        style={{
          width: 240,
          background: "#0A1628",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #1E3A5F",
          flexShrink: 0,
        }}
        className="hidden md:flex"
      >
        <div
          style={{ padding: "20px 16px", borderBottom: "1px solid #1E3A5F" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "#00D4AA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                color: "#0A1628",
                fontSize: 14,
              }}
            >
              ST
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>
                SupplyTrack
              </div>
              <div style={{ fontSize: 11, color: "#00D4AA" }}>AI</div>
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
          {navItems.map((item) =>
            sidebarNavBtn(
              item.id,
              item.label,
              item.icon,
              currentScreen === item.id,
              item.id === "alerts"
                ? { count: 4, bg: "#EF4444", color: "white" }
                : item.id === "messages"
                  ? { count: 2, bg: "#00D4AA", color: "#0A1628" }
                  : undefined,
            ),
          )}
          <div
            style={{
              marginTop: 16,
              paddingTop: 16,
              borderTop: "1px solid #1E3A5F",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "#4A5568",
                padding: "0 12px",
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Admin
            </div>
            {sidebarNavBtn(
              "approval",
              "Approvals",
              CheckSquare,
              currentScreen === "approval",
              { count: 5, bg: "#F97316", color: "white" },
            )}
            {sidebarNavBtn(
              "demand",
              "Demand Insights",
              TrendingUp,
              currentScreen === "demand",
            )}
            {sidebarNavBtn(
              "appdetails",
              "App Details",
              Info,
              currentScreen === "appdetails",
            )}
          </div>
        </nav>
        <div style={{ padding: "12px 8px", borderTop: "1px solid #1E3A5F" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 12px",
              marginBottom: 4,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#00D4AA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                color: "#0A1628",
                fontSize: 12,
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "white",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {currentUser.name}
              </div>
              <div style={{ fontSize: 11, color: "#00D4AA" }}>
                {displayRole}
              </div>
            </div>
          </div>
          <button
            type="button"
            data-ocid="nav.logout.button"
            onClick={onLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 12px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: "transparent",
              color: "#718096",
              fontSize: 13,
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 50 }}
          className="md:hidden"
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              border: "none",
              cursor: "pointer",
              width: "100%",
              height: "100%",
            }}
          />
          <aside
            style={{
              position: "relative",
              width: 240,
              height: "100%",
              background: "#0A1628",
              borderRight: "1px solid #1E3A5F",
              display: "flex",
              flexDirection: "column",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                borderBottom: "1px solid #1E3A5F",
              }}
            >
              <div style={{ fontWeight: 700, color: "white" }}>
                SupplyTrack AI
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>
            <nav style={{ flex: 1, padding: "8px", overflowY: "auto" }}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = currentScreen === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setSidebarOpen(false);
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 12px",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                      background: active
                        ? "rgba(0,212,170,0.15)"
                        : "transparent",
                      color: active ? "#00D4AA" : "#A0AEC0",
                      fontWeight: active ? 600 : 400,
                      fontSize: 14,
                      marginBottom: 2,
                      textAlign: "left",
                    }}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
              <div
                style={{
                  marginTop: 8,
                  paddingTop: 8,
                  borderTop: "1px solid #1E3A5F",
                }}
              >
                {[
                  {
                    id: "approval" as Screen,
                    label: "Approvals",
                    icon: CheckSquare,
                  },
                  {
                    id: "demand" as Screen,
                    label: "Demand Insights",
                    icon: TrendingUp,
                  },
                  {
                    id: "appdetails" as Screen,
                    label: "App Details",
                    icon: Info,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = currentScreen === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        setSidebarOpen(false);
                      }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 12px",
                        borderRadius: 8,
                        border: "none",
                        cursor: "pointer",
                        background: active
                          ? "rgba(0,212,170,0.15)"
                          : "transparent",
                        color: active ? "#00D4AA" : "#A0AEC0",
                        fontWeight: active ? 600 : 400,
                        fontSize: 14,
                        marginBottom: 2,
                        textAlign: "left",
                      }}
                    >
                      <Icon size={18} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
              {/* Mobile user info */}
              <div
                style={{
                  marginTop: 16,
                  paddingTop: 16,
                  borderTop: "1px solid #1E3A5F",
                  padding: "16px 12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "#00D4AA",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      color: "#0A1628",
                      fontSize: 12,
                      flexShrink: 0,
                    }}
                  >
                    {initials}
                  </div>
                  <div>
                    <div
                      style={{ fontSize: 13, fontWeight: 600, color: "white" }}
                    >
                      {currentUser.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#00D4AA" }}>
                      {displayRole}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  data-ocid="nav.mobile.logout.button"
                  onClick={onLogout}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "none",
                    border: "none",
                    color: "#718096",
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            </nav>
          </aside>
        </div>
      )}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <header
          style={{
            height: 60,
            background: "#0A1628",
            borderBottom: "1px solid #1E3A5F",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <button
            type="button"
            data-ocid="topbar.menu.button"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: 4,
            }}
          >
            <Menu size={22} />
          </button>
          <div
            style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}
          >
            <div
              className="hidden md:flex"
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: "#00D4AA",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                color: "#0A1628",
                fontSize: 12,
              }}
            >
              ST
            </div>
            <span style={{ fontWeight: 700, fontSize: 16, color: "white" }}>
              SupplyTrack AI
            </span>
          </div>

          {/* Bell with notification panel */}
          <div ref={notifRef} style={{ position: "relative" }}>
            <button
              type="button"
              data-ocid="topbar.notifications.button"
              onClick={handleBellClick}
              style={{
                position: "relative",
                background: "none",
                border: "none",
                color: notifOpen ? "#00D4AA" : "#A0AEC0",
                cursor: "pointer",
                padding: 4,
              }}
            >
              <Bell size={20} />
              {count > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    minWidth: 16,
                    height: 16,
                    background: "#EF4444",
                    borderRadius: "50%",
                    fontSize: 10,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    padding: "0 2px",
                  }}
                >
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </button>

            {notifOpen && (
              <div
                data-ocid="topbar.notifications.panel"
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  right: 0,
                  width: 320,
                  maxHeight: 400,
                  background: "#1E1E1E",
                  border: "1px solid #2A2A2A",
                  borderRadius: 12,
                  zIndex: 500,
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    borderBottom: "1px solid #2A2A2A",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{ fontWeight: 700, fontSize: 14, color: "white" }}
                  >
                    Notifications
                  </span>
                  <button
                    type="button"
                    data-ocid="notifications.mark_all.button"
                    onClick={markAllRead}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 12,
                      color: "#00D4AA",
                      padding: 0,
                    }}
                  >
                    Mark all read
                  </button>
                </div>
                <div style={{ overflowY: "auto", flex: 1 }}>
                  {notifications.length === 0 ? (
                    <div
                      data-ocid="notifications.empty_state"
                      style={{
                        padding: "32px 16px",
                        textAlign: "center",
                        color: "#718096",
                        fontSize: 13,
                      }}
                    >
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((notif, idx) => (
                      <div
                        key={notif.id}
                        data-ocid={`notifications.item.${idx + 1}`}
                        style={{
                          display: "flex",
                          gap: 0,
                          borderBottom: "1px solid #242424",
                          background: notif.read ? "transparent" : "#252525",
                          borderLeft: `3px solid ${typeColors[notif.type] ?? "#718096"}`,
                        }}
                      >
                        <div style={{ flex: 1, padding: "10px 14px" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              gap: 8,
                              marginBottom: 2,
                            }}
                          >
                            <span
                              style={{
                                fontWeight: 700,
                                fontSize: 13,
                                color: "white",
                                lineHeight: 1.3,
                              }}
                            >
                              {notif.title}
                            </span>
                            <span
                              style={{
                                fontSize: 11,
                                color: "#718096",
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                              }}
                            >
                              {notif.time}
                            </span>
                          </div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: 12,
                              color: "#A0AEC0",
                              lineHeight: 1.4,
                            }}
                          >
                            {notif.message}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            data-ocid="topbar.profile.button"
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "#00D4AA",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              color: "#0A1628",
              fontSize: 13,
            }}
          >
            {initials}
          </button>
        </header>
        <main style={{ flex: 1, overflowY: "auto", padding: 0 }}>
          {children}
        </main>
        <nav
          className="md:hidden"
          style={{
            display: "flex",
            background: "#0A1628",
            borderTop: "1px solid #1E3A5F",
            flexShrink: 0,
          }}
        >
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = currentScreen === item.id;
            return (
              <button
                type="button"
                key={item.id}
                data-ocid={`bottomnav.${item.id}.link`}
                onClick={() => onNavigate(item.id)}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px 4px",
                  border: "none",
                  background: "transparent",
                  color: active ? "#00D4AA" : "#718096",
                  fontSize: 10,
                  gap: 3,
                  cursor: "pointer",
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* FAB */}
      <div
        style={{ position: "fixed", bottom: 80, right: 24, zIndex: 40 }}
        className="md:bottom-8"
      >
        {fabOpen && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginBottom: 12,
            }}
          >
            {fabItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  type="button"
                  key={item.label}
                  data-ocid={`fab.${item.label.toLowerCase().replace(/\s/g, "_")}.button`}
                  onClick={() => setFabOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 16px",
                    borderRadius: 24,
                    border: "none",
                    background: "#1E1E1E",
                    color: "white",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 500,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
                    borderLeft: `3px solid ${item.color}`,
                    whiteSpace: "nowrap",
                    alignSelf: "flex-end",
                  }}
                >
                  <Icon size={15} style={{ color: item.color }} />
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
        <button
          type="button"
          data-ocid="fab.primary.button"
          onClick={() => setFabOpen(!fabOpen)}
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "#00D4AA",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(0,212,170,0.4)",
            transition: "transform 0.2s",
            transform: fabOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <Plus size={24} color="#0A1628" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
