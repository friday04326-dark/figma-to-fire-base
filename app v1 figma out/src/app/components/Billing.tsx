import { useState } from "react";
import { FileText, Download, Share2, Check, Camera, Wrench, IndianRupee, Plus } from "lucide-react";

interface BillingProps { onNavigate: (screen: string, data?: any) => void }

const bills = [
  {
    id:"INV-2026-041", customer:"Al-Farooq Mart", phone:"+91 98765 43210", address:"MG Road, Bengaluru",
    date:"27 May 2026",
    items:[
      { name:"2MP Dome Camera",    qty:8, price:1200 },
      { name:"8CH DVR",            qty:1, price:6500 },
      { name:"CCTV Cable (500m)",  qty:1, price:3200 },
      { name:"Power Supply Unit",  qty:2, price:450  },
    ],
    labor:3500, status:"Paid",
  },
  {
    id:"INV-2026-040", customer:"City Pharmacy", phone:"+91 76543 21098", address:"Park Street, Kolkata",
    date:"24 May 2026",
    items:[
      { name:"2MP Bullet Camera",  qty:2, price:1100 },
      { name:"4CH DVR",            qty:1, price:3500 },
      { name:"CCTV Cable (100m)",  qty:1, price:800  },
    ],
    labor:1500, status:"Pending",
  },
];

const statusStyle = (s: string) => s === "Paid"
  ? { bg:"rgba(16,185,129,0.12)", color:"#34D399", border:"rgba(16,185,129,0.25)" }
  : { bg:"rgba(245,158,11,0.12)", color:"#FBBF24", border:"rgba(245,158,11,0.25)" };

