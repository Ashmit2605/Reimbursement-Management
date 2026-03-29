import { ArrowRight, Twitter, Linkedin, Github, Mail } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-24 bg-[#f4f8f9]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative bg-[#17252A] rounded-3xl px-8 py-16 text-center overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#388087]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[200px] bg-[#6FB3B8]/8 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-[#C2EDCE]/5 rounded-full blur-2xl pointer-events-none" />

          {/* Geometric accents */}
          <div className="absolute top-8 right-12 w-16 h-16 border border-[#388087]/20 rounded-2xl rotate-12" />
          <div className="absolute bottom-8 left-12 w-10 h-10 border border-[#6FB3B8]/15 rounded-xl -rotate-6" />

          <div className="relative z-10">
            <span className="inline-block text-xs font-600 text-[#6FB3B8] tracking-widest uppercase bg-[#6FB3B8]/10 px-4 py-1.5 rounded-full mb-5">
              Get Started Today
            </span>
            <h2 className="text-3xl sm:text-4xl font-700 text-white tracking-tight mb-4 max-w-lg mx-auto leading-tight">
              Start managing expenses{' '}
              <span className="text-[#6FB3B8]">smarter</span> today
            </h2>
            <p className="text-[#7aa8ae] text-base mb-8 max-w-md mx-auto leading-relaxed">
              Join hundreds of companies that trust TrackCD to streamline their reimbursement process.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#" className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-[#388087] text-white text-sm font-600 rounded-xl hover:bg-[#6FB3B8] transition-all duration-200 shadow-lg shadow-[#388087]/30 hover:-translate-y-0.5">
                Create Free Account
                <ArrowRight size={16} />
              </a>
              <a href="#" className="w-full sm:w-auto px-7 py-3.5 border border-white/15 text-white/80 text-sm font-600 rounded-xl hover:bg-white/8 hover:text-white transition-all duration-200">
                View Demo
              </a>
            </div>
            <p className="text-xs text-[#5a7b80] mt-5">No credit card required · Free 14-day trial · Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const links = {
    Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Support: ['Documentation', 'Help Center', 'Contact', 'Status'],
    Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
  }

  return (
    <footer className="bg-[#17252A] text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand col */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center">
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                  <path d="M10 2L18 7V13L10 18L2 13V7L10 2Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round"/>
                  <circle cx="10" cy="10" r="2.5" fill="white" fillOpacity="0.9"/>
                </svg>
              </div>
              <span className="text-[17px] font-600 text-white">Track<span className="text-[#6FB3B8]">CD</span></span>
            </a>
            <p className="text-[13px] text-[#5a7b80] leading-relaxed mb-5 max-w-[210px]">
              The smartest way to manage employee reimbursements at scale.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#388087]/30 flex items-center justify-center transition-colors duration-200">
                  <Icon size={14} className="text-[#7aa8ae]" />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <div className="text-xs font-600 text-[#7aa8ae] uppercase tracking-widest mb-4">{group}</div>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-[13px] text-[#5a7b80] hover:text-[#6FB3B8] transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#3a5a60]">© {new Date().getFullYear()} TrackCD. All rights reserved.</p>
          <p className="text-xs text-[#3a5a60]">Made with care for teams everywhere.</p>
        </div>
      </div>
    </footer>
  )
}