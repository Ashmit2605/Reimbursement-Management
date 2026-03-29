import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText, Settings, Menu, X, User } from 'lucide-react'
import { useState } from 'react'

export default function ManagerLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, path: 'overview' },
    { label: 'Requests', icon: FileText, path: 'requests', badge: 8 },
    { label: 'Settings', icon: Settings, path: 'settings' }
  ]

  const LogoutModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsLogoutModalOpen(false)} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all duration-300">
        <div className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Logout</h3>
          <p className="text-gray-500 mb-8">Are you sure you want to log out?</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => { console.log('Logging out...'); setIsLogoutModalOpen(false) }} className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/20">Logout</button>
            <button onClick={() => setIsLogoutModalOpen(false)} className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl transition-colors">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative flex min-h-screen bg-gray-50 font-['Poppins',sans-serif]">
      {isLogoutModalOpen && <LogoutModal />}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300" onClick={() => setIsSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5B8A8E] to-[#8FB3B8] flex items-center justify-center">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-[#5B8A8E]">ManagerHub</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-[#5B8A8E] hover:bg-gray-50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-[#5B8A8E]/10 to-[#8FB3B8]/10 text-[#5B8A8E] font-medium' : 'text-[#5B8A8E]/70 hover:bg-gray-50 hover:text-[#5B8A8E]'}`}>
                <Icon size={20} strokeWidth={2} />
                <span className="flex-1 text-left text-[15px]">{item.label}</span>
                {item.badge && <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-600">{item.badge}</span>}
              </NavLink>
            )
          })}
        </nav>

        <div className="p-6 border-t border-gray-100">
          <div onClick={() => setIsLogoutModalOpen(true)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 group cursor-pointer transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5B8A8E] to-[#8FB3B8] flex items-center justify-center group-hover:from-red-400 group-hover:to-red-500 transition-all duration-300">
              <User size={18} className="text-white" />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-semibold text-[#5B8A8E] group-hover:text-red-600 truncate transition-colors">Manager User</div>
              <div className="text-xs text-[#5B8A8E]/70 group-hover:text-red-500 truncate transition-colors">Manager</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-[#5B8A8E] hover:bg-gray-100 rounded-lg">
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
          <div className="w-10 h-10" />
        </header>

        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
