import { Users, Clock, IndianRupee, ChevronRight, Camera, HardHat, Plus } from "lucide-react";

interface VendorDashboardProps {
  userName: string;
  onNavigate: (screen: string, data?: any) => void;
}

const recentWorks = [
  { id: 1, customer: "Al-Farooq Mart",   type: "Camera Installation", tech: "Rahul",  status: "In Progress" },
  { id: 2, customer: "Ravi Steel Works", type: "DVR Replacement",     tech: null,     status: "Pending"     },
  { id: 3, customer: "City Pharmacy",    type: "Cable Routing",       tech: "Sanjay", status: "Completed"   },
  { id: 4, customer: "Metro Garage",     type: "Annual Maintenance",  tech: "Rahul",  status: "In Progress" },
];

const statusPill: Record<string, { bg: string; color: string; border: string }> = {
  "In Progress": { bg: "rgba(59,130,246,0.15)", color: "#60A5FA", border: "rgba(59,130,246,0.3)" },
  "Pending":     { bg: "rgba(245,158,11,0.15)", color: "#FBBF24", border: "rgba(245,158,11,0.3)" },
  "Completed":   { bg: "rgba(16,185,129,0.15)", color: "#34D399", border: "rgba(16,185,129,0.3)" },
};

export function VendorDashboard({ userName, onNavigate }: VendorDashboardProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Greeting */}
      <div className="px-5 pt-5 pb-4">
        <h1 style={{ color: "var(--t1)", fontSize: 20 }}>Welcome, {userName.split(" ")[0]} 👋</h1>
        <p style={{ color: "var(--t3)", fontSize: 13 }}>Wednesday, 27 May 2026</p>
      </div>

      {/* Stats */}
      <div className="px-5 grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Customers", value: "24", icon: Users,       accent: "#7C3AED", bg: "rgba(124,58,237,0.15)", border: "rgba(124,58,237,0.25)", screen: "v-customers" },
          { label: "Pending",   value: "7",  icon: Clock,       accent: "#F59E0B", bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.25)",  screen: "v-works"     },
          { label: "This Month",value: "₹84k",icon: IndianRupee,accent: "#10B981", bg: "rgba(16,185,129,0.15)",border: "rgba(16,185,129,0.25)",  screen: "v-bills"     },
        ].map(({ label, value, icon: Icon, accent, bg, border, screen }) => (
          <div
            key={label}
            className="rounded-2xl p-3.5 flex flex-col gap-2 cursor-pointer active:scale-95 transition-transform"
            style={{ background: bg, border: `1px solid ${border}` }}
            onClick={() => onNavigate(screen)}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${accent}22` }}>
              <Icon size={15} style={{ color: accent }} />
            </div>
            <div>
              <p style={{ color: "var(--t1)", fontWeight: 700, fontSize: 19, lineHeight: 1 }}>{value}</p>
              <p style={{ color: "var(--t3)", fontSize: 10, marginTop: 4 }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Team overview card */}
      <div className="px-5 mb-5">
        <div
          className="rounded-2xl p-4 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
          style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
          onClick={() => onNavigate("v-team")}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(124,58,237,0.15)" }}>
              <HardHat size={18} style={{ color: "#A78BFA" }} />
            </div>
            <div>
              <p style={{ color: "var(--t1)", fontWeight: 600, fontSize: 14 }}>Your Team</p>
              <p style={{ color: "var(--t3)", fontSize: 12 }}>3 technicians · 2 active today</p>
            </div>
          </div>
          <ChevronRight size={16} style={{ color: "var(--t4)" }} />
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-5 mb-5">
        <p style={{ color: "var(--t3)", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
          Quick Actions
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            className="rounded-2xl p-4 flex items-center gap-3 active:scale-95 transition-transform text-left"
            style={{ background: "linear-gradient(135deg,#7C3AED,#8B5CF6)", boxShadow: "0 4px 20px rgba(124,58,237,0.38)" }}
            onClick={() => onNavigate("v-add-customer")}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
              <Plus size={18} style={{ color: "#fff" }} />
            </div>
            <span style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>Add Customer</span>
          </button>
          <button
            className="rounded-2xl p-4 flex items-center gap-3 active:scale-95 transition-transform text-left"
            style={{ background: "var(--card-bg)", border: "1px solid rgba(124,58,237,0.2)" }}
            onClick={() => onNavigate("v-works")}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,58,237,0.15)" }}>
              <Camera size={18} style={{ color: "#A78BFA" }} />
            </div>
            <span style={{ color: "var(--t1)", fontWeight: 600, fontSize: 13 }}>Create Work</span>
          </button>
        </div>
      </div>

      {/* Recent works */}
      <div className="px-5 pb-6">
        <div className="flex items-center justify-between mb-3">
          <p style={{ color: "var(--t3)", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Recent Works
          </p>
          <button className="flex items-center gap-1" style={{ color: "#A78BFA", fontSize: 13 }} onClick={() => onNavigate("v-works")}>
            See all <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {recentWorks.map((w) => {
            const sp = statusPill[w.status];
            return (
              <div
                key={w.id}
                className="rounded-2xl p-4 flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform"
                style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
                onClick={() => onNavigate("v-works")}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,58,237,0.12)" }}>
                  <Camera size={16} style={{ color: "#A78BFA" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ color: "var(--t1)", fontWeight: 600, fontSize: 13 }} className="truncate">{w.customer}</p>
                  <p style={{ color: "var(--t3)", fontSize: 11 }} className="truncate">
                    {w.type}{w.tech ? ` · ${w.tech}` : " · Unassigned"}
                  </p>
                </div>
                <span
                  className="px-2 py-0.5 rounded-full border flex-shrink-0"
                  style={{ fontSize: 10, fontWeight: 500, background: sp.bg, color: sp.color, borderColor: sp.border }}
                >
                  {w.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
