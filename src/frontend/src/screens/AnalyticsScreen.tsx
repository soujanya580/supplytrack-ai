import { BarChart3, Star, TrendingUp, Truck } from "lucide-react";
import { suppliers } from "../data/mockData";

const kpiCards = [
  {
    label: "Total Shipments",
    value: "523",
    icon: Truck,
    color: "#00D4AA",
    sub: "Last 30 days",
  },
  {
    label: "On-Time Delivery",
    value: "87%",
    icon: TrendingUp,
    color: "#22C55E",
    sub: "+3% vs last month",
  },
  {
    label: "Avg Supplier Rating",
    value: "4.1\u2605",
    icon: Star,
    color: "#F59E0B",
    sub: "Across 12 suppliers",
  },
  {
    label: "Forecast Accuracy",
    value: "92%",
    icon: BarChart3,
    color: "#3B82F6",
    sub: "AI model accuracy",
  },
];

const inventoryUsage = [
  { category: "LPG Cylinders", used: 78, color: "#00D4AA" },
  { category: "Bulk Tanks", used: 54, color: "#3B82F6" },
  { category: "Food Supply", used: 91, color: "#EF4444" },
  { category: "Medical Supply", used: 42, color: "#8B5CF6" },
  { category: "Electronics", used: 67, color: "#F97316" },
  { category: "Raw Materials", used: 34, color: "#F59E0B" },
];

const weeklyData = [
  { day: "Mon", count: 62 },
  { day: "Tue", count: 78 },
  { day: "Wed", count: 55 },
  { day: "Thu", count: 91 },
  { day: "Fri", count: 84 },
  { day: "Sat", count: 43 },
  { day: "Sun", count: 30 },
];

export default function AnalyticsScreen() {
  const maxWeekly = Math.max(...weeklyData.map((d) => d.count));

  const pct = 87;
  const r = 48;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "white",
            margin: "0 0 4px",
          }}
        >
          Analytics Dashboard
        </h1>
        <p style={{ color: "#718096", fontSize: 14, margin: 0 }}>
          Performance metrics and supply chain intelligence
        </p>
      </div>

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
              data-ocid={`analytics.${card.label.toLowerCase().replace(/\s/g, "_")}.card`}
              style={{
                background: "#1E1E1E",
                borderRadius: 14,
                padding: 20,
                border: "1px solid #2A2A2A",
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
                  marginBottom: 12,
                }}
              >
                <Icon size={20} style={{ color: card.color }} />
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "white",
                  marginBottom: 4,
                }}
              >
                {card.value}
              </div>
              <div style={{ fontSize: 13, color: "#A0AEC0" }}>{card.label}</div>
              <div style={{ fontSize: 11, color: "#718096", marginTop: 4 }}>
                {card.sub}
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
          marginBottom: 20,
        }}
      >
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
            Weekly Shipments
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 8,
              height: 120,
            }}
          >
            {weeklyData.map((d) => (
              <div
                key={d.day}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span style={{ fontSize: 10, color: "#718096" }}>
                  {d.count}
                </span>
                <div
                  style={{
                    width: "100%",
                    height: (d.count / maxWeekly) * 90,
                    background: "linear-gradient(to top, #00D4AA, #00A884)",
                    borderRadius: "4px 4px 0 0",
                  }}
                />
                <span style={{ fontSize: 10, color: "#718096" }}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#1E1E1E",
            borderRadius: 14,
            padding: 20,
            border: "1px solid #2A2A2A",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "white",
              margin: "0 0 20px",
              alignSelf: "flex-start",
            }}
          >
            Delivery Success Rate
          </h3>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width={120}
              height={120}
              style={{ transform: "rotate(-90deg)" }}
              aria-label="Delivery success donut chart"
            >
              <title>Delivery Success Rate</title>
              <circle
                cx={60}
                cy={60}
                r={r}
                fill="none"
                stroke="#2A2A2A"
                strokeWidth={10}
              />
              <circle
                cx={60}
                cy={60}
                r={r}
                fill="none"
                stroke="#22C55E"
                strokeWidth={10}
                strokeDasharray={circ}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
            <div style={{ position: "absolute", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "white" }}>
                87%
              </div>
              <div style={{ fontSize: 10, color: "#718096" }}>Success</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: "#22C55E",
                }}
              />
              <span style={{ fontSize: 12, color: "#718096" }}>
                On Time 87%
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: "#2A2A2A",
                }}
              />
              <span style={{ fontSize: 12, color: "#718096" }}>
                Delayed 13%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
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
            Supplier Performance
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {suppliers.map((s, i) => (
              <div key={s.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <span style={{ fontSize: 13, color: "#A0AEC0" }}>
                    {s.flag} {s.name}
                  </span>
                  <span
                    style={{ fontSize: 13, fontWeight: 700, color: "#F59E0B" }}
                  >
                    {s.rating}/5
                  </span>
                </div>
                <div
                  style={{
                    height: 6,
                    background: "#2A2A2A",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${(s.rating / 5) * 100}%`,
                      background: `hsl(${40 + i * 20}, 80%, 55%)`,
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

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
            Inventory Usage
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {inventoryUsage.map((item) => (
              <div key={item.category}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <span style={{ fontSize: 13, color: "#A0AEC0" }}>
                    {item.category}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color:
                        item.used > 80
                          ? "#EF4444"
                          : item.used > 60
                            ? "#F97316"
                            : "#22C55E",
                    }}
                  >
                    {item.used}%
                  </span>
                </div>
                <div
                  style={{
                    height: 6,
                    background: "#2A2A2A",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${item.used}%`,
                      background: item.color,
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
