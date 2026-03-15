import {
  AlertTriangle,
  Building2,
  Minus,
  Package,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import type { Screen } from "../App";
import {
  alerts,
  inventoryItems,
  recentActivity,
  shipmentsByCountry,
} from "../data/mockData";

interface Props {
  onNavigate: (s: Screen) => void;
}

const kpiCards = [
  {
    label: "Total Inventory Items",
    value: "847",
    icon: Package,
    trend: "+12 this week",
    trendUp: true,
    color: "#00D4AA",
  },
  {
    label: "Active Suppliers",
    value: "12",
    icon: Building2,
    trend: "Stable",
    trendUp: null,
    color: "#3B82F6",
  },
  {
    label: "Pending Purchase Orders",
    value: "3",
    icon: ShoppingCart,
    trend: "-1 from last week",
    trendUp: false,
    color: "#8B5CF6",
  },
  {
    label: "Critical Alerts",
    value: "2",
    icon: AlertTriangle,
    trend: "Needs attention",
    trendUp: null,
    color: "#EF4444",
  },
];

const supplyStatus = [
  { name: "LPG Supply Chain", status: "Operational", color: "#22C55E" },
  { name: "Food Supply Network", status: "Warning", color: "#F97316" },
  { name: "Medical Distribution", status: "Operational", color: "#22C55E" },
  { name: "Electronics Pipeline", status: "At Risk", color: "#EF4444" },
];

export default function Dashboard({ onNavigate }: Props) {
  const lowStockItems = inventoryItems.filter((i) => i.status === "LowStock");
  const maxShipment = Math.max(...shipmentsByCountry.map((s) => s.count));

  return (
    <div style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Greeting */}
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "white",
            margin: "0 0 4px",
          }}
        >
          Welcome, Soujanya S
        </h1>
        <p style={{ color: "#718096", fontSize: 14, margin: 0 }}>
          Supply Chain Administrator &mdash; Here&apos;s your overview for today
        </p>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              data-ocid={`dashboard.${card.label.toLowerCase().replace(/\s/g, "_")}.card`}
              style={{
                background: "#1E1E1E",
                borderRadius: 14,
                padding: "20px",
                border: "1px solid #2A2A2A",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: card.color,
                  opacity: 0.06,
                  transform: "translate(20px, -20px)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: `${card.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={20} style={{ color: card.color }} />
                </div>
                {card.trendUp !== null ? (
                  card.trendUp ? (
                    <TrendingUp size={16} color="#22C55E" />
                  ) : (
                    <TrendingDown size={16} color="#EF4444" />
                  )
                ) : (
                  <Minus size={16} color="#718096" />
                )}
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: "white",
                  lineHeight: 1,
                }}
              >
                {card.value}
              </div>
              <div style={{ fontSize: 13, color: "#A0AEC0", marginTop: 4 }}>
                {card.label}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: card.trendUp
                    ? "#22C55E"
                    : card.trendUp === false
                      ? "#EF4444"
                      : "#718096",
                  marginTop: 6,
                }}
              >
                {card.trend}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 24,
        }}
        className="grid-cols-1 md:grid-cols-2"
      >
        {/* Shipments Chart */}
        <div
          style={{
            background: "#1E1E1E",
            borderRadius: 14,
            padding: 20,
            border: "1px solid #2A2A2A",
          }}
        >
          <h3
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "white",
              margin: "0 0 20px",
            }}
          >
            Weekly Shipments by Destination
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {shipmentsByCountry.map((s) => (
              <div key={s.country}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <span style={{ fontSize: 13, color: "#A0AEC0" }}>
                    {s.country}
                  </span>
                  <span
                    style={{ fontSize: 13, fontWeight: 700, color: "white" }}
                  >
                    {s.count}
                  </span>
                </div>
                <div
                  style={{
                    height: 8,
                    background: "#2A2A2A",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${(s.count / maxShipment) * 100}%`,
                      background: s.color,
                      borderRadius: 4,
                      transition: "width 0.5s ease",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 16,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {shipmentsByCountry.map((s) => (
              <div
                key={s.country}
                style={{ display: "flex", alignItems: "center", gap: 5 }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: s.color,
                  }}
                />
                <span style={{ fontSize: 11, color: "#718096" }}>
                  {s.country}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-Time Supply Status */}
        <div
          style={{
            background: "#1E1E1E",
            borderRadius: 14,
            padding: 20,
            border: "1px solid #2A2A2A",
          }}
        >
          <h3
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "white",
              margin: "0 0 16px",
            }}
          >
            Real-Time Supply Status
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {supplyStatus.map((s) => (
              <div
                key={s.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  background: "#252525",
                  borderRadius: 10,
                  border: "1px solid #2A2A2A",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: s.color,
                      boxShadow: `0 0 6px ${s.color}`,
                    }}
                  />
                  <span style={{ fontSize: 13, color: "#E0E0E0" }}>
                    {s.name}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: s.color,
                    background: `${s.color}15`,
                    padding: "3px 10px",
                    borderRadius: 12,
                  }}
                >
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Low Stock Alerts */}
        <div
          style={{
            background: "#1E1E1E",
            borderRadius: 14,
            padding: 20,
            border: "1px solid #2A2A2A",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "white",
                margin: 0,
              }}
            >
              Low Stock Alerts
            </h3>
            <button
              type="button"
              data-ocid="dashboard.view_all_alerts.button"
              onClick={() => onNavigate("alerts")}
              style={{
                background: "none",
                border: "none",
                color: "#00D4AA",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              View All
            </button>
          </div>
          {lowStockItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 12px",
                marginBottom: 8,
                background: "#252525",
                borderRadius: 10,
                borderLeft: "3px solid #EF4444",
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>
                  {item.name}
                </div>
                <div style={{ fontSize: 12, color: "#718096" }}>
                  {item.warehouse}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{ fontSize: 14, fontWeight: 700, color: "#EF4444" }}
                >
                  {item.stockQty}
                </div>
                <div style={{ fontSize: 11, color: "#718096" }}>
                  / {item.thresholdQty} min
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div
          style={{
            background: "#1E1E1E",
            borderRadius: 14,
            padding: 20,
            border: "1px solid #2A2A2A",
          }}
        >
          <h3
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "white",
              margin: "0 0 16px",
            }}
          >
            Recent Activity
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {recentActivity.map((act, i) => (
              <div
                key={act.id}
                style={{
                  display: "flex",
                  gap: 12,
                  paddingBottom: i < recentActivity.length - 1 ? 14 : 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#00D4AA",
                      flexShrink: 0,
                      marginTop: 3,
                    }}
                  />
                  {i < recentActivity.length - 1 && (
                    <div
                      style={{
                        width: 1,
                        flex: 1,
                        background: "#2A2A2A",
                        marginTop: 4,
                      }}
                    />
                  )}
                </div>
                <div
                  style={{
                    flex: 1,
                    paddingBottom: i < recentActivity.length - 1 ? 6 : 0,
                  }}
                >
                  <div style={{ fontSize: 13, color: "#E0E0E0" }}>
                    {act.text}
                  </div>
                  <div style={{ fontSize: 11, color: "#718096", marginTop: 2 }}>
                    {act.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
