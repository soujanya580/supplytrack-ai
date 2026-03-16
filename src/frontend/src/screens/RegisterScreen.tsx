import { AlertCircle, Check, Eye, EyeOff, Shield, X } from "lucide-react";
import { useState } from "react";
import {
  checkPasswordStrength,
  findUserByEmail,
  hashPassword,
  saveSession,
  saveUser,
} from "../utils/auth";
import type { StoredUser } from "../utils/auth";

interface Props {
  onRegister: (user: StoredUser) => void;
  onCancel: () => void;
  onLoginLink: () => void;
}

const baseInputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: 10,
  background: "#2A2A2A",
  border: "1px solid #333",
  color: "white",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const strength = checkPasswordStrength(form.password);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    } else if (findUserByEmail(form.email)) {
      newErrors.email = "This email is already registered. Please log in.";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!form.company.trim())
      newErrors.company = "Company / organization is required.";
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (strength.score < 4) {
      newErrors.password = "Password must meet all 4 requirements below.";
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      const user: StoredUser = {
        id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        role: form.role,
        passwordHash: hashPassword(form.password),
        createdAt: new Date().toISOString(),
      };
      saveUser(user);
      saveSession(user);
      setLoading(false);
      onRegister(user);
    }, 400);
  };

  const field = (
    id: string,
    label: string,
    type: string,
    placeholder: string,
    value: string,
    onChange: (v: string) => void,
    extra?: React.ReactNode,
  ) => (
    <div style={{ marginBottom: 14 }}>
      <label
        htmlFor={`reg-${id}`}
        style={{
          display: "block",
          fontSize: 13,
          color: "#A0AEC0",
          marginBottom: 6,
          fontWeight: 500,
        }}
      >
        {label}
      </label>
      <input
        id={`reg-${id}`}
        data-ocid={`register.${id}.input`}
        type={type}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          if (errors[id])
            setErrors((prev) => {
              const n = { ...prev };
              n[id] = undefined;
              return n;
            });
        }}
        placeholder={placeholder}
        style={{
          ...baseInputStyle,
          borderColor: errors[id] ? "#EF4444" : "#333",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = errors[id] ? "#EF4444" : "#00D4AA";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = errors[id] ? "#EF4444" : "#333";
        }}
      />
      {extra}
      {errors[id] && (
        <p
          style={{
            margin: "4px 0 0",
            fontSize: 12,
            color: "#EF4444",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <AlertCircle size={12} /> {errors[id]}
        </p>
      )}
    </div>
  );

  const requirementPill = (met: boolean, label: string) => (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 8px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        background: met ? "rgba(0,212,170,0.15)" : "rgba(255,255,255,0.05)",
        color: met ? "#00D4AA" : "#718096",
        border: `1px solid ${met ? "rgba(0,212,170,0.4)" : "transparent"}`,
        transition: "all 0.2s",
      }}
    >
      {met ? <Check size={10} /> : <X size={10} />}
      {label}
    </span>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#121212",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        overflowY: "auto",
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
          margin: "16px auto",
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

        {field(
          "name",
          "Full Name",
          "text",
          "Enter your full name",
          form.name,
          (v) => setForm((p) => ({ ...p, name: v })),
        )}
        {field(
          "email",
          "Email Address",
          "email",
          "Enter your email",
          form.email,
          (v) => setForm((p) => ({ ...p, email: v })),
        )}
        {field(
          "phone",
          "Phone Number",
          "tel",
          "Enter your phone number",
          form.phone,
          (v) => setForm((p) => ({ ...p, phone: v })),
        )}
        {field(
          "company",
          "Company / Organization",
          "text",
          "Enter company name",
          form.company,
          (v) => setForm((p) => ({ ...p, company: v })),
        )}

        {/* Role */}
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
            style={{ ...baseInputStyle, cursor: "pointer" }}
            onFocus={(e) => {
              e.target.style.borderColor = "#00D4AA";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#333";
            }}
          >
            {["Admin", "Manager", "Operator", "Viewer"].map((r) => (
              <option key={r} value={r} style={{ background: "#2A2A2A" }}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Password */}
        <div style={{ marginBottom: 14 }}>
          <label
            htmlFor="reg-password"
            style={{
              display: "block",
              fontSize: 13,
              color: "#A0AEC0",
              marginBottom: 6,
              fontWeight: 500,
            }}
          >
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              id="reg-password"
              data-ocid="register.password.input"
              type={showPw ? "text" : "password"}
              value={form.password}
              onChange={(e) => {
                setForm((p) => ({ ...p, password: e.target.value }));
                if (errors.password)
                  setErrors((prev) => {
                    const n = { ...prev };
                    n.password = undefined;
                    return n;
                  });
              }}
              placeholder="Create a strong password"
              style={{
                ...baseInputStyle,
                paddingRight: 44,
                borderColor: errors.password ? "#EF4444" : "#333",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = errors.password
                  ? "#EF4444"
                  : "#00D4AA";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.password
                  ? "#EF4444"
                  : "#333";
              }}
            />
            <button
              type="button"
              data-ocid="register.password_toggle.button"
              onClick={() => setShowPw(!showPw)}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#718096",
                cursor: "pointer",
              }}
            >
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Strength bar */}
          {form.password.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: 2,
                      background:
                        strength.score >= i ? strength.color : "#2A2A2A",
                      transition: "background 0.3s",
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: strength.color,
                    fontWeight: 600,
                  }}
                >
                  {strength.label}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {requirementPill(strength.checks.length, "8+ chars")}
                {requirementPill(strength.checks.uppercase, "Uppercase")}
                {requirementPill(strength.checks.number, "Number")}
                {requirementPill(strength.checks.special, "Special (!@#$)")}
              </div>
            </div>
          )}
          {errors.password && (
            <p
              style={{
                margin: "6px 0 0",
                fontSize: 12,
                color: "#EF4444",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <AlertCircle size={12} /> {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="reg-confirm"
            style={{
              display: "block",
              fontSize: 13,
              color: "#A0AEC0",
              marginBottom: 6,
              fontWeight: 500,
            }}
          >
            Confirm Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              id="reg-confirm"
              data-ocid="register.confirmPassword.input"
              type={showConfirmPw ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(e) => {
                setForm((p) => ({ ...p, confirmPassword: e.target.value }));
                if (errors.confirmPassword)
                  setErrors((prev) => {
                    const n = { ...prev };
                    n.confirmPassword = undefined;
                    return n;
                  });
              }}
              placeholder="Repeat your password"
              style={{
                ...baseInputStyle,
                paddingRight: 44,
                borderColor: errors.confirmPassword ? "#EF4444" : "#333",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = errors.confirmPassword
                  ? "#EF4444"
                  : "#00D4AA";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.confirmPassword
                  ? "#EF4444"
                  : "#333";
              }}
            />
            <button
              type="button"
              data-ocid="register.confirm_toggle.button"
              onClick={() => setShowConfirmPw(!showConfirmPw)}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#718096",
                cursor: "pointer",
              }}
            >
              {showConfirmPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {form.confirmPassword.length > 0 &&
            form.password === form.confirmPassword && (
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: 12,
                  color: "#00D4AA",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Check size={12} /> Passwords match
              </p>
            )}
          {errors.confirmPassword && (
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 12,
                color: "#EF4444",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <AlertCircle size={12} /> {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="button"
          data-ocid="register.submit.button"
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: 10,
            background: loading
              ? "#334"
              : "linear-gradient(135deg, #00D4AA, #00A884)",
            border: "none",
            color: loading ? "#718096" : "#0A1628",
            fontWeight: 700,
            fontSize: 15,
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: 10,
            marginTop: 4,
            transition: "all 0.2s",
          }}
        >
          {loading ? "Creating account…" : "Create Account"}
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
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
