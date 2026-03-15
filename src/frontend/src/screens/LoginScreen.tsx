import { Eye, EyeOff, Shield } from "lucide-react";
import { useState } from "react";

interface Props {
  onLogin: () => void;
  onCreateAccount: () => void;
}

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
            data-ocid="login.email.input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 10,
              background: "#2A2A2A",
              border: "1px solid #333",
              color: "white",
              fontSize: 14,
              outline: "none",
            }}
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
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "12px 44px 12px 16px",
                borderRadius: 10,
                background: "#2A2A2A",
                border: "1px solid #333",
                color: "white",
                fontSize: 14,
                outline: "none",
              }}
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

        <div style={{ textAlign: "right", marginBottom: 24 }}>
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
          onClick={onLogin}
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
            boxShadow: "0 4px 16px rgba(0,212,170,0.3)",
            marginBottom: 20,
          }}
        >
          Sign In
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
      </div>
    </div>
  );
}
