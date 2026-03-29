import { useState } from 'react'
import { Menu, X, Hexagon } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = ['Home', 'Features', 'How It Works']

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e2eef0]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#17252A] to-[#388087] flex items-center justify-center shadow-md group-hover:shadow-[#388087]/30 transition-shadow duration-300">
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
              <path d="M10 2L18 7V13L10 18L2 13V7L10 2Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
              <circle cx="10" cy="10" r="2.5" fill="white" fillOpacity="0.9" />
            </svg>
          </div>
          <span className="text-[17px] font-700 text-[#17252A] tracking-tight">
            Track<span className="text-[#388087]">CD</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-500 text-[#5a7b80] hover:text-[#17252A] transition-colors duration-200 relative after:absolute after:-bottom-0.75 after:left-0 after:w-0 after:h-0.5 after:bg-[#388087] after:rounded-full hover:after:w-full after:transition-all after:duration-250"
            >
              {l}
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="px-4 py-2 text-sm font-600 text-[#388087] border border-[#6FB3B8] rounded-lg hover:bg-[#388087]/5 transition-all duration-200">
            Login
          </a>
          <a href="#" className="px-4 py-2 text-sm font-600 text-white bg-[#17252A] rounded-lg hover:bg-[#388087] transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-px">
            Sign Up
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[#17252A]" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#e2eef0] px-6 py-4 flex flex-col gap-3">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-500 text-[#5a7b80] hover:text-[#17252A] py-1" onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
          <div className="flex gap-3 pt-2 border-t border-[#e2eef0]">
            <a href="#" className="flex-1 text-center py-2 text-sm font-600 text-[#388087] border border-[#6FB3B8] rounded-lg">Login</a>
            <a href="#" className="flex-1 text-center py-2 text-sm font-600 text-white bg-[#17252A] rounded-lg">Sign Up</a>
          </div>
        </div>
      )}
    </nav>
  )
}