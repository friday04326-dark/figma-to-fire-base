import { useState } from "react";
import { Plus, Clock, CheckCircle, AlertCircle, Camera, UserCheck, X, ChevronDown } from "lucide-react";

interface VendorWorksProps { onNavigate: (screen: string, data?: any) => void }

const technicians = [
  { id: 1, name: "Rahul Sharma", status: "active" },
  { id: 2, name: "Sanjay Patel", status: "active" },
  { id: 3, name: "Vikram Singh", status: "inactive" },
];

const initialWorks = [
  { id: 1, customer: "Al-Farooq Mart",    type: "Camera Installation", deadline: "Today, 3 PM",    status: "In Progress", techId: 1,    cameras: 8,  address: "MG Road, Bengaluru"       },
  { id: 2, customer: "Ravi Steel Works",  type: "DVR Replacement",     deadline: "Tomorrow, 11 AM", status: "Pending",     techId: null, cameras: 4,  address: "Industrial Area, Pune"     },
  { id: 3, customer: "Green Valley Hotel",type: "4Ch Setup + PTZ",      deadline: "Jun 1, 2026",     status: "Pending",     techId: null, cameras: 16, address: "Linking Road, Mumbai"      },
  { id: 4, customer: "Metro Garage",      type: "Annual Maintenance",  deadline: "Jun 5, 2026",     status: "In Progress", techId: 1,    cameras: 6,  address: "Sector 18, Noida"          },
  { id: 5, customer: "City Pharmacy",     type: "NVR Upgrade",         deadline: "Jun 10, 2026",    status: "Pending",     techId: null, cameras: 2,  address: "Park Street, Kolkata"      },
  { id: 6, customer: "Sunrise School",    type: "New Installation",    deadline: "May 30, 2026",    status: "Completed",   techId: 2,    cameras: 12, address: "Anna Salai, Chennai"       },
];

const statusCfg: Record<string, { color: string; bg: string; border: string; icon: any }> = {
  "Pending":     { color: "#FBBF24", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.25)",  icon: Clock        },
  "In Progress": { color: "#60A5FA", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)",  icon: AlertCircle  },
  "Completed":   { color: "#34D399", bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.25)",  icon: CheckCircle  },
};

const FILTERS = ["All", "Pending", "In Progress", "Completed"];

