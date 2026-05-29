import { useState } from "react";
import { ArrowLeft, User, Phone, MapPin, Camera, FileText, Check } from "lucide-react";

interface AddCustomerProps { onNavigate: (screen: string, data?: any) => void }

export function AddCustomer({ onNavigate }: AddCustomerProps) {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name:"", phone:"", address:"", siteDetails:"", notes:"" });
  const update = (k: string, v: string) => setForm(f=>({...f,[k]:v}));
  const isValid = form.name.trim() && form.phone.trim() && form.address.trim();

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => onNavigate("customers"), 1200);
  };

  const fields = [
    { key:"name",        label:"Customer Name *",  placeholder:"e.g. Al-Farooq Mart",          icon:<User    size={15} style={{color:"var(--t4)"}}/>, multiline:false },
    { key:"phone",       label:"Phone Number *",   placeholder:"+91 98765 43210",               icon:<Phone   size={15} style={{color:"var(--t4)"}}/>, multiline:false },
    { key:"address",     label:"Site Address *",   placeholder:"Full address of the site",      icon:<MapPin  size={15} style={{color:"var(--t4)"}}/>, multiline:true  },
    { key:"siteDetails", label:"Site Details",     placeholder:"e.g. 8 cameras, 1 DVR, 500m cable", icon:<Camera  size={15} style={{color:"var(--t4)"}}/>, multiline:true  },
    { key:"notes",       label:"Notes",            placeholder:"Any special instructions...",  icon:<FileText size={15} style={{color:"var(--t4)"}}/>, multiline:true  },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-5 pb-4 flex items-center gap-3 flex-shrink-0"
        style={{ borderBottom:"1px solid var(--card-border)" }}>
        <button className="w-10 h-10 rounded-xl flex items-center justify-center active:scale-90 transition-transform"
          style={{ background:"var(--card-bg)", border:"1px solid var(--card-border)" }}
          onClick={() => onNavigate("customers")}>
          <ArrowLeft size={18} style={{ color:"var(--t1)" }} />
        </button>
        <div>
          <p style={{ color:"var(--t1)", fontWeight:700, fontSize:18 }}>Add Customer</p>
          <p style={{ color:"var(--t3)", fontSize:13 }}>Fill in customer details</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="flex flex-col gap-4">
          {fields.map(({ key, label, placeholder, icon, multiline }) => (
            <div key={key}>
              <label style={{ display:"block", color:"var(--t3)", fontSize:13, marginBottom:8 }}>{label}</label>
              <div className="relative">
                <div className={`absolute left-4 ${multiline ? "top-4" : "top-1/2 -translate-y-1/2"} z-10`}>{icon}</div>
                {multiline ? (
                  <textarea placeholder={placeholder} value={form[key as keyof typeof form]}
                    onChange={e=>update(key, e.target.value)} rows={key==="notes"?3:2}
                    className="w-full pl-11 pr-4 py-4 rounded-2xl outline-none resize-none"
                    style={{ background:"var(--input-bg)", border:"1px solid var(--input-border)", fontSize:14, color:"var(--t1)" }} />
                ) : (
                  <input type={key==="phone"?"tel":"text"} placeholder={placeholder} value={form[key as keyof typeof form]}
                    onChange={e=>update(key,e.target.value)}
                    className="w-full pl-11 pr-4 py-4 rounded-2xl outline-none"
                    style={{ background:"var(--input-bg)", border:"1px solid var(--input-border)", fontSize:14, color:"var(--t1)" }} />
                )}
              </div>
            </div>
          ))}

          <p style={{ color:"var(--t4)", fontSize:12 }}>* Required fields</p>

          <button
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
            style={{
              background: isValid ? "linear-gradient(135deg,#7C3AED,#8B5CF6)" : "var(--card-bg)",
              opacity: isValid ? 1 : 0.5,
              boxShadow: isValid ? "0 4px 24px rgba(124,58,237,0.38)" : "none",
              border: isValid ? "none" : "1px solid var(--card-border)",
              color:"#fff", fontWeight:600, fontSize:15,
            }}
            onClick={handleSave}
            disabled={!isValid}>
            {saved
              ? <><Check size={17} style={{color:"#fff"}} /><span>Saved!</span></>
              : <span>Save Customer</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
