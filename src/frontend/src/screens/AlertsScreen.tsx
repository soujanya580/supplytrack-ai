import {
  AlertCircle,
  AlertTriangle,
  Bell,
  CheckCircle,
  Info,
} from "lucide-react";
import { useState } from "react";
import { type AlertSeverity, type AlertType, alerts } from "../data/mockData";

const severityStyle: Record<
  AlertSeverity,
  { border: string; bg: string; text: string; icon: typeof AlertTriangle }
> = {
  Critical: {
    border: "#EF4444",
    bg: "#EF444410",
    text: "#EF4444",
    icon: AlertTriangle,
  },
  Warning: {
    border: "#F97316",
    bg: "#F9731610",
    text: "#F97316",
    icon: AlertCircle,
  },
  Info: { border: "#3B82F6", bg: "#3B82F610", text: "#3B82F6", icon: Info },
};

const typeLabels: Record<AlertType, string> = {
  LowStock: "Low Stock",
  ShipmentDelay: "Shipment Delay",
  DemandSpike: "Demand Spike",
  SupplierRisk: "Supplier Risk",
  System: "System",
};

export default function AlertsScreen() {
  const [filter, setFilter] = useState<AlertType | "All">("All");
  const [alertList, setAlertList] = useState(alerts);

  const filtered = alertList.filter(
    (a) => filter === "All" || a.type === filter,
  );
  const unread = alertList.filter((a) => !a.isRead).length;

  const markRead = (id: string) =>
    setAlertList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a)),
    );

  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "white",
                margin: 0,
              }}
            >
              Real-Time Alerts
            </h1>
            {unread > 0 && (
              <span
                style={{
                  background: "#EF4444",
                  color: "white",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "2px 9px",
                  borderRadius: 12,
                }}
              >
                {unread} unread
              </span>
            )}
          </div>
          <p style={{ color: "#718096", fontSize: 14, margin: "4px 0 0" }}>
            Monitor supply chain anomalies and risks
          </p>
        </div>
        <Bell size={20} color="#718096" />
      </div>

      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}
      >
        {(
          [
            "All",
            "LowStock",
            "ShipmentDelay",
            "DemandSpike",
            "SupplierRisk",
            "System",
          ] as const
        ).map((t) => (
          <button
            type="button"
            key={t}
            data-ocid={`alerts.filter.${t.toLowerCase()}.tab`}
            onClick={() => setFilter(t)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              border: filter === t ? "none" : "1px solid #2A2A2A",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 500,
              background: filter === t ? "#00D4AA" : "#1E1E1E",
              color: filter === t ? "#0A1628" : "#A0AEC0",
            }}
          >
            {t === "All" ? "All" : typeLabels[t as AlertType]}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map((alert, i) => {
          const s = severityStyle[alert.severity];
          const Icon = s.icon;
          return (
            <div
              key={alert.id}
              data-ocid={`alerts.item.${i + 1}`}
              style={{
                background: "#1E1E1E",
                borderRadius: 14,
                padding: 18,
                border: "1px solid #2A2A2A",
                borderLeft: `4px solid ${s.border}`,
                opacity: alert.isRead ? 0.6 : 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ display: "flex", gap: 12, flex: 1 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: s.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} color={s.text} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: "white",
                        }}
                      >
                        {alert.title}
                      </span>
                      <span
                        style={{
                          background: s.bg,
                          color: s.text,
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: 10,
                        }}
                      >
                        {alert.severity}
                      </span>
                      <span
                        style={{
                          background: "#2A2A2A",
                          color: "#718096",
                          fontSize: 11,
                          padding: "2px 8px",
                          borderRadius: 10,
                        }}
                      >
                        {typeLabels[alert.type]}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#A0AEC0",
                        margin: "0 0 8px",
                        lineHeight: 1.5,
                      }}
                    >
                      {alert.description}
                    </p>
                    <span style={{ fontSize: 12, color: "#718096" }}>
                      {alert.timestamp}
                    </span>
                  </div>
                </div>
                {!alert.isRead && (
                  <button
                    type="button"
                    data-ocid={`alerts.mark_read.${i + 1}.button`}
                    onClick={() => markRead(alert.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "6px 12px",
                      borderRadius: 8,
                      background: "transparent",
                      border: "1px solid #2A2A2A",
                      color: "#718096",
                      fontSize: 12,
                      cursor: "pointer",
                      flexShrink: 0,
                      marginLeft: 12,
                    }}
                  >
                    <CheckCircle size={13} /> Mark Read
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
