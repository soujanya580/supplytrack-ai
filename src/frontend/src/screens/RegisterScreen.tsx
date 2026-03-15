import { Shield } from "lucide-react";
import { useState } from "react";

interface Props {
  onRegister: () => void;
  onCancel: () => void;
  onLoginLink: () => void;
}

const handleFocus = (
  e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
) => {
  e.target.style.borderColor = "#00D4AA";
};
const handleBlur = (
  e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
) => {
  e.target.style.borderColor = "#333";
};

const fieldLabels: Record<string, string> = {
  name: "Full Name",
  email: "Email Address",
  phone: "Phone Number",
  company: "Company / Organization",
  password: "Password",
  confirmPassword: "Confirm Password",
};

export default function RegisterScreen({
  onRegister,
  onCancel,
  onLoginLink,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: "",
    role: "Operator",
  });

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    background: "#2A2A2A",
    border: "1px solid #333",
    color: "white",
    fontSize: 14,
    outline: "none",
  };

  const textFields = ["name", "email", "phone", "company"] as const;
  const pwFields = ["password", "confirmPassword"] as const;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#121212",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          background: "#1E1E1E",
          borderRadius: 20,
          padding: "36px 32px",
          border: "1px solid #2A2A2A",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #00D4AA, #00A884)",
              margin: "0 auto 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Shield size={26} color="#0A1628" strokeWidth={2.5} />
          </div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "white",
              margin: "0 0 4px",
            }}
          >
            SupplyTrack AI
          </h1>
          <h2
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#A0AEC0",
              margin: 0,
            }}
          >
            Create Your Account
          </h2>
        </div>

        {textFields.map((field) => (
          <div key={field} style={{ marginBottom: 14 }}>
            <label
              htmlFor={`reg-${field}`}
              style={{
                display: "block",
                fontSize: 13,
                color: "#A0AEC0",
                marginBottom: 6,
                fontWeight: 500,
              }}
            >
              {fieldLabels[field]}
            </label>
            <input
              id={`reg-${field}`}
              data-ocid={`register.${field}.input`}
              type={
                field === "email" ? "email" : field === "phone" ? "tel" : "text"
              }
              value={form[field]}
              onChange={(e) =>
                setForm((p) => ({ ...p, [field]: e.target.value }))
              }
              placeholder={`Enter ${fieldLabels[field].toLowerCase()}`}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        ))}

        <div style={{ marginBottom: 14 }}>
          <label
            htmlFor="reg-role"
            style={{
              display: "block",
              fontSize: 13,
              color: "#A0AEC0",
              marginBottom: 6,
              fontWeight: 500,
            }}
          >
            Role
          </label>
          <select
            id="reg-role"
            data-ocid="register.role.select"
            value={form.role}
            onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
            style={{ ...inputStyle, cursor: "pointer" }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {["Admin", "Manager", "Operator", "Viewer"].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {pwFields.map((field) => (
          <div key={field} style={{ marginBottom: 14 }}>
            <label
              htmlFor={`reg-${field}`}
              style={{
                display: "block",
                fontSize: 13,
                color: "#A0AEC0",
                marginBottom: 6,
                fontWeight: 500,
              }}
            >
              {fieldLabels[field]}
            </label>
            <input
              id={`reg-${field}`}
              data-ocid={`register.${field}.input`}
              type="password"
              value={form[field]}
              onChange={(e) =>
                setForm((p) => ({ ...p, [field]: e.target.value }))
              }
              placeholder={
                field === "password"
                  ? "Create a password"
                  : "Repeat your password"
              }
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        ))}

        <button
          type="button"
          data-ocid="register.submit.button"
          onClick={onRegister}
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: 10,
            background: "linear-gradient(135deg, #00D4AA, #00A884)",
            border: "none",
            color: "#0A1628",
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
            marginBottom: 10,
            marginTop: 8,
          }}
        >
          Create Account
        </button>
        <button
          type="button"
          data-ocid="register.cancel.button"
          onClick={onCancel}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 10,
            background: "transparent",
            border: "1px solid #333",
            color: "#A0AEC0",
            fontWeight: 500,
            fontSize: 14,
            cursor: "pointer",
            marginBottom: 20,
          }}
        >
          Cancel
        </button>

        <div style={{ textAlign: "center", fontSize: 14, color: "#718096" }}>
          Already have an account?{" "}
          <button
            type="button"
            data-ocid="register.login.link"
            onClick={onLoginLink}
            style={{
              background: "none",
              border: "none",
              color: "#00D4AA",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
