import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, History, FileText, Settings, Menu, X, User, LogOut } from 'lucide-react'
import { useState } from 'react'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  .emp-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
  .emp-wrap { font-family: 'Poppins', sans-serif; }

  /* ── Full-page layout: no page-level scroll ── */
  .emp-wrap { display: flex; height: 100vh; overflow: hidden; }

  /* ── Sidebar ── */
  .emp-sidebar {
    width: 252px; flex-shrink: 0;
    background: #fff;
    border-right: 1px solid rgba(111,179,184,0.18);
    display: flex; flex-direction: column;
    height: 100vh;
    box-shadow: 2px 0 16px rgba(56,128,135,0.06);
    position: fixed; top: 0; left: 0; z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.28s cubic-bezier(.4,0,.2,1);
    overflow: hidden;
  }
  .emp-sidebar.open { transform: translateX(0); }

  @media (min-width: 1024px) {
    .emp-sidebar { position: sticky; top: 0; transform: translateX(0); }
  }

  /* Logo */
  .emp-logo {
    padding: 20px 18px 16px;
    border-bottom: 1px solid rgba(111,179,184,0.13);
    display: flex; align-items: center; justify-content: space-between;
    flex-shrink: 0;
  }
  .emp-logo-inner { display: flex; align-items: center; gap: 11px; }
  .emp-logo-icon {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, #17252A, #388087);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 3px 10px rgba(23,37,42,0.22);
    flex-shrink: 0;
  }
  .emp-logo-icon svg { color: #fff; width: 17px; height: 17px; }
  .emp-logo-text { font-size: 17px; font-weight: 700; color: #17252A; letter-spacing: -0.3px; }
  .emp-logo-text span { color: #388087; }

  .emp-close-btn {
    width: 28px; height: 28px; border-radius: 8px; border: none;
    background: rgba(111,179,184,0.08); cursor: pointer; color: #7aa8ae;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s; flex-shrink: 0;
  }
  .emp-close-btn:hover { background: #ffe0e0; color: #c0504d; }
  .emp-close-btn svg { width: 14px; height: 14px; }
  @media (min-width: 1024px) { .emp-close-btn { display: none; } }

  /* Nav — fills remaining space, no overflow */
  .emp-nav {
    flex: 1;
    padding: 12px 10px;
    display: flex; flex-direction: column; gap: 2px;
    overflow: hidden;
  }

  .emp-nav-link {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 13px; border-radius: 10px;
    font-size: 13px; font-weight: 500; color: #7aa8ae;
    text-decoration: none;
    transition: all 0.15s ease;
    border: 1.5px solid transparent;
    flex-shrink: 0;
  }
  .emp-nav-link svg { flex-shrink: 0; width: 16px; height: 16px; }
  .emp-nav-link:hover {
    background: rgba(111,179,184,0.07);
    color: #388087;
    border-color: rgba(111,179,184,0.13);
  }
  .emp-nav-link.active {
    background: linear-gradient(135deg, rgba(23,37,42,0.04), rgba(56,128,135,0.07));
    color: #17252A; font-weight: 600;
    border-color: rgba(111,179,184,0.2);
    box-shadow: 0 1px 4px rgba(56,128,135,0.07);
  }
  .emp-nav-link.active svg { color: #388087; }

  /* User block — pinned to bottom */
  .emp-user { padding: 12px; border-top: 1px solid rgba(111,179,184,0.13); flex-shrink: 0; }
  .emp-user-inner {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; border-radius: 10px;
    cursor: pointer; transition: all 0.15s;
    border: 1.5px solid transparent;
  }
  .emp-user-inner:hover { background: rgba(181,74,74,0.05); border-color: rgba(181,74,74,0.12); }
  .emp-avatar {
    width: 34px; height: 34px; border-radius: 10px;
    background: linear-gradient(135deg, #6FB3B8, #BADFE7);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    transition: all 0.2s;
  }
  .emp-avatar svg { color: #fff; width: 15px; height: 15px; }
  .emp-user-inner:hover .emp-avatar { background: linear-gradient(135deg, #e57373, #c0504d); }
  .emp-uname { font-size: 12.5px; font-weight: 600; color: #17252A; transition: color 0.15s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .emp-urole { font-size: 11px; color: #7aa8ae; transition: color 0.15s; }
  .emp-user-inner:hover .emp-uname { color: #c0504d; }
  .emp-user-inner:hover .emp-urole { color: #e57373; }
  .emp-logout-ic { margin-left: auto; color: #c8dde0; flex-shrink: 0; transition: color 0.15s; }
  .emp-user-inner:hover .emp-logout-ic { color: #c0504d; }

  /* ── Main layout ── */
  .emp-main { flex: 1; display: flex; flex-direction: column; min-width: 0; background: #f4f8f9; height: 100vh; overflow: hidden; }

  /* Topbar */
  .emp-topbar {
    background: #fff;
    border-bottom: 1px solid rgba(111,179,184,0.18);
    padding: 0 22px; height: 58px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 1px 8px rgba(56,128,135,0.05);
    flex-shrink: 0;
  }
  .emp-menu-btn {
    width: 34px; height: 34px; border-radius: 9px; border: none;
    background: rgba(111,179,184,0.08); cursor: pointer; color: #6FB3B8;
    display: flex; align-items: center; justify-content: center; transition: all 0.15s;
  }
  .emp-menu-btn:hover { background: rgba(111,179,184,0.15); color: #388087; }
  .emp-menu-btn svg { width: 16px; height: 16px; }
  @media (min-width: 1024px) { .emp-menu-btn { display: none; } }

  .emp-topbar-title { font-size: 16px; font-weight: 700; color: #17252A; letter-spacing: -0.2px; }
  .emp-topbar-title span { color: #388087; }

  .emp-topbar-right { display: flex; align-items: center; gap: 8px; }
  .emp-notif-btn {
    width: 34px; height: 34px; border-radius: 9px;
    background: rgba(111,179,184,0.08); border: 1.5px solid rgba(111,179,184,0.15);
    display: flex; align-items: center; justify-content: center;
    color: #6FB3B8; cursor: pointer; transition: all 0.15s; position: relative;
  }
  .emp-notif-btn:hover { background: rgba(111,179,184,0.15); color: #388087; }
  .emp-notif-btn svg { width: 15px; height: 15px; }
  .emp-notif-dot {
    position: absolute; top: 7px; right: 7px;
    width: 6px; height: 6px; border-radius: 50%;
    background: #d4860a; border: 1.5px solid #fff;
  }

  /* Content scrolls, not the whole page */
  .emp-content { flex: 1; overflow-y: auto; overflow-x: hidden; }

  /* Mobile backdrop */
  .emp-backdrop {
    position: fixed; inset: 0; z-index: 40;
    background: rgba(23,37,42,0.3); backdrop-filter: blur(3px);
  }
  @media (min-width: 1024px) { .emp-backdrop { display: none; } }

  /* ── Logout Modal ── */
  .emp-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(23,37,42,0.38);
    backdrop-filter: blur(7px) saturate(0.9);
    display: flex; align-items: center; justify-content: center;
    padding: 16px; animation: empFI 0.18s ease;
  }
  @keyframes empFI { from{opacity:0} to{opacity:1} }
  .emp-modal {
    background: #fff; border-radius: 20px; width: 100%; max-width: 340px;
    box-shadow: 0 24px 64px rgba(23,37,42,0.22), 0 0 0 1px rgba(111,179,184,0.16);
    animation: empSU 0.2s ease; overflow: hidden;
  }
  @keyframes empSU { from{transform:translateY(18px);opacity:0} to{transform:translateY(0);opacity:1} }
  .emp-modal-body { padding: 34px 26px 26px; text-align: center; }
  .emp-modal-icon {
    width: 52px; height: 52px; border-radius: 14px;
    background: rgba(181,74,74,0.08); border: 1.5px solid rgba(181,74,74,0.15);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px; color: #c0504d;
  }
  .emp-modal-icon svg { width: 22px; height: 22px; }
  .emp-modal-title { font-size: 16px; font-weight: 700; color: #17252A; margin-bottom: 6px; }
  .emp-modal-sub { font-size: 12.5px; color: #7aa8ae; margin-bottom: 22px; line-height: 1.55; }
  .emp-modal-btns { display: flex; flex-direction: column; gap: 9px; }
  .emp-btn-logout {
    padding: 11px; border-radius: 10px; border: none;
    background: linear-gradient(135deg, #b54a4a, #c0504d); color: #fff;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
    box-shadow: 0 3px 10px rgba(181,74,74,0.22);
  }
  .emp-btn-logout:hover { transform: translateY(-1px); box-shadow: 0 5px 16px rgba(181,74,74,0.3); }
  .emp-btn-cancel {
    padding: 11px; border-radius: 10px;
    background: transparent; color: #7aa8ae;
    border: 1.5px solid #e2eef0;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.15s;
  }
  .emp-btn-cancel:hover { border-color: #6FB3B8; color: #388087; }
`

function EmployeeDash() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const navItems = [
    { label: 'Overview',  icon: LayoutDashboard, path: 'overview' },
    { label: 'History',   icon: History,          path: 'history'  },
    { label: 'Requests',  icon: FileText,         path: 'request'  },
    { label: 'Settings',  icon: Settings,         path: 'settings' },
  ]

  return (
    <>
      <style>{css}</style>

      <div className="emp-wrap">

        {/* Mobile backdrop */}
        {isSidebarOpen && (
          <div className="emp-backdrop" onClick={() => setIsSidebarOpen(false)} />
        )}

        {/* ── Logout Modal ── */}
        {isLogoutModalOpen && (
          <div className="emp-overlay" onClick={e => e.target.classList.contains('emp-overlay') && setIsLogoutModalOpen(false)}>
            <div className="emp-modal">
              <div className="emp-modal-body">
                <div className="emp-modal-icon"><LogOut /></div>
                <div className="emp-modal-title">Confirm Logout</div>
                <div className="emp-modal-sub">Are you sure you want to log out of your account?</div>
                <div className="emp-modal-btns">
                  <button className="emp-btn-logout" onClick={() => { console.log('Logging out...'); setIsLogoutModalOpen(false) }}>
                    Yes, Logout
                  </button>
                  <button className="emp-btn-cancel" onClick={() => setIsLogoutModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Sidebar ── */}
        <aside className={`emp-sidebar${isSidebarOpen ? ' open' : ''}`}>

          {/* Logo */}
          <div className="emp-logo">
            <div className="emp-logo-inner">
              <div className="emp-logo-icon"><LayoutDashboard /></div>
              <span className="emp-logo-text">Employee<span>Hub</span></span>
            </div>
            <button className="emp-close-btn" onClick={() => setIsSidebarOpen(false)}><X /></button>
          </div>

          {/* Nav links */}
          <nav className="emp-nav">
            {navItems.map(({ label, icon: Icon, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => `emp-nav-link${isActive ? ' active' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Icon />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* User / logout */}
          <div className="emp-user">
            <div className="emp-user-inner" onClick={() => setIsLogoutModalOpen(true)}>
              <div className="emp-avatar"><User /></div>
              <div style={{ flex:1, minWidth:0 }}>
                <div className="emp-uname">Sarah Johnson</div>
                <div className="emp-urole">Employee</div>
              </div>
              <div className="emp-logout-ic"><LogOut size={13} /></div>
            </div>
          </div>
        </aside>

        {/* ── Main area ── */}
        <main className="emp-main">

          {/* Topbar */}
          <header className="emp-topbar">
            <button className="emp-menu-btn" onClick={() => setIsSidebarOpen(true)}><Menu /></button>
            <div className="emp-topbar-title">Employee <span>Dashboard</span></div>
            <div className="emp-topbar-right">
              <div className="emp-notif-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <span className="emp-notif-dot" />
              </div>
            </div>
          </header>

          {/* Routed content — only this area scrolls */}
          <div className="emp-content">
            <Outlet />
          </div>

        </main>
      </div>
    </>
  )
}

export default EmployeeDash