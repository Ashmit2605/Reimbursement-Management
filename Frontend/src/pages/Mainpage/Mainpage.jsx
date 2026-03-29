import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Menu, X, ArrowRight, CheckCircle, Clock,
  Upload, UserCheck, CheckCircle2, Receipt, GitBranch,
  ScanLine, Globe, Eye, EyeOff, AlertCircle, Zap, Shield, TrendingUp,
} from 'lucide-react'

/* ─── NAVBAR ─── */
function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const links = ['Features', 'How It Works']

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#17252A] to-[#388087] flex items-center justify-center shadow-lg group-hover:shadow-[#388087]/40 transition-shadow">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-[#17252A] tracking-tight hidden sm:inline">
            R<span className="text-[#388087]">_Manage</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-gray-600 hover:text-[#17252A] transition-colors"
            >
              {l}
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 text-sm font-semibold text-[#388087] border border-[#388087] rounded-lg hover:bg-[#388087]/5 transition-all"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#17252A] to-[#388087] rounded-lg hover:shadow-lg hover:shadow-[#388087]/30 transition-all"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu */}
        <button className="lg:hidden text-[#17252A]" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="block text-sm font-medium text-gray-600 hover:text-[#17252A] py-2"
              onClick={() => setOpen(false)}
            >
              {l}
            </a>
          ))}
          <div className="flex gap-2 pt-3 border-t border-gray-200">
            <button onClick={() => navigate('/login')} className="flex-1 py-2 text-sm font-semibold text-[#388087] border border-[#388087] rounded-lg">
              Login
            </button>
            <button onClick={() => navigate('/login')} className="flex-1 py-2 text-sm font-semibold text-white bg-[#17252A] rounded-lg">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

