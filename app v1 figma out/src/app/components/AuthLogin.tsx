import { useState } from "react";
import { Camera, Mail, Lock, Eye, EyeOff } from "lucide-react";

interface AuthLoginProps {
  isDark: boolean;
  onLogin: (role: "vendor" | "technician", name: string) => void;
  onRegister: () => void;
}

const DEMO_ACCOUNTS = [
  { email: "vendor@demo.com",     password: "demo123", role: "vendor"     as const, name: "Arun Kumar"    },
  { email: "tech@demo.com",       password: "demo123", role: "technician" as const, name: "Rahul Sharma"  },
];

export function AuthLogin({ isDark, onLogin, onRegister }: AuthLoginProps) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const t1 = "var(--t1)"; const t2 = "var(--t2)"; const t3 = "var(--t3)";
  const cardStyle = { background: "var(--card-bg)", border: "1px solid var(--card-border)" };
  const inputStyle = { background: "var(--input-bg)", border: "1px solid var(--input-border)" };

  const handleLogin = () => {
    setError("");
    if (!email.trim())           return setError("Enter your email or phone number.");
    if (password.length < 6)     return setError("Password must be at least 6 characters.");

    const demo = DEMO_ACCOUNTS.find(a => a.email === email.toLowerCase().trim() && a.password === password);
    if (demo) {
      setLoading(true);
      setTimeout(() => { setLoading(false); onLogin(demo.role, demo.name); }, 900);
      return;
    }
    // Any valid-format email + 6+ char password → vendor by default for demo
    const role: "vendor" | "technician" = email.toLowerCase().includes("tech") ? "technician" : "vendor";
    const name = role === "vendor" ? "Arun Kumar" : "Rahul Sharma";
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(role, name); }, 900);
  };

  return (
    <div className="flex flex-col h-full px-6 overflow-y-auto">
      {/* Logo */}
      <div className="flex flex-col items-center pt-10 pb-8">
        <div
          className="w-18 h-18 rounded-3xl flex items-center justify-center mb-4"
          style={{
            width: 72, height: 72,
            background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
            boxShadow: "0 8px 32px rgba(124,58,237,0.45)",
          }}
        >
          <Camera size={34} style={{ color: "#fff" }} />
        </div>
        <h1 style={{ color: t1, fontSize: 26, fontWeight: 800, textAlign: "center" }}>CCTV Manager</h1>
        <p style={{ color: t3, fontSize: 13, textAlign: "center", marginTop: 6, lineHeight: 1.5 }}>
          Smart business management for CCTV professionals
        </p>
        <div
          className="mt-3 px-3 py-1 rounded-full"
          style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)" }}
        >
          <span style={{ fontSize: 11, fontWeight: 600, color: "#A78BFA" }}>V1 · Field Edition</span>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4 flex-1">
        {/* Email / Phone */}
        <div>
          <label style={{ display: "block", color: t3, fontSize: 13, marginBottom: 8 }}>Email or Phone</label>
          <div className="relative">
            <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--t4)" }} />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              className="w-full pl-11 pr-4 py-4 rounded-2xl outline-none"
              style={{ ...inputStyle, fontSize: 14, color: t1 }}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label style={{ color: t3, fontSize: 13 }}>Password</label>
            <button style={{ color: "#A78BFA", fontSize: 12, fontWeight: 500 }}>Forgot Password?</button>
          </div>
          <div className="relative">
            <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--t4)" }} />
            <input
              type={showPw ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              className="w-full pl-11 pr-12 py-4 rounded-2xl outline-none"
              style={{ ...inputStyle, fontSize: 14, color: t1 }}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 active:opacity-70"
              onClick={() => setShowPw(v => !v)}
            >
              {showPw
                ? <EyeOff size={15} style={{ color: "var(--t4)" }} />
                : <Eye    size={15} style={{ color: "var(--t4)" }} />}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: "#F87171", fontSize: 13, marginTop: -4 }}>{error}</p>
        )}

        {/* Login button */}
        <button
          className="w-full py-4 rounded-2xl flex items-center justify-center active:scale-95 transition-transform mt-2"
          style={{
            background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
            boxShadow: "0 4px 24px rgba(124,58,237,0.4)",
            opacity: loading ? 0.75 : 1,
            color: "#fff", fontWeight: 600, fontSize: 15,
          }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Log In"}
        </button>

        {/* Sign up link */}
        <p style={{ textAlign: "center", color: t3, fontSize: 13, marginTop: 4 }}>
          New user?{" "}
          <button style={{ color: "#A78BFA", fontWeight: 600 }} onClick={onRegister}>Sign Up</button>
        </p>

        {/* Demo accounts */}
        <div
          className="rounded-2xl p-4 mt-2"
          style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)" }}
        >
          <p style={{ color: "var(--t4)", fontSize: 11, marginBottom: 10, fontWeight: 500 }}>
            DEMO QUICK LOGIN
          </p>
          <div className="flex gap-2">
            {DEMO_ACCOUNTS.map(a => (
              <button
                key={a.role}
                className="flex-1 py-2.5 rounded-xl flex flex-col items-center gap-1 active:scale-95 transition-transform"
                style={{
                  background: a.role === "vendor" ? "rgba(124,58,237,0.2)" : "rgba(99,102,241,0.15)",
                  border: `1px solid ${a.role === "vendor" ? "rgba(124,58,237,0.3)" : "rgba(99,102,241,0.25)"}`,
                }}
                onClick={() => { setEmail(a.email); setPassword(a.password); setTimeout(handleLogin, 50); }}
              >
                <span style={{ fontSize: 16 }}>{a.role === "vendor" ? "🏢" : "👷"}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: a.role === "vendor" ? "#A78BFA" : "#818CF8" }}>
                  {a.role === "vendor" ? "Vendor" : "Technician"}
                </span>
              </button>
            ))}
          </div>
          <p style={{ color: "var(--t4)", fontSize: 10, marginTop: 8, textAlign: "center" }}>
            Or email contains "tech" → technician portal
          </p>
        </div>
      </div>

      <div className="pb-8" />
    </div>
  );
}
