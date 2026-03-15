import { AlertCircle, TrendingDown, TrendingUp } from "lucide-react";
import { demandData } from "../data/mockData";

const regionColors: Record<string, string> = {
  North: "#00D4AA",
  South: "#3B82F6",
  East: "#8B5CF6",
  West: "#F97316",
};

export default function DemandInsightsScreen() {
  const maxVal = Math.max(
    ...demandData.flatMap((d) => [d.currentDemand, d.predictedDemand]),
  );

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
          Demand Insights
        </h1>
        <p style={{ color: "#718096", fontSize: 14, margin: 0 }}>
          Regional supply-demand forecasting and gap analysis
        </p>
      </div>

      {/* Region Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        {demandData.map((d) => {
          const color = regionColors[d.region];
          const gapPositive = d.supplyGap > 0;
          return (
            <div
              key={d.region}
              data-ocid={`demand.${d.region.toLowerCase()}.card`}
              style={{
                background: "#1E1E1E",
                borderRadius: 14,
                padding: 20,
                border: "1px solid #2A2A2A",
                borderTop: `3px solid ${color}`,
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
                    fontSize: 16,
                    fontWeight: 700,
                    color: "white",
                    margin: 0,
                  }}
                >
                  {d.region} Region
                </h3>
                <span
                  style={{
                    background: `${color}20`,
                    color,
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 12,
                  }}
                >
                  {d.seasonalFactor > 0 ? "+" : ""}
                  {d.seasonalFactor}% seasonal
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    background: "#252525",
                    borderRadius: 8,
                    padding: "10px 12px",
                  }}
                >
                  <div
                    style={{ fontSize: 11, color: "#718096", marginBottom: 4 }}
                  >
                    Current
                  </div>
                  <div
                    style={{ fontSize: 20, fontWeight: 800, color: "white" }}
                  >
                    {d.currentDemand}
                  </div>
                </div>
                <div
                  style={{
                    background: "#252525",
                    borderRadius: 8,
                    padding: "10px 12px",
                  }}
                >
                  <div
                    style={{ fontSize: 11, color: "#718096", marginBottom: 4 }}
                  >
                    Predicted
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, color }}>
                    {d.predictedDemand}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  borderRadius: 8,
                  background: gapPositive ? "#EF444415" : "#22C55E15",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {gapPositive ? (
                    <AlertCircle size={14} color="#EF4444" />
                  ) : (
                    <TrendingDown size={14} color="#22C55E" />
                  )}
                  <span style={{ fontSize: 12, color: "#A0AEC0" }}>
                    Supply Gap
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: gapPositive ? "#EF4444" : "#22C55E",
                  }}
                >
                  {gapPositive ? "+" : ""}
                  {d.supplyGap}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Chart */}
      <div
        style={{
          background: "#1E1E1E",
          borderRadius: 14,
          padding: 24,
          border: "1px solid #2A2A2A",
        }}
      >
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "white",
            margin: "0 0 24px",
          }}
        >
          Regional Demand Comparison
        </h3>
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "flex-end",
            height: 180,
            paddingBottom: 20,
          }}
        >
          {demandData.map((d) => {
            const color = regionColors[d.region];
            const currH = (d.currentDemand / maxVal) * 140;
            const predH = (d.predictedDemand / maxVal) * 140;
            return (
              <div
                key={d.region}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    alignItems: "flex-end",
                    height: 140,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        color: "#718096",
                        marginBottom: 3,
                      }}
                    >
                      {d.currentDemand}
                    </span>
                    <div
                      style={{
                        width: 28,
                        height: currH,
                        background: color,
                        borderRadius: "4px 4px 0 0",
                        opacity: 0.8,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        color: "#718096",
                        marginBottom: 3,
                      }}
                    >
                      {d.predictedDemand}
                    </span>
                    <div
                      style={{
                        width: 28,
                        height: predH,
                        background: color,
                        borderRadius: "4px 4px 0 0",
                        opacity: 0.4,
                        border: `2px dashed ${color}`,
                      }}
                    />
                  </div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color }}>
                  {d.region}
                </span>
              </div>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 16,
                height: 8,
                borderRadius: 2,
                background: "#00D4AA",
                opacity: 0.8,
              }}
            />
            <span style={{ fontSize: 12, color: "#718096" }}>
              Current Demand
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 16,
                height: 8,
                borderRadius: 2,
                background: "#718096",
                border: "2px dashed #718096",
                opacity: 0.6,
              }}
            />
            <span style={{ fontSize: 12, color: "#718096" }}>
              Predicted Demand
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
