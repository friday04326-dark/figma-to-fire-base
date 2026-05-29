import { useState } from "react";
import { ArrowLeft, MapPin, Camera, Clock, Plus, Trash2, CheckCircle, PlayCircle, IndianRupee, Lock } from "lucide-react";

interface TechJobDetailProps {
  job: any;
  permissions: { billing: boolean; expenses: boolean };
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}
interface Material { id: number; name: string; qty: string; price: string }

export function TechJobDetail({ job, permissions, onBack, onNavigate }: TechJobDetailProps) {
  const [status,    setStatus]    = useState<"Pending"|"In Progress"|"Completed">(job?.status || "Pending");
  const [hours,     setHours]     = useState(String(job?.hoursLogged || "0"));
  const [notes,     setNotes]     = useState("");
  const [materials, setMaterials] = useState<Material[]>([
    { id:1, name:"2MP Dome Camera", qty:"4", price:"1200" },
    { id:2, name:"CCTV Cable (100m)", qty:"1", price:"800" },
  ]);
  const [nextId, setNextId] = useState(3);
  const [saved,  setSaved]  = useState(false);

  if (!job) return null;

  const addMaterial = () => { setMaterials(p=>[...p,{id:nextId,name:"",qty:"1",price:""}]); setNextId(n=>n+1); };
  const updMaterial = (id:number, k:keyof Material, v:string) => setMaterials(p=>p.map(m=>m.id===id?{...m,[k]:v}:m));
  const delMaterial = (id:number) => setMaterials(p=>p.filter(m=>m.id!==id));
  const total = materials.reduce((s,m)=>(parseFloat(m.qty)||0)*(parseFloat(m.price)||0)+s, 0);

  const statusFlow = ["Pending","In Progress","Completed"] as const;
  const statusColor: Record<string,string> = { Pending:"#FBBF24","In Progress":"#60A5FA",Completed:"#34D399" };

  const handleSave = () => { setSaved(true); setTimeout(()=>setSaved(false),2000); };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 flex-shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <button className="w-10 h-10 rounded-xl flex items-center justify-center active:scale-90 transition-transform"
            style={{ background:"var(--card-bg)", border:"1px solid var(--card-border)" }} onClick={onBack}>
            <ArrowLeft size={18} style={{ color:"var(--t1)" }} />
          </button>
          <div className="flex-1">
            <p style={{ color:"var(--t1)", fontWeight:700, fontSize:16 }}>{job.customer}</p>
            <p style={{ color:"var(--t3)", fontSize:13 }}>{job.type}</p>
          </div>
          <div className="px-3 py-1.5 rounded-xl"
            style={{ background:`${statusColor[status]}18`, border:`1px solid ${statusColor[status]}35` }}>
            <span style={{ fontSize:11, fontWeight:600, color:statusColor[status] }}>{status}</span>
          </div>
        </div>

        {/* Job info */}
        <div className="rounded-2xl p-3.5 flex flex-col gap-2" style={{ background:"var(--card-bg)", border:"1px solid var(--card-border)" }}>
          <div className="flex items-center gap-2">
            <MapPin size={12} style={{ color:"var(--t4)", flexShrink:0 }} />
            <span style={{ color:"var(--t3)", fontSize:13 }}>{job.address}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Camera size={11} style={{ color:"var(--t4)" }} />
              <span style={{ color:"var(--t3)", fontSize:12 }}>{job.cameras} cameras</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={11} style={{ color:"var(--t4)" }} />
              <span style={{ color:"var(--t3)", fontSize:12 }}>{job.deadline}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Status update */}
        <div className="mb-5">
          <p style={{ fontSize:12, fontWeight:600, color:"var(--t3)", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:12 }}>Update Status</p>
          <div className="flex gap-2">
            {statusFlow.map((s, i) => {
              const isActive = s === status;
              const isPast   = i < statusFlow.indexOf(status);
              return (
                <button key={s} className="flex-1 py-3 rounded-xl text-center transition-all active:scale-95"
                  style={{
                    background: isActive?`${statusColor[s]}20`:isPast?"rgba(16,185,129,0.08)":"var(--input-bg)",
                    border:`1px solid ${isActive?`${statusColor[s]}40`:isPast?"rgba(16,185,129,0.15)":"var(--input-border)"}`,
                    fontSize:11, fontWeight: isActive?700:500,
                    color: isActive?statusColor[s]:isPast?"#34D399":"var(--t3)",
                  }}
                  onClick={()=>setStatus(s)}
                >
                  {s==="Completed"?"✓ Done":s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hours worked */}
        <div className="mb-5">
          <p style={{ fontSize:12, fontWeight:600, color:"var(--t3)", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:12 }}>Hours Worked</p>
          <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background:"var(--card-bg)", border:"1px solid var(--card-border)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:"rgba(124,58,237,0.12)" }}>
              <Clock size={16} style={{ color:"#A78BFA" }} />
            </div>
            <div className="flex-1">
              <p style={{ color:"var(--t3)", fontSize:12 }}>Total hours on site</p>
              <div className="flex items-center gap-1 mt-0.5">
                <input type="number" min="0" step="0.5" value={hours} onChange={e=>setHours(e.target.value)}
                  className="outline-none bg-transparent"
                  style={{ fontSize:20, fontWeight:700, color:"var(--t1)", width:60 }} />
                <span style={{ fontSize:14, color:"var(--t3)" }}>hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Materials */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <p style={{ fontSize:12, fontWeight:600, color:"var(--t3)", letterSpacing:"0.06em", textTransform:"uppercase" }}>Materials Used</p>
            {permissions.expenses ? (
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl active:scale-95 transition-transform"
                style={{ background:"rgba(124,58,237,0.15)", border:"1px solid rgba(124,58,237,0.25)", fontSize:11, color:"#A78BFA", fontWeight:500 }}
                onClick={addMaterial}>
                <Plus size={11} /> Add Item
              </button>
            ) : (
              <div className="flex items-center gap-1" style={{ color:"var(--t4)", fontSize:11 }}>
                <Lock size={10} /><span>No access</span>
              </div>
            )}
          </div>

          {!permissions.expenses ? (
            <div className="rounded-2xl p-5 flex flex-col items-center gap-2"
              style={{ background:"var(--input-bg)", border:"1px dashed var(--input-border)" }}>
              <Lock size={20} style={{ color:"var(--t4)" }} />
              <p style={{ color:"var(--t3)", fontSize:13 }}>Expense logging not permitted</p>
              <p style={{ color:"var(--t4)", fontSize:11 }}>Ask your vendor to enable this access</p>
            </div>
          ) : (
            <>
              <div className="grid gap-2 mb-2 px-1" style={{ gridTemplateColumns:"1fr 50px 72px 28px" }}>
                {["Item","Qty","Price ₹",""].map(h=>(
                  <span key={h} style={{ fontSize:10, color:"var(--t4)" }}>{h}</span>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {materials.map(m => {
                  const line = (parseFloat(m.qty)||0)*(parseFloat(m.price)||0);
                  return (
                    <div key={m.id} className="rounded-xl p-3" style={{ background:"var(--card-bg)", border:"1px solid var(--card-border)" }}>
                      <div className="grid gap-2 items-center" style={{ gridTemplateColumns:"1fr 50px 72px 28px" }}>
                        <input type="text" placeholder="Item name" value={m.name} onChange={e=>updMaterial(m.id,"name",e.target.value)}
                          className="outline-none bg-transparent truncate"
                          style={{ fontSize:12, fontWeight:500, color:"var(--t1)" }} />
                        <input type="number" min="1" value={m.qty} onChange={e=>updMaterial(m.id,"qty",e.target.value)}
                          className="outline-none rounded-lg px-2 py-1 text-center"
                          style={{ fontSize:12, background:"var(--input-bg)", border:"1px solid var(--input-border)", color:"var(--t1)" }} />
                        <input type="number" min="0" placeholder="0" value={m.price} onChange={e=>updMaterial(m.id,"price",e.target.value)}
                          className="outline-none rounded-lg px-2 py-1"
                          style={{ fontSize:12, background:"var(--input-bg)", border:"1px solid var(--input-border)", color:"var(--t1)" }} />
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ background:"rgba(239,68,68,0.1)" }} onClick={()=>delMaterial(m.id)}>
                          <Trash2 size={11} className="text-red-400" />
                        </button>
                      </div>
                      {line>0 && <p style={{ color:"#A78BFA", fontSize:10, textAlign:"right", marginTop:4 }}>= ₹{line.toLocaleString("en-IN")}</p>}
                    </div>
                  );
                })}
                {total > 0 && (
                  <div className="rounded-xl px-4 py-3 flex items-center justify-between"
                    style={{ background:"rgba(124,58,237,0.08)", border:"1px solid rgba(124,58,237,0.15)" }}>
                    <span style={{ color:"var(--t3)", fontSize:13 }}>Materials Total</span>
                    <span style={{ color:"#A78BFA", fontWeight:700, fontSize:15 }}>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Notes */}
        <div className="mb-5">
          <p style={{ fontSize:12, fontWeight:600, color:"var(--t3)", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:10 }}>Site Notes</p>
          <textarea placeholder="Any observations, issues, or instructions from the site..." value={notes}
            onChange={e=>setNotes(e.target.value)} rows={3}
            className="w-full px-4 py-3.5 rounded-2xl outline-none resize-none"
            style={{ background:"var(--input-bg)", border:"1px solid var(--input-border)", fontSize:13, color:"var(--t1)" }} />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
            style={{ background:"linear-gradient(135deg,#7C3AED,#8B5CF6)", boxShadow:"0 4px 20px rgba(124,58,237,0.38)", color:"#fff", fontWeight:600, fontSize:15 }}
            onClick={handleSave}>
            {saved ? <><CheckCircle size={17} style={{color:"#fff"}} /><span>Saved!</span></> : <><PlayCircle size={17} style={{color:"#fff"}} /><span>Save Progress</span></>}
          </button>

          {permissions.billing && (
            <button className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
              style={{ background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.25)" }}
              onClick={()=>onNavigate("t-bills")}>
              <IndianRupee size={17} className="text-emerald-400" />
              <span style={{ color:"#34D399", fontWeight:600, fontSize:15 }}>Generate Bill</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
