import { ArrowRight, Play, TrendingUp, CheckCircle, Clock, DollarSign } from 'lucide-react'

const DashboardMockup = () => (
  <div className="relative w-full max-w-130">
    {/* Glow */}
    <div className="absolute inset-0 bg-linear-to-br from-[#388087]/20 to-[#6FB3B8]/10 rounded-3xl blur-2xl scale-95" />

    {/* Main card */}
    <div className="relative bg-white rounded-2xl shadow-2xl shadow-[#388087]/10 border border-[#e2eef0] overflow-hidden">
      {/* Header bar */}
      <div className="bg-[#17252A] px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#b54a4a]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#d4860a]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#388087]" />
        </div>
        <span className="text-xs text-[#6FB3B8] font-500">TrackCD Dashboard</span>
        <div className="w-16 h-2 rounded-full bg-white/10" />
      </div>

      <div className="p-5">
        {/* Stat row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: 'Pending', val: '12', color: 'text-[#d4860a]', bg: 'bg-[#d4860a]/8' },
            { label: 'Approved', val: '89', color: 'text-[#388087]', bg: 'bg-[#388087]/8' },
            { label: 'Total ₹', val: '2.4L', color: 'text-[#17252A]', bg: 'bg-[#17252A]/5' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl p-3 text-center`}>
              <div className={`text-lg font-700 ${s.color}`}>{s.val}</div>
              <div className="text-[10px] text-[#7aa8ae] font-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mini chart bar */}
        <div className="bg-[#f4f8f9] rounded-xl p-3 mb-3">
          <div className="flex items-end gap-1.5 h-12">
            {[40, 65, 45, 80, 60, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i === 5 ? '#388087' : `rgba(56,128,135,${0.2 + i * 0.04})` }} />
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <span key={i} className="flex-1 text-center text-[9px] text-[#7aa8ae]">{d}</span>
            ))}
          </div>
        </div>

        {/* Recent claims */}
        {[
          { name: 'Alex Chen', cat: 'Travel', amt: '₹1,250', status: 'pending' },
          { name: 'Priya S.', cat: 'Food & Meals', amt: '₹480', status: 'approved' },
          { name: 'James W.', cat: 'Internet', amt: '₹999', status: 'approved' },
        ].map((r, i) => (
          <div key={i} className="flex items-center gap-2.5 py-2 border-b border-[#f0f8f9] last:border-0">
            <div className="w-7 h-7 rounded-lg bg-[#388087]/10 flex items-center justify-center text-[10px] font-700 text-[#388087]">
              {r.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-600 text-[#17252A] truncate">{r.name}</div>
              <div className="text-[10px] text-[#7aa8ae]">{r.cat}</div>
            </div>
            <span className="text-[11px] font-700 text-[#17252A]">{r.amt}</span>
            <span className={`text-[9px] font-600 px-2 py-0.5 rounded-full ${r.status === 'approved' ? 'bg-[#388087]/10 text-[#388087]' : 'bg-[#d4860a]/10 text-[#d4860a]'}`}>
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Floating badge */}
    <div className="absolute -top-3 -right-3 bg-white rounded-xl px-3 py-2 shadow-lg border border-[#e2eef0] flex items-center gap-2">
      <div className="w-6 h-6 rounded-lg bg-[#388087]/10 flex items-center justify-center">
        <CheckCircle size={13} className="text-[#388087]" />
      </div>
      <div>
        <div className="text-[10px] font-700 text-[#17252A]">Auto-Approved</div>
        <div className="text-[9px] text-[#7aa8ae]">2 claims · just now</div>
      </div>
    </div>

    <div className="absolute -bottom-3 -left-3 bg-white rounded-xl px-3 py-2 shadow-lg border border-[#e2eef0] flex items-center gap-2">
      <div className="w-6 h-6 rounded-lg bg-[#d4860a]/10 flex items-center justify-center">
        <Clock size={13} className="text-[#d4860a]" />
      </div>
      <div>
        <div className="text-[10px] font-700 text-[#17252A]">Avg. 1.4 days</div>
        <div className="text-[9px] text-[#7aa8ae]">Approval time</div>
      </div>
    </div>
  </div>
)

export default function Hero() {
  return (
    <section id="home" className="pt-24 pb-20 bg-white overflow-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Subtle background mesh */}
      <div className="absolute top-0 left-0 w-full h-150 pointer-events-none overflow-hidden">
        <div className="absolute -top-50 -left-25 w-150 h-150 rounded-full bg-[#BADFE7]/15 blur-3xl" />
        <div className="absolute -top-25 -right-12.5 w-100 h-100 rounded-full bg-[#C2EDCE]/12 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-10">

          {/* Left */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#388087]/8 border border-[#6FB3B8]/30 rounded-full px-4 py-1.5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#388087] animate-pulse" />
              <span className="text-xs font-600 text-[#388087] tracking-wide">Trusted by 500+ companies</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-700 text-[#17252A] leading-[1.12] tracking-tight mb-5">
              Smart{' '}
              <span className="relative inline-block">
                <span className="text-[#388087]">Reimbursement</span>
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                  <path d="M0 6 Q50 2 100 5 Q150 8 200 4" stroke="#6FB3B8" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
                </svg>
              </span>
              {' '}Management
            </h1>

            <p className="text-base sm:text-lg text-[#5a7b80] leading-relaxed mb-8 max-w-120 mx-auto lg:mx-0">
              Automate approvals, track expenses in real-time, and simplify your entire reimbursement workflow — from submission to payout.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10">
              <a href="#" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#17252A] text-white text-sm font-600 rounded-xl hover:bg-[#388087] transition-all duration-200 shadow-lg shadow-[#17252A]/20 hover:shadow-[#388087]/25 hover:-translate-y-0.5">
                Get Started Free
                <ArrowRight size={16} />
              </a>
              <a href="#" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-[#6FB3B8] text-[#388087] text-sm font-600 rounded-xl hover:bg-[#388087]/5 transition-all duration-200">
                Login to Dashboard
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-[#7aa8ae]">
              {[['✓ No credit card'], ['✓ 14-day free trial'], ['✓ Cancel anytime']].map(([t]) => (
                <span key={t} className="font-500 text-xs">{t}</span>
              ))}
            </div>
          </div>

          {/* Right — Dashboard mockup */}
          <div className="flex-1 flex justify-center lg:justify-end w-full">
            <DashboardMockup />
          </div>

        </div>
      </div>
    </section>
  )
}