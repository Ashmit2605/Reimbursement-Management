import { Upload, UserCheck, CheckCircle2, ArrowRight } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: Upload,
    title: 'Submit Expense',
    desc: 'Employee fills out a claim form, attaches receipts, and submits. OCR auto-fills details from uploaded bills.',
    color: 'text-[#388087]',
    bg: 'bg-[#388087]/8',
    iconBg: 'bg-[#388087]',
  },
  {
    num: '02',
    icon: UserCheck,
    title: 'Manager Approval',
    desc: 'Claim is routed to the line manager automatically. They review, add remarks, and approve or reject with one click.',
    color: 'text-[#d4860a]',
    bg: 'bg-[#d4860a]/8',
    iconBg: 'bg-[#d4860a]',
  },
  {
    num: '03',
    icon: CheckCircle2,
    title: 'Final Decision',
    desc: 'Finance or CFO gives final approval. Employee gets notified instantly and reimbursement is processed to their account.',
    color: 'text-[#17252A]',
    bg: 'bg-[#17252A]/6',
    iconBg: 'bg-[#17252A]',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white overflow-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-600 text-[#388087] tracking-widest uppercase bg-[#388087]/8 px-4 py-1.5 rounded-full mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-700 text-[#17252A] tracking-tight mb-4">
            From claim to payout in{' '}
            <span className="text-[#388087]">3 simple steps</span>
          </h2>
          <p className="text-[#7aa8ae] text-base max-w-xl mx-auto leading-relaxed">
            No more email chains or lost receipts. TrackCD guides every claim from start to finish.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop */}
          <div className="hidden lg:block absolute top-13 left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-px bg-linear-to-r from-[#388087]/30 via-[#d4860a]/30 to-[#17252A]/30 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 relative z-10">
            {steps.map(({ num, icon: Icon, title, desc, color, bg, iconBg }, idx) => (
              <div key={title} className="flex flex-col items-center lg:items-start text-center lg:text-left group">

                {/* Icon circle */}
                <div className="relative mb-6">
                  <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                    <Icon size={24} color="white" strokeWidth={2} />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-[#e2eef0] flex items-center justify-center">
                    <span className="text-[9px] font-700 text-[#17252A]">{num}</span>
                  </div>
                </div>

                {/* Card */}
                <div className={`${bg} rounded-2xl p-6 w-full border border-transparent hover:border-[#e2eef0] hover:bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                  <h3 className="text-[16px] font-700 text-[#17252A] mb-3">{title}</h3>
                  <p className="text-[13px] text-[#7aa8ae] leading-relaxed">{desc}</p>
                </div>

                {/* Mobile arrow */}
                {idx < steps.length - 1 && (
                  <div className="lg:hidden mt-4 text-[#6FB3B8]">
                    <ArrowRight size={20} className="rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom trust row */}
        <div className="mt-16 bg-[#f4f8f9] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#388087]/10 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-[#388087]" />
            </div>
            <div>
              <div className="text-sm font-700 text-[#17252A]">SOC 2 Type II Compliant</div>
              <div className="text-xs text-[#7aa8ae]">Your data is fully encrypted & secure</div>
            </div>
          </div>
          <div className="h-px sm:h-10 w-full sm:w-px bg-[#e2eef0]" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#388087]/10 flex items-center justify-center">
              <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5"><path d="M10 2L18 7V13L10 18L2 13V7L10 2Z" stroke="#388087" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="10" cy="10" r="2.5" fill="#388087" fillOpacity="0.8"/></svg>
            </div>
            <div>
              <div className="text-sm font-700 text-[#17252A]">99.9% Uptime SLA</div>
              <div className="text-xs text-[#7aa8ae]">Always available when your team needs it</div>
            </div>
          </div>
          <div className="h-px sm:h-10 w-full sm:w-px bg-[#e2eef0]" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#388087]/10 flex items-center justify-center">
              <UserCheck size={20} className="text-[#388087]" />
            </div>
            <div>
              <div className="text-sm font-700 text-[#17252A]">Role-Based Access</div>
              <div className="text-xs text-[#7aa8ae]">Admin, Manager, Employee, CFO & more</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}