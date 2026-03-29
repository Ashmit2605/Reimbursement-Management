import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText, Settings, Menu, X, User, LogOut, Wallet } from 'lucide-react'
import { useState } from 'react'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  .fin-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
  .fin-wrap { font-family: 'Poppins', sans-serif; display: flex; height: 100vh; overflow: hidden; }

  /* ── Sidebar ── */
  .fin-sidebar {
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
  .fin-sidebar.open { transform: translateX(0); }
  @media (min-width: 1024px) {
    .fin-sidebar { position: sticky; top: 0; transform: translateX(0); }
  }

  /* Logo */
  .fin-logo {
    padding: 20px 18px 16px;
    border-bottom: 1px solid rgba(111,179,184,0.13);
    display: flex; align-items: center; justify-content: space-between;
    flex-shrink: 0;
  }
  .fin-logo-inner { display: flex; align-items: center; gap: 11px; }
  .fin-logo-icon {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, #17252A, #388087);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 3px 10px rgba(23,37,42,0.22); flex-shrink: 0;
  }
  .fin-logo-icon svg { color: #fff; width: 17px; height: 17px; }
  .fin-logo-text { font-size: 17px; font-weight: 700; color: #17252A; letter-spacing: -0.3px; }
  .fin-logo-text span { color: #388087; }

  .fin-close-btn {
    width: 28px; height: 28px; border-radius: 8px; border: none;
    background: rgba(111,179,184,0.08); cursor: pointer; color: #7aa8ae;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s; flex-shrink: 0;
  }
  .fin-close-btn:hover { background: #ffe0e0; color: #c0504d; }
  .fin-close-btn svg { width: 14px; height: 14px; }
  @media (min-width: 1024px) { .fin-close-btn { display: none; } }

  /* Nav */
  .fin-nav {
    flex: 1; padding: 12px 10px;
    display: flex; flex-direction: column; gap: 2px;
    overflow: hidden;
  }
  .fin-nav-link {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 13px; border-radius: 10px;
    font-size: 13px; font-weight: 500; color: #7aa8ae;
    text-decoration: none; transition: all 0.15s ease;
    border: 1.5px solid transparent; flex-shrink: 0;
  }
  .fin-nav-link svg { flex-shrink: 0; width: 16px; height: 16px; }
  .fin-nav-link:hover {
    background: rgba(111,179,184,0.07); color: #388087;
    border-color: rgba(111,179,184,0.13);
  }
  .fin-nav-link.active {
    background: linear-gradient(135deg, rgba(23,37,42,0.04), rgba(56,128,135,0.07));
    color: #17252A; font-weight: 600;
    border-color: rgba(111,179,184,0.2);
    box-shadow: 0 1px 4px rgba(56,128,135,0.07);
  }
  .fin-nav-link.active svg { color: #388087; }

  /* User block */
  .fin-user { padding: 12px; border-top: 1px solid rgba(111,179,184,0.13); flex-shrink: 0; }
  .fin-user-inner {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; border-radius: 10px;
    cursor: pointer; transition: all 0.15s;
    border: 1.5px solid transparent;
  }
  .fin-user-inner:hover { background: rgba(181,74,74,0.05); border-color: rgba(181,74,74,0.12); }
  .fin-avatar {
    width: 34px; height: 34px; border-radius: 10px;
    background: linear-gradient(135deg, #17252A, #388087);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: all 0.2s;
  }
  .fin-avatar svg { color: #fff; width: 15px; height: 15px; }
  .fin-uname { font-size: 12.5px; font-weight: 600; color: #17252A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .fin-urole { font-size: 11px; color: #7aa8ae; }
  .fin-logout-ic { margin-left: auto; color: #c8dde0; flex-shrink: 0; }
  .fin-user-inner:hover .fin-logout-ic { color: #c0504d; }

  /* ── Main ── */
  .fin-main { flex: 1; display: flex; flex-direction: column; min-width: 0; background: #f4f8f9; height: 100vh; overflow: hidden; }

  /* Topbar */
  .fin-topbar {
    background: #fff;
    border-bottom: 1px solid rgba(111,179,184,0.18);
    padding: 0 22px; height: 58px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 1px 8px rgba(56,128,135,0.05); flex-shrink: 0;
  }
  .fin-menu-btn {
    width: 34px; height: 34px; border-radius: 9px; border: none;
    background: rgba(111,179,184,0.08); cursor: pointer; color: #6FB3B8;
    display: flex; align-items: center; justify-content: center; transition: all 0.15s;
  }
  .fin-menu-btn:hover { background: rgba(111,179,184,0.15); color: #388087; }
  .fin-menu-btn svg { width: 16px; height: 16px; }
  @media (min-width: 1024px) { .fin-menu-btn { display: none; } }

  .fin-topbar-title { font-size: 16px; font-weight: 700; color: #17252A; letter-spacing: -0.2px; }
  .fin-topbar-title span { color: #388087; }

  .fin-content { flex: 1; overflow-y: auto; overflow-x: hidden; }

  /* Mobile backdrop */
  .fin-backdrop {
    position: fixed; inset: 0; z-index: 40;
    background: rgba(23,37,42,0.3); backdrop-filter: blur(3px);
  }
  @media (min-width: 1024px) { .fin-backdrop { display: none; } }
`

export default function FinanceDash() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, path: 'overview' },
    { label: 'Requests', icon: FileText,         path: 'requests' },
    { label: 'Settings', icon: Settings,          path: 'settings' },
  ]

  return (
    <>
      <style>{css}</style>

      <div className="fin-wrap">
        {isSidebarOpen && <div className="fin-backdrop" onClick={() => setIsSidebarOpen(false)} />}

        <aside className={`fin-sidebar${isSidebarOpen ? ' open' : ''}`}>
          <div className="fin-logo">
            <div className="fin-logo-inner">
              <div className="fin-logo-icon"><Wallet /></div>
              <span className="fin-logo-text">Finance<span>Hub</span></span>
            </div>
            <button className="fin-close-btn" onClick={() => setIsSidebarOpen(false)}><X /></button>
          </div>

          <nav className="fin-nav">
            {navItems.map(({ label, icon: Icon, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => `fin-nav-link${isActive ? ' active' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Icon />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="fin-user">
            <div className="fin-user-inner">
              <div className="fin-avatar"><User /></div>
              <div style={{ flex:1, minWidth:0 }}>
                <div className="fin-uname">Finance User</div>
                <div className="fin-urole">Finance Officer</div>
              </div>
              <div className="fin-logout-ic"><LogOut size={13} /></div>
            </div>
          </div>
        </aside>

        <main className="fin-main">
          <header className="fin-topbar">
            <button className="fin-menu-btn" onClick={() => setIsSidebarOpen(true)}><Menu /></button>
            <div className="fin-topbar-title">Finance <span>Portal</span></div>
            <div></div>
          </header>

          <div className="fin-content">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  )
}
