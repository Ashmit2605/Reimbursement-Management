import { useState, useRef, useEffect } from "react";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  teal: "#388087",
  tealMid: "#6FB3B8",
  tealLight: "#BADFE7",
  mint: "#C2EDCE",
  bg: "#f4f8f9",
  white: "#FFFFFF",
  gray50: "#F9F9F7",
  gray100: "#F0F0EC",
  gray200: "#E2E2DC",
  gray400: "#A0A09A",
  gray500: "#7A7A74",
  gray700: "#3D3D38",
  gray900: "#1A1A17",
};

const TABS = ["General", "Security"];

// ─── Shared Primitives ────────────────────────────────────────────────────────

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    aria-checked={enabled}
    role="switch"
    style={{
      position: "relative",
      display: "inline-flex",
      height: 24,
      width: 44,
      alignItems: "center",
      borderRadius: 999,
      border: "none",
      cursor: "pointer",
      transition: "background 220ms ease",
      background: enabled ? C.teal : C.gray200,
      flexShrink: 0,
    }}
  >
    <span style={{
      display: "inline-block",
      height: 16,
      width: 16,
      borderRadius: "50%",
      background: C.white,
      boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
      transition: "transform 220ms ease",
      transform: enabled ? "translateX(24px)" : "translateX(4px)",
    }} />
  </button>
);

