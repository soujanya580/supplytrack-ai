import { Check, Clock, Eye, User, X } from "lucide-react";
import { useState } from "react";
import { type ApprovalRequest, approvalRequests } from "../data/mockData";
import { useNotificationStore } from "../utils/notificationStore";

const urgencyStyle = {
  High: { bg: "#EF444420", text: "#EF4444" },
  Medium: { bg: "#F9731620", text: "#F97316" },
  Low: { bg: "#3B82F620", text: "#3B82F6" },
};

const typeStyle: Record<string, string> = {
  "Purchase Order": "#8B5CF6",
  "Supplier Registration": "#00D4AA",
  "Inventory Update": "#F97316",
};

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.75)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
};

const modalBox: React.CSSProperties = {
  background: "#1E1E1E",
  borderRadius: 16,
  padding: 28,
  width: "100%",
  maxWidth: 500,
  border: "1px solid #2A2A2A",
};

export default function AdminApprovalScreen() {
  const { addNotification } = useNotificationStore();
  const [requests, setRequests] = useState<ApprovalRequest[]>(approvalRequests);
  const [filter, setFilter] = useState<string>("All");

  const [rejectTarget, setRejectTarget] = useState<{
    id: string;
    label: string;
  } | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [viewTarget, setViewTarget] = useState<ApprovalRequest | null>(null);

  const filtered = requests.filter(
    (r) =>
      filter === "All" ||
      (filter === "Purchase Orders" && r.requestType === "Purchase Order") ||
      (filter === "Suppliers" && r.requestType === "Supplier Registration") ||
      (filter === "Inventory" && r.requestType === "Inventory Update"),
  );

  const handleApprove = (req: ApprovalRequest) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === req.id ? { ...r, status: "Approved" } : r)),
    );
    addNotification(
      `Approved: ${req.requestType}`,
      `By ${req.requester} (${req.requesterRole}) — ${req.details}`,
      "approve",
    );
  };

  const openReject = (req: ApprovalRequest) => {
    setRejectTarget({
      id: req.id,
      label: `${req.requestType} by ${req.requester}`,
    });
    setRejectReason("");
  };

  const confirmReject = () => {
    if (!rejectTarget) return;
    const req = requests.find((r) => r.id === rejectTarget.id);
    setRequests((prev) =>
      prev.map((r) =>
        r.id === rejectTarget.id
          ? {
              ...r,
              status: "Rejected",
              rejectReason: rejectReason || "No reason provided",
            }
          : r,
      ),
    );
    if (req) {
      addNotification(
        `Rejected: ${req.requestType}`,
        `By ${req.requester} — Reason: ${rejectReason || "No reason provided"}`,
        "reject",
      );
    }
    setRejectTarget(null);
    setRejectReason("");
  };

  const handleViewDetails = (req: ApprovalRequest) => {
    setViewTarget(req);
    addNotification(
      `Reviewing: ${req.requestType}`,
      `${req.requester} (${req.requesterRole}) — ${req.details}`,
      "view",
    );
  };

  const pending = requests.filter((r) => r.status === "Pending").length;

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
              Approval Queue
            </h1>
            <span
              style={{
                background: "#F97316",
                color: "white",
                fontSize: 12,
                fontWeight: 700,
                padding: "2px 9px",
                borderRadius: 12,
              }}
            >
              {pending} pending
            </span>
          </div>
          <p style={{ color: "#718096", fontSize: 14, margin: "4px 0 0" }}>
            Review and action pending requests
          </p>
        </div>
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
        {["All", "Purchase Orders", "Suppliers", "Inventory"].map((f) => (
          <button
            type="button"
            key={f}
            data-ocid={`approval.filter.${f.toLowerCase().replace(/\s/g, "_")}.tab`}
            onClick={() => setFilter(f)}
            style={{
              padding: "7px 16px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
              background: filter === f ? "#00D4AA" : "transparent",
              color: filter === f ? "#0A1628" : "#718096",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map((req, i) => {
          const isDone = req.status !== "Pending";
          const us = urgencyStyle[req.urgency];
          return (
            <div
              key={req.id}
              data-ocid={`approval.item.${i + 1}`}
              style={{
                background: "#1E1E1E",
                borderRadius: 14,
                padding: 20,
                border: "1px solid #2A2A2A",
                opacity: isDone ? 0.72 : 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 6,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        background: `${typeStyle[req.requestType]}20`,
                        color: typeStyle[req.requestType],
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: 10,
                      }}
                    >
                      {req.requestType}
                    </span>
                    <span
                      style={{
                        background: us.bg,
                        color: us.text,
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: 10,
                      }}
                    >
                      {req.urgency} Urgency
                    </span>
                    {isDone && (
                      <span
                        style={{
                          background:
                            req.status === "Approved"
                              ? "#22C55E20"
                              : "#EF444420",
                          color:
                            req.status === "Approved" ? "#22C55E" : "#EF4444",
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: 10,
                        }}
                      >
                        {req.status}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      marginBottom: 6,
                    }}
                  >
                    <User size={14} color="#718096" />
                    <span
                      style={{ fontSize: 13, fontWeight: 600, color: "white" }}
                    >
                      {req.requester}
                    </span>
                    <span style={{ fontSize: 12, color: "#718096" }}>
                      ({req.requesterRole})
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#A0AEC0",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {req.details}
                  </p>
                  {(req as ApprovalRequest & { rejectReason?: string })
                    .rejectReason && (
                    <p
                      style={{
                        fontSize: 12,
                        color: "#EF4444",
                        margin: "6px 0 0",
                        background: "#EF444410",
                        padding: "6px 10px",
                        borderRadius: 8,
                      }}
                    >
                      Reason:{" "}
                      {
                        (req as ApprovalRequest & { rejectReason?: string })
                          .rejectReason
                      }
                    </p>
                  )}
                </div>

                {/* Action buttons — always show View Details; Approve/Reject only for Pending */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexShrink: 0,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {!isDone && (
                    <>
                      <button
                        type="button"
                        data-ocid={`approval.approve.${i + 1}.button`}
                        onClick={() => handleApprove(req)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "8px 16px",
                          borderRadius: 8,
                          background: "#22C55E",
                          border: "none",
                          color: "white",
                          fontSize: 13,
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        <Check size={15} /> Approve
                      </button>
                      <button
                        type="button"
                        data-ocid={`approval.reject.${i + 1}.button`}
                        onClick={() => openReject(req)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "8px 16px",
                          borderRadius: 8,
                          background: "#EF4444",
                          border: "none",
                          color: "white",
                          fontSize: 13,
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        <X size={15} /> Reject
                      </button>
                    </>
                  )}
                  {/* View Details — always visible */}
                  <button
                    type="button"
                    data-ocid={`approval.review.${i + 1}.button`}
                    onClick={() => handleViewDetails(req)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 14px",
                      borderRadius: 8,
                      background: "transparent",
                      border: "1px solid #00D4AA",
                      color: "#00D4AA",
                      fontSize: 13,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    <Eye size={15} /> View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reject Reason Dialog */}
      {rejectTarget && (
        <div
          style={overlayStyle}
          onClick={() => setRejectTarget(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setRejectTarget(null);
          }}
        >
          <div
            style={modalBox}
            onKeyDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            data-ocid="approval.reject.dialog"
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
                Reject Request
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
                data-ocid="approval.reject.close_button"
              >
                <X size={20} />
              </button>
            </div>
            <p style={{ fontSize: 13, color: "#A0AEC0", marginBottom: 16 }}>
              {rejectTarget.label}
            </p>
            <label
              htmlFor="approval-reject-reason"
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
              data-ocid="approval.reject.reason.textarea"
              id="approval-reject-reason"
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
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button
                type="button"
                data-ocid="approval.reject.cancel_button"
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
                data-ocid="approval.reject.confirm_button"
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

      {/* View Details Dialog */}
      {viewTarget && (
        <div
          style={overlayStyle}
          onClick={() => setViewTarget(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setViewTarget(null);
          }}
        >
          <div
            style={modalBox}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            data-ocid="approval.view.dialog"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
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
                Request Details
              </h2>
              <button
                type="button"
                onClick={() => setViewTarget(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#718096",
                  cursor: "pointer",
                }}
                data-ocid="approval.view.close_button"
              >
                <X size={20} />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Request Type", value: viewTarget.requestType },
                {
                  label: "Requester",
                  value: `${viewTarget.requester} (${viewTarget.requesterRole})`,
                },
                { label: "Urgency", value: viewTarget.urgency },
                { label: "Status", value: viewTarget.status },
                { label: "Request ID", value: viewTarget.id },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
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
              <div>
                <span
                  style={{
                    fontSize: 12,
                    color: "#718096",
                    fontWeight: 600,
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Details
                </span>
                <p
                  style={{
                    fontSize: 13,
                    color: "#A0AEC0",
                    background: "#121212",
                    padding: "10px 14px",
                    borderRadius: 10,
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {viewTarget.details}
                </p>
              </div>
              {(viewTarget as ApprovalRequest & { rejectReason?: string })
                .rejectReason && (
                <div>
                  <span
                    style={{
                      fontSize: 12,
                      color: "#718096",
                      fontWeight: 600,
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Rejection Reason
                  </span>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#EF4444",
                      background: "#EF444410",
                      padding: "10px 14px",
                      borderRadius: 10,
                      margin: 0,
                    }}
                  >
                    {
                      (
                        viewTarget as ApprovalRequest & {
                          rejectReason?: string;
                        }
                      ).rejectReason
                    }
                  </p>
                </div>
              )}
            </div>
            <button
              type="button"
              data-ocid="approval.view.close_button"
              onClick={() => setViewTarget(null)}
              style={{
                width: "100%",
                marginTop: 20,
                padding: "10px",
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
        </div>
      )}
    </div>
  );
}
