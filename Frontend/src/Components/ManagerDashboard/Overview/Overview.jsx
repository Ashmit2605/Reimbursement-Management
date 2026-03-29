import { Users, FileText, CheckCircle, Clock, ArrowUpRight, ArrowDownRight, Calendar, Eye } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, RadialBarChart, RadialBar, Cell, AreaChart, Area } from 'recharts'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  .mg-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
  .mg-wrap {
    font-family: 'Poppins', sans-serif;
    background: #f4f8f9;
    min-height: 100vh;
    padding: 24px;
  }

  .mg-header { margin-bottom: 24px; }
  .mg-title { font-size: 22px; font-weight: 700; color: #17252A; }
  .mg-title span { color: #388087; }
  .mg-sub { font-size: 13px; color: #7aa8ae; margin-top: 2px; }

  /* Summary Cards */
  .summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    margin-bottom: 24px;
  }
  .summary-card {
    background: #fff; border-radius: 18px; padding: 20px;
    border: 1.5px solid rgba(111,179,184,0.13);
    box-shadow: 0 4px 12px rgba(56,128,135,0.05);
    display: flex; align-items: center; gap: 16px;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .summary-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(56,128,135,0.08); }
  .summary-icon {
    width: 48px; height: 48px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .summary-info { flex: 1; min-width: 0; }
  .summary-label { font-size: 12px; font-weight: 600; color: #7aa8ae; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
  .summary-val { font-size: 24px; font-weight: 700; color: #17252A; line-height: 1.2; }
  .summary-trend { display: flex; align-items: center; gap: 4px; font-size: 11.5px; font-weight: 600; margin-top: 4px; }
  .trend-up { color: #388087; }
  .trend-neutral { color: #7aa8ae; }
  .trend-down { color: #b54a4a; }

  .ic-members  { background: rgba(56,128,135,0.1);   color: #388087; }
  .ic-pending  { background: rgba(212,134,10,0.1);   color: #d4860a; }
  .ic-approved { background: rgba(56,128,135,0.1);   color: #388087; }
  .ic-total    { background: rgba(23,37,42,0.08);    color: #17252A; }

  /* Chart Card */
  .chart-card {
    background: #fff; border-radius: 20px;
    border: 1.5px solid rgba(111,179,184,0.13);
    box-shadow: 0 4px 20px rgba(56,128,135,0.06);
    padding: 24px;
  }
  .chart-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; }
  .chart-title { font-size: 15px; font-weight: 700; color: #17252A; }
  .chart-sub   { font-size: 12px; color: #7aa8ae; margin-top: 2px; }
  .chart-badge {
    padding: 4px 10px; border-radius: 20px;
    font-size: 11px; font-weight: 600;
    background: rgba(56,128,135,0.1); color: #388087;
  }

  /* Charts Row */
  .charts-row {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 20px;
    margin-bottom: 24px;
  }

  /* Bottom Row */
  .bottom-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  /* Team Member Item */
  .member-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(111,179,184,0.08);
  }
  .member-item:last-child { border-bottom: none; padding-bottom: 0; }
  .member-avatar {
    width: 38px; height: 38px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: #fff; flex-shrink: 0;
  }
  .member-name   { font-size: 13px; font-weight: 600; color: #17252A; }
  .member-role   { font-size: 11.5px; color: #7aa8ae; margin-top: 1px; }
  .member-claims { font-size: 12px; font-weight: 600; color: #388087; white-space: nowrap; }

  /* Progress Bar */
  .progress-wrap { flex: 1; height: 5px; background: rgba(111,179,184,0.12); border-radius: 99px; overflow: hidden; margin: 0 10px; }
  .progress-bar  { height: 100%; border-radius: 99px; background: linear-gradient(90deg, #388087, #6FB3B8); }

  /* Pending Item */
  .pending-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(111,179,184,0.08);
  }
  .pending-item:last-child { border-bottom: none; padding-bottom: 0; }
  .pending-avatar {
    width: 38px; height: 38px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: #fff; flex-shrink: 0;
  }
  .pending-name   { font-size: 13px; font-weight: 600; color: #17252A; }
  .pending-meta   { font-size: 11.5px; color: #7aa8ae; margin-top: 1px; }
  .pending-amount { font-size: 13px; font-weight: 700; color: #17252A; white-space: nowrap; margin-right: 8px; }

  .btn-review {
    padding: 5px 12px; border-radius: 8px; border: none;
    background: rgba(56,128,135,0.1); color: #388087;
    font-family: 'Poppins', sans-serif; font-size: 11.5px; font-weight: 600;
    cursor: pointer; transition: all 0.15s; display: flex; align-items: center; gap: 5px; white-space: nowrap;
  }
  .btn-review:hover { background: rgba(56,128,135,0.2); }

  /* Custom Tooltip */
  .custom-tooltip {
    background: #17252A; border-radius: 10px; padding: 10px 14px;
    font-family: 'Poppins', sans-serif;
  }
  .tooltip-label { font-size: 11px; color: #7aa8ae; font-weight: 500; margin-bottom: 4px; }
  .tooltip-val   { font-size: 13px; color: #fff; font-weight: 700; }

  /* Approval Rate Ring */
  .rate-ring-wrap { display: flex; align-items: center; gap: 24px; margin-bottom: 16px; }
  .rate-ring-info { flex: 1; }
  .rate-big { font-size: 36px; font-weight: 700; color: #17252A; line-height: 1; }
  .rate-label { font-size: 12px; color: #7aa8ae; font-weight: 500; margin-top: 4px; }
  .rate-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(111,179,184,0.08); }
  .rate-row:last-child { border-bottom: none; }
  .rate-key { font-size: 12.5px; color: #7aa8ae; font-weight: 500; }
  .rate-val { font-size: 12.5px; font-weight: 700; color: #17252A; }

  @media (max-width: 900px) {
    .charts-row  { grid-template-columns: 1fr; }
    .bottom-row  { grid-template-columns: 1fr; }
  }
  @media (max-width: 600px) {
    .mg-wrap     { padding: 16px; }
    .summary-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 400px) {
    .summary-grid { grid-template-columns: 1fr; }
  }
`

const AVATAR_COLORS = ['#388087','#d4860a','#6c3fc5','#c0504d','#2e7d32','#1565c0','#7b5ea7','#b06000']
const avatarColor = name => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
const initials = name => name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

const weeklyData = [
  { day: 'Mon', submitted: 4, approved: 3 },
  { day: 'Tue', submitted: 7, approved: 5 },
  { day: 'Wed', submitted: 5, approved: 4 },
  { day: 'Thu', submitted: 9, approved: 7 },
  { day: 'Fri', submitted: 6, approved: 5 },
  { day: 'Sat', submitted: 2, approved: 2 },
  { day: 'Sun', submitted: 1, approved: 1 },
]

const teamMembers = [
  { name: 'Priya Sharma',  role: 'Frontend Developer', claims: 14, pct: 100 },
  { name: 'Alex Chen',     role: 'Backend Engineer',   claims: 11, pct: 78  },
  { name: 'Marc Dupont',   role: 'UI/UX Designer',     claims: 9,  pct: 64  },
  { name: 'Sarah Johnson', role: 'Product Manager',    claims: 7,  pct: 50  },
  { name: 'James Walker',  role: 'QA Engineer',        claims: 5,  pct: 35  },
]

const pendingApprovals = [
  { name: 'Priya Sharma',  meta: 'Travel · Mar 24, 2026',        amount: '₹1,250' },
  { name: 'Marc Dupont',   meta: 'Others · Mar 23, 2026',        amount: '₹120'   },
  { name: 'James Walker',  meta: 'Office Supplies · Mar 22, 2026', amount: '₹2,340' },
  { name: 'Alex Chen',     meta: 'Food & Meals · Mar 21, 2026',  amount: '₹480'   },
]

const approvalTrend = [
  { month: 'Oct', rate: 72 },
  { month: 'Nov', rate: 75 },
  { month: 'Dec', rate: 68 },
  { month: 'Jan', rate: 80 },
  { month: 'Feb', rate: 78 },
  { month: 'Mar', rate: 84 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ fontSize: '12px', color: p.color || '#fff', marginTop: i ? 2 : 0, fontFamily: 'Poppins', fontWeight: 600 }}>
          {p.name}: {p.value}{p.name === 'Approval Rate' ? '%' : ''}
        </div>
      ))}
    </div>
  )
}

export default function ManagerOverview() {
  const approvalRate = 84

  return (
    <>
      <style>{css}</style>
      <div className="mg-wrap">

        {/* Header */}
        <div className="mg-header">
          <div className="mg-title">Manager <span>Overview</span></div>
          <div className="mg-sub">Your team's reimbursement activity at a glance</div>
        </div>

        {/* Summary Stats */}
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon ic-members"><Users size={20} /></div>
            <div className="summary-info">
              <div className="summary-label">Team Members</div>
              <div className="summary-val">24</div>
              <div className="summary-trend trend-neutral">5 submitted this week</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon ic-pending"><Clock size={20} /></div>
            <div className="summary-info">
              <div className="summary-label">Pending Approvals</div>
              <div className="summary-val">12</div>
              <div className="summary-trend trend-down"><ArrowDownRight size={13} /> 3 overdue</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon ic-approved"><CheckCircle size={20} /></div>
            <div className="summary-info">
              <div className="summary-label">Approved Requests</div>
              <div className="summary-val">89</div>
              <div className="summary-trend trend-up"><ArrowUpRight size={13} /> +8 this month</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon ic-total"><FileText size={20} /></div>
            <div className="summary-info">
              <div className="summary-label">Total Requests</div>
              <div className="summary-val">156</div>
              <div className="summary-trend trend-up"><ArrowUpRight size={13} /> +12% vs last month</div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="charts-row">

          {/* Weekly Bar Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <div className="chart-title">Weekly Claim Activity</div>
                <div className="chart-sub">Submitted vs approved · this week</div>
              </div>
              <div className="chart-badge">This week</div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={4} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(111,179,184,0.1)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#7aa8ae', fontFamily: 'Poppins' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#7aa8ae', fontFamily: 'Poppins' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="submitted" name="Submitted" radius={[4,4,0,0]} fill="rgba(56,128,135,0.2)" />
                <Bar dataKey="approved"  name="Approved"  radius={[4,4,0,0]} fill="#388087" />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', gap: '20px', marginTop: '12px', justifyContent: 'center' }}>
              {[['Submitted','rgba(56,128,135,0.35)'],['Approved','#388087']].map(([label, color]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: color }} />
                  <span style={{ fontSize: '11px', color: '#7aa8ae', fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Approval Rate */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <div className="chart-title">Approval Rate</div>
                <div className="chart-sub">6-month trend</div>
              </div>
            </div>
            <div className="rate-ring-wrap">
              <ResponsiveContainer width={110} height={110}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="65%" outerRadius="100%" startAngle={90} endAngle={90 - 360 * approvalRate / 100} data={[{ value: approvalRate }]} barSize={10}>
                  <RadialBar dataKey="value" cornerRadius={10} background={{ fill: 'rgba(111,179,184,0.1)' }}>
                    <Cell fill="#388087" />
                  </RadialBar>
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="rate-ring-info">
                <div className="rate-big">{approvalRate}%</div>
                <div className="rate-label">Approval rate</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={80}>
              <AreaChart data={approvalTrend} margin={{ top: 0, right: 4, left: -30, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#388087" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#388087" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#7aa8ae', fontFamily: 'Poppins' }} axisLine={false} tickLine={false} />
                <YAxis hide domain={[60, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="rate" name="Approval Rate" stroke="#388087" strokeWidth={2} fill="url(#gradRate)" dot={false} activeDot={{ r: 4, fill: '#388087' }} />
              </AreaChart>
            </ResponsiveContainer>
            <div style={{ marginTop: '16px' }}>
              {[['Claims Reviewed', '156'], ['Avg. Processing Time', '1.4 days'], ['Rejected This Month', '8']].map(([k, v]) => (
                <div className="rate-row" key={k}>
                  <span className="rate-key">{k}</span>
                  <span className="rate-val">{v}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="bottom-row">

          {/* Team Members */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <div className="chart-title">Team Members</div>
                <div className="chart-sub">Claims submitted per member · all time</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', color: '#7aa8ae' }}>
                <Calendar size={12} /> This year
              </div>
            </div>
            {teamMembers.map((m, i) => (
              <div className="member-item" key={i}>
                <div className="member-avatar" style={{ background: avatarColor(m.name) }}>
                  {initials(m.name)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="member-name">{m.name}</div>
                  <div className="member-role">{m.role}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                    <div className="progress-wrap" style={{ margin: 0, flex: 1 }}>
                      <div className="progress-bar" style={{ width: `${m.pct}%` }} />
                    </div>
                    <span style={{ fontSize: '11px', color: '#7aa8ae', fontWeight: 600, whiteSpace: 'nowrap' }}>{m.claims} claims</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pending Approvals */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <div className="chart-title">Pending Approvals</div>
                <div className="chart-sub">Awaiting your review</div>
              </div>
              <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: 'rgba(212,134,10,0.1)', color: '#d4860a' }}>
                {pendingApprovals.length} pending
              </span>
            </div>
            {pendingApprovals.map((item, i) => (
              <div className="pending-item" key={i}>
                <div className="pending-avatar" style={{ background: avatarColor(item.name) }}>
                  {initials(item.name)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="pending-name">{item.name}</div>
                  <div className="pending-meta">{item.meta}</div>
                </div>
                <div className="pending-amount">{item.amount}</div>
                <button className="btn-review">
                  <Eye size={12} /> Review
                </button>
              </div>
            ))}
            <div style={{ marginTop: '20px', padding: '14px', background: 'rgba(56,128,135,0.04)', borderRadius: '12px', border: '1px solid rgba(111,179,184,0.1)' }}>
              <div style={{ fontSize: '12px', color: '#7aa8ae', fontWeight: 500, marginBottom: '6px' }}>Team disbursed this month</div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#17252A' }}>₹48,320</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', color: '#388087', fontWeight: 600, marginTop: '4px' }}>
                <ArrowUpRight size={13} /> +18% vs last month
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}