import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText, Settings, Menu, X, User, LogOut } from 'lucide-react'
import { useState } from 'react'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  .adm-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
  .adm-wrap { font-family: 'Poppins', sans-serif; display: flex; height: 100vh; overflow: hidden; }

  /* ── Sidebar ── */
  .adm-sidebar {
    width: 252px; flex-shrink: 0;
    background: #fff;
    border-right: 1px solid rgba(111,179,184,0.18);
    display: flex; flex-direction: column;
    height: 100vh; overflow: hidden;
    box-shadow: 2px 0 16px rgba(56,128,135,0.06);
    position: fixed; top: 0; left: 0; z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.28s cubic-bezier(.4,0,.2,1);
  }
  .adm-sidebar.open { transform: translateX(0); }
  @media (min-width: 1024px) {
    .adm-sidebar { position: sticky; top: 0; transform: translateX(0); }
  }

  /* Logo */
  .adm-logo {
    padding: 20px 18px 16px;
    border-bottom: 1px solid rgba(111,179,184,0.13);
    display: flex; align-items: center; justify-content: space-between;
    flex-shrink: 0;
  }
  .adm-logo-inner { display: flex; align-items: center; gap: 11px; }
  .adm-logo-icon {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, #17252A, #388087);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 3px 10px rgba(23,37,42,0.22); flex-shrink: 0;
  }
  .adm-logo-icon svg { color: #fff; width: 17px; height: 17px; }
  .adm-logo-text { font-size: 17px; font-weight: 700; color: #17252A; letter-spacing: -0.3px; }
  .adm-logo-text span { color: #388087; }

  .adm-close-btn {
    width: 28px; height: 28px; border-radius: 8px; border: none;
    background: rgba(111,179,184,0.08); cursor: pointer; color: #7aa8ae;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s; flex-shrink: 0;
  }
  .adm-close-btn:hover { background: #ffe0e0; color: #c0504d; }
  .adm-close-btn svg { width: 14px; height: 14px; }
  @media (min-width: 1024px) { .adm-close-btn { display: none; } }

  /* Nav */
  .adm-nav {
    flex: 1; padding: 12px 10px;
    display: flex; flex-direction: column; gap: 2px;
    overflow: hidden;
  }
  .adm-nav-link {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 13px; border-radius: 10px;
    font-size: 13px; font-weight: 500; color: #7aa8ae;
    text-decoration: none; transition: all 0.15s ease;
    border: 1.5px solid transparent; flex-shrink: 0;
  }
  .adm-nav-link svg { flex-shrink: 0; width: 16px; height: 16px; }
  .adm-nav-link:hover {
    background: rgba(111,179,184,0.07); color: #388087;
    border-color: rgba(111,179,184,0.13);
  }
  .adm-nav-link.active {
    background: linear-gradient(135deg, rgba(23,37,42,0.04), rgba(56,128,135,0.07));
    color: #17252A; font-weight: 600;
    border-color: rgba(111,179,184,0.2);
    box-shadow: 0 1px 4px rgba(56,128,135,0.07);
  }
  .adm-nav-link.active svg { color: #388087; }

  /* Badge */
  .adm-badge {
    margin-left: auto;
    padding: 2px 8px; border-radius: 20px;
    font-size: 11px; font-weight: 700;
    background: rgba(181,74,74,0.1); color: #b54a4a;
    border: 1px solid rgba(181,74,74,0.2);
  }
  .adm-nav-link.active .adm-badge {
    background: rgba(56,128,135,0.1); color: #388087;
    border-color: rgba(56,128,135,0.2);
  }

  /* User block */
  .adm-user { padding: 12px; border-top: 1px solid rgba(111,179,184,0.13); flex-shrink: 0; }
  .adm-user-inner {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; border-radius: 10px;
    cursor: pointer; transition: all 0.15s;
    border: 1.5px solid transparent;
  }
  .adm-user-inner:hover { background: rgba(181,74,74,0.05); border-color: rgba(181,74,74,0.12); }
  .adm-avatar {
    width: 34px; height: 34px; border-radius: 10px;
    background: linear-gradient(135deg, #6FB3B8, #BADFE7);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: all 0.2s;
  }
  .adm-avatar svg { color: #fff; width: 15px; height: 15px; }
  .adm-user-inner:hover .adm-avatar { background: linear-gradient(135deg, #e57373, #c0504d); }
  .adm-uname { font-size: 12.5px; font-weight: 600; color: #17252A; transition: color 0.15s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .adm-urole { font-size: 11px; color: #7aa8ae; transition: color 0.15s; }
  .adm-user-inner:hover .adm-uname { color: #c0504d; }
  .adm-user-inner:hover .adm-urole { color: #e57373; }
  .adm-logout-ic { margin-left: auto; color: #c8dde0; flex-shrink: 0; transition: color 0.15s; }
  .adm-user-inner:hover .adm-logout-ic { color: #c0504d; }

  /* ── Main ── */
  .adm-main { flex: 1; display: flex; flex-direction: column; min-width: 0; background: #f4f8f9; height: 100vh; overflow: hidden; }

  /* Topbar */
  .adm-topbar {
    background: #fff;
    border-bottom: 1px solid rgba(111,179,184,0.18);
    padding: 0 22px; height: 58px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 1px 8px rgba(56,128,135,0.05); flex-shrink: 0;
  }
  .adm-menu-btn {
    width: 34px; height: 34px; border-radius: 9px; border: none;
    background: rgba(111,179,184,0.08); cursor: pointer; color: #6FB3B8;
    display: flex; align-items: center; justify-content: center; transition: all 0.15s;
  }
  .adm-menu-btn:hover { background: rgba(111,179,184,0.15); color: #388087; }
  .adm-menu-btn svg { width: 16px; height: 16px; }
  @media (min-width: 1024px) { .adm-menu-btn { display: none; } }

  .adm-topbar-title { font-size: 16px; font-weight: 700; color: #17252A; letter-spacing: -0.2px; }
  .adm-topbar-title span { color: #388087; }

  .adm-topbar-right { display: flex; align-items: center; gap: 8px; }
  .adm-notif-btn {
    width: 34px; height: 34px; border-radius: 9px;
    background: rgba(111,179,184,0.08); border: 1.5px solid rgba(111,179,184,0.15);
    display: flex; align-items: center; justify-content: center;
    color: #6FB3B8; cursor: pointer; transition: all 0.15s; position: relative;
  }
  .adm-notif-btn:hover { background: rgba(111,179,184,0.15); color: #388087; }
  .adm-notif-btn svg { width: 15px; height: 15px; }
  .adm-notif-dot {
    position: absolute; top: 7px; right: 7px;
    width: 6px; height: 6px; border-radius: 50%;
    background: #b54a4a; border: 1.5px solid #fff;
  }

  .adm-content { flex: 1; overflow-y: auto; overflow-x: hidden; }

  /* Mobile backdrop */
  .adm-backdrop {
    position: fixed; inset: 0; z-index: 40;
    background: rgba(23,37,42,0.3); backdrop-filter: blur(3px);
  }
  @media (min-width: 1024px) { .adm-backdrop { display: none; } }

  /* ── Logout Modal ── */
  .adm-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(23,37,42,0.38);
    backdrop-filter: blur(7px) saturate(0.9);
    display: flex; align-items: center; justify-content: center;
    padding: 16px; animation: admFI 0.18s ease;
  }
  @keyframes admFI { from{opacity:0} to{opacity:1} }
  .adm-modal {
    background: #fff; border-radius: 20px; width: 100%; max-width: 340px;
    box-shadow: 0 24px 64px rgba(23,37,42,0.22), 0 0 0 1px rgba(111,179,184,0.16);
    animation: admSU 0.2s ease; overflow: hidden;
  }
  @keyframes admSU { from{transform:translateY(18px);opacity:0} to{transform:translateY(0);opacity:1} }
  .adm-modal-body { padding: 34px 26px 26px; text-align: center; }
  .adm-modal-icon {
    width: 52px; height: 52px; border-radius: 14px;
    background: rgba(181,74,74,0.08); border: 1.5px solid rgba(181,74,74,0.15);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px; color: #c0504d;
  }
  .adm-modal-icon svg { width: 22px; height: 22px; }
  .adm-modal-title { font-size: 16px; font-weight: 700; color: #17252A; margin-bottom: 6px; }
  .adm-modal-sub { font-size: 12.5px; color: #7aa8ae; margin-bottom: 22px; line-height: 1.55; }
  .adm-modal-btns { display: flex; flex-direction: column; gap: 9px; }
  .adm-btn-logout {
    padding: 11px; border-radius: 10px; border: none;
    background: linear-gradient(135deg, #b54a4a, #c0504d); color: #fff;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
    box-shadow: 0 3px 10px rgba(181,74,74,0.22);
  }
  .adm-btn-logout:hover { transform: translateY(-1px); box-shadow: 0 5px 16px rgba(181,74,74,0.3); }
  .adm-btn-cancel {
    padding: 11px; border-radius: 10px;
    background: transparent; color: #7aa8ae;
    border: 1.5px solid #e2eef0;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .adm-btn-cancel:hover { border-color: #6FB3B8; color: #388087; }
`

function AdminDash() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, path: 'overview' },
    { label: 'Manage', icon: User,           path: 'manage' },
    { label: 'Requests', icon: FileText,         path: 'requests', badge: 12 },
    { label: 'Settings', icon: Settings,          path: 'settings' },
  ]

  return (
    <>
      <style>{css}</style>

      <div className="adm-wrap">

        {/* Mobile backdrop */}
        {isSidebarOpen && (
          <div className="adm-backdrop" onClick={() => setIsSidebarOpen(false)} />
        )}

        {/* ── Logout Modal ── */}
        {isLogoutModalOpen && (
          <div className="adm-overlay" onClick={e => e.target.classList.contains('adm-overlay') && setIsLogoutModalOpen(false)}>
            <div className="adm-modal">
              <div className="adm-modal-body">
                <div className="adm-modal-icon"><LogOut /></div>
                <div className="adm-modal-title">Confirm Logout</div>
                <div className="adm-modal-sub">Are you sure you want to log out of your account?</div>
                <div className="adm-modal-btns">
                  <button className="adm-btn-logout" onClick={() => { console.log('Logging out...'); setIsLogoutModalOpen(false) }}>
                    Yes, Logout
                  </button>
                  <button className="adm-btn-cancel" onClick={() => setIsLogoutModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Sidebar ── */}
        <aside className={`adm-sidebar${isSidebarOpen ? ' open' : ''}`}>

          {/* Logo */}
          <div className="adm-logo">
            <div className="adm-logo-inner">
              <div className="adm-logo-icon"><LayoutDashboard /></div>
              <span className="adm-logo-text">Admin<span>Hub</span></span>
            </div>
            <button className="adm-close-btn" onClick={() => setIsSidebarOpen(false)}><X /></button>
          </div>

          {/* Nav */}
          <nav className="adm-nav">
            {navItems.map(({ label, icon: Icon, path, badge }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => `adm-nav-link${isActive ? ' active' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Icon />
                {label}
                {badge && <span className="adm-badge">{badge}</span>}
              </NavLink>
            ))}
          </nav>

          {/* User / logout */}
          <div className="adm-user">
            <div className="adm-user-inner" onClick={() => setIsLogoutModalOpen(true)}>
              <div className="adm-avatar"><User /></div>
              <div style={{ flex:1, minWidth:0 }}>
                <div className="adm-uname">Admin User</div>
                <div className="adm-urole">Administrator</div>
              </div>
              <div className="adm-logout-ic"><LogOut size={13} /></div>
            </div>
          </div>
        </aside>

        {/* ── Main area ── */}
        <main className="adm-main">

          {/* Topbar */}
          <header className="adm-topbar">
            <button className="adm-menu-btn" onClick={() => setIsSidebarOpen(true)}><Menu /></button>
            <div className="adm-topbar-title">Admin <span>Dashboard</span></div>
            <div className="adm-topbar-right">
              <div className="adm-notif-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <span className="adm-notif-dot" />
              </div>
            </div>
          </header>

          {/* Routed content */}
          <div className="adm-content">
            <Outlet />
          </div>

        </main>
      </div>
    </>
  )
}

export default AdminDash