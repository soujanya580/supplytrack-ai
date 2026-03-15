import {
  ExternalLink,
  FileText,
  Mail,
  Phone,
  Plus,
  Search,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  type Supplier,
  type SupplierStatus,
  suppliers as initialSuppliers,
} from "../data/mockData";
import { useNotificationStore } from "../utils/notificationStore";

const statusStyle: Record<SupplierStatus, { bg: string; text: string }> = {
  Active: { bg: "#22C55E20", text: "#22C55E" },
  Inactive: { bg: "#71809620", text: "#718096" },
  Pending: { bg: "#F9731620", text: "#F97316" },
};

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];

const modalStyle: React.CSSProperties = {
  background: "#1E1E1E",
  borderRadius: 16,
  padding: 28,
  width: "100%",
  maxWidth: 520,
  border: "1px solid #2A2A2A",
  maxHeight: "90vh",
  overflowY: "auto",
};

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 10,
  background: "#121212",
  border: "1px solid #2A2A2A",
  color: "white",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#A0AEC0",
  marginBottom: 6,
  display: "block",
  fontWeight: 600,
};

const ALL_COUNTRIES: { name: string; flag: string }[] = [
  { name: "India", flag: "🇮🇳" },
  { name: "USA", flag: "🇺🇸" },
  { name: "UAE", flag: "🇦🇪" },
  { name: "Iran", flag: "🇮🇷" },
  { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "China", flag: "🇨🇳" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "France", flag: "🇫🇷" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "Switzerland", flag: "🇨🇭" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "Norway", flag: "🇳🇴" },
  { name: "Russia", flag: "🇷🇺" },
  { name: "Turkey", flag: "🇹🇷" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "Argentina", flag: "🇦🇷" },
  { name: "Colombia", flag: "🇨🇴" },
  { name: "Nigeria", flag: "🇳🇬" },
  { name: "Kenya", flag: "🇰🇪" },
  { name: "Egypt", flag: "🇪🇬" },
  { name: "Pakistan", flag: "🇵🇰" },
  { name: "Bangladesh", flag: "🇧🇩" },
  { name: "Indonesia", flag: "🇮🇩" },
  { name: "Malaysia", flag: "🇲🇾" },
  { name: "Thailand", flag: "🇹🇭" },
  { name: "Vietnam", flag: "🇻🇳" },
  { name: "Philippines", flag: "🇵🇭" },
  { name: "New Zealand", flag: "🇳🇿" },
  { name: "Portugal", flag: "🇵🇹" },
  { name: "Poland", flag: "🇵🇱" },
  { name: "Greece", flag: "🇬🇷" },
  { name: "Israel", flag: "🇮🇱" },
  { name: "Qatar", flag: "🇶🇦" },
  { name: "Kuwait", flag: "🇰🇼" },
  { name: "Bahrain", flag: "🇧🇭" },
  { name: "Oman", flag: "🇴🇲" },
  { name: "Jordan", flag: "🇯🇴" },
  { name: "Ukraine", flag: "🇺🇦" },
  { name: "Czech Republic", flag: "🇨🇿" },
  { name: "Romania", flag: "🇷🇴" },
];

const COUNTRY_FLAG_MAP: Record<string, string> = Object.fromEntries(
  ALL_COUNTRIES.map((c) => [c.name, c.flag]),
);

