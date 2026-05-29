import { useState } from "react";
import { Plus, Trash2, Calculator, IndianRupee } from "lucide-react";

interface ExpenseCalculatorProps { onNavigate: (screen: string, data?: any) => void }
interface Component { id: number; name: string; qty: string; price: string }

export function ExpenseCalculator({ onNavigate }: ExpenseCalculatorProps) {
  const [components, setComponents] = useState<Component[]>([
    { id:1, name:"2MP Dome Camera",    qty:"4", price:"1200" },
    { id:2, name:"4CH DVR",            qty:"1", price:"3500" },
    { id:3, name:"CCTV Cable (100m)",  qty:"2", price:"800"  },
  ]);
  const [labor, setLabor] = useState("2000");
  const [nextId, setNextId] = useState(4);

  const addComp  = () => { setComponents(p=>[...p,{id:nextId,name:"",qty:"1",price:""}]); setNextId(n=>n+1); };
  const delComp  = (id:number) => setComponents(p=>p.filter(c=>c.id!==id));
  const updComp  = (id:number, k:keyof Component, v:string) => setComponents(p=>p.map(c=>c.id===id?{...c,[k]:v}:c));

  const compTotal   = components.reduce((s,c)=>(parseFloat(c.qty)||0)*(parseFloat(c.price)||0)+s, 0);
  const laborCharge = parseFloat(labor)||0;
  const grandTotal  = compTotal + laborCharge;
  const fmt = (n:number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-5 pb-4 flex-shrink-0">
        <h1 style={{ color:"var(--t1)" }}>Expense Calculator</h1>
        <p style={{ color:"var(--t3)", fontSize:14 }}>Estimate job cost</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Components section */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <p style={{ fontSize:12, fontWeight:600, color:"var(--t3)", letterSpacing:"0.06em", textTransform:"uppercase" }}>Components</p>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl active:scale-95 transition-transform"
              style={{ background:"rgba(124,58,237,0.15)", border:"1px solid rgba(124,58,237,0.25)", fontSize:12, color:"#A78BFA", fontWeight:500 }}
              onClick={addComp}>
              <Plus size={12}/> Add Item
            </button>
          </div>

          <div className="grid gap-2 mb-2 px-1" style={{ gridTemplateColumns:"1fr 52px 80px 32px" }}>
            {["Item","Qty","Price (₹)",""].map(h=><span key={h} style={{ fontSize:11, color:"var(--t4)" }}>{h}</span>)}
          </div>

          <div className="flex flex-col gap-2">
            {components.map(c => {
              const line = (parseFloat(c.qty)||0)*(parseFloat(c.price)||0);
              return (
                <div key={c.id} className="rounded-2xl p-3" style={{ background:"var(--card-bg)", border:"1px solid var(--card-border)" }}>
                  <div className="grid gap-2 items-center" style={{ gridTemplateColumns:"1fr 52px 80px 32px" }}>
                    <input type="text" placeholder="Component name" value={c.name} onChange={e=>updComp(c.id,"name",e.target.value)}
                      className="outline-none bg-transparent truncate"
                      style={{ fontSize:13, fontWeight:500, color:"var(--t1)" }} />
                    <input type="number" min="1" value={c.qty} onChange={e=>updComp(c.id,"qty",e.target.value)}
                      className="outline-none rounded-lg px-2 py-1.5 text-center"
                      style={{ fontSize:13, background:"var(--input-bg)", border:"1px solid var(--input-border)", color:"var(--t1)" }} />
                    <input type="number" min="0" placeholder="0" value={c.price} onChange={e=>updComp(c.id,"price",e.target.value)}
                      className="outline-none rounded-lg px-2 py-1.5"
                      style={{ fontSize:13, background:"var(--input-bg)", border:"1px solid var(--input-border)", color:"var(--t1)" }} />
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background:"rgba(239,68,68,0.1)" }} onClick={()=>delComp(c.id)}>
                      <Trash2 size={13} className="text-red-400" />
                    </button>
                  </div>
                  {line>0 && <p style={{ color:"#A78BFA", fontSize:11, textAlign:"right", marginTop:4 }}>= {fmt(line)}</p>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Labor */}
        <div className="mb-5">
          <p style={{ fontSize:12, fontWeight:600, color:"var(--t3)", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:12 }}>Labor Charge</p>
          <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background:"var(--card-bg)", border:"1px solid var(--card-border)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:"rgba(124,58,237,0.15)" }}>
              <IndianRupee size={16} style={{ color:"#A78BFA" }} />
            </div>
            <div className="flex-1">
              <p style={{ color:"var(--t3)", fontSize:12 }}>Labor & Miscellaneous</p>
              <div className="flex items-center mt-0.5">
                <span style={{ color:"var(--t3)", fontSize:16, marginRight:4 }}>₹</span>
                <input type="number" min="0" value={labor} onChange={e=>setLabor(e.target.value)}
                  className="outline-none bg-transparent flex-1"
                  style={{ fontSize:18, fontWeight:700, color:"var(--t1)" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Cost summary */}
        <div className="rounded-2xl p-5 mb-5"
          style={{ background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.2)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Calculator size={16} style={{ color:"#A78BFA" }} />
            <p style={{ color:"#A78BFA", fontWeight:600, fontSize:14 }}>Cost Summary</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span style={{ color:"var(--t3)", fontSize:14 }}>Components</span>
              <span style={{ color:"var(--t1)", fontWeight:600, fontSize:14 }}>{fmt(compTotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span style={{ color:"var(--t3)", fontSize:14 }}>Labor</span>
              <span style={{ color:"var(--t1)", fontWeight:600, fontSize:14 }}>{fmt(laborCharge)}</span>
            </div>
            <div className="h-px my-1" style={{ background:"rgba(124,58,237,0.2)" }} />
            <div className="flex items-center justify-between">
              <span style={{ color:"var(--t1)", fontWeight:700, fontSize:16 }}>Grand Total</span>
              <span style={{ fontWeight:800, fontSize:22, background:"linear-gradient(90deg,#7C3AED,#8B5CF6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                {fmt(grandTotal)}
              </span>
            </div>
          </div>
        </div>

        <button
          className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
          style={{ background:"linear-gradient(135deg,#7C3AED,#8B5CF6)", boxShadow:"0 4px 24px rgba(124,58,237,0.38)", color:"#fff", fontWeight:600, fontSize:15 }}
          onClick={() => onNavigate("bills")}>
          <IndianRupee size={18} style={{ color:"#fff" }} />
          Generate Bill
        </button>
      </div>
    </div>
  );
}
