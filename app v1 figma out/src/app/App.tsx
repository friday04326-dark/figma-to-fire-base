import { useState, CSSProperties } from "react";
import {
  Home, Users, Camera, FileText, Calculator,
  Building2, LogOut, HardHat, ClipboardList, Moon, Sun,
} from "lucide-react";

import { AuthLogin }    from "./components/AuthLogin";
import { AuthRegister } from "./components/AuthRegister";

import { VendorDashboard } from "./components/VendorDashboard";
import { VendorWorks }     from "./components/VendorWorks";
import { VendorTeam }      from "./components/VendorTeam";

import { TechDashboard }  from "./components/TechDashboard";
import { TechJobDetail }  from "./components/TechJobDetail";

import { Customers }          from "./components/Customers";
import { AddCustomer }        from "./components/AddCustomer";
import { ExpenseCalculator }  from "./components/ExpenseCalculator";
import { Billing }            from "./components/Billing";

// ── Theme tokens ──────────────────────────────────────────────────────────────
const DARK: Record<string, string> = {
  "--app-bg":      "#0A0C10",
  "--frame-bg":    "#0D0B1A",
  "--card-bg":     "rgba(30,27,75,0.6)",
  "--card-solid":  "#16133A",
  "--card-border": "rgba(255,255,255,0.07)",
  "--nav-bg":      "rgba(7,5,13,0.97)",
  "--nav-border":  "rgba(124,58,237,0.14)",
  "--header-bg":   "rgba(7,5,13,0.98)",
  "--input-bg":    "rgba(30,27,75,0.7)",
  "--input-border":"rgba(255,255,255,0.09)",
  "--t1":          "#F8FAFC",
  "--t2":          "#C4B5FD",
  "--t3":          "#6B7280",
  "--t4":          "#4B5563",
  "--t5":          "#374151",
  "--overlay":     "rgba(0,0,0,0.82)",
};

const LIGHT: Record<string, string> = {
  "--app-bg":      "#EDE9FE",
  "--frame-bg":    "#F5F3FF",
  "--card-bg":     "#FFFFFF",
  "--card-solid":  "#FFFFFF",
  "--card-border": "rgba(0,0,0,0.07)",
  "--nav-bg":      "rgba(255,255,255,0.97)",
  "--nav-border":  "rgba(124,58,237,0.12)",
  "--header-bg":   "rgba(255,255,255,0.98)",
  "--input-bg":    "#F3F0FF",
  "--input-border":"rgba(124,58,237,0.18)",
  "--t1":          "#111827",
  "--t2":          "#4C1D95",
  "--t3":          "#6B7280",
  "--t4":          "#9CA3AF",
  "--t5":          "#D1D5DB",
  "--overlay":     "rgba(0,0,0,0.6)",
};

type AppPhase  = "login" | "register" | "vendor" | "technician";
type VendorScreen = "v-home"|"v-customers"|"v-add-customer"|"v-works"|"v-expenses"|"v-bills"|"v-team"|"v-profile";
type TechScreen   = "t-home"|"t-jobs"|"t-job-detail"|"t-log"|"t-bills"|"t-profile";
type AnyScreen = VendorScreen | TechScreen;

interface TechPerms { billing: boolean; expenses: boolean }
const DEFAULT_TECH_PERMS: TechPerms = { billing: false, expenses: true };

const vendorNav = [
  { id: "v-home",      label: "Home",      icon: Home },
  { id: "v-customers", label: "Customers", icon: Users },
  { id: "v-works",     label: "Works",     icon: Camera },
  { id: "v-expenses",  label: "Expenses",  icon: Calculator },
  { id: "v-bills",     label: "Bills",     icon: FileText },
];

const techNav = [
  { id: "t-home",  label: "Home",    icon: Home },
  { id: "t-jobs",  label: "My Jobs", icon: ClipboardList },
  { id: "t-log",   label: "Log",     icon: Calculator },
  { id: "t-bills", label: "Bills",   icon: FileText },
];

