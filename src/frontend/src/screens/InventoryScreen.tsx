import { MapPin, Package, Plus, Scan, Search, X } from "lucide-react";
import { useState } from "react";
import {
  type InventoryCategory,
  type InventoryItem,
  type InventoryStatus,
  inventoryItems,
} from "../data/mockData";

const categories: (InventoryCategory | "All")[] = [
  "All",
  "LPG Cylinders",
  "Bulk Tanks",
  "Food Supply",
  "Medical Supply",
  "Electronics",
  "Raw Materials",
];

const inventoryCategories: InventoryCategory[] = [
  "LPG Cylinders",
  "Bulk Tanks",
  "Food Supply",
  "Medical Supply",
  "Electronics",
  "Raw Materials",
];

const statusColors: Record<
  InventoryStatus,
  { bg: string; text: string; label: string }
> = {
  Safe: { bg: "#22C55E20", text: "#22C55E", label: "Safe Stock" },
  Warning: { bg: "#F9731620", text: "#F97316", label: "Warning" },
  LowStock: { bg: "#EF444420", text: "#EF4444", label: "Low Stock" },
};

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

function calcStatus(stockQty: number, thresholdQty: number): InventoryStatus {
  if (stockQty >= thresholdQty) return "Safe";
  if (stockQty >= thresholdQty * 0.5) return "Warning";
  return "LowStock";
}

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

