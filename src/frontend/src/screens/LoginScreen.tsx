import { AlertCircle, Eye, EyeOff, Shield } from "lucide-react";
import { useState } from "react";
import { findUserByEmail, saveSession, validatePassword } from "../utils/auth";
import type { StoredUser } from "../utils/auth";

interface Props {
  onLogin: (user: StoredUser) => void;
  onCreateAccount: () => void;
}

const inputStyle: React.CSSProperties = {
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

const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  e.target.style.borderColor = "#00D4AA";
};
const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  e.target.style.borderColor = "#333";
};

export default function LoginScreen({ onLogin, onCreateAccount }: Props) {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setError("");
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    // Small delay to simulate async check
    setTimeout(() => {
      const user = findUserByEmail(email.trim());
      if (!user || !validatePassword(password, user.passwordHash)) {
        setError("Invalid email or password. Please check your credentials.");
        setLoading(false);
        return;
      }
      saveSession(user);
      setLoading(false);
      onLogin(user);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

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
          maxWidth: 420,
          background: "#1E1E1E",
          borderRadius: 20,
          padding: "40px 32px",
          border: "1px solid #2A2A2A",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #00D4AA, #00A884)",
              margin: "0 auto 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(0,212,170,0.3)",
            }}
          >
            <Shield size={32} color="#0A1628" strokeWidth={2.5} />
          </div>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "white",
              margin: "0 0 4px",
            }}
          >
            SupplyTrack AI
          </h1>
          <p style={{ color: "#718096", fontSize: 14, margin: 0 }}>
            Enterprise Supply Chain Platform
          </p>
        </div>

        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "white",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Welcome Back
        </h2>

        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="login-email"
            style={{
              display: "block",
              fontSize: 13,
              color: "#A0AEC0",
              marginBottom: 6,
              fontWeight: 500,
            }}
          >
            Email Address
          </label>
          <input
            id="login-email"
            data-ocid="login.input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your email"
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label
            htmlFor="login-password"
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
              id="login-password"
              data-ocid="login.password.input"
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your password"
              style={{ ...inputStyle, paddingRight: 44 }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <button
              type="button"
              data-ocid="login.password_toggle.button"
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
        </div>

        {error && (
          <div
            data-ocid="login.error_state"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              padding: "10px 14px",
              borderRadius: 8,
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.3)",
              marginTop: 12,
              marginBottom: 4,
            }}
          >
            <AlertCircle
              size={16}
              color="#EF4444"
              style={{ flexShrink: 0, marginTop: 1 }}
            />
            <span style={{ fontSize: 13, color: "#EF4444", lineHeight: 1.4 }}>
              {error}
            </span>
          </div>
        )}

        <div style={{ textAlign: "right", margin: "12px 0 20px" }}>
          <button
            type="button"
            data-ocid="login.forgot_password.link"
            style={{
              background: "none",
              border: "none",
              color: "#00D4AA",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="button"
          data-ocid="login.submit.button"
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
            boxShadow: loading ? "none" : "0 4px 16px rgba(0,212,170,0.3)",
            marginBottom: 20,
            transition: "all 0.2s",
          }}
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>

        <div style={{ textAlign: "center", fontSize: 14, color: "#718096" }}>
          Don&apos;t have an account?{" "}
          <button
            type="button"
            data-ocid="login.create_account.link"
            onClick={onCreateAccount}
            style={{
              background: "none",
              border: "none",
              color: "#00D4AA",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Create Account
          </button>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#4A5568",
            marginTop: 20,
            marginBottom: 0,
            lineHeight: 1.5,
          }}
        >
          New to SupplyTrack AI?{" "}
          <button
            type="button"
            onClick={onCreateAccount}
            style={{
              background: "none",
              border: "none",
              color: "#718096",
              cursor: "pointer",
              fontSize: 12,
              textDecoration: "underline",
            }}
          >
            Register first
          </button>{" "}
          before signing in.
        </p>
      </div>
    </div>
  );
}