function Overlay({
  onClose,
  children,
}: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default function SuppliersScreen() {
  const { addNotification } = useNotificationStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<SupplierStatus | "All">(
    "All",
  );
  const [supplierList, setSupplierList] = useState(initialSuppliers);
  const [addOpen, setAddOpen] = useState(false);
  const [detailSupplier, setDetailSupplier] = useState<Supplier | null>(null);

  const [form, setForm] = useState({
    name: "",
    country: "India",
    phone: "",
    email: "",
    category: "LPG & Energy",
    status: "Active" as SupplierStatus,
    rating: "4.0",
  });

  const filtered = supplierList.filter(
    (s) =>
      (statusFilter === "All" || s.status === statusFilter) &&
      s.name.toLowerCase().includes(search.toLowerCase()),
  );

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    return STAR_KEYS.map((k, idx) => (
      <Star
        key={k}
        size={13}
        fill={idx < full ? "#F59E0B" : "none"}
        color={idx < full ? "#F59E0B" : "#4A5568"}
      />
    ));
  };

  const getFilterStyle = (s: SupplierStatus | "All"): React.CSSProperties => ({
    padding: "9px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    background: statusFilter === s ? "#00D4AA" : "#1E1E1E",
    color: statusFilter === s ? "#0A1628" : "#A0AEC0",
    border: statusFilter === s ? "none" : "1px solid #2A2A2A",
  });

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    const newSupplier: Supplier = {
      id: String(Date.now()),
      name: form.name,
      country: form.country,
      flag: COUNTRY_FLAG_MAP[form.country] ?? "🏳️",
      phone: form.phone,
      email: form.email,
      rating: Number.parseFloat(form.rating),
      category: form.category,
      status: form.status,
    };
    setSupplierList((prev) => [...prev, newSupplier]);
    addNotification(
      `Supplier Added: ${newSupplier.name}`,
      `${newSupplier.flag} ${newSupplier.country} — ${newSupplier.category}`,
      "create",
    );
    setAddOpen(false);
    setForm({
      name: "",
      country: "India",
      phone: "",
      email: "",
      category: "LPG & Energy",
      status: "Active",
      rating: "4.0",
    });
  };

  const handleViewDetails = (sup: Supplier) => {
    setDetailSupplier(sup);
  };

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "white",
              margin: "0 0 4px",
            }}
          >
            Suppliers Directory
          </h1>
          <p style={{ color: "#718096", fontSize: 14, margin: 0 }}>
            {supplierList.length} registered suppliers across{" "}
            {ALL_COUNTRIES.length}+ countries
          </p>
        </div>
        <button
          type="button"
          data-ocid="suppliers.add.open_modal_button"
          onClick={() => setAddOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "9px 16px",
            borderRadius: 10,
            background: "#00D4AA",
            border: "none",
            color: "#0A1628",
            fontSize: 13,
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          <Plus size={16} /> Add Supplier
        </button>
      </div>

      <div
        style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search
            size={15}
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#718096",
            }}
          />
          <input
            data-ocid="suppliers.search.input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search suppliers..."
            style={{
              width: "100%",
              padding: "10px 12px 10px 38px",
              borderRadius: 10,
              background: "#1E1E1E",
              border: "1px solid #2A2A2A",
              color: "white",
              fontSize: 13,
              outline: "none",
            }}
          />
        </div>
        {(["All", "Active", "Pending", "Inactive"] as const).map((s) => (
          <button
            type="button"
            key={s}
            data-ocid={`suppliers.filter.${s.toLowerCase()}.tab`}
            onClick={() => setStatusFilter(s)}
            style={getFilterStyle(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 16,
        }}
      >
        {filtered.map((sup, i) => {
          const ss = statusStyle[sup.status];
          return (
            <div
              key={sup.id}
              data-ocid={`suppliers.item.${i + 1}`}
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
                  alignItems: "flex-start",
                  marginBottom: 14,
                }}
              >
                <div>
                  <div
                    style={{ fontSize: 16, fontWeight: 700, color: "white" }}
                  >
                    {sup.flag} {sup.name}
                  </div>
                  <div style={{ fontSize: 13, color: "#718096", marginTop: 2 }}>
                    {sup.country} &bull; {sup.category}
                  </div>
                </div>
                <span
                  style={{
                    background: ss.bg,
                    color: ss.text,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 12,
                  }}
                >
                  {sup.status}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 7,
                  marginBottom: 14,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Phone size={13} color="#718096" />
                  <span style={{ fontSize: 13, color: "#A0AEC0" }}>
                    {sup.phone}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Mail size={13} color="#718096" />
                  <span style={{ fontSize: 13, color: "#A0AEC0" }}>
                    {sup.email}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 16,
                }}
              >
                <div style={{ display: "flex", gap: 2 }}>
                  {renderStars(sup.rating)}
                </div>
                <span
                  style={{ fontSize: 13, fontWeight: 600, color: "#F59E0B" }}
                >
                  {sup.rating}
                </span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  data-ocid={`suppliers.view.${i + 1}.button`}
                  onClick={() => handleViewDetails(sup)}
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: 8,
                    background: "transparent",
                    border: "1px solid #2A2A2A",
                    color: "#A0AEC0",
                    fontSize: 12,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                  }}
                >
                  <ExternalLink size={13} /> View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Supplier Modal */}
      {addOpen && (
        <Overlay onClose={() => setAddOpen(false)}>
          <div data-ocid="suppliers.add.dialog">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "white",
                  margin: 0,
                }}
              >
                Add New Supplier
              </h2>
              <button
                type="button"
                data-ocid="suppliers.add.close_button"
                onClick={() => setAddOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#718096",
                  cursor: "pointer",
                  padding: 4,
                }}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSupplier}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div>
                  <label htmlFor="sup-name" style={labelStyle}>
                    Supplier Name *
                  </label>
                  <input
                    id="sup-name"
                    required
                    data-ocid="suppliers.add.name.input"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="e.g. Gulf Energy Co"
                    style={fieldStyle}
                  />
                </div>
                <div>
                  <label htmlFor="sup-country" style={labelStyle}>
                    Country * ({ALL_COUNTRIES.length} available)
                  </label>
                  <select
                    id="sup-country"
                    required
                    data-ocid="suppliers.add.country.select"
                    value={form.country}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, country: e.target.value }))
                    }
                    style={fieldStyle}
                  >
                    {ALL_COUNTRIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="sup-phone" style={labelStyle}>
                    Phone *
                  </label>
                  <input
                    id="sup-phone"
                    required
                    data-ocid="suppliers.add.phone.input"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    placeholder="+91-9876543210"
                    style={fieldStyle}
                  />
                </div>
                <div>
                  <label htmlFor="sup-email" style={labelStyle}>
                    Email *
                  </label>
                  <input
                    id="sup-email"
                    required
                    type="email"
                    data-ocid="suppliers.add.email.input"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="contact@supplier.com"
                    style={fieldStyle}
                  />
                </div>
                <div>
                  <label htmlFor="sup-category" style={labelStyle}>
                    Category *
                  </label>
                  <select
                    id="sup-category"
                    required
                    data-ocid="suppliers.add.category.select"
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value }))
                    }
                    style={fieldStyle}
                  >
                    {[
                      "LPG & Energy",
                      "Food Supply",
                      "Medical Supply",
                      "Electronics",
                      "Raw Materials",
                    ].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="sup-status" style={labelStyle}>
                    Status *
                  </label>
                  <select
                    id="sup-status"
                    required
                    data-ocid="suppliers.add.status.select"
                    value={form.status}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        status: e.target.value as SupplierStatus,
                      }))
                    }
                    style={fieldStyle}
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="sup-rating" style={labelStyle}>
                    Rating (1–5) *
                  </label>
                  <input
                    id="sup-rating"
                    required
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    data-ocid="suppliers.add.rating.input"
                    value={form.rating}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, rating: e.target.value }))
                    }
                    style={fieldStyle}
                  />
                </div>
              </div>
              <p
                style={{
                  fontSize: 11,
                  color: "#718096",
                  marginTop: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <FileText size={12} color="#00D4AA" /> An email notification
                will be sent to soujanyas580@gmail.com
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button
                  type="button"
                  data-ocid="suppliers.add.cancel_button"
                  onClick={() => setAddOpen(false)}
                  style={{
                    flex: 1,
                    padding: "11px",
                    borderRadius: 10,
                    background: "transparent",
                    border: "1px solid #2A2A2A",
                    color: "#A0AEC0",
                    fontSize: 14,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  data-ocid="suppliers.add.submit_button"
                  style={{
                    flex: 1,
                    padding: "11px",
                    borderRadius: 10,
                    background: "#00D4AA",
                    border: "none",
                    color: "#0A1628",
                    fontSize: 14,
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  Add Supplier
                </button>
              </div>
            </form>
          </div>
        </Overlay>
      )}

      {/* View Details Modal */}
      {detailSupplier && (
        <Overlay onClose={() => setDetailSupplier(null)}>
          <div data-ocid="suppliers.detail.dialog">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "white",
                  margin: 0,
                }}
              >
                Supplier Details
              </h2>
              <button
                type="button"
                data-ocid="suppliers.detail.close_button"
                onClick={() => setDetailSupplier(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#718096",
                  cursor: "pointer",
                  padding: 4,
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 24,
                padding: 16,
                background: "#121212",
                borderRadius: 12,
              }}
            >
              <div style={{ fontSize: 48 }}>{detailSupplier.flag}</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "white" }}>
                  {detailSupplier.name}
                </div>
                <div style={{ fontSize: 14, color: "#718096", marginTop: 2 }}>
                  {detailSupplier.country}
                </div>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: 6,
                    background: statusStyle[detailSupplier.status].bg,
                    color: statusStyle[detailSupplier.status].text,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 12,
                  }}
                >
                  {detailSupplier.status}
                </span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Category", value: detailSupplier.category },
                { label: "Phone", value: detailSupplier.phone },
                { label: "Email", value: detailSupplier.email },
                {
                  label: "Country",
                  value: `${detailSupplier.flag} ${detailSupplier.country}`,
                },
                { label: "Supplier ID", value: `#${detailSupplier.id}` },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid #2A2A2A",
                  }}
                >
                  <span
                    style={{ fontSize: 13, color: "#718096", fontWeight: 600 }}
                  >
                    {label}
                  </span>
                  <span style={{ fontSize: 13, color: "white" }}>{value}</span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                }}
              >
                <span
                  style={{ fontSize: 13, color: "#718096", fontWeight: 600 }}
                >
                  Rating
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ display: "flex", gap: 2 }}>
                    {renderStars(detailSupplier.rating)}
                  </div>
                  <span
                    style={{ fontSize: 13, fontWeight: 700, color: "#F59E0B" }}
                  >
                    {detailSupplier.rating}/5
                  </span>
                </div>
              </div>
            </div>
            <p
              style={{
                fontSize: 11,
                color: "#00D4AA",
                marginTop: 12,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <FileText size={12} /> Email notification sent to
              soujanyas580@gmail.com
            </p>
            <button
              type="button"
              data-ocid="suppliers.detail.close_button"
              onClick={() => setDetailSupplier(null)}
              style={{
                width: "100%",
                marginTop: 16,
                padding: "11px",
                borderRadius: 10,
                background: "#00D4AA",
                border: "none",
                color: "#0A1628",
                fontSize: 14,
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Close
            </button>
          </div>
        </Overlay>
      )}
    </div>
  );
}
