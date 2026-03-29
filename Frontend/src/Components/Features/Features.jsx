import { Receipt, GitBranch, ScanLine, Globe } from 'lucide-react'

const features = [
  {
    icon: Receipt,
    title: 'Expense Tracking',
    desc: 'Log and monitor every expense in real-time. Categorize claims, attach receipts, and get a clear picture of spending patterns across your team.',
    color: 'text-[#388087]',
    bg: 'bg-[#388087]/8',
    border: 'border-[#388087]/15',
    accent: '#388087',
  },
  {
    icon: GitBranch,
    title: 'Multi-Level Approval',
    desc: 'Define custom approval chains — from manager to CFO. Automated routing ensures no claim falls through the cracks.',
    color: 'text-[#d4860a]',
    bg: 'bg-[#d4860a]/8',
    border: 'border-[#d4860a]/15',
    accent: '#d4860a',
  },
  {
    icon: ScanLine,
    title: 'OCR Receipt Scanning',
    desc: 'Upload a photo and let our AI extract amounts, dates, and vendor info automatically. No more manual data entry.',
    color: 'text-[#6c3fc5]',
    bg: 'bg-[#6c3fc5]/8',
    border: 'border-[#6c3fc5]/15',
    accent: '#6c3fc5',
  },
  {
    icon: Globe,
    title: 'Multi-Currency Support',
    desc: 'Handle reimbursements in any currency with live exchange rates. Perfect for distributed and international teams.',
    color: 'text-[#1565c0]',
    bg: 'bg-[#1565c0]/8',
    border: 'border-[#1565c0]/15',
    accent: '#1565c0',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-[#f4f8f9]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-600 text-[#388087] tracking-widest uppercase bg-[#388087]/8 px-4 py-1.5 rounded-full mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-700 text-[#17252A] tracking-tight mb-4">
            Everything you need to manage{' '}
            <span className="text-[#388087]">expenses</span>
          </h2>
          <p className="text-[#7aa8ae] text-base max-w-xl mx-auto leading-relaxed">
            A complete toolkit designed to eliminate the friction between submitting a claim and getting reimbursed.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc, color, bg, border, accent }) => (
            <div
              key={title}
              className={`group bg-white rounded-2xl p-6 border ${border} hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-default`}
              style={{ '--accent': accent }}
            >
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={22} className={color} strokeWidth={2} />
              </div>
              <h3 className="text-[15px] font-700 text-[#17252A] mb-2.5 leading-tight">{title}</h3>
              <p className="text-[13px] text-[#7aa8ae] leading-relaxed">{desc}</p>

              {/* Bottom accent */}
              <div
                className="mt-5 h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-400"
                style={{ background: accent }}
              />
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { val: '500+', label: 'Companies' },
            { val: '98%', label: 'Approval Accuracy' },
            { val: '1.4 days', label: 'Avg. Process Time' },
            { val: '₹50Cr+', label: 'Reimbursed' },
          ].map(({ val, label }) => (
            <div key={label} className="bg-white rounded-2xl p-5 text-center border border-[#e2eef0] hover:border-[#6FB3B8]/40 transition-colors duration-200">
              <div className="text-2xl font-700 text-[#17252A] mb-1">{val}</div>
              <div className="text-xs text-[#7aa8ae] font-500">{label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}