const Avatar = ({ name, size = "md", imageSrc }) => {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const dim = size === "lg" ? 72 : 36;
  return (
    <div style={{
      width: dim, height: dim, borderRadius: "50%",
      background: imageSrc ? "transparent" : `linear-gradient(135deg, ${C.teal}, ${C.tealMid})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: C.white, fontWeight: 600, flexShrink: 0,
      fontSize: size === "lg" ? 22 : 13,
      letterSpacing: "0.03em",
      overflow: "hidden",
    }}>
      {imageSrc
        ? <img src={imageSrc} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : initials}
    </div>
  );
};

const Badge = ({ label, variant = "neutral" }) => {
  const styles = {
    success: { background: "#E8F7EC", color: "#2E7D4F" },
    teal: { background: `${C.tealLight}55`, color: C.teal },
    neutral: { background: C.gray100, color: C.gray500 },
    amber: { background: "#FFF8E6", color: "#B07A00" },
  };
  const s = styles[variant] || styles.neutral;
  return (
    <span style={{
      ...s, fontSize: 11, fontWeight: 600, padding: "2px 10px",
      borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 4,
      letterSpacing: "0.02em", whiteSpace: "nowrap",
    }}>
      {variant === "success" && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2E7D4F", display: "inline-block" }} />}
      {label}
    </span>
  );
};

const Card = ({ children, style }) => (
  <div style={{
    background: C.white, borderRadius: 20,
    border: `1px solid ${C.gray100}`,
    boxShadow: "0 1px 4px rgba(56,128,135,0.06)",
    padding: "24px",
    ...style,
  }}>
    {children}
  </div>
);

const SectionLabel = ({ children }) => (
  <p style={{
    fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
    textTransform: "uppercase", color: C.gray400, marginBottom: 20,
  }}>
    {children}
  </p>
);

const Divider = () => <div style={{ borderBottom: `1px solid ${C.gray100}`, margin: "4px 0" }} />;

const FieldLabel = ({ children }) => (
  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.gray500, marginBottom: 6, letterSpacing: "0.02em" }}>
    {children}
  </label>
);

const Input = ({ type = "text", value, onChange, placeholder, style, ...rest }) => {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%", boxSizing: "border-box",
        padding: "10px 14px", fontSize: 13, borderRadius: 12,
        border: `1.5px solid ${focused ? C.teal : C.gray200}`,
        outline: "none", background: focused ? "#FAFCFC" : C.white,
        color: C.gray900, fontFamily: "inherit",
        boxShadow: focused ? `0 0 0 3px ${C.teal}18` : "none",
        transition: "border-color 150ms, box-shadow 150ms, background 150ms",
        ...style,
      }}
      {...rest}
    />
  );
};

const Select = ({ value, onChange, options }) => {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%", padding: "10px 14px", fontSize: 13, borderRadius: 12,
        border: `1.5px solid ${focused ? C.teal : C.gray200}`,
        outline: "none", background: C.white,
        color: C.gray900, fontFamily: "inherit",
        boxShadow: focused ? `0 0 0 3px ${C.teal}18` : "none",
        transition: "border-color 150ms, box-shadow 150ms",
        cursor: "pointer", appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23A0A09A' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
        paddingRight: 32,
      }}
    >
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );
};

const PrimaryButton = ({ children, onClick, saved, style }) => (
  <button
    onClick={onClick}
    style={{
      padding: "10px 24px", borderRadius: 12, border: "none", cursor: "pointer",
      fontSize: 13, fontWeight: 600, color: C.white,
      background: saved ? "#2E7D4F" : `linear-gradient(135deg, ${C.teal}, ${C.tealMid})`,
      boxShadow: saved ? "none" : "0 2px 8px rgba(56,128,135,0.25)",
      transition: "all 200ms ease",
      fontFamily: "inherit", letterSpacing: "0.01em",
      ...style,
    }}
  >
    {children}
  </button>
);

const GhostButton = ({ children, onClick, style }) => (
  <button
    onClick={onClick}
    style={{
      padding: "9px 16px", borderRadius: 12,
      border: `1.5px solid ${C.gray200}`,
      cursor: "pointer", fontSize: 13, fontWeight: 500,
      color: C.gray700, background: "transparent",
      transition: "border-color 150ms, background 150ms",
      fontFamily: "inherit",
      ...style,
    }}
    onMouseEnter={e => { e.currentTarget.style.background = C.gray50; e.currentTarget.style.borderColor = C.gray400; }}
    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = C.gray200; }}
  >
    {children}
  </button>
);

// ─── Avatar Upload ────────────────────────────────────────────────────────────

const AvatarUploader = ({ name, imageSrc, onImageChange }) => {
  const fileRef = useRef();
  const [hover, setHover] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onImageChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block", cursor: "pointer" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => fileRef.current.click()}
    >
      <Avatar name={name} size="lg" imageSrc={imageSrc} />

      {/* Overlay on hover */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: hover ? 1 : 0,
        transition: "opacity 180ms ease",
        flexDirection: "column", gap: 2,
      }}>
        <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span style={{ color: "white", fontSize: 9, fontWeight: 700, letterSpacing: "0.05em" }}>CHANGE</span>
      </div>

      {/* Edit badge */}
      <div style={{
        position: "absolute", bottom: -2, right: -2,
        width: 22, height: 22, borderRadius: "50%",
        background: C.teal, border: `2px solid ${C.white}`,
        color: C.white, cursor: "pointer", display: "flex",
        alignItems: "center", justifyContent: "center",
        pointerEvents: "none",
      }}>
        <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: "none" }}
      />
    </div>
  );
};

// ─── General Settings ─────────────────────────────────────────────────────────

const GeneralSettings = ({ orgImage, onImageChange, profile, loading }) => {
  const [form, setForm] = useState({
    orgName: "",
    email: "",
    timezone: "Asia/Kolkata",
    currency: "USD",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        orgName: profile.companyName || "",
        email: profile.email || "",
        timezone: profile.timezone || "Asia/Kolkata",
        currency: profile.currency || "USD",
      });
    }
  }, [profile]);

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [compactMode, setCompactMode] = useState(true);
  const [showTotals, setShowTotals] = useState(false);

  const handle = (k, v) => setForm(f => ({ ...f, [k]: v }));
  
  const save = async () => {
    try {
      const resp = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name: profile.name,
          email: form.email,
          companyName: form.orgName,
          logoUrl: orgImage
        })
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || "Update failed");

      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      setError(err.message);
      alert(err.message);
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Loading settings...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Profile Card */}
      <Card>
        <SectionLabel>{profile.role === 'admin' ? "Organization Profile" : "Personal Profile"}</SectionLabel>
        <div style={{
          display: "flex", alignItems: "center", gap: 16,
          paddingBottom: 20, marginBottom: 20, borderBottom: `1px solid ${C.gray100}`,
          flexWrap: "wrap",
        }}>
          <AvatarUploader name={profile.role === 'admin' ? form.orgName : profile.name} imageSrc={orgImage} onImageChange={onImageChange} />
          <div>
            <p style={{ fontWeight: 700, color: C.gray900, fontSize: 15 }}>{profile.role === 'admin' ? form.orgName : profile.name}</p>
            <p style={{ color: C.gray400, fontSize: 12, marginTop: 2 }}>{form.email}</p>
            <div style={{ marginTop: 6 }}><Badge label={profile.role.toUpperCase()} variant="teal" /></div>
            <p style={{ fontSize: 11, color: C.gray400, marginTop: 6 }}>Click avatar to upload a new profile photo</p>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}>
          <div>
            <FieldLabel>{profile.role === 'admin' ? "Organization Name" : "Account Name"}</FieldLabel>
            <Input 
              value={profile.role === 'admin' ? form.orgName : profile.name} 
              onChange={e => profile.role === 'admin' ? handle("orgName", e.target.value) : null}
              disabled={profile.role !== 'admin'}
            />
          </div>
          <div>
            <FieldLabel>Email Address</FieldLabel>
            <Input type="email" value={form.email} onChange={e => handle("email", e.target.value)} />
          </div>
          <div>
            <FieldLabel>Timezone</FieldLabel>
            <Select value={form.timezone} onChange={e => handle("timezone", e.target.value)}
              options={["Asia/Kolkata", "America/New_York", "Europe/London", "Asia/Tokyo"]} />
          </div>
          <div>
            <FieldLabel>Currency</FieldLabel>
            <Select value={form.currency} onChange={e => handle("currency", e.target.value)}
              options={["USD", "EUR", "INR", "GBP"]} />
          </div>
        </div>
      </Card>

      {/* Preferences Card */}
      <Card>
        <SectionLabel>Display Preferences</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { label: "Compact Mode", desc: "Reduce spacing across the dashboard", val: compactMode, set: setCompactMode },
            { label: "Show Portfolio Totals", desc: "Display asset totals in the sidebar", val: showTotals, set: setShowTotals },
          ].map(({ label, desc, val, set }, i, arr) => (
            <div key={label}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 0", gap: 16,
              }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: C.gray700 }}>{label}</p>
                  <p style={{ fontSize: 11, color: C.gray400, marginTop: 2 }}>{desc}</p>
                </div>
                <Toggle enabled={val} onChange={set} />
              </div>
              {i < arr.length - 1 && <Divider />}
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, flexWrap: "wrap" }}>
        <GhostButton>Discard</GhostButton>
        <PrimaryButton onClick={save} saved={saved}>
          {saved ? "✓ Changes Saved" : "Save Changes"}
        </PrimaryButton>
      </div>
    </div>
  );
};

// ─── Security Settings ────────────────────────────────────────────────────────

const SecuritySettings = () => {
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [twoFA, setTwoFA] = useState(true);
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
        alert("Please fill in all password fields");
        return;
    }
    if (passwords.new !== passwords.confirm) {
        alert("Passwords do not match");
        return;
    }

    try {
      const resp = await fetch("http://localhost:5000/api/users/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            currentPassword: passwords.current,
            newPassword: passwords.new
        })
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || "Failed to update password");

      setUpdated(true);
      setPasswords({ current: "", new: "", confirm: "" });
      setTimeout(() => setUpdated(false), 2200);
      alert("Password updated successfully");
    } catch (err) {
      setError(err.message);
      alert(err.message);
    }
  };

  const sessions = [
    { device: "Chrome · macOS", ip: "192.168.1.1", time: "Active now", current: true },
    { device: "Safari · iPhone 15", ip: "103.24.5.6", time: "2 hours ago", current: false },
    { device: "Firefox · Windows 11", ip: "45.67.89.10", time: "Yesterday", current: false },
  ];

  const EyeIcon = () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {showPass
        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        : <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </>
      }
    </svg>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Password Card */}
      <Card>
        <SectionLabel>Change Password</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 440 }}>
            <div>
              <FieldLabel>Current Password</FieldLabel>
              <div style={{ position: "relative" }}>
                <Input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  style={{ paddingRight: 40 }}
                  value={passwords.current}
                  onChange={e => setPasswords({...passwords, current: e.target.value})}
                />
                <button
                  onClick={() => setShowPass(s => !s)}
                  style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    color: C.gray400, display: "flex", alignItems: "center", padding: 0,
                  }}
                >
                  <EyeIcon />
                </button>
              </div>
            </div>
            <div>
              <FieldLabel>New Password</FieldLabel>
              <Input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={passwords.new}
                onChange={e => setPasswords({...passwords, new: e.target.value})}
              />
            </div>
            <div>
              <FieldLabel>Confirm New Password</FieldLabel>
              <Input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={passwords.confirm}
                onChange={e => setPasswords({...passwords, confirm: e.target.value})}
              />
            </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <PrimaryButton onClick={handleUpdate} saved={updated}>
            {updated ? "✓ Password Updated" : "Update Password"}
          </PrimaryButton>
        </div>
      </Card>

      {/* 2FA Card */}
      <Card>
        <SectionLabel>Two-Factor Authentication</SectionLabel>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.gray700 }}>Authenticator App</p>
              {twoFA && <Badge label="Enabled" variant="success" />}
            </div>
            <p style={{ fontSize: 11, color: C.gray400, lineHeight: 1.6, maxWidth: 340 }}>
              Use an authenticator app like Google Authenticator or Authy to generate time-based one-time passwords.
            </p>
          </div>
          <Toggle enabled={twoFA} onChange={setTwoFA} />
        </div>
      </Card>
    </div>
  );
};

// ─── Tab Icon Map ─────────────────────────────────────────────────────────────

const TabIcon = ({ tab, active }) => {
  const color = active ? C.teal : C.gray400;
  const paths = {
    General: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </>
    ),
    Security: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
  };
  return (
    <svg width="15" height="15" fill="none" stroke={color} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      {paths[tab]}
    </svg>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [active, setActive] = useState("General");
  const [orgImage, setOrgImage] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resp = await fetch("http://localhost:5000/api/users/profile", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.message || "Failed to fetch profile");
        setProfile(data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile && profile.companyLogo) {
      setOrgImage(profile.companyLogo);
    }
  }, [profile]);

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: C.bg,
      minHeight: "100vh",
      width: "100%",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; background: #f4f8f9; }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          color: ${C.gray500};
          background: transparent;
          transition: all 180ms ease;
          white-space: nowrap;
          position: relative;
          z-index: 10;
        }
        .tab-btn.active {
          color: ${C.teal};
          font-weight: 600;
          background: ${C.white};
          box-shadow: 0 1px 4px rgba(56,128,135,0.10);
        }
        .tab-btn:not(.active):hover {
          background: ${C.gray100};
          color: ${C.gray700};
        }

        @media (max-width: 480px) {
          .page-header { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .tabs-bar { overflow-x: auto; padding-bottom: 2px; }
        }
      `}</style>

      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "clamp(16px, 4vw, 40px) clamp(12px, 4vw, 32px)",
        width: "100%",
      }}>
        {/* Page Header */}
        <div className="page-header" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}>
          <div>
            <h1 style={{ fontSize: "clamp(18px, 4vw, 24px)", fontWeight: 700, color: C.gray900, lineHeight: 1.2 }}>Settings</h1>
            <p style={{ fontSize: 13, color: C.gray400, marginTop: 4 }}>
              Manage your platform preferences and account configuration.
            </p>
          </div>
        </div>

        {/* Top Tab Bar */}
        <div className="tabs-bar" style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: C.gray100,
          borderRadius: 14,
          padding: 5,
          marginBottom: 24,
          width: "fit-content",
          maxWidth: "100%",
        }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`tab-btn${active === tab ? " active" : ""}`}
            >
              <TabIcon tab={tab} active={active === tab} />
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {active === "General"
          ? <GeneralSettings 
              orgImage={orgImage} 
              onImageChange={setOrgImage} 
              profile={profile} 
              loading={loading}
            />
          : <SecuritySettings />
        }
      </div>
    </div>
  );
}