/* ─── HERO SECTION ─── */
function Hero() {
  const navigate = useNavigate()

  return (
    <section id="home" className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-white via-gray-50 to-[#f4f8f9] overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-[#BADFE7]/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C2EDCE]/15 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#388087]/10 border border-[#388087]/30 rounded-full px-4 py-2 w-fit mx-auto lg:mx-0">
              <div className="w-2 h-2 rounded-full bg-[#388087] animate-pulse" />
              <span className="text-xs font-semibold text-[#388087] uppercase tracking-wide">
                Trusted by 500+ companies
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#17252A] leading-tight tracking-tight">
                Smart{' '}
                <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">
                  Reimbursement
                </span>
                {' '}Management
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Automate approvals, track expenses in real-time, and simplify your reimbursement workflow — from submission to payout in minutes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
              <button
                onClick={() => navigate('/login')}
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#17252A] to-[#388087] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#388087]/30 transition-all"
              >
                Get Started Free
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-[#388087] text-[#388087] font-bold rounded-xl hover:bg-[#388087]/5 transition-all"
              >
                View Demo
              </button>
            </div>

            {/* Trust Signals */}
            <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-600 pt-4">
              <span className="flex items-center gap-1">
                <CheckCircle size={16} className="text-[#388087]" />
                No credit card
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle size={16} className="text-[#388087]" />
                14-day free trial
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle size={16} className="text-[#388087]" />
                Cancel anytime
              </span>
            </div>
          </div>

          {/* Right - Dashboard Preview */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-[#388087]/20 to-[#6FB3B8]/10 rounded-3xl blur-2xl" />
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#17252A] to-[#388087] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs text-[#6FB3B8] font-semibold">R_management Dashboard</span>
                <div className="w-0" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Pending', val: '12', color: 'amber' },
                    { label: 'Approved', val: '89', color: 'teal' },
                    { label: 'Total', val: '₹2.4L', color: 'slate' },
                  ].map(s => (
                    <div key={s.label} className={`bg-${s.color}-50 rounded-xl p-3 text-center border border-${s.color}-200`}>
                      <div className="text-lg font-bold text-gray-900">{s.val}</div>
                      <div className="text-xs text-gray-500 font-medium mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-end gap-1 h-12 mb-2">
                    {[40, 65, 45, 80, 60, 90, 70].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-[#388087]"
                        style={{ height: `${h}%`, opacity: 0.3 + i * 0.1 }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                      <span key={i} className="flex-1 text-center">{d}</span>
                    ))}
                  </div>
                </div>

                {/* Requests */}
                <div className="space-y-2">
                  {[
                    { name: 'Alex Chen', amount: '₹1,250', status: 'Pending' },
                    { name: 'Priya Sharma', amount: '₹480', status: 'Approved' },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#388087]/10 flex items-center justify-center text-xs font-bold text-[#388087]">
                          {r.name[0]}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{r.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">{r.amount}</span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${r.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {r.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FEATURES SECTION ─── */
function Features() {
  const features = [
    {
      icon: Receipt,
      title: 'Expense Tracking',
      desc: 'Log and monitor every expense in real-time with automatic categorization and receipt attachment.',
      color: 'from-[#388087]',
    },
    {
      icon: GitBranch,
      title: 'Multi-Level Approval',
      desc: 'Define custom approval chains from managers to CFO. Automated routing ensures no claim falls through.',
      color: 'from-[#d4860a]',
    },
    {
      icon: ScanLine,
      title: 'AI Receipt Scanning',
      desc: 'Upload photos and let AI extract amounts, dates, and vendor info automatically. Zero manual entry.',
      color: 'from-[#6c3fc5]',
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Analytics',
      desc: 'Get insights into spending patterns, approval rates, and forecast future expenses.',
      color: 'from-[#1565c0]',
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-[#388087]/10 border border-[#388087]/30 rounded-full px-4 py-2">
            <Zap size={14} className="text-[#388087]" />
            <span className="text-xs font-semibold text-[#388087] uppercase">Key Features</span>
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black text-[#17252A] leading-tight">
            Everything you need to manage expenses
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            A complete toolkit designed to eliminate friction between submitting a claim and getting reimbursed.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="group p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:border-[#388087]/30 hover:shadow-lg transition-all"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} to-[#6FB3B8] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                <Icon size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#17252A] mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '500+', label: 'Companies' },
            { val: '98%', label: 'Accuracy' },
            { val: '1.4 days', label: 'Avg. Time' },
            { val: '₹50Cr+', label: 'Processed' },
          ].map(({ val, label }) => (
            <div key={label} className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <div className="text-2xl sm:text-3xl font-black text-[#17252A]">{val}</div>
              <div className="text-xs sm:text-sm text-gray-600 font-semibold mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── HOW IT WORKS SECTION ─── */
function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: Upload,
      title: 'Submit Expense',
      desc: 'Fill out a claim form, attach receipts, and submit. AI auto-fills details from receipts.',
    },
    {
      num: '02',
      icon: UserCheck,
      title: 'Manager Review',
      desc: 'Claims route to line manager automatically. They review and approve with one click.',
    },
    {
      num: '03',
      icon: CheckCircle2,
      title: 'Process & Payout',
      desc: 'Finance approves and processes reimbursement. Employee gets notified instantly.',
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-[#388087]/10 border border-[#388087]/30 rounded-full px-4 py-2">
            <Zap size={14} className="text-[#388087]" />
            <span className="text-xs font-semibold text-[#388087] uppercase">How It Works</span>
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black text-[#17252A] leading-tight">
            From claim to payout in 3 simple steps
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            No more email chains or lost receipts. Every claim from submission to completion is tracked.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={step.title} className="relative">
              {/* Connector */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(100%+16px)] w-[calc(100%-32px)] h-0.5 bg-gradient-to-r from-[#388087] to-transparent" />
              )}

              {/* Card */}
              <div className="relative bg-white p-8 rounded-2xl border border-gray-200 hover:border-[#388087]/30 hover:shadow-lg transition-all">
                {/* Number Badge */}
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] text-white flex items-center justify-center font-bold text-sm shadow-lg">
                  {step.num}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#388087]/10 flex items-center justify-center text-[#388087] mb-4">
                  <step.icon size={24} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#17252A] mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Security Banner */}
        <div className="mt-16 p-6 bg-gradient-to-r from-[#17252A] to-[#388087] rounded-2xl text-white flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <Shield size={32} className="flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">Enterprise-Grade Security</h3>
            <p className="text-white/80 text-sm">SOC 2 Type II compliant with 99.9% uptime SLA and role-based access control.</p>
          </div>
          <CheckCircle2 size={24} className="text-[#6FB3B8] flex-shrink-0" />
        </div>
      </div>
    </section>
  )
}

/* ─── CTA SECTION ─── */
function CTA() {
  const navigate = useNavigate()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-[#17252A] via-[#1f3139] to-[#388087] rounded-3xl p-12 sm:p-16 text-center overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#388087]/10 rounded-full blur-3xl -z-10" />

          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Start managing expenses{' '}
              <span className="text-[#6FB3B8]">smarter today</span>
            </h2>

            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Join 500+ companies that trust R_management to streamline their reimbursement process.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/login')}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#6FB3B8] text-white font-bold rounded-xl hover:bg-white hover:text-[#17252A] transition-all"
              >
                Create Free Account
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all"
              >
                View Demo
              </button>
            </div>

            <p className="text-sm text-white/60">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── MAIN PAGE ─── */
export default function MainPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      
    </div>
  )
}