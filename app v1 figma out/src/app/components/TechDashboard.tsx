import { Clock, CheckCircle, MapPin, ChevronRight, Camera, AlertCircle } from "lucide-react";

interface TechDashboardProps {
  userName: string;
  permissions: { billing: boolean; expenses: boolean };
  onNavigate: (screen: string, data?: any) => void;
}

const myJobs = [
  { id:1, customer:"Al-Farooq Mart", type:"Camera Installation", address:"MG Road, Bengaluru",   deadline:"Today, 3 PM",  status:"In Progress", cameras:8,  hoursLogged:2.5 },
  { id:4, customer:"Metro Garage",   type:"Annual Maintenance",  address:"Sector 18, Noida",     deadline:"Jun 5, 2026", status:"Pending",     cameras:6,  hoursLogged:0   },
];

const statusCfg: Record<string, { color: string; bg: string; border: string; icon: any }> = {
  "Pending":     { color:"#FBBF24", bg:"rgba(245,158,11,0.12)",  border:"rgba(245,158,11,0.25)",  icon:Clock        },
  "In Progress": { color:"#60A5FA", bg:"rgba(59,130,246,0.12)",  border:"rgba(59,130,246,0.25)",  icon:AlertCircle  },
  "Completed":   { color:"#34D399", bg:"rgba(16,185,129,0.12)",  border:"rgba(16,185,129,0.25)",  icon:CheckCircle  },
};

export function TechDashboard({ userName, permissions, onNavigate }: TechDashboardProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Greeting */}
      <div className="px-5 pt-5 pb-4">
        <h1 style={{ color:"var(--t1)", fontSize:20 }}>Hi, {userName.split(" ")[0]} 👷</h1>
        <p style={{ color:"var(--t3)", fontSize:13 }}>Wednesday, 27 May 2026</p>
      </div>

      {/* Stats strip */}
      <div className="px-5 grid grid-cols-3 gap-3 mb-5">
        {[
          { label:"My Jobs",  value:myJobs.length,                                          bg:"rgba(124,58,237,0.12)", border:"rgba(124,58,237,0.22)", color:"#A78BFA" },
          { label:"Today",    value:1,                                                       bg:"rgba(245,158,11,0.12)", border:"rgba(245,158,11,0.22)", color:"#FBBF24" },
          { label:"Logged",   value:`${myJobs.reduce((s,j)=>s+j.hoursLogged,0).toFixed(1)}h`, bg:"rgba(16,185,129,0.12)", border:"rgba(16,185,129,0.22)", color:"#34D399" },
        ].map(({ label, value, bg, border, color }) => (
          <div key={label} className="rounded-2xl p-3.5 flex flex-col gap-1.5" style={{ background:bg, border:`1px solid ${border}` }}>
            <p style={{ color, fontWeight:700, fontSize:20, lineHeight:1 }}>{value}</p>
            <p style={{ color:"var(--t3)", fontSize:10 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Access permissions badge */}
      <div className="px-5 mb-5">
        <div className="rounded-2xl p-3.5" style={{ background:"var(--card-bg)", border:"1px solid var(--card-border)" }}>
          <p style={{ fontSize:11, fontWeight:600, color:"var(--t3)", letterSpacing:"0.05em", textTransform:"uppercase", marginBottom:10 }}>
            Your Access
          </p>
          <div className="flex gap-2 flex-wrap">
            {[
              { label:"Expense Log", enabled:permissions.expenses },
              { label:"Billing",     enabled:permissions.billing  },
            ].map(({ label, enabled }) => (
              <span key={label} className="px-2.5 py-1 rounded-full flex items-center gap-1.5"
                style={{
                  fontSize:11, fontWeight:500,
                  background: enabled?"rgba(16,185,129,0.12)":"rgba(107,114,128,0.1)",
                  color: enabled?"#34D399":"#6B7280",
                  border:`1px solid ${enabled?"rgba(16,185,129,0.2)":"rgba(107,114,128,0.15)"}`,
                }}>
                {enabled ? <CheckCircle size={10} /> : <Clock size={10} />}
                {label}
              </span>
            ))}
            {!permissions.billing && (
              <span style={{ fontSize:10, color:"var(--t4)", alignSelf:"center" }}>· Ask vendor to enable</span>
            )}
          </div>
        </div>
      </div>

      {/* Jobs */}
      <div className="px-5 pb-6">
        <div className="flex items-center justify-between mb-3">
          <p style={{ fontSize:11, fontWeight:600, color:"var(--t3)", letterSpacing:"0.06em", textTransform:"uppercase" }}>
            My Assigned Jobs
          </p>
          <button className="flex items-center gap-1" style={{ color:"#A78BFA", fontSize:13 }} onClick={()=>onNavigate("t-jobs")}>
            See all <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {myJobs.map(job => {
            const cfg = statusCfg[job.status];
            const StatusIcon = cfg.icon;
            return (
              <div key={job.id}
                className="rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-transform"
                style={{ background:"var(--card-bg)", border:"1px solid var(--card-border)" }}
                onClick={()=>onNavigate("t-job-detail", job)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:"rgba(124,58,237,0.12)" }}>
                    <Camera size={16} style={{ color:"#A78BFA" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ color:"var(--t1)", fontWeight:600, fontSize:14 }} className="truncate">{job.customer}</p>
                    <p style={{ color:"var(--t3)", fontSize:12 }}>{job.type} · {job.cameras} cams</p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border flex-shrink-0"
                    style={{ fontSize:10, fontWeight:500, background:cfg.bg, color:cfg.color, borderColor:cfg.border }}>
                    <StatusIcon size={9} style={{ color:cfg.color }} />
                    {job.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={11} style={{ color:"var(--t4)" }} />
                    <span style={{ color:"var(--t3)", fontSize:11, maxWidth:160 }} className="truncate">{job.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={11} style={{ color:"var(--t4)" }} />
                    <span style={{ color:"var(--t3)", fontSize:11 }}>{job.hoursLogged}h logged</span>
                  </div>
                </div>

                <p style={{ color:"var(--t4)", fontSize:11, textAlign:"center", marginTop:10 }}>
                  Tap to log materials & update status →
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
