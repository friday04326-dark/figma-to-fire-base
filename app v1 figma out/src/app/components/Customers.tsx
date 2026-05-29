import { useState } from "react";
import { Search, Plus, Phone, MapPin, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface CustomersProps { onNavigate: (screen: string, data?: any) => void }

const customers = [
  { id:1, name:"Al-Farooq Mart",    phone:"+91 98765 43210", address:"MG Road, Bengaluru",        status:"Active",      cameras:8  },
  { id:2, name:"Ravi Steel Works",  phone:"+91 87654 32109", address:"Industrial Area, Pune",      status:"Pending",     cameras:4  },
  { id:3, name:"City Pharmacy",     phone:"+91 76543 21098", address:"Park Street, Kolkata",       status:"Active",      cameras:2  },
  { id:4, name:"Green Valley Hotel",phone:"+91 65432 10987", address:"Linking Road, Mumbai",       status:"Maintenance", cameras:16 },
  { id:5, name:"Sunrise School",    phone:"+91 54321 09876", address:"Anna Salai, Chennai",        status:"Active",      cameras:12 },
  { id:6, name:"Metro Garage",      phone:"+91 43210 98765", address:"Sector 18, Noida",           status:"Pending",     cameras:6  },
];

const statusCfg: Record<string, { icon: any; color: string; bg: string; border: string }> = {
  "Active":      { icon:CheckCircle, color:"#34D399", bg:"rgba(16,185,129,0.12)",  border:"rgba(16,185,129,0.22)"  },
  "Pending":     { icon:Clock,       color:"#FBBF24", bg:"rgba(245,158,11,0.12)",  border:"rgba(245,158,11,0.22)"  },
  "Maintenance": { icon:AlertCircle, color:"#60A5FA", bg:"rgba(59,130,246,0.12)",  border:"rgba(59,130,246,0.22)"  },
};

export function Customers({ onNavigate }: CustomersProps) {
  const [search, setSearch] = useState("");
  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-5 pb-4 flex-shrink-0">
        <h1 style={{ color:"var(--t1)" }}>Customers</h1>
        <p style={{ color:"var(--t3)", fontSize:14 }}>{customers.length} total customers</p>
      </div>

      <div className="px-5 mb-4 flex-shrink-0">
        <div className="relative">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color:"var(--t4)" }} />
          <input type="text" placeholder="Search customers..." value={search} onChange={e=>setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl outline-none"
            style={{ background:"var(--input-bg)", border:"1px solid var(--input-border)", fontSize:14, color:"var(--t1)" }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="flex flex-col gap-3">
          {filtered.map(c => {
            const cfg = statusCfg[c.status];
            const StatusIcon = cfg.icon;
            return (
              <div key={c.id}
                className="rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-transform"
                style={{ background:"var(--card-bg)", border:"1px solid var(--card-border)" }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                      style={{ background:"linear-gradient(135deg,#7C3AED,#8B5CF6)", fontSize:15, fontWeight:700 }}>
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <p style={{ color:"var(--t1)", fontWeight:600, fontSize:14 }}>{c.name}</p>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border mt-1"
                        style={{ fontSize:10, background:cfg.bg, borderColor:cfg.border }}>
                        <StatusIcon size={9} style={{ color:cfg.color }} />
                        <span style={{ color:cfg.color, fontWeight:500 }}>{c.status}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p style={{ color:"#A78BFA", fontWeight:700, fontSize:15 }}>{c.cameras}</p>
                    <p style={{ color:"var(--t4)", fontSize:10 }}>cameras</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <Phone size={11} style={{ color:"var(--t4)", flexShrink:0 }} />
                    <span style={{ color:"var(--t3)", fontSize:12 }}>{c.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={11} style={{ color:"var(--t4)", flexShrink:0 }} />
                    <span style={{ color:"var(--t3)", fontSize:12 }} className="truncate">{c.address}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background:"var(--card-bg)" }}>
                <Search size={24} style={{ color:"var(--t4)" }} />
              </div>
              <p style={{ color:"var(--t3)" }}>No customers found</p>
            </div>
          )}
        </div>
      </div>

      {/* FAB */}
      <button
        className="absolute bottom-24 right-5 w-14 h-14 rounded-2xl flex items-center justify-center active:scale-90 transition-transform z-10"
        style={{ background:"linear-gradient(135deg,#7C3AED,#8B5CF6)", boxShadow:"0 4px 24px rgba(124,58,237,0.45)" }}
        onClick={() => onNavigate("v-add-customer")}>
        <Plus size={24} style={{ color:"#fff" }} />
      </button>
    </div>
  );
}