export default function InventoryScreen() {
  const [filter, setFilter] = useState<InventoryCategory | "All">("All");
  const [search, setSearch] = useState("");
  const [itemList, setItemList] = useState(inventoryItems);
  const [addOpen, setAddOpen] = useState(false);
  const [scanOpen, setScanOpen] = useState(false);

  const [addForm, setAddForm] = useState({
    name: "",
    sku: "",
    category: "LPG Cylinders" as InventoryCategory,
    warehouse: "",
    stockQty: "",
    thresholdQty: "",
  });

  const [scanQuery, setScanQuery] = useState("");
  const [scanResult, setScanResult] = useState<
    InventoryItem | null | undefined
  >(undefined);

  const filtered = itemList.filter(
    (item) =>
      (filter === "All" || item.category === filter) &&
      (item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase())),
  );

  const getChipStyle = (
    cat: InventoryCategory | "All",
  ): React.CSSProperties => ({
    padding: "6px 14px",
    borderRadius: 20,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    background: filter === cat ? "#00D4AA" : "#1E1E1E",
    color: filter === cat ? "#0A1628" : "#A0AEC0",
    border: filter === cat ? "none" : "1px solid #2A2A2A",
  });

  const handleAddInventory = (e: React.FormEvent) => {
    e.preventDefault();
    const stock = Number(addForm.stockQty);
    const threshold = Number(addForm.thresholdQty);
    const newItem: InventoryItem = {
      id: String(Date.now()),
      name: addForm.name,
      sku: addForm.sku,
      category: addForm.category,
      warehouse: addForm.warehouse,
      stockQty: stock,
      thresholdQty: threshold,
      status: calcStatus(stock, threshold),
      lastUpdated: "just now",
    };
    setItemList((prev) => [...prev, newItem]);
    setAddOpen(false);
    setAddForm({
      name: "",
      sku: "",
      category: "LPG Cylinders",
      warehouse: "",
      stockQty: "",
      thresholdQty: "",
    });
  };

  const handleScanLookup = () => {
    if (!scanQuery.trim()) return;
    const found = itemList.find(
      (item) => item.sku.toLowerCase() === scanQuery.trim().toLowerCase(),
    );
    setScanResult(found ?? null);
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
            Inventory Management
          </h1>
          <p style={{ color: "#718096", fontSize: 14, margin: 0 }}>
            {itemList.length} items across all warehouses
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            data-ocid="inventory.scan.open_modal_button"
            onClick={() => {
              setScanQuery("");
              setScanResult(undefined);
              setScanOpen(true);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 16px",
              borderRadius: 10,
              background: "#2A2A2A",
              border: "1px solid #333",
              color: "#A0AEC0",
              fontSize: 13,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            <Scan size={16} /> Scan Barcode
          </button>
          <button
            type="button"
            data-ocid="inventory.add.open_modal_button"
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
            <Plus size={16} /> Add Inventory
          </button>
        </div>
      </div>

      <div style={{ position: "relative", marginBottom: 16 }}>
        <Search
          size={16}
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#718096",
          }}
        />
        <input
          data-ocid="inventory.search.input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search items by name or SKU..."
          style={{
            width: "100%",
            padding: "11px 16px 11px 42px",
            borderRadius: 10,
            background: "#1E1E1E",
            border: "1px solid #2A2A2A",
            color: "white",
            fontSize: 14,
            outline: "none",
          }}
        />
      </div>

      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}
      >
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            data-ocid={`inventory.filter.${cat.toLowerCase().replace(/\s/g, "_")}.tab`}
            onClick={() => setFilter(cat)}
            style={getChipStyle(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {filtered.map((item, i) => {
          const s = statusColors[item.status];
          const pct = Math.round((item.stockQty / item.thresholdQty) * 100);
          return (
            <div
              key={item.id}
              data-ocid={`inventory.item.${i + 1}`}
              style={{
                background: "#1E1E1E",
                borderRadius: 14,
                padding: 18,
                border: "1px solid #2A2A2A",
                borderTop: `3px solid ${s.text}`,
              }}
            >
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
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "#252525",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Package size={18} color="#00D4AA" />
                </div>
                <span
                  style={{
                    background: s.bg,
                    color: s.text,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 12,
                  }}
                >
                  {s.label}
                </span>
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "white",
                  marginBottom: 3,
                }}
              >
                {item.name}
              </div>
              <div style={{ fontSize: 12, color: "#718096", marginBottom: 10 }}>
                SKU: {item.sku} &bull; {item.category}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  marginBottom: 14,
                }}
              >
                <MapPin size={12} color="#718096" />
                <span style={{ fontSize: 12, color: "#A0AEC0" }}>
                  {item.warehouse}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <div>
                  <div style={{ fontSize: 11, color: "#718096" }}>Stock</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: s.text }}>
                    {item.stockQty}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "#718096" }}>
                    Threshold
                  </div>
                  <div
                    style={{ fontSize: 18, fontWeight: 800, color: "#A0AEC0" }}
                  >
                    {item.thresholdQty}
                  </div>
                </div>
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
                    width: `${Math.min(pct, 100)}%`,
                    background: s.text,
                    borderRadius: 3,
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#718096",
                  marginTop: 6,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{pct}% of threshold</span>
                <span>Updated {item.lastUpdated}</span>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div
          data-ocid="inventory.empty_state"
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#718096",
          }}
        >
          <Package
            size={40}
            style={{ margin: "0 auto 12px", display: "block", opacity: 0.4 }}
          />
          No items match your search.
        </div>
      )}

      {/* Add Inventory Modal */}
      {addOpen && (
        <Overlay onClose={() => setAddOpen(false)}>
          <div data-ocid="inventory.add.dialog">
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
                Add Inventory Item
              </h2>
              <button
                type="button"
                data-ocid="inventory.add.close_button"
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
            <form onSubmit={handleAddInventory}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div>
                  <label htmlFor="inv-name" style={labelStyle}>
                    Item Name *
                  </label>
                  <input
                    id="inv-name"
                    required
                    data-ocid="inventory.add.name.input"
                    value={addForm.name}
                    onChange={(e) =>
                      setAddForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="e.g. LPG Cylinder 14kg"
                    style={fieldStyle}
                  />
                </div>
                <div>
                  <label htmlFor="inv-sku" style={labelStyle}>
                    SKU *
                  </label>
                  <input
                    id="inv-sku"
                    required
                    data-ocid="inventory.add.sku.input"
                    value={addForm.sku}
                    onChange={(e) =>
                      setAddForm((f) => ({ ...f, sku: e.target.value }))
                    }
                    placeholder="e.g. LPG-007"
                    style={fieldStyle}
                  />
                </div>
                <div>
                  <label htmlFor="inv-category" style={labelStyle}>
                    Category *
                  </label>
                  <select
                    id="inv-category"
                    required
                    data-ocid="inventory.add.category.select"
                    value={addForm.category}
                    onChange={(e) =>
                      setAddForm((f) => ({
                        ...f,
                        category: e.target.value as InventoryCategory,
                      }))
                    }
                    style={fieldStyle}
                  >
                    {inventoryCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="inv-warehouse" style={labelStyle}>
                    Warehouse *
                  </label>
                  <input
                    id="inv-warehouse"
                    required
                    data-ocid="inventory.add.warehouse.input"
                    value={addForm.warehouse}
                    onChange={(e) =>
                      setAddForm((f) => ({ ...f, warehouse: e.target.value }))
                    }
                    placeholder="e.g. Mumbai Warehouse"
                    style={fieldStyle}
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <div>
                    <label htmlFor="inv-stock" style={labelStyle}>
                      Stock Qty *
                    </label>
                    <input
                      id="inv-stock"
                      required
                      type="number"
                      min="0"
                      data-ocid="inventory.add.stock.input"
                      value={addForm.stockQty}
                      onChange={(e) =>
                        setAddForm((f) => ({ ...f, stockQty: e.target.value }))
                      }
                      placeholder="100"
                      style={fieldStyle}
                    />
                  </div>
                  <div>
                    <label htmlFor="inv-threshold" style={labelStyle}>
                      Threshold Qty *
                    </label>
                    <input
                      id="inv-threshold"
                      required
                      type="number"
                      min="1"
                      data-ocid="inventory.add.threshold.input"
                      value={addForm.thresholdQty}
                      onChange={(e) =>
                        setAddForm((f) => ({
                          ...f,
                          thresholdQty: e.target.value,
                        }))
                      }
                      placeholder="50"
                      style={fieldStyle}
                    />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                <button
                  type="button"
                  data-ocid="inventory.add.cancel_button"
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
                  data-ocid="inventory.add.submit_button"
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
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </Overlay>
      )}

      {/* Scan Barcode Modal */}
      {scanOpen && (
        <Overlay onClose={() => setScanOpen(false)}>
          <div data-ocid="inventory.scan.dialog">
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
                Scan Barcode / SKU
              </h2>
              <button
                type="button"
                data-ocid="inventory.scan.close_button"
                onClick={() => setScanOpen(false)}
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
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 24,
                padding: 24,
                background: "#121212",
                borderRadius: 12,
              }}
            >
              <Scan size={56} color="#00D4AA" style={{ marginBottom: 12 }} />
              <p
                style={{
                  color: "#718096",
                  fontSize: 13,
                  margin: 0,
                  textAlign: "center",
                }}
              >
                Enter the barcode or SKU number below to look up an inventory
                item.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label htmlFor="scan-sku" style={labelStyle}>
                Barcode / SKU
              </label>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  id="scan-sku"
                  data-ocid="inventory.scan.barcode.input"
                  value={scanQuery}
                  onChange={(e) => {
                    setScanQuery(e.target.value);
                    setScanResult(undefined);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleScanLookup();
                  }}
                  placeholder="e.g. LPG-001"
                  style={{ ...fieldStyle, flex: 1 }}
                />
                <button
                  type="button"
                  data-ocid="inventory.scan.lookup.button"
                  onClick={handleScanLookup}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 10,
                    background: "#00D4AA",
                    border: "none",
                    color: "#0A1628",
                    fontSize: 14,
                    cursor: "pointer",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  Lookup
                </button>
              </div>
            </div>

            {scanResult === null && (
              <div
                data-ocid="inventory.scan.error_state"
                style={{
                  padding: 16,
                  borderRadius: 10,
                  background: "#EF444415",
                  border: "1px solid #EF444440",
                  color: "#EF4444",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                ❌ Item not found. Check the SKU and try again.
              </div>
            )}

            {scanResult && (
              <div
                data-ocid="inventory.scan.success_state"
                style={{
                  padding: 16,
                  borderRadius: 10,
                  background: "#00D4AA10",
                  border: "1px solid #00D4AA30",
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#00D4AA",
                    marginBottom: 12,
                  }}
                >
                  ✓ Item Found
                </div>
                {[
                  { label: "Name", value: scanResult.name },
                  { label: "SKU", value: scanResult.sku },
                  { label: "Category", value: scanResult.category },
                  { label: "Warehouse", value: scanResult.warehouse },
                  { label: "Stock Qty", value: String(scanResult.stockQty) },
                  {
                    label: "Threshold",
                    value: String(scanResult.thresholdQty),
                  },
                  { label: "Status", value: scanResult.status },
                  { label: "Last Updated", value: scanResult.lastUpdated },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "6px 0",
                      borderBottom: "1px solid #2A2A2A",
                    }}
                  >
                    <span style={{ fontSize: 12, color: "#718096" }}>
                      {label}
                    </span>
                    <span
                      style={{ fontSize: 12, color: "white", fontWeight: 600 }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              data-ocid="inventory.scan.close_button"
              onClick={() => setScanOpen(false)}
              style={{
                width: "100%",
                marginTop: 20,
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
              Close
            </button>
          </div>
        </Overlay>
      )}
    </div>
  );
}
