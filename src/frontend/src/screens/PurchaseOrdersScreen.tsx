import {
  Calendar,
  Check,
  Edit,
  Eye,
  Package,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  type POStatus,
  type PurchaseOrder,
  purchaseOrders,
  suppliers,
} from "../data/mockData";
import { useNotificationStore } from "../utils/notificationStore";

const statusStyle: Record<POStatus, { bg: string; text: string }> = {
  Pending: { bg: "#F9731620", text: "#F97316" },
  Approved: { bg: "#22C55E20", text: "#22C55E" },
  Rejected: { bg: "#EF444420", text: "#EF4444" },
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

type PurchaseOrderWithReason = PurchaseOrder & { rejectReason?: string };

export default function PurchaseOrdersScreen() {
  const { addNotification } = useNotificationStore();
  const [filter, setFilter] = useState<POStatus | "All">("All");
  const [orders, setOrders] =
    useState<PurchaseOrderWithReason[]>(purchaseOrders);
  const [createOpen, setCreateOpen] = useState(false);

  // Reject reason dialog
  const [rejectTarget, setRejectTarget] = useState<{
    id: string;
    poNumber: string;
  } | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [viewOrder, setViewOrder] = useState<PurchaseOrderWithReason | null>(
    null,
  );

  const [form, setForm] = useState({
    supplierId: suppliers[0]?.id ?? "",
    itemsOrdered: "",
    quantity: "",
    deliveryDate: "",
    createdBy: "",
  });

  const filtered = orders.filter(
    (o) => filter === "All" || o.status === filter,
  );

  const handleApprove = (order: PurchaseOrderWithReason) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === order.id ? { ...o, status: "Approved" as POStatus } : o,
      ),
    );
    addNotification(
      `PO Approved: ${order.poNumber}`,
      `${order.supplierName} — ${order.itemsOrdered} (Qty: ${order.quantity})`,
      "approve",
    );
  };

  const openReject = (order: PurchaseOrderWithReason) => {
    setRejectTarget({ id: order.id, poNumber: order.poNumber });
    setRejectReason("");
  };

  const confirmReject = () => {
    if (!rejectTarget) return;
    const order = orders.find((o) => o.id === rejectTarget.id);
    setOrders((prev) =>
      prev.map((o) =>
        o.id === rejectTarget.id
          ? {
              ...o,
              status: "Rejected" as POStatus,
              rejectReason: rejectReason || "No reason provided",
            }
          : o,
      ),
    );
    if (order) {
      addNotification(
        `PO Rejected: ${order?.poNumber}`,
        `${order?.supplierName} — Reason: ${rejectReason || "No reason provided"}`,
        "reject",
      );
    }
    setRejectTarget(null);
    setRejectReason("");
  };

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    const supplier = suppliers.find((s) => s.id === form.supplierId);
    const newOrder: PurchaseOrderWithReason = {
      id: String(Date.now()),
      poNumber: `PO-2024-${String(orders.length + 1).padStart(3, "0")}`,
      supplierId: form.supplierId,
      supplierName: supplier?.name ?? "Unknown",
      itemsOrdered: form.itemsOrdered,
      quantity: Number(form.quantity),
      deliveryDate: form.deliveryDate,
      status: "Pending",
      createdBy: form.createdBy,
    };
    setOrders((prev) => [...prev, newOrder]);
    addNotification(
      `PO Created: ${newOrder.poNumber}`,
      `${newOrder.supplierName} — ${newOrder.itemsOrdered} (Qty: ${newOrder.quantity})`,
      "create",
    );
    setCreateOpen(false);
    setForm({
      supplierId: suppliers[0]?.id ?? "",
      itemsOrdered: "",
      quantity: "",
      deliveryDate: "",
      createdBy: "",
    });
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
            Purchase Orders
          </h1>
          <p style={{ color: "#718096", fontSize: 14, margin: 0 }}>
            {orders.length} total orders
          </p>
        </div>
        <button
          type="button"
          data-ocid="orders.create.open_modal_button"
          onClick={() => setCreateOpen(true)}
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
          <Plus size={16} /> Create PO
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 24,
          background: "#1E1E1E",
          padding: 4,
          borderRadius: 10,
          width: "fit-content",
        }}
      >
        {(["All", "Pending", "Approved", "Rejected"] as const).map((f) => (
          <button
            type="button"
            key={f}
            data-ocid={`orders.filter.${f.toLowerCase()}.tab`}
            onClick={() => setFilter(f)}
            style={{
              padding: "7px 18px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
              background: filter === f ? "#00D4AA" : "transparent",
              color: filter === f ? "#0A1628" : "#718096",
            }}
          >
            {f}{" "}
            {f !== "All" && (
              <span
                style={{
                  marginLeft: 4,
                  background: filter === f ? "#0A162840" : "#2A2A2A",
                  borderRadius: 10,
                  padding: "1px 6px",
                  fontSize: 11,
                }}
              >
                {orders.filter((o) => o.status === f).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map((order, i) => {
          const s = statusStyle[order.status];
          return (
            <div
              key={order.id}
              data-ocid={`orders.item.${i + 1}`}
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
                  alignItems: "center",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "#252525",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Package size={20} color="#00D4AA" />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{ fontSize: 15, fontWeight: 700, color: "white" }}
                    >
                      {order.poNumber}
                    </span>
                    <span
                      style={{
                        background: s.bg,
                        color: s.text,
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "2px 9px",
                        borderRadius: 10,
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: "#A0AEC0" }}>
                    {order.supplierName} &bull; {order.itemsOrdered}
                  </div>
                  <div style={{ fontSize: 12, color: "#718096", marginTop: 3 }}>
                    Created by {order.createdBy}
                  </div>
                  {order.rejectReason && (
                    <div
                      style={{
                        fontSize: 12,
                        color: "#EF4444",
                        marginTop: 4,
                        background: "#EF444410",
                        padding: "4px 8px",
                        borderRadius: 6,
                      }}
                    >
                      Rejected: {order.rejectReason}
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: "#718096" }}>
                      Quantity
                    </div>
                    <div
                      style={{ fontSize: 16, fontWeight: 700, color: "white" }}
                    >
                      {order.quantity}
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#718096",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Calendar size={10} /> Delivery
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#A0AEC0",
                      }}
                    >
                      {order.deliveryDate}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  {order.status === "Pending" && (
                    <>
                      <button
                        type="button"
                        data-ocid={`orders.approve.${i + 1}.button`}
                        onClick={() => handleApprove(order)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          padding: "7px 14px",
                          borderRadius: 8,
                          background: "#22C55E20",
                          border: "1px solid #22C55E40",
                          color: "#22C55E",
                          fontSize: 12,
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        <Check size={14} /> Approve
                      </button>
                      <button
                        type="button"
                        data-ocid={`orders.reject.${i + 1}.button`}
                        onClick={() => openReject(order)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
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
                        <X size={14} /> Reject
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    data-ocid={`orders.view.${i + 1}.button`}
                    onClick={() => setViewOrder(order)}
                    style={{
                      padding: "7px",
                      borderRadius: 8,
                      background: "transparent",
                      border: "1px solid #2A2A2A",
                      color: "#A0AEC0",
                      cursor: "pointer",
                    }}
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    type="button"
                    data-ocid={`orders.edit.${i + 1}.button`}
                    style={{
                      padding: "7px",
                      borderRadius: 8,
                      background: "transparent",
                      border: "1px solid #2A2A2A",
                      color: "#718096",
                      cursor: "pointer",
                    }}
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    type="button"
                    data-ocid={`orders.cancel.${i + 1}.button`}
                    onClick={() =>
                      setOrders((prev) => prev.filter((o) => o.id !== order.id))
                    }
                    style={{
                      padding: "7px",
                      borderRadius: 8,
                      background: "transparent",
                      border: "1px solid #2A2A2A",
                      color: "#718096",
                      cursor: "pointer",
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create PO Modal */}
      {createOpen && (
        <Overlay onClose={() => setCreateOpen(false)}>
          <div data-ocid="orders.create.dialog">
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
                Create Purchase Order
              </h2>
              <button
                type="button"
                data-ocid="orders.create.close_button"
                onClick={() => setCreateOpen(false)}
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
            <form onSubmit={handleCreatePO}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div>
                  <label htmlFor="po-supplier" style={labelStyle}>
                    Supplier *
                  </label>
                  <select
                    id="po-supplier"
                    required
                    data-ocid="orders.create.supplier.select"
                    value={form.supplierId}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, supplierId: e.target.value }))
                    }
                    style={fieldStyle}
                  >
                    {suppliers.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.flag} {s.name} ({s.country})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="po-items" style={labelStyle}>
                    Items Ordered *
                  </label>
                  <input
                    id="po-items"
                    required
                    data-ocid="orders.create.items.input"
                    value={form.itemsOrdered}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, itemsOrdered: e.target.value }))
                    }
                    placeholder="e.g. LPG Cylinders 14kg"
                    style={fieldStyle}
                  />
                </div>
                <div>
                  <label htmlFor="po-qty" style={labelStyle}>
                    Quantity *
                  </label>
                  <input
                    id="po-qty"
                    required
                    type="number"
                    min="1"
                    data-ocid="orders.create.quantity.input"
                    value={form.quantity}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, quantity: e.target.value }))
                    }
                    placeholder="500"
                    style={fieldStyle}
                  />
                </div>
                <div>
                  <label htmlFor="po-date" style={labelStyle}>
                    Delivery Date *
                  </label>
                  <input
                    id="po-date"
                    required
                    type="date"
                    data-ocid="orders.create.delivery_date.input"
                    value={form.deliveryDate}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, deliveryDate: e.target.value }))
                    }
                    style={fieldStyle}
                  />
                </div>
                <div>
                  <label htmlFor="po-creator" style={labelStyle}>
                    Created By *
                  </label>
                  <input
                    id="po-creator"
                    required
                    data-ocid="orders.create.created_by.input"
                    value={form.createdBy}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, createdBy: e.target.value }))
                    }
                    placeholder="Manager Name"
                    style={fieldStyle}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button
                  type="button"
                  data-ocid="orders.create.cancel_button"
                  onClick={() => setCreateOpen(false)}
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
                  data-ocid="orders.create.submit_button"
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
                  Create PO
                </button>
              </div>
            </form>
          </div>
        </Overlay>
      )}

      {/* Reject Reason Dialog */}
      {rejectTarget && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            zIndex: 1100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={() => setRejectTarget(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setRejectTarget(null);
          }}
        >
          <div
            style={{
              background: "#1E1E1E",
              borderRadius: 16,
              padding: 28,
              width: "100%",
              maxWidth: 460,
              border: "1px solid #2A2A2A",
            }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            data-ocid="orders.reject.dialog"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 18,
              }}
            >
              <h2
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: "white",
                  margin: 0,
                }}
              >
                Reject Purchase Order
              </h2>
              <button
                type="button"
                onClick={() => setRejectTarget(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#718096",
                  cursor: "pointer",
                }}
                data-ocid="orders.reject.close_button"
              >
                <X size={20} />
              </button>
            </div>
            <p style={{ fontSize: 13, color: "#A0AEC0", marginBottom: 16 }}>
              {rejectTarget.poNumber}
            </p>
            <label
              htmlFor="po-reject-reason"
              style={{
                fontSize: 12,
                color: "#A0AEC0",
                fontWeight: 600,
                display: "block",
                marginBottom: 8,
              }}
            >
              Reason for Rejection
            </label>
            <textarea
              data-ocid="orders.reject.reason.textarea"
              id="po-reject-reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter reason for rejection..."
              rows={4}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 10,
                background: "#121212",
                border: "1px solid #2A2A2A",
                color: "white",
                fontSize: 14,
                outline: "none",
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />
            <p style={{ fontSize: 11, color: "#718096", marginTop: 8 }}>
              This reason will be emailed to soujanyas580@gmail.com.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button
                type="button"
                data-ocid="orders.reject.cancel_button"
                onClick={() => setRejectTarget(null)}
                style={{
                  flex: 1,
                  padding: "10px",
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
                type="button"
                data-ocid="orders.reject.confirm_button"
                onClick={confirmReject}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: 10,
                  background: "#EF4444",
                  border: "none",
                  color: "white",
                  fontSize: 14,
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Order Modal */}
      {viewOrder && (
        <Overlay onClose={() => setViewOrder(null)}>
          <div data-ocid="orders.view.dialog">
            <div
              style={{
                background: "#1E1E1E",
                borderRadius: 16,
                padding: 28,
                minWidth: 340,
                maxWidth: 500,
                width: "100%",
                border: "1px solid #2A2A2A",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 700, color: "white" }}>
                  Purchase Order Details
                </div>
                <button
                  type="button"
                  data-ocid="orders.view.close_button"
                  onClick={() => setViewOrder(null)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#718096",
                    cursor: "pointer",
                    fontSize: 20,
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{ fontSize: 16, fontWeight: 700, color: "#00D4AA" }}
                  >
                    {viewOrder.poNumber}
                  </span>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 600,
                      background:
                        viewOrder.status === "Pending"
                          ? "#EAB30820"
                          : viewOrder.status === "Approved"
                            ? "#22C55E20"
                            : "#EF444420",
                      color:
                        viewOrder.status === "Pending"
                          ? "#EAB308"
                          : viewOrder.status === "Approved"
                            ? "#22C55E"
                            : "#EF4444",
                    }}
                  >
                    {viewOrder.status}
                  </span>
                </div>
                {[
                  { label: "Supplier", value: viewOrder.supplierName },
                  { label: "Items Ordered", value: viewOrder.itemsOrdered },
                  { label: "Created By", value: viewOrder.createdBy },
                  { label: "Quantity", value: String(viewOrder.quantity) },
                  { label: "Delivery Date", value: viewOrder.deliveryDate },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid #2A2A2A",
                      paddingBottom: 10,
                    }}
                  >
                    <span style={{ fontSize: 13, color: "#718096" }}>
                      {label}
                    </span>
                    <span
                      style={{ fontSize: 13, color: "white", fontWeight: 500 }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
                {viewOrder.rejectReason && (
                  <div
                    style={{
                      background: "#EF444410",
                      border: "1px solid #EF444430",
                      borderRadius: 8,
                      padding: "10px 14px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        color: "#EF4444",
                        fontWeight: 600,
                      }}
                    >
                      Rejection Reason
                    </div>
                    <div
                      style={{ fontSize: 13, color: "#FCA5A5", marginTop: 4 }}
                    >
                      {viewOrder.rejectReason}
                    </div>
                  </div>
                )}
              </div>
              <button
                type="button"
                data-ocid="orders.view.confirm_button"
                onClick={() => setViewOrder(null)}
                style={{
                  marginTop: 20,
                  width: "100%",
                  padding: "10px",
                  borderRadius: 10,
                  background: "#00D4AA",
                  border: "none",
                  color: "#0A1628",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </Overlay>
      )}
    </div>
  );
}