export function Billing({ onNavigate }: BillingProps) {
  const [selected, setSelected] = useState<typeof bills[0] | null>(null);
  const [generated, setGenerated] = useState(false);
  const fmt = (n:number) => `₹${n.toLocaleString("en-IN")}`;

  if (selected) {
    const itemsTotal = selected.items.reduce((s,i)=>s+i.qty*i.price, 0);
    const grand      = itemsTotal + selected.labor;
    const ss         = statusStyle(selected.status);

    return (
      <div className="flex flex-col h-full">
        <div className="px-5 pt-5 pb-4 flex items-center gap-3 flex-shrink-0">
          <button className="w-10 h-10 rounded-xl flex items-center justify-center active:scale-90 transition-transform"
            style={{ background:"var(--card-bg)", border:"1px solid var(--card-border)" }}
            onClick={()=>{ setSelected(null); setGenerated(false); }}>
            <span style={{ color:"var(--t1)", fontSize:18 }}>←</span>
          </button>
          <div>
            <p style={{ color:"var(--t1)", fontWeight:700, fontSize:18 }}>Invoice</p>
            <p style={{ color:"var(--t3)", fontSize:13 }}>{selected.id}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-6">
          {/* Invoice card */}
          <div className="rounded-3xl overflow-hidden mb-4" style={{ background:"var(--card-solid)", border:"1px solid var(--card-border)" }}>
            {/* Invoice header */}
            <div className="px-5 py-5" style={{ background:"rgba(124,58,237,0.12)" }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:"linear-gradient(135deg,#7C3AED,#8B5CF6)" }}>
                      <Camera size={15} style={{ color:"#fff" }} />
                    </div>
                    <span style={{ color:"var(--t1)", fontWeight:700, fontSize:14 }}>CCTV Manager</span>
                  </div>
                  <p style={{ color:"#A78BFA", fontWeight:600, fontSize:13 }}>{selected.id}</p>
                  <p style={{ color:"var(--t3)", fontSize:12 }}>{selected.date}</p>
                </div>
                <span className="px-3 py-1.5 rounded-xl"
                  style={{ fontSize:11, fontWeight:600, background:ss.bg, color:ss.color, border:`1px solid ${ss.border}` }}>
                  {selected.status}
                </span>
              </div>
            </div>

            <div className="px-5 py-4">
              {/* Bill to */}
              <div className="mb-4 pb-4" style={{ borderBottom:"1px solid var(--card-border)" }}>
                <p style={{ color:"var(--t4)", fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Bill To</p>
                <p style={{ color:"var(--t1)", fontWeight:600, fontSize:14 }}>{selected.customer}</p>
                <p style={{ color:"var(--t3)", fontSize:13 }}>{selected.phone}</p>
                <p style={{ color:"var(--t3)", fontSize:13 }}>{selected.address}</p>
              </div>

              {/* Items */}
              <div className="mb-4 pb-4" style={{ borderBottom:"1px solid var(--card-border)" }}>
                <p style={{ color:"var(--t4)", fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:12 }}>Items</p>
                <div className="flex flex-col gap-2.5">
                  {selected.items.map((item,i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex-1 min-w-0 pr-2">
                        <p style={{ color:"var(--t1)", fontSize:13, fontWeight:500 }} className="truncate">{item.name}</p>
                        <p style={{ color:"var(--t4)", fontSize:11 }}>{item.qty} × {fmt(item.price)}</p>
                      </div>
                      <span style={{ color:"var(--t2)", fontSize:13, fontWeight:500 }}>{fmt(item.qty*item.price)}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5">
                      <Wrench size={11} style={{ color:"var(--t4)" }} />
                      <p style={{ color:"var(--t3)", fontSize:13 }}>Labor Charge</p>
                    </div>
                    <span style={{ color:"var(--t2)", fontSize:13, fontWeight:500 }}>{fmt(selected.labor)}</span>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between">
                <span style={{ color:"var(--t1)", fontWeight:700, fontSize:16 }}>Total Amount</span>
                <span style={{ fontWeight:800, fontSize:22, background:"linear-gradient(90deg,#7C3AED,#8B5CF6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                  {fmt(grand)}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            {[{icon:Download,label:"Download"},{icon:Share2,label:"Share"}].map(({icon:Icon,label})=>(
              <button key={label} className="py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
                style={{ background:"var(--card-bg)", border:"1px solid var(--card-border)" }}>
                <Icon size={16} style={{ color:"var(--t3)" }} />
                <span style={{ fontWeight:500, fontSize:14, color:"var(--t3)" }}>{label}</span>
              </button>
            ))}
          </div>

          <button
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
            style={{ background:"linear-gradient(135deg,#7C3AED,#8B5CF6)", boxShadow:"0 4px 24px rgba(124,58,237,0.38)", color:"#fff", fontWeight:600, fontSize:15 }}
            onClick={()=>setGenerated(true)}>
            {generated
              ? <><Check size={17} style={{color:"#fff"}} /><span>Bill Sent!</span></>
              : <><IndianRupee size={17} style={{color:"#fff"}} /><span>Send to Customer</span></>}
          </button>
        </div>
      </div>
    );
  }

  // Bills list view
  const totalBilled = bills.reduce((s,b)=>s+b.items.reduce((ss,i)=>ss+i.qty*i.price,0)+b.labor, 0);
  const paid  = bills.filter(b=>b.status==="Paid") .reduce((s,b)=>s+b.items.reduce((ss,i)=>ss+i.qty*i.price,0)+b.labor, 0);
  const unpaid= bills.filter(b=>b.status!=="Paid") .reduce((s,b)=>s+b.items.reduce((ss,i)=>ss+i.qty*i.price,0)+b.labor, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-5 pb-4 flex-shrink-0">
        <h1 style={{ color:"var(--t1)" }}>Billing</h1>
        <p style={{ color:"var(--t3)", fontSize:14 }}>{bills.length} invoices</p>
      </div>

      {/* Summary */}
      <div className="px-5 mb-5 flex-shrink-0">
        <div className="rounded-2xl p-4 flex items-center justify-between"
          style={{ background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.2)" }}>
          {[{ label:"Total Billed",val:fmt(totalBilled),color:"var(--t1)" },
            { label:"Paid",        val:fmt(paid),       color:"#34D399"   },
            { label:"Pending",     val:fmt(unpaid),     color:"#FBBF24"   }].map(({label,val,color})=>(
            <div key={label}>
              <p style={{ color:"var(--t3)", fontSize:12 }}>{label}</p>
              <p style={{ color, fontWeight:700, fontSize:16 }}>{val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bills list */}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <p style={{ fontSize:12, fontWeight:600, color:"var(--t3)", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:12 }}>
          Recent Invoices
        </p>
        <div className="flex flex-col gap-3">
          {bills.map(bill => {
            const total = bill.items.reduce((s,i)=>s+i.qty*i.price, 0) + bill.labor;
            const ss    = statusStyle(bill.status);
            return (
              <div key={bill.id}
                className="rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-transform"
                style={{ background:"var(--card-bg)", border:"1px solid var(--card-border)" }}
                onClick={()=>setSelected(bill)}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:"rgba(124,58,237,0.12)" }}>
                      <FileText size={18} style={{ color:"#A78BFA" }} />
                    </div>
                    <div>
                      <p style={{ color:"var(--t1)", fontWeight:600, fontSize:14 }}>{bill.customer}</p>
                      <p style={{ color:"var(--t4)", fontSize:12 }}>{bill.id} · {bill.date}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl flex-shrink-0"
                    style={{ fontSize:11, fontWeight:600, background:ss.bg, color:ss.color, border:`1px solid ${ss.border}` }}>
                    {bill.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color:"var(--t3)", fontSize:13 }}>{bill.items.length} items + labor</span>
                  <span style={{ color:"var(--t1)", fontWeight:700, fontSize:16 }}>{fmt(total)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAB */}
      <button
        className="absolute bottom-24 right-5 w-14 h-14 rounded-2xl flex items-center justify-center active:scale-90 transition-transform z-10"
        style={{ background:"linear-gradient(135deg,#7C3AED,#8B5CF6)", boxShadow:"0 4px 24px rgba(124,58,237,0.45)" }}
        onClick={()=>onNavigate("expenses")}>
        <Plus size={24} style={{ color:"#fff" }} />
      </button>
    </div>
  );
}