export function VendorWorks({ onNavigate }: VendorWorksProps) {
  const [works, setWorks]     = useState(initialWorks);
  const [filter, setFilter]   = useState("All");
  const [assignId, setAssignId] = useState<number | null>(null);
  const [createOpen, setCreate] = useState(false);
  const [newWork, setNewWork]   = useState({ customer: "", type: "", deadline: "", cameras: "" });

  const filtered = works.filter(w => filter === "All" || w.status === filter);
  const counts: Record<string,number> = {
    All: works.length,
    Pending: works.filter(w=>w.status==="Pending").length,
    "In Progress": works.filter(w=>w.status==="In Progress").length,
    Completed: works.filter(w=>w.status==="Completed").length,
  };

  const assignTech = (workId: number, techId: number) => {
    setWorks(p => p.map(w => w.id === workId ? {...w, techId, status: "In Progress"} : w));
    setAssignId(null);
  };

  const createWork = () => {
    if (!newWork.customer || !newWork.type) return;
    setWorks(p => [{
      id: p.length+1, customer: newWork.customer, type: newWork.type,
      deadline: newWork.deadline || "TBD", status: "Pending",
      techId: null, cameras: parseInt(newWork.cameras)||1, address: "—",
    }, ...p]);
    setNewWork({ customer:"",type:"",deadline:"",cameras:"" });
    setCreate(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-5 pb-4 flex-shrink-0">
        <h1 style={{ color: "var(--t1)" }}>Work Orders</h1>
        <p style={{ color: "var(--t3)", fontSize: 14 }}>{counts.Pending} pending · {counts["In Progress"]} in progress</p>
      </div>

      {/* Filter pills */}
      <div className="px-5 mb-4 flex-shrink-0 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {FILTERS.map(f => (
          <button
            key={f}
            className="flex-shrink-0 px-4 py-2 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all"
            style={{
              background: filter===f ? "linear-gradient(135deg,#7C3AED,#8B5CF6)" : "var(--card-bg)",
              border:     filter===f ? "none" : "1px solid var(--card-border)",
              fontSize:12, fontWeight:500, color: filter===f ? "#fff" : "var(--t3)",
              boxShadow: filter===f ? "0 2px 12px rgba(124,58,237,0.35)" : "none",
            }}
            onClick={() => setFilter(f)}
          >
            {f}
            <span className="px-1.5 py-0.5 rounded-full"
              style={{ fontSize:10, background: filter===f?"rgba(255,255,255,0.22)":"rgba(124,58,237,0.15)", color: filter===f?"#fff":"#A78BFA", fontWeight:600 }}>
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      {/* Works list */}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="flex flex-col gap-3">
          {filtered.map(work => {
            const cfg = statusCfg[work.status];
            const StatusIcon = cfg.icon;
            const tech = technicians.find(t => t.id === work.techId);
            return (
              <div key={work.id} className="rounded-2xl p-4" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,58,237,0.12)" }}>
                    <Camera size={16} style={{ color: "#A78BFA" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ color:"var(--t1)", fontWeight:600, fontSize:14 }}>{work.customer}</p>
                    <p style={{ color:"var(--t3)", fontSize:12 }}>{work.type} · {work.cameras} cams</p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border flex-shrink-0"
                    style={{ fontSize:10, fontWeight:500, background:cfg.bg, color:cfg.color, borderColor:cfg.border }}>
                    <StatusIcon size={9} style={{ color: cfg.color }} />
                    {work.status}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 mb-3">
                  <Clock size={11} style={{ color:"var(--t4)" }} />
                  <span style={{ color:"var(--t3)", fontSize:11 }}>{work.deadline}</span>
                </div>

                {/* Assign row */}
                <div
                  className="rounded-xl px-3 py-2.5 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
                  style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)" }}
                  onClick={() => work.status !== "Completed" && setAssignId(work.id)}
                >
                  <div className="flex items-center gap-2">
                    <UserCheck size={13} style={{ color: tech ? "#A78BFA" : "var(--t4)" }} />
                    <span style={{ fontSize:12, color: tech ? "var(--t2)" : "var(--t4)" }}>
                      {tech ? tech.name : "Tap to assign technician"}
                    </span>
                  </div>
                  {work.status !== "Completed" && <ChevronDown size={13} style={{ color:"var(--t4)" }} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAB */}
      <button
        className="absolute bottom-24 right-5 w-14 h-14 rounded-2xl flex items-center justify-center active:scale-90 transition-transform z-10"
        style={{ background: "linear-gradient(135deg,#7C3AED,#8B5CF6)", boxShadow: "0 4px 24px rgba(124,58,237,0.45)" }}
        onClick={() => setCreate(true)}
      >
        <Plus size={24} style={{ color: "#fff" }} />
      </button>

      {/* Assign modal */}
      {assignId !== null && (
        <div className="absolute inset-0 flex items-end z-20" style={{ background: "var(--overlay)", backdropFilter: "blur(4px)" }}
          onClick={() => setAssignId(null)}>
          <div className="w-full rounded-t-3xl p-6" style={{ background: "var(--card-solid)" }} onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <p style={{ color:"var(--t1)", fontWeight:700, fontSize:16 }}>Assign Technician</p>
              <button onClick={() => setAssignId(null)}><X size={18} style={{ color:"var(--t3)" }} /></button>
            </div>
            <div className="flex flex-col gap-3">
              {technicians.map(tech => (
                <button key={tech.id}
                  className="flex items-center gap-3 p-4 rounded-2xl active:scale-95 transition-transform text-left"
                  style={{ background:"var(--input-bg)", border:"1px solid var(--input-border)", opacity: tech.status==="active"?1:0.4 }}
                  disabled={tech.status!=="active"}
                  onClick={() => tech.status==="active" && assignTech(assignId!, tech.id)}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                    style={{ background:"linear-gradient(135deg,#7C3AED,#8B5CF6)", fontSize:15, fontWeight:700 }}>
                    {tech.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ color:"var(--t1)", fontWeight:600, fontSize:14 }}>{tech.name}</p>
                    <p style={{ fontSize:12, color: tech.status==="active"?"#10b981":"var(--t3)" }}>
                      {tech.status==="active" ? "● Available" : "○ Inactive"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create work modal */}
      {createOpen && (
        <div className="absolute inset-0 flex items-end z-20" style={{ background: "var(--overlay)", backdropFilter: "blur(4px)" }}
          onClick={() => setCreate(false)}>
          <div className="w-full rounded-t-3xl p-6" style={{ background: "var(--card-solid)" }} onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <p style={{ color:"var(--t1)", fontWeight:700, fontSize:16 }}>Create Work Order</p>
              <button onClick={() => setCreate(false)}><X size={18} style={{ color:"var(--t3)" }} /></button>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { k:"customer",  label:"Customer",      ph:"Customer name"          },
                { k:"type",      label:"Work Type",     ph:"e.g. Camera Installation" },
                { k:"deadline",  label:"Deadline",      ph:"e.g. Jun 15, 2026"      },
                { k:"cameras",   label:"No. of Cameras",ph:"e.g. 8"                },
              ].map(({ k,label,ph }) => (
                <div key={k}>
                  <label style={{ display:"block", color:"var(--t3)", fontSize:12, marginBottom:6 }}>{label}</label>
                  <input
                    type={k==="cameras"?"number":"text"}
                    placeholder={ph}
                    value={newWork[k as keyof typeof newWork]}
                    onChange={e => setNewWork(f=>({...f,[k]:e.target.value}))}
                    className="w-full px-4 py-3 rounded-xl outline-none"
                    style={{ background:"var(--input-bg)", border:"1px solid var(--input-border)", fontSize:14, color:"var(--t1)" }}
                  />
                </div>
              ))}
              <button
                className="w-full py-4 rounded-2xl active:scale-95 transition-transform mt-1"
                style={{ background:"linear-gradient(135deg,#7C3AED,#8B5CF6)", color:"#fff", fontWeight:600, fontSize:15, boxShadow:"0 4px 20px rgba(124,58,237,0.38)" }}
                onClick={createWork}
              >
                Create Work Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
