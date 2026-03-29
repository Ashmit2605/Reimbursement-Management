import React, { useState } from 'react';
import { BarChart3, FileText, Settings, LayoutDashboard, User, Menu, X } from 'lucide-react';

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'requests', label: 'Requests', icon: FileText, badge: 12 },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Logout Modal Component
  const LogoutModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsLogoutModalOpen(false)}
      />
      
      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
        <div className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Logout</h3>
          <p className="text-gray-500 mb-8">Are you sure you want to log out of your session?</p>
          
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => {
                console.log('Logging out...');
                // Add actual logout logic here
                setIsLogoutModalOpen(false);
              }}
              className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/20"
            >
              Logout
            </button>
            <button 
              onClick={() => setIsLogoutModalOpen(false)}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative flex min-h-screen bg-gray-50 font-['Poppins',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
      `}</style>

      {/* Logout Modal */}
      {isLogoutModalOpen && <LogoutModal />}

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo Section */}
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-[#388087]">AdminHub</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-[#388087] hover:bg-gray-50 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  setIsSidebarOpen(false); // Close sidebar after navigation on mobile
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#388087]/10 to-[#6FB3B8]/10 text-[#388087] font-medium'
                    : 'text-[#388087]/70 hover:bg-gray-50 hover:text-[#388087]'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="flex-1 text-left text-[15px]">{item.label}</span>
                {item.badge && (
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    isActive
                      ? 'bg-[#388087] text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-6 border-t border-gray-100">
          <div 
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 group cursor-pointer transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center group-hover:from-red-400 group-hover:to-red-500 transition-all duration-300">
              <User size={18} className="text-white" />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-semibold text-[#388087] group-hover:text-red-600 truncate transition-colors">Admin User</div>
              <div className="text-xs text-[#388087]/70 group-hover:text-red-500 truncate transition-colors">Administrator</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 sm:py-6 flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-[#388087] hover:bg-gray-50 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 capitalize flex-1">
            {navItems.find(item => item.id === activeNav)?.label}
          </h1>
        </header>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          {/* Page content will go here */}
        </div>
      </main>
    </div>
  );
}