import {
  AlertTriangle,
  BarChart3,
  Building2,
  CheckSquare,
  Info,
  LayoutDashboard,
  Lock,
  MessageSquare,
  Package,
  Scan,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

const card: React.CSSProperties = {
  background: "#1E1E1E",
  borderRadius: 14,
  padding: 20,
  border: "1px solid #2A2A2A",
  marginBottom: 16,
};

const sectionTitle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 800,
  color: "white",
  margin: "0 0 16px",
  paddingBottom: 12,
  borderBottom: "1px solid #2A2A2A",
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const modules = [
  {
    icon: LayoutDashboard,
    color: "#00D4AA",
    name: "Dashboard",
    desc: "Central overview of the entire supply chain",
    features: [
      "KPI cards (inventory, suppliers, POs, alerts)",
      "Weekly shipments by destination chart",
      "Real-time supply chain status",
      "Low stock alerts",
      "Recent activity feed",
    ],
  },
  {
    icon: Package,
    color: "#F97316",
    name: "Inventory",
    desc: "Full inventory management with category filters",
    features: [
      "Category filter: LPG, Food, Medical, Electronics, Raw Materials",
      "Color-coded status: In Stock (green), Low Stock (orange), Out of Stock (red)",
      "Stock progress bars with min thresholds",
      "Add Inventory modal",
      "Scan Barcode / SKU lookup",
    ],
  },
  {
    icon: Building2,
    color: "#3B82F6",
    name: "Suppliers",
    desc: "Supplier directory spanning 50+ countries",
    features: [
      "Search and filter by status (Active/Pending/Inactive)",
      "Supplier cards with flag, rating, contact info",
      "Add Supplier form with 50+ country options",
      "View full supplier details",
      "Contact supplier (email notification to admin)",
    ],
  },
  {
    icon: ShoppingCart,
    color: "#8B5CF6",
    name: "Purchase Orders",
    desc: "Create and manage POs with approval workflow",
    features: [
      "Create PO form (supplier, items, qty, delivery date)",
      "Approve / Reject with reason",
      "Status filters: All, Pending, Approved, Rejected",
      "Email notification to admin on all actions",
      "Rejection reason displayed on card",
    ],
  },
  {
    icon: AlertTriangle,
    color: "#EF4444",
    name: "Alerts",
    desc: "Severity-coded alert management",
    features: [
      "Critical, Warning, Info severity levels",
      "Mark as read functionality",
      "Alert categories: stock, supplier, shipping, demand",
      "Real-time alert badge in navigation",
    ],
  },
  {
    icon: MessageSquare,
    color: "#EC4899",
    name: "Messages",
    desc: "Internal team messaging and admin broadcast",
    features: [
      "Chat interface with message history",
      "Admin broadcast to all users",
      "Unread message counter in nav",
    ],
  },
  {
    icon: TrendingUp,
    color: "#22C55E",
    name: "Demand Insights",
    desc: "AI-powered demand forecasting",
    features: [
      "Regional demand cards by industry",
      "Comparison bar charts",
      "LPG, Food, Medical, Electronics demand tracking",
      "Trend indicators (up/down)",
    ],
  },
  {
    icon: CheckSquare,
    color: "#F97316",
    name: "Admin Approvals",
    desc: "Centralized approval queue for all requests",
    features: [
      "Purchase Order approvals",
      "Supplier Registration approvals",
      "Inventory Update approvals",
      "Reject with reason + email notification",
      "Review/View full details with email notification",
      "Urgency levels: High, Medium, Low",
    ],
  },
  {
    icon: BarChart3,
    color: "#00D4AA",
    name: "Analytics",
    desc: "Performance metrics and visual analytics",
    features: [
      "KPI overview cards",
      "Monthly orders bar chart",
      "Delivery performance donut chart",
      "Supplier performance comparison bars",
      "On-time delivery rate tracking",
    ],
  },
];

const roles = [
  {
    role: "Admin",
    user: "Soujanya S",
    color: "#00D4AA",
    permissions: [
      "Approve / Reject all POs",
      "Manage all suppliers",
      "View & manage all inventory",
      "Full analytics access",
      "Admin approval queue",
      "User management",
      "Receive all email notifications",
    ],
  },
  {
    role: "Manager",
    user: "Operations Team",
    color: "#3B82F6",
    permissions: [
      "Create Purchase Orders",
      "Monitor inventory levels",
      "View alerts & reports",
      "View analytics (read-only)",
      "Send internal messages",
    ],
  },
  {
    role: "Operator",
    user: "Field Staff",
    color: "#F97316",
    permissions: [
      "Update inventory quantities",
      "Scan barcodes / SKU lookup",
      "Report issues via alerts",
      "View assigned tasks",
    ],
  },
  {
    role: "Viewer",
    user: "Stakeholders",
    color: "#718096",
    permissions: [
      "Read-only access to all screens",
      "View inventory status",
      "View supplier directory",
      "View analytics reports",
    ],
  },
];

const industries = [
  {
    name: "LPG & Energy",
    icon: "⚡",
    desc: "LPG cylinder tracking, bulk tank monitoring, gas distribution",
  },
  {
    name: "Food Supply",
    icon: "🥩",
    desc: "Perishable goods, cold chain, distribution networks",
  },
  {
    name: "Pharmaceuticals",
    icon: "💊",
    desc: "Medical supply tracking, expiry management, compliance",
  },
  {
    name: "Electronics",
    icon: "💻",
    desc: "Component inventory, global sourcing, lead time tracking",
  },
  {
    name: "Raw Materials",
    icon: "🏭",
    desc: "Bulk materials, procurement, warehouse management",
  },
];

export default function AppDetailsScreen() {
  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          ...card,
          background: "linear-gradient(135deg, #0A1628 0%, #1a2d50 100%)",
          borderColor: "#1E3A5F",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#00D4AA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              color: "#0A1628",
              fontSize: 20,
            }}
          >
            ST
          </div>
          <div>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: "white",
                margin: 0,
              }}
            >
              SupplyTrack AI
            </h1>
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
              <span
                style={{
                  background: "#00D4AA20",
                  color: "#00D4AA",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "3px 10px",
                  borderRadius: 10,
                }}
              >
                v2.0
              </span>
              <span
                style={{
                  background: "#8B5CF620",
                  color: "#8B5CF6",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "3px 10px",
                  borderRadius: 10,
                }}
              >
                AI-Powered
              </span>
              <span
                style={{
                  background: "#3B82F620",
                  color: "#3B82F6",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "3px 10px",
                  borderRadius: 10,
                }}
              >
                Enterprise
              </span>
            </div>
          </div>
        </div>
        <p
          style={{ fontSize: 14, color: "#A0AEC0", margin: 0, lineHeight: 1.7 }}
        >
          SupplyTrack AI is a professional supply chain management platform for
          real-time monitoring of inventory, suppliers, purchase orders,
          shipments, and demand forecasting. It is designed for enterprise-grade
          operations across 5 industries and provides a complete workflow from
          purchase order creation through admin approval, with automated email
          notifications to the admin.
        </p>
      </div>

      {/* Admin Info */}
      <div style={card}>
        <h2 style={sectionTitle}>
          <Lock size={18} color="#00D4AA" /> Admin Information
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {[
            { label: "Admin Name", value: "Soujanya S" },
            { label: "Admin Email", value: "soujanyas580@gmail.com" },
            { label: "Role", value: "Administrator (Full Access)" },
            { label: "Email Notifications", value: "All actions via mailto:" },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                background: "#121212",
                borderRadius: 10,
                padding: "12px 14px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "#718096",
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                {label}
              </div>
              <div style={{ fontSize: 14, color: "#00D4AA", fontWeight: 700 }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Industries */}
      <div style={card}>
        <h2 style={sectionTitle}>
          <TrendingUp size={18} color="#22C55E" /> Industries Supported
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
          }}
        >
          {industries.map((ind) => (
            <div
              key={ind.name}
              style={{
                background: "#121212",
                borderRadius: 10,
                padding: "12px 14px",
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{ind.icon}</div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "white",
                  marginBottom: 4,
                }}
              >
                {ind.name}
              </div>
              <div style={{ fontSize: 12, color: "#718096", lineHeight: 1.5 }}>
                {ind.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modules */}
      <div style={card}>
        <h2 style={sectionTitle}>
          <LayoutDashboard size={18} color="#3B82F6" /> Screens & Modules (9
          Total)
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 14,
          }}
        >
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.name}
                style={{
                  background: "#121212",
                  borderRadius: 12,
                  padding: 16,
                  border: `1px solid ${mod.color}20`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      background: `${mod.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={18} style={{ color: mod.color }} />
                  </div>
                  <div>
                    <div
                      style={{ fontSize: 14, fontWeight: 700, color: "white" }}
                    >
                      {mod.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#718096" }}>
                      {mod.desc}
                    </div>
                  </div>
                </div>
                <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
                  {mod.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        fontSize: 12,
                        color: "#A0AEC0",
                        marginBottom: 4,
                        lineHeight: 1.5,
                      }}
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* User Roles */}
      <div style={card}>
        <h2 style={sectionTitle}>
          <Users size={18} color="#8B5CF6" /> User Roles & Permissions
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
          }}
        >
          {roles.map((r) => (
            <div
              key={r.role}
              style={{
                background: "#121212",
                borderRadius: 12,
                padding: 16,
                border: `1px solid ${r.color}30`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: r.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    color: "#0A1628",
                    fontSize: 13,
                  }}
                >
                  {r.role[0]}
                </div>
                <div>
                  <div
                    style={{ fontSize: 14, fontWeight: 700, color: "white" }}
                  >
                    {r.role}
                  </div>
                  <div style={{ fontSize: 11, color: "#718096" }}>{r.user}</div>
                </div>
              </div>
              <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
                {r.permissions.map((p) => (
                  <li
                    key={p}
                    style={{
                      fontSize: 12,
                      color: "#A0AEC0",
                      marginBottom: 4,
                      lineHeight: 1.5,
                    }}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div style={card}>
        <h2 style={sectionTitle}>
          <Scan size={18} color="#F97316" /> Key Features
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 12,
          }}
        >
          {[
            {
              icon: "📡",
              title: "Real-Time Monitoring",
              desc: "Live supply chain visibility across all nodes",
            },
            {
              icon: "📧",
              title: "Email Notifications",
              desc: "Every action notifies soujanyas580@gmail.com",
            },
            {
              icon: "🔢",
              title: "Barcode/SKU Lookup",
              desc: "Instant inventory search by barcode or SKU code",
            },
            {
              icon: "🌍",
              title: "50+ Country Support",
              desc: "Supplier management across 50+ countries with flags",
            },
            {
              icon: "📋",
              title: "PO Approval Workflow",
              desc: "Full purchase order lifecycle with approval chain",
            },
            {
              icon: "🔒",
              title: "Role-Based Access",
              desc: "4 user roles with granular permissions",
            },
            {
              icon: "🤖",
              title: "AI Demand Forecasting",
              desc: "Predictive analytics for inventory planning",
            },
            {
              icon: "⚠️",
              title: "Smart Alerts",
              desc: "Priority-based alerting for critical supply events",
            },
            {
              icon: "💬",
              title: "Internal Messaging",
              desc: "Team communication with admin broadcast",
            },
            {
              icon: "📊",
              title: "Analytics Dashboard",
              desc: "KPIs, charts, and supplier performance metrics",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              style={{
                background: "#121212",
                borderRadius: 10,
                padding: "12px 14px",
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: 22 }}>{icon}</span>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "white",
                    marginBottom: 3,
                  }}
                >
                  {title}
                </div>
                <div
                  style={{ fontSize: 12, color: "#718096", lineHeight: 1.5 }}
                >
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Design Theme */}
      <div style={card}>
        <h2 style={sectionTitle}>
          <Info size={18} color="#A0AEC0" /> Design Theme
        </h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { name: "Primary Navy", hex: "#0A1628", bg: "#0A1628" },
            { name: "Accent Teal", hex: "#00D4AA", bg: "#00D4AA" },
            { name: "Background", hex: "#121212", bg: "#121212" },
            { name: "Card", hex: "#1E1E1E", bg: "#1E1E1E" },
            { name: "Success", hex: "#22C55E", bg: "#22C55E" },
            { name: "Warning", hex: "#F97316", bg: "#F97316" },
            { name: "Danger", hex: "#EF4444", bg: "#EF4444" },
          ].map((c) => (
            <div key={c.name} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  background: c.bg,
                  border: "2px solid #2A2A2A",
                  margin: "0 auto 6px",
                }}
              />
              <div style={{ fontSize: 11, color: "white", fontWeight: 600 }}>
                {c.name}
              </div>
              <div style={{ fontSize: 10, color: "#718096" }}>{c.hex}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
