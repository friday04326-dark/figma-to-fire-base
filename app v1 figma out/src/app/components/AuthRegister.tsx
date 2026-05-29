import { useState } from "react";
import { ArrowLeft, User, Phone, Mail, Lock, Eye, EyeOff, Building2, HardHat, Hash, MapPin, FileText, Check, RefreshCw } from "lucide-react";

interface AuthRegisterProps {
  isDark: boolean;
  onBack: () => void;
  onSuccess: (role: "vendor" | "technician", name: string) => void;
}

type PasswordStrength = "weak" | "medium" | "strong";

function getStrength(pw: string): PasswordStrength {
  if (pw.length < 6) return "weak";
  const hasUpper = /[A-Z]/.test(pw);
  const hasNum   = /[0-9]/.test(pw);
  const hasSym   = /[^a-zA-Z0-9]/.test(pw);
  return (hasUpper && hasNum && hasSym) ? "strong" : (hasNum || hasUpper) ? "medium" : "weak";
}

const strengthColor = { weak: "#EF4444", medium: "#F59E0B", strong: "#10B981" };
const strengthLabel = { weak: "Weak", medium: "Medium", strong: "Strong" };

const TAKEN_CODES = ["DEMO001", "TEST001", "CCTV002"];

function generateCode(name: string): string {
  const prefix = name.replace(/[^A-Z0-9]/gi, "").toUpperCase().slice(0, 4) || "CCTV";
  const num = Math.floor(100 + Math.random() * 900);
  return `${prefix}${num}`;
}

