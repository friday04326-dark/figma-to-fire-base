import { useState } from "react";
import { Plus, HardHat, Phone, CheckCircle, XCircle, X, Shield, IndianRupee, Calculator, Search } from "lucide-react";

interface VendorTeamProps { onNavigate: (screen: string, data?: any) => void }

interface Technician {
  id: number; name: string; phone: string; status: "active"|"inactive";
  jobsToday: number; jobsTotal: number;
  permissions: { billing: boolean; expenses: boolean };
}

const initialTeam: Technician[] = [
  { id:1, name:"Rahul Sharma",  phone:"+91 98765 43210", status:"active",   jobsToday:2, jobsTotal:18, permissions:{ billing:false, expenses:true  } },
  { id:2, name:"Sanjay Patel",  phone:"+91 87654 32109", status:"active",   jobsToday:1, jobsTotal:12, permissions:{ billing:true,  expenses:true  } },
  { id:3, name:"Vikram Singh",  phone:"+91 76543 21098", status:"inactive", jobsToday:0, jobsTotal:7,  permissions:{ billing:false, expenses:false } },
];

export function VendorTeam({ onNavigate }: VendorTeamProps) {
  const [team, setTeam]       = useState<Technician[]>(initialTeam);
  const [editTech, setEdit]   = useState<Technician | null>(null);
  const [addOpen, setAdd]     = useState(false);
  const [newTech, setNew]     = useState({ name:"", phone:"" });
  const [search, setSearch]   = useState("");

  const filtered = team.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  const togglePerm = (techId: number, key: "billing"|"expenses") => {
    const updated = team.map(t => t.id===techId ? {...t,permissions:{...t.permissions,[key]:!t.permissions[key]}} : t);
    setTeam(updated);
    if (editTech?.id===techId) setEdit(updated.find(t=>t.id===techId)||null);
  };

  const addTechnician = () => {
    if (!newTech.name || !newTech.phone) return;
    setTeam(p => [...p, { id:p.length+1, name:newTech.name, phone:newTech.phone, status:"active", jobsToday:0, jobsTotal:0, permissions:{billing:false,expenses:false} }]);
    setNew({ name:"",phone:"" });
    setAdd(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-5 pb-4 flex-shrink-0">
        <h1 style={{ color:"var(--t1)" }}>Team Management</h1>
        <p style={{ color:"var(--t3)", fontSize:14 }}>
          {team.filter(t=>t.status==="active").length} active · {team.length} total
        </p>
      </div>

      {/* Search */}
      <div className="px-5 mb-4 flex-shrink-0">
        <div className="relative">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color:"var(--t4)" }} />
          <input type="text" placeholder="Search technicians..." value={search} onChange={e=>setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl outline-none"
            style={{ background:"var(--input-bg)", border:"1px solid var(--input-border)", fontSize:14, color:"var(--t1)" }} />
        </div>
      </div>

      {/* Permission note */}
      <div className="px-5 mb-4 flex-shrink-0">
        <div className="rounded-2xl p-3.5 flex items-start gap-3" style={{ background:"rgba(124,58,237,0.07)", border:"1px solid rgba(124,58,237,0.15)" }}>
          <Shield size={14} style={{ color:"#A78BFA", marginTop:1, flexShrink:0 }} />
          <p style={{ color:"var(--t3)", fontSize:12, lineHeight:1.5 }}>
            Control what each technician can access. Tap a card to manage permissions.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="flex flex-col gap-3">
          {filtered.map(tech => (
            <div key={tech.id}
              className="rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-transform"
              style={{ background:"var(--card-bg)", border:"1px solid var(--card-border)" }}
              onClick={() => setEdit(tech)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: tech.status==="active"?"linear-gradient(135deg,#7C3AED,#8B5CF6)":"var(--input-bg)", fontSize:16, fontWeight:700, opacity: tech.status==="active"?1:0.5, color: tech.status==="active"?"#fff":"var(--t3)" }}>
                  {tech.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p style={{ color:"var(--t1)", fontWeight:600, fontSize:14 }}>{tech.name}</p>
                    <span className="px-2 py-0.5 rounded-full"
                      style={{ fontSize:10, fontWeight:600, background: tech.status==="active"?"rgba(16,185,129,0.12)":"rgba(107,114,128,0.12)", color: tech.status==="active"?"#10b981":"#6B7280" }}>
                      {tech.status==="active" ? "● Active" : "○ Inactive"}
                    </span>
                  </div>
                  <p style={{ color:"var(--t4)", fontSize:12 }}>{tech.phone}</p>
                </div>
                <div className="text-right">
                  <p style={{ color:"var(--t1)", fontWeight:700, fontSize:16 }}>{tech.jobsToday}</p>
                  <p style={{ color:"var(--t4)", fontSize:10 }}>today</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span style={{ fontSize:11, color:"var(--t4)" }}>Access:</span>
                {(["expenses","billing"] as const).map(key => {
                  const on = tech.permissions[key];
                  const label = key==="expenses" ? "Expenses" : "Billing";
                  return (
                    <span key={key} className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                      style={{ fontSize:10, fontWeight:500, background: on?"rgba(124,58,237,0.12)":"rgba(107,114,128,0.1)", color: on?"#A78BFA":"var(--t4)", border:`1px solid ${on?"rgba(124,58,237,0.2)":"rgba(107,114,128,0.15)"}` }}>
                      {on ? <CheckCircle size={9} /> : <XCircle size={9} />}
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button className="absolute bottom-24 right-5 w-14 h-14 rounded-2xl flex items-center justify-center active:scale-90 transition-transform z-10"
        style={{ background:"linear-gradient(135deg,#7C3AED,#8B5CF6)", boxShadow:"0 4px 24px rgba(124,58,237,0.45)" }}
        onClick={() => setAdd(true)}>
        <Plus size={24} style={{ color:"#fff" }} />
      </button>

      {/* Edit permissions modal */}
      {editTech && (
        <div className="absolute inset-0 flex items-end z-20" style={{ background:"var(--overlay)", backdropFilter:"blur(4px)" }} onClick={()=>setEdit(null)}>
          <div className="w-full rounded-t-3xl p-6" style={{ background:"var(--card-solid)" }} onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background:"linear-gradient(135deg,#7C3AED,#8B5CF6)", fontSize:15, fontWeight:700 }}>
                  {editTech.name.charAt(0)}
                </div>
                <div>
                  <p style={{ color:"var(--t1)", fontWeight:700, fontSize:15 }}>{editTech.name}</p>
                  <p style={{ color:"var(--t4)", fontSize:12 }}>{editTech.phone}</p>
                </div>
              </div>
              <button onClick={()=>setEdit(null)}><X size={18} style={{ color:"var(--t3)" }} /></button>
            </div>

            <p style={{ color:"var(--t3)", fontSize:13, marginBottom:16 }}>Manage Access Permissions</p>

            {(["expenses","billing"] as const).map(key => {
              const on = editTech.permissions[key];
              const label = key==="expenses" ? "Expense Calculator" : "Bill Generation";
              const desc  = key==="expenses" ? "Can log materials & calculate costs" : "Can generate & send bills";
              const Icon  = key==="expenses" ? Calculator : IndianRupee;
              const accent = on ? "#7C3AED" : "var(--t4)";
              return (
                <div key={key}
                  className="flex items-center gap-4 p-4 rounded-2xl mb-3 cursor-pointer active:scale-[0.98] transition-transform"
                  style={{ background: on?"rgba(124,58,237,0.1)":"var(--input-bg)", border:`1px solid ${on?"rgba(124,58,237,0.25)":"var(--input-border)"}` }}
                  onClick={()=>togglePerm(editTech.id, key)}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: on?"rgba(124,58,237,0.2)":"var(--input-bg)" }}>
                    <Icon size={17} style={{ color: accent }} />
                  </div>
                  <div className="flex-1">
                    <p style={{ color:"var(--t1)", fontWeight:600, fontSize:14 }}>{label}</p>
                    <p style={{ color:"var(--t3)", fontSize:12 }}>{desc}</p>
                  </div>
                  <div className="w-11 h-6 rounded-full relative transition-all flex-shrink-0"
                    style={{ background: on?"linear-gradient(135deg,#7C3AED,#8B5CF6)":"rgba(255,255,255,0.1)" }}>
                    <div className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
                      style={{ left: on?24:4, boxShadow:"0 1px 4px rgba(0,0,0,0.4)" }} />
                  </div>
                </div>
              );
            })}

            <button className="w-full py-3.5 rounded-2xl active:scale-95 transition-transform mt-2"
              style={{ background:"linear-gradient(135deg,#7C3AED,#8B5CF6)", color:"#fff", fontWeight:600, fontSize:15 }}
              onClick={()=>setEdit(null)}>
              Save Permissions
            </button>
          </div>
        </div>
      )}

      {/* Add technician modal */}
      {addOpen && (
        <div className="absolute inset-0 flex items-end z-20" style={{ background:"var(--overlay)", backdropFilter:"blur(4px)" }} onClick={()=>setAdd(false)}>
          <div className="w-full rounded-t-3xl p-6" style={{ background:"var(--card-solid)" }} onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <p style={{ color:"var(--t1)", fontWeight:700, fontSize:16 }}>Add Technician</p>
              <button onClick={()=>setAdd(false)}><X size={18} style={{ color:"var(--t3)" }} /></button>
            </div>
            <div className="flex flex-col gap-3">
              {[{ k:"name",label:"Full Name",ph:"Technician name",icon:<HardHat size={14} style={{color:"var(--t4)"}} /> },
                { k:"phone",label:"Phone",ph:"+91 98765 43210",icon:<Phone size={14} style={{color:"var(--t4)"}} /> }].map(({k,label,ph,icon})=>(
                <div key={k}>
                  <label style={{ display:"block", color:"var(--t3)", fontSize:12, marginBottom:6 }}>{label}</label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2">{icon}</div>
                    <input type={k==="phone"?"tel":"text"} placeholder={ph} value={newTech[k as keyof typeof newTech]}
                      onChange={e=>setNew(f=>({...f,[k]:e.target.value}))}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl outline-none"
                      style={{ background:"var(--input-bg)", border:"1px solid var(--input-border)", fontSize:14, color:"var(--t1)" }} />
                  </div>
                </div>
              ))}
              <p style={{ color:"var(--t4)", fontSize:11 }}>
                Company code <span style={{ color:"#A78BFA" }}>CCTV001</span> will be shared with the technician to register.
              </p>
              <button className="w-full py-4 rounded-2xl active:scale-95 transition-transform"
                style={{ background:"linear-gradient(135deg,#7C3AED,#8B5CF6)", color:"#fff", fontWeight:600, fontSize:15, boxShadow:"0 4px 20px rgba(124,58,237,0.38)" }}
                onClick={addTechnician}>
                Add to Team
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