export default function App() {
  const [phase,    setPhase]    = useState<AppPhase>("login");
  const [screen,   setScreen]   = useState<AnyScreen>("v-home");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState<"vendor"|"technician">("vendor");
  const [techPerms]             = useState<TechPerms>(DEFAULT_TECH_PERMS);
  const [isDark,   setIsDark]   = useState(true);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const navigate = (target: string, data?: any) => {
    if (target === "t-job-detail" && data) setSelectedJob(data);
    setScreen(target as AnyScreen);
  };

  const handleLogin = (role: "vendor" | "technician", name: string) => {
    setUserName(name);
    setUserRole(role);
    setPhase(role);
    setScreen(role === "vendor" ? "v-home" : "t-home");
  };

  const handleLogout = () => { setPhase("login"); setUserName(""); };

  const isVendor = phase === "vendor";
  const isTech   = phase === "technician";
  const isAuth   = !isVendor && !isTech;

  const activeTab = isVendor
    ? (screen === "v-add-customer" ? "v-customers" : screen as string)
    : (screen === "t-job-detail"   ? "t-jobs"      : screen as string);

  const accentColor = "#7C3AED";
  const accentColor2 = "#8B5CF6";

  // ── Screen renderers ──────────────────────────────────────────────────────
  const renderVendor = () => {
    switch (screen) {
      case "v-home":    return <VendorDashboard userName={userName} onNavigate={navigate} />;
      case "v-customers": return <Customers onNavigate={navigate} />;
      case "v-add-customer": return <AddCustomer onNavigate={(s) => navigate(s === "customers" ? "v-customers" : s)} />;
      case "v-works":   return <VendorWorks onNavigate={navigate} />;
      case "v-team":    return <VendorTeam onNavigate={navigate} />;
      case "v-expenses": return <ExpenseCalculator onNavigate={(s) => navigate(s === "bills" ? "v-bills" : s)} />;
      case "v-bills":   return <Billing onNavigate={navigate} />;
      case "v-profile": return <ProfileScreen userName={userName} role="vendor" isDark={isDark} onToggleTheme={() => setIsDark(d => !d)} onLogout={handleLogout} />;
      default:          return <VendorDashboard userName={userName} onNavigate={navigate} />;
    }
  };

  const renderTech = () => {
    switch (screen) {
      case "t-home":  return <TechDashboard userName={userName} permissions={techPerms} onNavigate={navigate} />;
      case "t-jobs":  return <TechDashboard userName={userName} permissions={techPerms} onNavigate={navigate} />;
      case "t-job-detail": return (
        <TechJobDetail
          job={selectedJob}
          permissions={techPerms}
          onBack={() => setScreen("t-home")}
          onNavigate={navigate}
        />
      );
      case "t-log":
        return techPerms.expenses
          ? <ExpenseCalculator onNavigate={(s) => navigate(s === "bills" ? "t-bills" : s)} />
          : <PermissionLocked message="Expense logging not enabled" onBack={() => setScreen("t-home")} />;
      case "t-bills":
        return techPerms.billing
          ? <Billing onNavigate={navigate} />
          : <PermissionLocked message="Bill generation not enabled" onBack={() => setScreen("t-home")} />;
      case "t-profile": return <ProfileScreen userName={userName} role="technician" permissions={techPerms} isDark={isDark} onToggleTheme={() => setIsDark(d => !d)} onLogout={handleLogout} />;
      default:        return <TechDashboard userName={userName} permissions={techPerms} onNavigate={navigate} />;
    }
  };

  // ── CSS variables injection ───────────────────────────────────────────────
  const themeVars = isDark ? DARK : LIGHT;

  const statusBarBg = isDark ? "rgba(7,5,13,0.98)" : "rgba(255,255,255,0.98)";
  const statusTextColor = isDark ? "#F8FAFC" : "#111827";

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: themeVars["--app-bg"], ...(themeVars as CSSProperties) }}
    >
      {/* Phone frame */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width:  "min(390px, 100vw)",
          height: "min(844px, 100vh)",
          background: themeVars["--frame-bg"],
          borderRadius: "clamp(0px, calc((100vw - 390px)*9999), 2.5rem)",
          boxShadow: isDark
            ? "0 0 0 1px rgba(124,58,237,0.1), 0 40px 100px rgba(0,0,0,0.9)"
            : "0 0 0 1px rgba(124,58,237,0.15), 0 40px 100px rgba(124,58,237,0.15)",
        }}
      >
        {/* Status bar */}
        <div
          className="flex items-center justify-between px-6 py-2 flex-shrink-0 z-10"
          style={{ background: statusBarBg }}
        >
          <span style={{ fontSize: 12, fontWeight: 600, color: statusTextColor }}>9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-0.5">
              {[3,4,5,6].map(h => (
                <div key={h} style={{ width: 3, height: h, background: statusTextColor, borderRadius: 2, opacity: 0.9 }} />
              ))}
            </div>
            <svg width="15" height="11" viewBox="0 0 15 11" fill={statusTextColor} opacity="0.9">
              <path d="M7.5 2C9.5 2 11.3 2.8 12.6 4.1L13.8 2.9C12.1 1.1 9.9 0 7.5 0C5.1 0 2.9 1.1 1.2 2.9L2.4 4.1C3.7 2.8 5.5 2 7.5 2Z"/>
              <path d="M7.5 4.5C8.8 4.5 10 5 10.9 5.9L12.1 4.7C10.8 3.4 9.2 2.5 7.5 2.5C5.8 2.5 4.2 3.4 2.9 4.7L4.1 5.9C5 5 6.2 4.5 7.5 4.5Z"/>
              <circle cx="7.5" cy="9.5" r="1.5"/>
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={statusTextColor} strokeOpacity="0.35"/>
              <rect x="2" y="2" width="17" height="8" rx="2" fill={statusTextColor}/>
              <path d="M23 4v4a2 2 0 000-4z" fill={statusTextColor} fillOpacity="0.4"/>
            </svg>
          </div>
        </div>

        {/* Unified top header — shown when logged in */}
        {!isAuth && (
          <div
            className="flex items-center justify-between px-5 py-3 flex-shrink-0 z-10"
            style={{
              background: themeVars["--header-bg"],
              borderBottom: `1px solid ${themeVars["--nav-border"]}`,
            }}
          >
            {/* Profile avatar + name */}
            <button
              className="flex items-center gap-2.5 active:opacity-70 transition-opacity"
              onClick={() => navigate(isVendor ? "v-profile" : "t-profile")}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, ${accentColor2})`,
                  boxShadow: `0 2px 10px rgba(124,58,237,0.4)`,
                  fontSize: 14, fontWeight: 700, color: "#fff",
                }}
              >
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p style={{ fontSize: 13, fontWeight: 600, color: themeVars["--t1"], lineHeight: 1 }}>{userName}</p>
                <p style={{ fontSize: 10, color: themeVars["--t3"], marginTop: 2 }}>
                  {isVendor ? "Vendor" : "Technician"} · tap to edit
                </p>
              </div>
            </button>

            {/* Right side: ONLINE + logout */}
            <div className="flex items-center gap-2.5">
              <div
                className="px-2.5 py-1 rounded-full flex items-center gap-1.5"
                style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 5px #10b981" }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: "#10b981", letterSpacing: "0.04em" }}>ONLINE</span>
              </div>
              <button
                className="flex items-center gap-1 active:opacity-70 transition-opacity"
                style={{ color: themeVars["--t3"], fontSize: 11 }}
                onClick={handleLogout}
              >
                <LogOut size={13} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 22% at 50% 0%, rgba(124,58,237,${isDark ? "0.09" : "0.05"}) 0%, transparent 60%)`,
          }}
        />

        {/* Main content */}
        <div
          className="flex-1 overflow-hidden relative"
          style={{ paddingBottom: isAuth ? 0 : 80 }}
        >
          {isAuth && (
            phase === "login"
              ? <AuthLogin onLogin={handleLogin} onRegister={() => setPhase("register")} isDark={isDark} />
              : <AuthRegister onBack={() => setPhase("login")} onSuccess={handleLogin} isDark={isDark} />
          )}
          {isVendor && renderVendor()}
          {isTech   && renderTech()}
        </div>

        {/* Bottom navigation */}
        {!isAuth && (
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              background: themeVars["--nav-bg"],
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderTop: `1px solid ${themeVars["--nav-border"]}`,
              height: 80,
            }}
          >
            <div className="flex items-center justify-around h-full px-2">
              {(isVendor ? vendorNav : techNav).map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                const isLocked = isTech && (
                  (id === "t-log"   && !techPerms.expenses) ||
                  (id === "t-bills" && !techPerms.billing)
                );
                return (
                  <button
                    key={id}
                    className="flex flex-col items-center gap-1 flex-1 py-2 active:scale-90 transition-transform"
                    onClick={() => !isLocked && navigate(id)}
                  >
                    <div
                      className="w-10 h-9 rounded-xl flex items-center justify-center transition-all"
                      style={{
                        background: isActive
                          ? `rgba(124,58,237,0.18)`
                          : "transparent",
                      }}
                    >
                      <Icon
                        size={19}
                        style={{
                          color: isActive ? accentColor : isLocked ? themeVars["--t5"] : themeVars["--t3"],
                          strokeWidth: isActive ? 2.5 : 1.8,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? accentColor : isLocked ? themeVars["--t5"] : themeVars["--t3"],
                        letterSpacing: "0.02em",
                      }}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Profile screen ────────────────────────────────────────────────────────────
function ProfileScreen({
  userName, role, permissions, isDark, onToggleTheme, onLogout,
}: {
  userName: string;
  role: "vendor" | "technician";
  permissions?: { billing: boolean; expenses: boolean };
  isDark: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
}) {
  const t1 = "var(--t1)"; const t2 = "var(--t2)"; const t3 = "var(--t3)";
  const cardStyle = { background: "var(--card-bg)", border: "1px solid var(--card-border)" };

  return (
    <div className="flex flex-col h-full overflow-y-auto px-5 pt-6 pb-6">
      <h2 style={{ color: t1, marginBottom: 20 }}>My Profile</h2>

      {/* Avatar */}
      <div className="flex flex-col items-center py-6 mb-2">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-3"
          style={{
            background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
            boxShadow: "0 8px 28px rgba(124,58,237,0.45)",
            fontSize: 30, fontWeight: 700, color: "#fff",
          }}
        >
          {userName.charAt(0).toUpperCase()}
        </div>
        <p style={{ color: t1, fontWeight: 700, fontSize: 18 }}>{userName}</p>
        <div
          className="mt-2 px-3 py-1 rounded-full flex items-center gap-1.5"
          style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)" }}
        >
          {role === "vendor"
            ? <Building2 size={12} style={{ color: "#A78BFA" }} />
            : <HardHat   size={12} style={{ color: "#A78BFA" }} />}
          <span style={{ fontSize: 11, fontWeight: 600, color: "#A78BFA" }}>
            {role === "vendor" ? "Vendor / Company" : "Field Technician"}
          </span>
        </div>
      </div>

      {/* Tech permissions */}
      {role === "technician" && permissions && (
        <div className="rounded-2xl p-4 mb-4" style={cardStyle}>
          <p style={{ fontSize: 12, fontWeight: 500, color: t3, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12 }}>Access Permissions</p>
          {[
            { label: "Expense Logging", enabled: permissions.expenses },
            { label: "Bill Generation", enabled: permissions.billing },
          ].map(({ label, enabled }) => (
            <div key={label} className="flex items-center justify-between py-2.5" style={{ borderBottom: "1px solid var(--card-border)" }}>
              <span style={{ fontSize: 14, color: t2 }}>{label}</span>
              <span
                className="px-2.5 py-1 rounded-full"
                style={{
                  fontSize: 11, fontWeight: 600,
                  background: enabled ? "rgba(16,185,129,0.12)" : "rgba(107,114,128,0.12)",
                  color: enabled ? "#10b981" : "#6B7280",
                }}
              >
                {enabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Theme toggle */}
      <div className="rounded-2xl p-4 mb-4" style={cardStyle}>
        <p style={{ fontSize: 12, fontWeight: 500, color: t3, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12 }}>Appearance</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isDark ? <Moon size={16} style={{ color: "#A78BFA" }} /> : <Sun size={16} style={{ color: "#F59E0B" }} />}
            <span style={{ fontSize: 14, color: t2 }}>{isDark ? "Dark Mode" : "Light Mode"}</span>
          </div>
          <button
            className="w-12 h-6 rounded-full relative transition-all active:scale-95"
            style={{ background: isDark ? "linear-gradient(135deg, #7C3AED, #8B5CF6)" : "rgba(124,58,237,0.2)" }}
            onClick={onToggleTheme}
          >
            <div
              className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
              style={{ left: isDark ? 26 : 4, boxShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
            />
          </button>
        </div>
      </div>

      {/* Logout */}
      <button
        className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform mt-auto"
        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
        onClick={onLogout}
      >
        <LogOut size={17} className="text-red-400" />
        <span style={{ fontWeight: 600, fontSize: 15, color: "#F87171" }}>Logout</span>
      </button>
    </div>
  );
}

// ── Permission locked ─────────────────────────────────────────────────────────
function PermissionLocked({ message, onBack }: { message: string; onBack: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
      >
        <span style={{ fontSize: 26 }}>🔒</span>
      </div>
      <p style={{ color: "var(--t1)", fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Access Restricted</p>
      <p style={{ color: "var(--t3)", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
        {message}. Ask your vendor to grant you this permission.
      </p>
      <button
        className="px-6 py-3 rounded-2xl active:scale-95 transition-transform"
        style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", color: "var(--t3)", fontSize: 14 }}
        onClick={onBack}
      >
        ← Go Back
      </button>
    </div>
  );
}