export function AuthRegister({ isDark, onBack, onSuccess }: AuthRegisterProps) {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", password: "", confirm: "",
    role: "" as "vendor" | "technician" | "",
    // vendor fields
    companyName: "", companyAddress: "", gst: "", companyCode: "",
    // tech fields
    techCode: "", specialization: "", experience: "",
    agree: false,
  });
  const [showPw, setShowPw]   = useState(false);
  const [showCf, setShowCf]   = useState(false);
  const [codeStatus, setCodeStatus] = useState<"idle"|"available"|"taken">("idle");
  const [techCodeStatus, setTechCodeStatus] = useState<"idle"|"valid"|"invalid">("idle");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const u = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const t1 = "var(--t1)"; const t2 = "var(--t2)"; const t3 = "var(--t3)";
  const cardStyle = { background: "var(--card-bg)", border: "1px solid var(--card-border)" };
  const inputStyle = { background: "var(--input-bg)", border: "1px solid var(--input-border)" };

  const pwStrength = getStrength(form.password);

  const checkCompanyCode = (code: string) => {
    if (!code) return setCodeStatus("idle");
    setCodeStatus(TAKEN_CODES.includes(code.toUpperCase()) ? "taken" : "available");
  };

  const checkTechCode = (code: string) => {
    if (!code) return setTechCodeStatus("idle");
    setTechCodeStatus(code.toUpperCase() === "CCTV001" ? "valid" : "invalid");
  };

  const handleGenCode = () => {
    const code = generateCode(form.companyName || form.name);
    u("companyCode", code);
    checkCompanyCode(code);
  };

  const isValid =
    form.name && form.phone && form.email && form.password.length >= 6 &&
    form.password === form.confirm && form.role && form.agree &&
    (form.role === "vendor"
      ? form.companyName && form.companyCode && codeStatus === "available"
      : techCodeStatus === "valid");

  const handleSubmit = () => {
    if (!isValid) return;
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(form.role as "vendor"|"technician", form.name.trim());
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 flex items-center gap-3 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--card-border)" }}
      >
        <button
          className="w-10 h-10 rounded-xl flex items-center justify-center active:scale-90 transition-transform"
          style={cardStyle}
          onClick={onBack}
        >
          <ArrowLeft size={18} style={{ color: t1 }} />
        </button>
        <div>
          <p style={{ color: t1, fontWeight: 700, fontSize: 18 }}>Create Account</p>
          <p style={{ color: t3, fontSize: 12, marginTop: 1 }}>Join CCTV Manager</p>
        </div>
        <div className="ml-auto px-2.5 py-1 rounded-full" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#A78BFA" }}>Step 1 of 2</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="flex flex-col gap-4">

          {/* ── Common fields ── */}
          <SectionLabel label="Personal Details" />

          <Field label="Full Name *" icon={<User size={14} style={{ color: "var(--t4)" }} />}>
            <input type="text" placeholder="Your full name" value={form.name}
              onChange={e => u("name", e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-2xl outline-none"
              style={{ ...inputStyle, fontSize: 14, color: t1 }} />
          </Field>

          <Field label="Phone Number *" icon={<Phone size={14} style={{ color: "var(--t4)" }} />}>
            <input type="tel" placeholder="+91 98765 43210" value={form.phone}
              onChange={e => u("phone", e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-2xl outline-none"
              style={{ ...inputStyle, fontSize: 14, color: t1 }} />
          </Field>

          <Field label="Email Address *" icon={<Mail size={14} style={{ color: "var(--t4)" }} />}>
            <input type="email" placeholder="you@example.com" value={form.email}
              onChange={e => u("email", e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-2xl outline-none"
              style={{ ...inputStyle, fontSize: 14, color: t1 }} />
          </Field>

          {/* Password with strength indicator */}
          <div>
            <label style={{ display: "block", color: t3, fontSize: 13, marginBottom: 8 }}>Password *</label>
            <div className="relative">
              <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--t4)" }} />
              <input
                type={showPw ? "text" : "password"}
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={e => u("password", e.target.value)}
                className="w-full pl-11 pr-12 py-4 rounded-2xl outline-none"
                style={{ ...inputStyle, fontSize: 14, color: t1 }}
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2" onClick={() => setShowPw(v=>!v)}>
                {showPw ? <EyeOff size={14} style={{ color: "var(--t4)" }} /> : <Eye size={14} style={{ color: "var(--t4)" }} />}
              </button>
            </div>
            {form.password.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-1 flex-1">
                  {(["weak","medium","strong"] as PasswordStrength[]).map((s, i) => {
                    const filled = (pwStrength === "weak" && i===0) || (pwStrength === "medium" && i<=1) || pwStrength==="strong";
                    return (
                      <div key={s} className="flex-1 h-1 rounded-full transition-all"
                        style={{ background: filled ? strengthColor[pwStrength] : "var(--card-border)" }} />
                    );
                  })}
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: strengthColor[pwStrength] }}>
                  {strengthLabel[pwStrength]}
                </span>
              </div>
            )}
          </div>

          <div>
            <label style={{ display: "block", color: t3, fontSize: 13, marginBottom: 8 }}>Confirm Password *</label>
            <div className="relative">
              <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--t4)" }} />
              <input
                type={showCf ? "text" : "password"}
                placeholder="Re-enter password"
                value={form.confirm}
                onChange={e => u("confirm", e.target.value)}
                className="w-full pl-11 pr-12 py-4 rounded-2xl outline-none"
                style={{
                  ...inputStyle, fontSize: 14, color: t1,
                  borderColor: form.confirm && form.confirm !== form.password ? "rgba(239,68,68,0.5)" : undefined,
                }}
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2" onClick={() => setShowCf(v=>!v)}>
                {showCf ? <EyeOff size={14} style={{ color: "var(--t4)" }} /> : <Eye size={14} style={{ color: "var(--t4)" }} />}
              </button>
            </div>
            {form.confirm && form.confirm !== form.password && (
              <p style={{ color: "#F87171", fontSize: 12, marginTop: 4 }}>Passwords don't match</p>
            )}
          </div>

          {/* ── Role selection ── */}
          <SectionLabel label="I am a... *" />

          <div className="grid grid-cols-2 gap-3">
            <RoleCard
              selected={form.role === "vendor"}
              icon={<Building2 size={22} style={{ color: form.role === "vendor" ? "#fff" : "var(--t4)" }} />}
              iconBg={form.role === "vendor" ? "linear-gradient(135deg,#7C3AED,#8B5CF6)" : "var(--input-bg)"}
              title="Vendor"
              subtitle="Shop Owner / Manager"
              desc="Manage technicians, customers & billing"
              accentColor="#7C3AED"
              onClick={() => u("role", "vendor")}
            />
            <RoleCard
              selected={form.role === "technician"}
              icon={<HardHat size={22} style={{ color: form.role === "technician" ? "#fff" : "var(--t4)" }} />}
              iconBg={form.role === "technician" ? "linear-gradient(135deg,#4F46E5,#6366F1)" : "var(--input-bg)"}
              title="Technician"
              subtitle="Field Installer"
              desc="View jobs, log materials & update status"
              accentColor="#6366F1"
              onClick={() => u("role", "technician")}
            />
          </div>

          {/* ── Vendor conditional fields ── */}
          {form.role === "vendor" && (
            <div
              className="rounded-2xl p-4 flex flex-col gap-4"
              style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.15)" }}
            >
              <p style={{ fontSize: 12, fontWeight: 600, color: "#A78BFA", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Company Details
              </p>

              <Field label="Company / Business Name *" icon={<Building2 size={14} style={{ color: "var(--t4)" }} />}>
                <input type="text" placeholder="Your company name" value={form.companyName}
                  onChange={e => u("companyName", e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl outline-none"
                  style={{ ...inputStyle, fontSize: 14, color: t1 }} />
              </Field>

              <Field label="Company Address *" icon={<MapPin size={14} style={{ color: "var(--t4)" }} />}>
                <textarea placeholder="City, State, Pincode" value={form.companyAddress}
                  onChange={e => u("companyAddress", e.target.value)} rows={2}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl outline-none resize-none"
                  style={{ ...inputStyle, fontSize: 14, color: t1 }} />
              </Field>

              <Field label="GST Number (optional)" icon={<FileText size={14} style={{ color: "var(--t4)" }} />}>
                <input type="text" placeholder="22AAAAA0000A1Z5" value={form.gst}
                  onChange={e => u("gst", e.target.value.toUpperCase())}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl outline-none"
                  style={{ ...inputStyle, fontSize: 14, color: t1 }} />
              </Field>

              {/* Company code generator */}
              <div>
                <label style={{ display: "block", color: t3, fontSize: 13, marginBottom: 4 }}>Unique Company Code *</label>
                <p style={{ color: "var(--t4)", fontSize: 11, marginBottom: 8, lineHeight: 1.5 }}>
                  Technicians use this code to link to your company. 6–12 alphanumeric chars.
                </p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Hash size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--t4)" }} />
                    <input
                      type="text"
                      placeholder="e.g. CCTV001"
                      value={form.companyCode}
                      onChange={e => { const v = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,12); u("companyCode", v); checkCompanyCode(v); }}
                      maxLength={12}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl outline-none"
                      style={{
                        ...inputStyle, fontSize: 14, color: t1,
                        borderColor: codeStatus === "available" ? "rgba(16,185,129,0.4)" : codeStatus === "taken" ? "rgba(239,68,68,0.4)" : undefined,
                      }}
                    />
                  </div>
                  <button
                    className="px-3 py-2 rounded-xl flex items-center gap-1.5 active:scale-95 transition-transform"
                    style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)", color: "#A78BFA", fontSize: 12 }}
                    onClick={handleGenCode}
                  >
                    <RefreshCw size={13} />
                    Generate
                  </button>
                </div>
                {codeStatus === "available" && (
                  <p style={{ color: "#10B981", fontSize: 12, marginTop: 4 }}>✅ Available! This code is unique.</p>
                )}
                {codeStatus === "taken" && (
                  <p style={{ color: "#EF4444", fontSize: 12, marginTop: 4 }}>❌ Taken. Try a different code or generate one.</p>
                )}
              </div>
            </div>
          )}

          {/* ── Technician conditional fields ── */}
          {form.role === "technician" && (
            <div
              className="rounded-2xl p-4 flex flex-col gap-4"
              style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}
            >
              <p style={{ fontSize: 12, fontWeight: 600, color: "#818CF8", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Link to Company
              </p>

              <div>
                <label style={{ display: "block", color: t3, fontSize: 13, marginBottom: 4 }}>Company Code *</label>
                <p style={{ color: "var(--t4)", fontSize: 11, marginBottom: 8 }}>
                  Ask your vendor/company for their unique code.{" "}
                  <span style={{ color: "#818CF8", fontWeight: 600 }}>Demo: CCTV001</span>
                </p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Hash size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--t4)" }} />
                    <input
                      type="text"
                      placeholder="Enter company code"
                      value={form.techCode}
                      onChange={e => { const v = e.target.value.toUpperCase(); u("techCode", v); checkTechCode(v); }}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl outline-none"
                      style={{
                        ...inputStyle, fontSize: 14, color: t1, letterSpacing: "0.05em",
                        borderColor: techCodeStatus === "valid" ? "rgba(16,185,129,0.4)" : techCodeStatus === "invalid" ? "rgba(239,68,68,0.4)" : undefined,
                      }}
                    />
                  </div>
                </div>
                {techCodeStatus === "valid" && (
                  <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-xl"
                    style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Check size={12} className="text-emerald-400" />
                    </div>
                    <span style={{ color: "#10B981", fontSize: 12, fontWeight: 500 }}>
                      Connected to: <strong>Demo CCTV Solutions</strong>
                    </span>
                  </div>
                )}
                {techCodeStatus === "invalid" && (
                  <p style={{ color: "#EF4444", fontSize: 12, marginTop: 4 }}>
                    ❌ Company not found. Check the code with your vendor.
                  </p>
                )}
              </div>

              <div>
                <label style={{ display: "block", color: t3, fontSize: 13, marginBottom: 8 }}>Specialization (optional)</label>
                <div className="flex flex-wrap gap-2">
                  {["Installation", "Maintenance", "Repair", "All Services"].map(s => (
                    <button
                      key={s}
                      className="px-3 py-1.5 rounded-xl active:scale-95 transition-transform"
                      style={{
                        fontSize: 12, fontWeight: 500,
                        background: form.specialization === s ? "rgba(99,102,241,0.2)" : "var(--input-bg)",
                        border: `1px solid ${form.specialization === s ? "rgba(99,102,241,0.4)" : "var(--input-border)"}`,
                        color: form.specialization === s ? "#818CF8" : t3,
                      }}
                      onClick={() => u("specialization", s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: "block", color: t3, fontSize: 13, marginBottom: 8 }}>Experience (optional)</label>
                <div className="flex flex-wrap gap-2">
                  {["0–1 years", "1–3 years", "3–5 years", "5+ years"].map(e => (
                    <button
                      key={e}
                      className="px-3 py-1.5 rounded-xl active:scale-95 transition-transform"
                      style={{
                        fontSize: 12, fontWeight: 500,
                        background: form.experience === e ? "rgba(99,102,241,0.2)" : "var(--input-bg)",
                        border: `1px solid ${form.experience === e ? "rgba(99,102,241,0.4)" : "var(--input-border)"}`,
                        color: form.experience === e ? "#818CF8" : t3,
                      }}
                      onClick={() => u("experience", e)}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Terms */}
          <div
            className="flex items-start gap-3 p-3.5 rounded-xl cursor-pointer active:opacity-80"
            style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)" }}
            onClick={() => u("agree", !form.agree)}
          >
            <div
              className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
              style={{
                background: form.agree ? "linear-gradient(135deg,#7C3AED,#8B5CF6)" : "transparent",
                border: `2px solid ${form.agree ? "#7C3AED" : "var(--t4)"}`,
              }}
            >
              {form.agree && <Check size={11} style={{ color: "#fff" }} />}
            </div>
            <p style={{ fontSize: 12, color: t3, lineHeight: 1.5 }}>
              I agree to the{" "}
              <span style={{ color: "#A78BFA", fontWeight: 500 }}>Terms of Service</span>
              {" "}and{" "}
              <span style={{ color: "#A78BFA", fontWeight: 500 }}>Privacy Policy</span>
            </p>
          </div>

          {error && <p style={{ color: "#F87171", fontSize: 13 }}>{error}</p>}

          {/* Submit */}
          <button
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all"
            style={{
              background: isValid ? "linear-gradient(135deg, #7C3AED, #8B5CF6)" : "var(--input-bg)",
              opacity: isValid ? 1 : 0.5,
              boxShadow: isValid ? "0 4px 24px rgba(124,58,237,0.38)" : "none",
              color: isValid ? "#fff" : t3, fontWeight: 600, fontSize: 15,
              border: isValid ? "none" : "1px solid var(--input-border)",
            }}
            onClick={handleSubmit}
            disabled={!isValid || loading}
          >
            <Check size={17} style={{ color: "inherit" }} />
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p style={{ textAlign: "center", color: t3, fontSize: 12, paddingBottom: 16 }}>
            Already have an account?{" "}
            <button style={{ color: "#A78BFA", fontWeight: 600 }} onClick={onBack}>Sign In</button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Small helpers ─────────────────────────────────────────────────────────────
function SectionLabel({ label }: { label: string }) {
  return (
    <p style={{ fontSize: 12, fontWeight: 600, color: "var(--t3)", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 4 }}>
      {label}
    </p>
  );
}

function Field({ label, icon, children }: { label?: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      {label && <label style={{ display: "block", color: "var(--t3)", fontSize: 13, marginBottom: 8 }}>{label}</label>}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">{icon}</div>
        {children}
      </div>
    </div>
  );
}

function RoleCard({ selected, icon, iconBg, title, subtitle, desc, accentColor, onClick }: any) {
  return (
    <button
      className="rounded-2xl p-4 flex flex-col items-center gap-2 active:scale-95 transition-all text-center"
      style={{
        background: selected ? `${accentColor}18` : "var(--card-bg)",
        border: `1px solid ${selected ? `${accentColor}40` : "var(--card-border)"}`,
      }}
      onClick={onClick}
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: iconBg }}>
        {icon}
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: selected ? accentColor : "var(--t1)" }}>{title}</span>
      <span style={{ fontSize: 10, color: "var(--t3)" }}>{subtitle}</span>
      <span style={{ fontSize: 10, color: "var(--t4)", lineHeight: 1.4 }}>{desc}</span>
    </button>
  );
}
