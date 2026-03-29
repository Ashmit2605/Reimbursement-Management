import { useState, useEffect } from "react";
import { Shield, Briefcase, User, Eye, EyeOff } from "lucide-react";

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  dark:  "#388087",
  mid:   "#6FB3B8",
  light: "#BADFE7",
  pale:  "#C2EDCE",
  navy:  "#17252A",
  white: "#FEFFFF",
};

// ─── Inline CSS ──────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { font-family: 'Poppins', sans-serif; background: #fff; min-height: 100vh; }

  .ar {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    padding: 40px 20px;
    position: relative;
    overflow: hidden;
  }
  .ar::before {
    content: '';
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, ${C.light} 0%, transparent 65%);
    opacity: 0.18;
    top: -180px; left: -160px;
    pointer-events: none;
  }
  .ar::after {
    content: '';
    position: absolute;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, ${C.pale} 0%, transparent 65%);
    opacity: 0.18;
    bottom: -100px; right: -80px;
    pointer-events: none;
  }

  /* ── Card ── */
  .card {
    position: relative; z-index: 2;
    width: 100%; max-width: 860px;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(56,128,135,0.04), 0 12px 40px rgba(56,128,135,0.10), 0 0 0 1px rgba(111,179,184,0.16);
    display: flex;
    min-height: 520px;
  }

  /* ── Sidebar ── */
  .sb {
    width: 256px; flex-shrink: 0;
    background: ${C.navy};
    padding: 38px 22px;
    display: flex; flex-direction: column;
  }
  .sb-logo {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 34px;
  }
  .sb-mark {
    width: 34px; height: 34px;
    border-radius: 9px;
    background: linear-gradient(135deg, ${C.dark}, ${C.mid});
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 3px 10px rgba(56,128,135,0.4);
  }
  .sb-mark svg { width: 17px; height: 17px; }
  .sb-name {
    font-family: 'Poppins', sans-serif;
    font-size: 18px; font-weight: 600; color: ${C.white}; letter-spacing: 0.2px;
  }
  .sb-label {
    font-size: 10.5px; font-weight: 600; letter-spacing: 1.3px;
    text-transform: uppercase; color: rgba(186,223,231,0.45);
    margin-bottom: 12px;
  }
  .rb {
    display: flex; align-items: center; gap: 11px;
    width: 100%; padding: 10px 12px;
    border-radius: 11px; border: 1px solid transparent;
    background: transparent; cursor: pointer;
    font-family: 'Poppins', sans-serif;
    color: rgba(254,255,255,0.58);
    text-align: left; margin-bottom: 5px;
    transition: all 0.16s ease;
  }
  .rb:hover {
    background: rgba(111,179,184,0.1);
    border-color: rgba(111,179,184,0.18);
    color: ${C.white};
  }
  .rb.on {
    background: ${C.dark};
    border-color: ${C.mid};
    color: ${C.white};
    box-shadow: 0 3px 12px rgba(56,128,135,0.32);
  }
  .rb-icon {
    width: 31px; height: 31px;
    border-radius: 8px;
    background: rgba(111,179,184,0.14);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: background 0.16s;
  }
  .rb.on .rb-icon { background: rgba(255,255,255,0.14); }
  .rb-icon svg { width: 15px; height: 15px; color: ${C.light}; }
  .sb-foot {
    margin-top: auto; padding-top: 22px;
    border-top: 1px solid rgba(111,179,184,0.1);
    font-size: 11.5px; color: rgba(186,223,231,0.35); line-height: 1.6;
  }

  /* ── Form panel ── */
  .fp {
    flex: 1; background: #fff;
    padding: 48px 44px;
    display: flex; flex-direction: column; justify-content: center;
  }
  .fp-eye {
    display: flex; align-items: center; gap: 8px; margin-bottom: 4px;
  }
  .fp-eye svg { color: ${C.dark}; width: 21px; height: 21px; }
  .fp-title {
    font-family: 'Poppins', sans-serif;
    font-size: 22px; font-weight: 600; color: ${C.navy}; letter-spacing: -0.3px;
  }
  .fp-sub {
    font-size: 13px; color: #7aa8ae;
    margin-bottom: 26px; margin-top: 3px;
  }

  /* fields */
  .field { margin-bottom: 15px; }
  .field label {
    display: block; font-size: 12.5px; font-weight: 600;
    color: ${C.navy}; margin-bottom: 6px;
  }
  .fw { position: relative; }
  .fi {
    width: 100%; padding: 11px 14px;
    border-radius: 10px; border: 1.5px solid #e2eef0;
    background: #f9fdfd;
    font-family: 'Poppins', sans-serif; font-size: 14px; color: ${C.navy};
    outline: none; transition: all 0.17s ease;
  }
  .fi::placeholder { color: #b0cdd1; }
  .fi:focus { border-color: ${C.mid}; background: #fff; box-shadow: 0 0 0 3px rgba(111,179,184,0.13); }
  .fi.pw-fi { padding-right: 42px; }
  .fi.err { border-color: #e07070; background: rgba(255,235,235,0.45); }
  .fi.err:focus { border-color: #e07070; box-shadow: 0 0 0 3px rgba(224,112,112,0.11); }
  .fi.ok { border-color: ${C.mid}; background: rgba(194,237,206,0.1); }

  .eye-btn {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    color: #a0bfc3; display: flex; align-items: center; padding: 2px;
    transition: color 0.15s;
  }
  .eye-btn:hover { color: ${C.dark}; }
  .eye-btn svg { width: 16px; height: 16px; }

  .hint {
    display: flex; align-items: center; gap: 5px;
    font-size: 11.5px; margin-top: 5px; font-weight: 500;
  }
  .hint.err { color: #c0504d; }
  .hint.ok  { color: ${C.dark}; }
  .hint svg { width: 12px; height: 12px; flex-shrink: 0; }

  /* cta */
  .cta {
    width: 100%; padding: 12px; border: none; border-radius: 11px;
    background: linear-gradient(135deg, ${C.navy} 0%, ${C.dark} 100%);
    color: #fff; font-family: 'Poppins', sans-serif;
    font-size: 14.5px; font-weight: 600; cursor: pointer;
    margin-top: 6px; letter-spacing: 0.15px;
    transition: all 0.18s ease;
    box-shadow: 0 4px 16px rgba(23,37,42,0.2);
  }
  .cta:hover { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(23,37,42,0.26); }
  .cta:active { transform: none; }

  /* signup outline button */
  .cta-outline {
    width: 100%; padding: 11px; border-radius: 11px;
    border: 1.5px solid ${C.mid};
    background: transparent;
    color: ${C.dark}; font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 600; cursor: pointer;
    margin-top: 8px; letter-spacing: 0.1px;
    transition: all 0.18s ease;
  }
  .cta-outline:hover {
    background: rgba(111,179,184,0.08);
    border-color: ${C.dark};
    transform: translateY(-1px);
  }
  .cta-outline:active { transform: none; }

  /* divider */
  .divider {
    display: flex; align-items: center; gap: 10px;
    margin: 14px 0; color: #c8dde0; font-size: 12px; font-weight: 500;
  }
  .divider::before, .divider::after {
    content: ''; flex: 1; height: 1px; background: #e6f0f1;
  }

  /* google button */
  .google-btn {
    width: 100%; padding: 11px 14px;
    border-radius: 11px; border: 1.5px solid #e2eef0;
    background: #fff; cursor: pointer;
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 500;
    color: ${C.navy};
    display: flex; align-items: center; justify-content: center; gap: 10px;
    transition: all 0.18s ease;
    box-shadow: 0 1px 4px rgba(56,128,135,0.06);
  }
  .google-btn:hover {
    background: #f8fcfc; border-color: ${C.mid};
    transform: translateY(-1px); box-shadow: 0 3px 10px rgba(56,128,135,0.1);
  }
  .google-btn:active { transform: none; }
  .google-btn svg { flex-shrink: 0; }

  /* footer links */
  .foot { text-align: center; font-size: 13px; color: #8faeb2; margin-top: 12px; }
  .flink {
    background: none; border: none;
    font-family: 'Poppins', sans-serif; font-size: 13px;
    font-weight: 600; color: ${C.dark}; cursor: pointer;
    transition: color 0.14s;
  }
  .flink:hover { color: ${C.navy}; text-decoration: underline; }

  /* alert */
  .alert {
    padding: 10px 14px; border-radius: 9px;
    font-size: 13px; font-weight: 500; margin-bottom: 14px; border: 1px solid;
  }
  .alert.err  { background: #fff5f5; color: #b54a4a; border-color: #f5c6c6; }
  .alert.succ { background: #f0faf5; color: #2d7a5a; border-color: #b2dfcc; }

  @media (max-width: 680px) {
    .card { flex-direction: column; }
    .sb { width: 100%; padding: 24px 18px; }
    .sb-foot { display: none; }
    .fp { padding: 30px 22px; }
  }
`;

// ─── Validation helpers ──────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const IconErr = () => (
  <svg viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6" stroke="currentColor" strokeWidth="1.3"/><path d="M6.5 3.8v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="6.5" cy="9.2" r="0.7" fill="currentColor"/></svg>
);
const IconOk = () => (
  <svg viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6" stroke="currentColor" strokeWidth="1.3"/><path d="M4 6.5l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

// ─── Roles ───────────────────────────────────────────────────────────────────
const ROLES = [
  { id: "admin",    label: "Admin",    Icon: Shield,    desc: "Full system access & configuration" },
  { id: "manager",  label: "Manager",  Icon: Briefcase, desc: "Team & operations oversight" },
  { id: "employee", label: "Employee", Icon: User,      desc: "Standard workspace access" },
];

// ─── Main Component ──────────────────────────────────────────────────────────
export default function AuthPage() {
  const [role, setRole]       = useState("admin");
  const [mode, setMode]       = useState("login");   // "login" | "forgot"
  const [showPw, setShowPw]   = useState(false);
  const [form, setForm]       = useState({ email: "", password: "", name: "", confirm: "" });
  const [touched, setTouched] = useState({ email: false });
  const [alert, setAlert]     = useState({ text: "", kind: "" });

  useEffect(() => {
    if (!alert.text) return;
    const t = setTimeout(() => setAlert({ text: "", kind: "" }), 5000);
    return () => clearTimeout(t);
  }, [alert]);

  const emailSt =
    !touched.email || !form.email ? "idle"
    : EMAIL_RE.test(form.email)   ? "ok"
    : "err";

  const fiEmail = `fi${emailSt === "err" ? " err" : emailSt === "ok" ? " ok" : ""}`;

  const cur = ROLES.find(r => r.id === role);

  const switchRole = (id) => {
    setRole(id);
    setMode("login");
    setForm({ email: "", password: "", name: "", confirm: "" });
    setTouched({ email: false });
    setAlert({ text: "", kind: "" });
    setShowPw(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setTouched({ email: true });
    if (!EMAIL_RE.test(form.email)) {
      setAlert({ text: "Please enter a valid email address.", kind: "err" });
      return;
    }
    if (!form.password) {
      setAlert({ text: "Password is required.", kind: "err" });
      return;
    }
    // ── connect your API here ──
  };

  const handleForgot = (e) => {
    e.preventDefault();
    setTouched({ email: true });
    if (!EMAIL_RE.test(form.email)) {
      setAlert({ text: "Please enter a valid email address.", kind: "err" });
      return;
    }
    // ── connect your API here ──
    setAlert({ text: "If an account exists, a reset link will be sent to your email.", kind: "succ" });
  };

  return (
    <>
      <style>{css}</style>
      <div className="ar">
        <div className="card">

          {/* ── Sidebar ── */}
          <aside className="sb">
            <div className="sb-logo">
              <div className="sb-mark">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L18 7V13L10 18L2 13V7L10 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                  <circle cx="10" cy="10" r="2.8" fill="white" fillOpacity="0.85"/>
                </svg>
              </div>
              <span className="sb-name">Squilla</span>
            </div>

            <p className="sb-label">Select Role</p>

            {ROLES.map(({ id, label, Icon }) => (
              <button
                key={id}
                className={`rb${role === id ? " on" : ""}`}
                onClick={() => switchRole(id)}
              >
                <span className="rb-icon"><Icon strokeWidth={2} /></span>
                {label}
              </button>
            ))}

            <p className="sb-foot">Accounts are created and managed by your system administrator.</p>
          </aside>

          {/* ── Form panel ── */}
          <section className="fp">
            <div className="fp-eye">
              <cur.Icon strokeWidth={2} style={{ color: C.dark, width: 21, height: 21 }} />
              <span className="fp-title">
                {mode === "forgot" ? `${cur.label} Password Recovery` : mode === "signup" ? "Sign Up" : "Sign In"}
              </span>
            </div>
            <p className="fp-sub">
              {mode === "forgot"
                ? "Enter your email address to receive a password reset link."
                : mode === "signup"
                ? "Create your admin account to get started."
                : cur.desc}
            </p>

            {alert.text && <div className={`alert ${alert.kind}`}>{alert.text}</div>}

            {/* LOGIN */}
            {mode === "login" && (
              <>
                <div className="field">
                  <label>Email Address</label>
                  <input
                    className={fiEmail}
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    onBlur={() => setTouched(t => ({ ...t, email: true }))}
                  />
                  {emailSt === "err" && <span className="hint err"><IconErr /> Enter a valid email — e.g. name@company.com</span>}
                  {emailSt === "ok"  && <span className="hint ok"><IconOk /> Looks good!</span>}
                </div>

                <div className="field">
                  <label>Password</label>
                  <div className="fw">
                    <input
                      className="fi pw-fi"
                      type={showPw ? "text" : "password"}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    />
                    <button className="eye-btn" type="button" onClick={() => setShowPw(v => !v)}>
                      {showPw ? <EyeOff strokeWidth={2} /> : <Eye strokeWidth={2} />}
                    </button>
                  </div>
                </div>

                <button className="cta" onClick={handleLogin}>Sign In →</button>

                <div className="divider">or</div>

                <button className="google-btn" type="button" onClick={() => { /* connect Google OAuth here */ }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>

                {role === "admin" && (
                  <button className="cta-outline" onClick={() => setMode("signup")}>
                    Sign Up
                  </button>
                )}

                <p className="foot" style={{ marginTop: 14 }}>Accounts are managed by your administrator.</p>
                <p className="foot" style={{ marginTop: 8 }}>
                  <button className="flink" onClick={() => { setMode("forgot"); setAlert({ text: "", kind: "" }); }}>
                    Forgot password?
                  </button>
                </p>
              </>
            )}

            {/* FORGOT PASSWORD */}
            {mode === "forgot" && (
              <>
                <div className="field">
                  <label>Email Address</label>
                  <input
                    className={fiEmail}
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    onBlur={() => setTouched(t => ({ ...t, email: true }))}
                  />
                  {emailSt === "err" && <span className="hint err"><IconErr /> Enter a valid email — e.g. name@company.com</span>}
                  {emailSt === "ok"  && <span className="hint ok"><IconOk /> Looks good!</span>}
                </div>

                <button className="cta" onClick={handleForgot}>Send Reset Link →</button>

                <p className="foot" style={{ marginTop: 14 }}>
                  <button className="flink" onClick={() => { setMode("login"); setAlert({ text: "", kind: "" }); }}>
                    ← Back to Login
                  </button>
                </p>
              </>
            )}

            {/* SIGNUP — admin only */}
            {mode === "signup" && (
              <>
                <div className="field">
                  <label>Full Name</label>
                  <input
                    className="fi"
                    type="text"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                </div>

                <div className="field">
                  <label>Email Address</label>
                  <input
                    className={fiEmail}
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    onBlur={() => setTouched(t => ({ ...t, email: true }))}
                  />
                  {emailSt === "err" && <span className="hint err"><IconErr /> Enter a valid email — e.g. name@company.com</span>}
                  {emailSt === "ok"  && <span className="hint ok"><IconOk /> Looks good!</span>}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div className="field">
                    <label>Password</label>
                    <div className="fw">
                      <input
                        className="fi pw-fi"
                        type={showPw ? "text" : "password"}
                        placeholder="••••••••"
                        value={form.password}
                        onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                      />
                      <button className="eye-btn" type="button" onClick={() => setShowPw(v => !v)}>
                        {showPw ? <EyeOff strokeWidth={2} /> : <Eye strokeWidth={2} />}
                      </button>
                    </div>
                  </div>
                  <div className="field">
                    <label>Confirm Password</label>
                    <input
                      className={`fi${form.confirm && form.confirm !== form.password ? " err" : form.confirm && form.confirm === form.password ? " ok" : ""}`}
                      type="password"
                      placeholder="••••••••"
                      value={form.confirm}
                      onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                    />
                    {form.confirm && form.confirm !== form.password && (
                      <span className="hint err"><IconErr /> Passwords don't match</span>
                    )}
                  </div>
                </div>

                <button className="cta" onClick={(e) => { e.preventDefault(); /* connect your API here */ }}>
                  Sign Up →
                </button>

                <p className="foot" style={{ marginTop: 14 }}>
                  Already have an account?{" "}
                  <button className="flink" onClick={() => { setMode("login"); setAlert({ text: "", kind: "" }); }}>
                    Sign in
                  </button>
                </p>
              </>
            )}
          </section>

        </div>
      </div>
    </>
  );
}