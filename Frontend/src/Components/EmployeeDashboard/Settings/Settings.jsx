import { useState } from "react";

const colors = {
  primary: "#388087",
  secondary: "#6FB3B8",
  accent: "#BADFE7",
  soft: "#C2EDCE",
  bg: "#F6F6F2",
};

const tabs = ["General", "Security", "Notifications", "Team", "Billing", "API"];

const TabIcon = ({ tab }) => {
  const icons = {
    General: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    Security: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    Notifications: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    Team: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    Billing: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    API: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  };
  return icons[tab] || null;
};

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${enabled ? "bg-[#388087]" : "bg-gray-200"}`}
  >
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${enabled ? "translate-x-6" : "translate-x-1"}`} />
  </button>
);

const Avatar = ({ name, size = "md" }) => {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  const sizeClass = size === "lg" ? "w-16 h-16 text-lg" : "w-9 h-9 text-sm";
  return (
    <div className={`${sizeClass} rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0`} style={{ background: "linear-gradient(135deg, #388087, #6FB3B8)" }}>
      {initials}
    </div>
  );
};

const Badge = ({ label, color }) => {
  const colorMap = {
    admin: "bg-[#388087]/10 text-[#388087]",
    editor: "bg-[#BADFE7]/60 text-[#388087]",
    viewer: "bg-gray-100 text-gray-500",
    active: "bg-[#C2EDCE] text-green-700",
    pending: "bg-amber-50 text-amber-600",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colorMap[color] || "bg-gray-100 text-gray-500"}`}>{label}</span>
  );
};

// ─── Tab Content Panels ─────────────────────────────────────────────────────

const GeneralSettings = () => {
  const [form, setForm] = useState({ orgName: "Squilla Fund", email: "admin@squilla.fund", timezone: "Asia/Kolkata", language: "English", currency: "USD" });
  const [saved, setSaved] = useState(false);
  const handle = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-5">Organization Profile</h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6 pb-6 border-b border-gray-100">
          <div className="relative">
            <Avatar name={form.orgName} size="lg" />
            <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#388087] text-white flex items-center justify-center shadow-md hover:bg-[#2d6b70] transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-base">{form.orgName}</p>
            <p className="text-sm text-gray-400 mt-0.5">{form.email}</p>
            <Badge label="Pro Plan" color="active" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Organization Name", key: "orgName", type: "text" },
            { label: "Admin Email", key: "email", type: "email" },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
              <input type={type} value={form[key]} onChange={e => handle(key, e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#388087]/30 focus:border-[#388087] transition-all text-gray-800" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Timezone</label>
            <select value={form.timezone} onChange={e => handle("timezone", e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#388087]/30 focus:border-[#388087] transition-all text-gray-800 bg-white">
              {["Asia/Kolkata", "America/New_York", "Europe/London", "Asia/Tokyo"].map(tz => <option key={tz}>{tz}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Currency</label>
            <select value={form.currency} onChange={e => handle("currency", e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#388087]/30 focus:border-[#388087] transition-all text-gray-800 bg-white">
              {["USD", "EUR", "INR", "GBP"].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-5">Preferences</h3>
        <div className="space-y-4">
          {[
            { label: "Compact Mode", desc: "Reduce spacing across the dashboard" },
            { label: "Show Portfolio Totals", desc: "Display asset totals in the sidebar" },
          ].map(({ label, desc }, i) => {
            const [on, setOn] = useState(i === 0);
            return (
              <div key={label} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
                <Toggle enabled={on} onChange={setOn} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={save} className={`px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 shadow-sm ${saved ? "bg-green-500" : "bg-[#388087] hover:bg-[#2d6b70] hover:shadow-md"}`}>
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

const SecuritySettings = () => {
  const [show, setShow] = useState(false);
  const [twoFA, setTwoFA] = useState(true);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-5">Change Password</h3>
        <div className="space-y-4 max-w-md">
          {["Current Password", "New Password", "Confirm New Password"].map((label) => (
            <div key={label}>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
              <div className="relative">
                <input type={show ? "text" : "password"} placeholder="••••••••"
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#388087]/30 focus:border-[#388087] transition-all pr-10" />
                <button onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {show ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>}
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <div className="h-1 bg-gray-100 rounded-full mt-1">
            <div className="h-1 w-2/3 rounded-full" style={{ background: "linear-gradient(90deg, #388087, #BADFE7)" }} />
          </div>
          <p className="text-xs text-gray-400">Password strength: <span className="text-[#388087] font-medium">Strong</span></p>
        </div>
        <button className="mt-5 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#388087] hover:bg-[#2d6b70] transition-all shadow-sm">Update Password</button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-5">Two-Factor Authentication</h3>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Authenticator App</p>
            <p className="text-xs text-gray-400 mt-1 max-w-xs">Use an authenticator app to generate time-based one-time passwords for additional security.</p>
            {twoFA && <Badge label="Enabled" color="active" />}
          </div>
          <Toggle enabled={twoFA} onChange={setTwoFA} />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Active Sessions</h3>
        <div className="space-y-3">
          {[
            { device: "Chrome on MacOS", ip: "192.168.1.1", time: "Now", current: true },
            { device: "Safari on iPhone", ip: "103.24.5.6", time: "2h ago", current: false },
            { device: "Firefox on Windows", ip: "45.67.89.10", time: "Yesterday", current: false },
          ].map(s => (
            <div key={s.device} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${s.current ? "bg-green-400" : "bg-gray-300"}`} />
                <div>
                  <p className="text-sm font-medium text-gray-700">{s.device}</p>
                  <p className="text-xs text-gray-400">{s.ip} · {s.time}</p>
                </div>
              </div>
              {!s.current && <button className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors">Revoke</button>}
              {s.current && <Badge label="Current" color="active" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const NotificationSettings = () => {
  const groups = [
    {
      title: "Portfolio Alerts",
      items: [
        { label: "Price Movements", desc: "Alert when assets move ±5%", email: true, push: true, sms: false },
        { label: "Portfolio Milestone", desc: "Reach target thresholds", email: true, push: false, sms: false },
        { label: "KYC Status Update", desc: "Compliance verification updates", email: true, push: true, sms: true },
      ],
    },
    {
      title: "System",
      items: [
        { label: "Login Activity", desc: "New sign-in from unknown device", email: true, push: true, sms: false },
        { label: "Monthly Reports", desc: "Auto-generated performance summaries", email: true, push: false, sms: false },
      ],
    },
  ];

  const [state, setState] = useState(
    Object.fromEntries(groups.flatMap(g => g.items.map(i => [
      i.label,
      { email: i.email, push: i.push, sms: i.sms }
    ])))
  );

  const toggle = (label, channel) => setState(s => ({ ...s, [label]: { ...s[label], [channel]: !s[label][channel] } }));

  return (
    <div className="space-y-6">
      {groups.map(g => (
        <div key={g.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-5">{g.title}</h3>
          <div className="hidden sm:grid grid-cols-4 text-xs font-medium text-gray-400 pb-2 border-b border-gray-100 mb-2">
            <span>Alert</span><span className="text-center">Email</span><span className="text-center">Push</span><span className="text-center">SMS</span>
          </div>
          <div className="space-y-4">
            {g.items.map(item => (
              <div key={item.label} className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-3 sm:gap-0 py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-700">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
                <div className="flex sm:justify-center items-center gap-2">
                  <span className="sm:hidden text-xs text-gray-400 w-8">Email</span>
                  <Toggle enabled={state[item.label].email} onChange={() => toggle(item.label, "email")} />
                </div>
                <div className="flex sm:justify-center items-center gap-2">
                  <span className="sm:hidden text-xs text-gray-400 w-8">Push</span>
                  <Toggle enabled={state[item.label].push} onChange={() => toggle(item.label, "push")} />
                </div>
                <div className="flex sm:justify-center items-center gap-2">
                  <span className="sm:hidden text-xs text-gray-400 w-8">SMS</span>
                  <Toggle enabled={state[item.label].sms} onChange={() => toggle(item.label, "sms")} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const TeamSettings = () => {
  const members = [
    { name: "Arjun Mehta", email: "arjun@squilla.fund", role: "admin", status: "active" },
    { name: "Priya Sharma", email: "priya@squilla.fund", role: "editor", status: "active" },
    { name: "Rohan Das", email: "rohan@squilla.fund", role: "viewer", status: "pending" },
    { name: "Kavya Nair", email: "kavya@squilla.fund", role: "editor", status: "active" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Team Members</h3>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#388087] hover:bg-[#2d6b70] transition-all shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Invite Member
          </button>
        </div>
        <div className="space-y-2">
          {members.map(m => (
            <div key={m.email} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar name={m.name} />
                <div>
                  <p className="text-sm font-semibold text-gray-800">{m.name}</p>
                  <p className="text-xs text-gray-400">{m.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-12 sm:ml-0">
                <Badge label={m.role} color={m.role} />
                <Badge label={m.status} color={m.status} />
                <button className="text-gray-300 hover:text-gray-500 transition-colors ml-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Invite via Email</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input type="email" placeholder="colleague@company.com"
            className="flex-1 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#388087]/30 focus:border-[#388087] transition-all" />
          <select className="px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#388087]/30 focus:border-[#388087] transition-all bg-white text-gray-700">
            <option>Viewer</option><option>Editor</option><option>Admin</option>
          </select>
          <button className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#388087] hover:bg-[#2d6b70] transition-all shadow-sm whitespace-nowrap">Send Invite</button>
        </div>
      </div>
    </div>
  );
};

const BillingSettings = () => (
  <div className="space-y-6">
    <div className="rounded-2xl p-6 border-2 border-[#388087]/20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #388087 0%, #6FB3B8 100%)" }}>
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 -translate-y-8 translate-x-8" style={{ background: "white" }} />
      <p className="text-xs font-semibold text-white/70 uppercase tracking-widest">Current Plan</p>
      <h2 className="text-2xl font-bold text-white mt-1">Pro Institutional</h2>
      <p className="text-sm text-white/80 mt-1">Renews on April 15, 2026 · $299/month</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {["Unlimited Assets", "KYC/AML Compliance", "Priority Support", "Advanced Analytics"].map(f => (
          <span key={f} className="text-xs bg-white/20 text-white px-3 py-1 rounded-full">{f}</span>
        ))}
      </div>
      <button className="mt-5 px-4 py-2 bg-white text-[#388087] text-sm font-semibold rounded-xl hover:bg-white/90 transition-all shadow-sm">Manage Subscription</button>
    </div>

    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Payment Method</h3>
      <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-[#388087]/20 bg-[#388087]/5">
        <div className="w-10 h-7 rounded bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" /></svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">Visa ending in 4242</p>
          <p className="text-xs text-gray-400">Expires 12/27</p>
        </div>
        <Badge label="Default" color="active" />
      </div>
      <button className="mt-3 text-sm text-[#388087] font-medium hover:underline">+ Add payment method</button>
    </div>

    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Invoice History</h3>
      <div className="space-y-2">
        {[
          { date: "Mar 15, 2026", amount: "$299.00", status: "Paid" },
          { date: "Feb 15, 2026", amount: "$299.00", status: "Paid" },
          { date: "Jan 15, 2026", amount: "$299.00", status: "Paid" },
        ].map(inv => (
          <div key={inv.date} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
            <div>
              <p className="text-sm font-medium text-gray-700">{inv.date}</p>
              <p className="text-xs text-gray-400">Pro Institutional · Monthly</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-800">{inv.amount}</span>
              <Badge label={inv.status} color="active" />
              <button className="text-[#388087] hover:text-[#2d6b70] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const APISettings = () => {
  const [copied, setCopied] = useState(false);
  const key = "sk_live_••••••••••••••••••••••••••4f2a";
  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-5">API Keys</h3>
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Live Secret Key</p>
            <code className="text-sm font-mono text-gray-700">{key}</code>
          </div>
          <div className="flex gap-2">
            <button onClick={copy} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${copied ? "bg-green-500 text-white" : "bg-[#388087] text-white hover:bg-[#2d6b70]"}`}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
              {copied ? "Copied!" : "Copy"}
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 text-gray-500 hover:bg-gray-100 transition-all">Rotate</button>
          </div>
        </div>
        <button className="mt-4 flex items-center gap-2 text-sm text-[#388087] font-medium hover:underline">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Generate New Key
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Webhooks</h3>
        <div className="space-y-3">
          {[
            { url: "https://api.myapp.com/webhooks/squilla", events: ["portfolio.updated", "kyc.verified"] },
            { url: "https://hooks.zapier.com/hooks/catch/123456", events: ["transaction.created"] },
          ].map(w => (
            <div key={w.url} className="p-4 rounded-xl border border-gray-200 hover:border-[#388087]/30 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-mono text-gray-700 break-all">{w.url}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {w.events.map(e => <span key={e} className="text-xs bg-[#BADFE7]/50 text-[#388087] px-2 py-0.5 rounded-full font-mono">{e}</span>)}
                  </div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button className="text-gray-300 hover:text-[#388087] transition-colors p-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                  <button className="text-gray-300 hover:text-red-400 transition-colors p-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-3 flex items-center gap-2 text-sm text-[#388087] font-medium hover:underline">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Webhook
        </button>
      </div>
    </div>
  );
};

const contentMap = {
  General: GeneralSettings,
  Security: SecuritySettings,
  Notifications: NotificationSettings,
  Team: TeamSettings,
  Billing: BillingSettings,
  API: APISettings,
};

// ─── Main Component ──────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [active, setActive] = useState("General");
  const [menuOpen, setMenuOpen] = useState(false);
  const Content = contentMap[active];

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: "#F6F6F2", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Top Nav */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm" style={{ background: "linear-gradient(135deg, #388087, #6FB3B8)" }}>SF</div>
            <div className="hidden sm:block">
              <span className="text-sm font-semibold text-gray-800">Squilla Fund</span>
              <span className="text-gray-300 mx-2">·</span>
              <span className="text-sm text-gray-400">Settings</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <Avatar name="Arjun Mehta" />
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your platform preferences and account configuration.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Sidebar */}
          <aside className={`${menuOpen ? "block" : "hidden"} sm:block w-full sm:w-52 flex-shrink-0`}>
            <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 sm:p-3 flex sm:flex-col gap-1 overflow-x-auto sm:overflow-visible">
              {tabs.map(tab => (
                <button key={tab}
                  onClick={() => { setActive(tab); setMenuOpen(false); }}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-max sm:w-full text-left whitespace-nowrap
                    ${active === tab ? "text-white shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`}
                  style={active === tab ? { background: "linear-gradient(135deg, #388087, #6FB3B8)" } : {}}>
                  <TabIcon tab={tab} />
                  {tab}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <Content />
          </main>
        </div>
      </div>
    </div>
  );
}