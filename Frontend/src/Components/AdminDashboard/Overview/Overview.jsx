import { Users, FileText, TrendingUp, CheckCircle, XCircle, Clock, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  .ov-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
  .ov-wrap {
    font-family: 'Poppins', sans-serif;
    background: #f4f8f9;
    min-height: 100vh;
    padding: 24px;
  }

  /* Header */
  .ov-header { margin-bottom: 24px; }
  .ov-title { font-size: 22px; font-weight: 700; color: #17252A; }
  .ov-title span { color: #388087; }
  .ov-sub { font-size: 13px; color: #7aa8ae; margin-top: 2px; }

  /* Summary Cards */
  .summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    margin-bottom: 24px;
  }
  .summary-card {
    background: #fff;
    border-radius: 18px;
    padding: 20px;
    border: 1.5px solid rgba(111,179,184,0.13);
    box-shadow: 0 4px 12px rgba(56,128,135,0.05);
    display: flex;
    align-items: center;
    gap: 16px;
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
  .summary-trend {
    display: flex; align-items: center; gap: 4px;
    font-size: 11.5px; font-weight: 600; margin-top: 4px;
  }
  .trend-up { color: #388087; }
  .trend-down { color: #b54a4a; }

  .ic-users { background: rgba(56,128,135,0.1); color: #388087; }
  .ic-pending { background: rgba(212,134,10,0.1); color: #d4860a; }
  .ic-approved { background: rgba(56,128,135,0.1); color: #388087; }
  .ic-rejected { background: rgba(181,74,74,0.1); color: #b54a4a; }
  .ic-growth { background: rgba(23,37,42,0.08); color: #17252A; }

  /* Charts Row */
  .charts-row {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    margin-bottom: 24px;
  }

  /* Chart Cards */
  .chart-card {
    background: #fff;
    border-radius: 20px;
    border: 1.5px solid rgba(111,179,184,0.13);
    box-shadow: 0 4px 20px rgba(56,128,135,0.06);
    padding: 24px;
  }
  .chart-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; }
  .chart-title { font-size: 15px; font-weight: 700; color: #17252A; }
  .chart-sub { font-size: 12px; color: #7aa8ae; margin-top: 2px; }
  .chart-badge {
    padding: 4px 10px; border-radius: 20px;
    font-size: 11px; font-weight: 600;
    background: rgba(56,128,135,0.1); color: #388087;
  }

  /* Donut Legend */
  .donut-legend { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }
  .legend-item { display: flex; align-items: center; justify-content: space-between; }
  .legend-left { display: flex; align-items: center; gap: 8px; }
  .legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .legend-label { font-size: 12.5px; color: #5a7b80; font-weight: 500; }
  .legend-val { font-size: 12.5px; font-weight: 700; color: #17252A; }

  /* Bottom row */
  .bottom-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  /* Activity Feed */
  .activity-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(111,179,184,0.08);
  }
  .activity-item:last-child { border-bottom: none; padding-bottom: 0; }
  .activity-avatar {
    width: 36px; height: 36px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: #fff; flex-shrink: 0;
  }
  .activity-name { font-size: 13px; font-weight: 600; color: #17252A; }
  .activity-action { font-size: 11.5px; color: #7aa8ae; margin-top: 1px; }
  .activity-time { font-size: 11px; color: #9fc0c5; white-space: nowrap; }
  .activity-status {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600;
  }
  .ast-approved { background: rgba(56,128,135,0.1); color: #388087; }
  .ast-pending { background: rgba(212,134,10,0.1); color: #d4860a; }
  .ast-rejected { background: rgba(181,74,74,0.1); color: #b54a4a; }

  /* Category breakdown */
  .category-item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(111,179,184,0.08);
  }
  .category-item:last-child { border-bottom: none; padding-bottom: 0; }
  .category-label { font-size: 13px; font-weight: 600; color: #17252A; flex: 1; }
  .category-count { font-size: 12px; color: #7aa8ae; font-weight: 500; }
  .category-bar-wrap { flex: 2; height: 6px; background: rgba(111,179,184,0.12); border-radius: 99px; overflow: hidden; }
  .category-bar { height: 100%; border-radius: 99px; background: linear-gradient(90deg, #388087, #6FB3B8); transition: width 0.6s ease; }

  /* Custom tooltip */
  .custom-tooltip {
    background: #17252A; border-radius: 10px; padding: 10px 14px;
    font-family: 'Poppins', sans-serif;
  }
  .tooltip-label { font-size: 11px; color: #7aa8ae; font-weight: 500; margin-bottom: 4px; }
  .tooltip-val { font-size: 14px; color: #fff; font-weight: 700; }

  @media (max-width: 900px) {
    .charts-row { grid-template-columns: 1fr; }
    .bottom-row { grid-template-columns: 1fr; }
  }
  @media (max-width: 600px) {
    .ov-wrap { padding: 16px; }
    .summary-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 400px) {
    .summary-grid { grid-template-columns: 1fr; }
  }
`

const AVATAR_COLORS = ['#388087','#d4860a','#6c3fc5','#c0504d','#2e7d32','#1565c0','#7b5ea7','#b06000']
const avatarColor = name => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
const initials = name => name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

const monthlyData = [
  { month: 'Oct', submitted: 28, approved: 20, rejected: 5 },
  { month: 'Nov', submitted: 34, approved: 26, rejected: 6 },
  { month: 'Dec', submitted: 22, approved: 18, rejected: 3 },
  { month: 'Jan', submitted: 40, approved: 30, rejected: 7 },
  { month: 'Feb', submitted: 37, approved: 28, rejected: 6 },
  { month: 'Mar', submitted: 45, approved: 32, rejected: 8 },
]

const donutData = [
  { name: 'Approved', value: 154, color: '#388087' },
  { name: 'Pending',  value: 45,  color: '#d4860a' },
  { name: 'Rejected', value: 35,  color: '#b54a4a' },
]

const categories = [
  { name: 'Travel',          count: 62, pct: 100 },
  { name: 'Food & Meals',    count: 48, pct: 77  },
  { name: 'Office Supplies', count: 35, pct: 56  },
  { name: 'Internet',        count: 28, pct: 45  },
  { name: 'Medical',         count: 18, pct: 29  },
  { name: 'Others',          count: 12, pct: 19  },
]

const recentActivity = [
  { name: 'Priya Sharma',  action: 'Submitted Travel claim · ₹1,250', time: '10 min ago', status: 'pending'  },
  { name: 'James Walker',  action: 'Internet bill reimbursement',      time: '1 hr ago',  status: 'approved' },
  { name: 'Sarah Johnson', action: 'Office Supplies claim rejected',   time: '2 hrs ago', status: 'rejected' },
  { name: 'Marc Dupont',   action: 'Miscellaneous claim submitted',    time: '3 hrs ago', status: 'pending'  },
  { name: 'Alex Chen',     action: 'Travel claim approved · ₹850',    time: '5 hrs ago', status: 'approved' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="tooltip-val" style={{ color: p.color || '#fff', fontSize: '12px', marginTop: i ? 2 : 0 }}>
          {p.name}: {p.value}
        </div>
      ))}
    </div>
  )
}

export default function AdminOverview() {
  const total = donutData.reduce((s, d) => s + d.value, 0)

  return (
    <>
      <style>{css}</style>
      <div className="ov-wrap">

        {/* Header */}
        <div className="ov-header">
          <div className="ov-title">Dashboard <span>Overview</span></div>
          <div className="ov-sub">Welcome back — here's what's happening today</div>
        </div>

        {/* Summary Stats */}
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon ic-users"><Users size={20} /></div>
            <div className="summary-info">
              <div className="summary-label">Total Employees</div>
              <div className="summary-val">1,234</div>
              <div className="summary-trend trend-up"><ArrowUpRight size={13} /> +4.2% this month</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon ic-pending"><Clock size={20} /></div>
            <div className="summary-info">
              <div className="summary-label">Pending Claims</div>
              <div className="summary-val">45</div>
              <div className="summary-trend trend-down"><ArrowDownRight size={13} /> 8 overdue</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon ic-approved"><CheckCircle size={20} /></div>
            <div className="summary-info">
              <div className="summary-label">Approved This Month</div>
              <div className="summary-val">32</div>
              <div className="summary-trend trend-up"><ArrowUpRight size={13} /> +14% vs last month</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon ic-rejected"><XCircle size={20} /></div>
            <div className="summary-info">
              <div className="summary-label">Rejected This Month</div>
              <div className="summary-val">8</div>
              <div className="summary-trend trend-up" style={{ color: '#388087' }}><ArrowDownRight size={13} /> Down from 11</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon ic-growth"><TrendingUp size={20} /></div>
            <div className="summary-info">
              <div className="summary-label">Total Disbursed</div>
              <div className="summary-val">₹2.4L</div>
              <div className="summary-trend trend-up"><ArrowUpRight size={13} /> +12% MoM</div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="charts-row">

          {/* Area Chart — Monthly Trend */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <div className="chart-title">Claims Trend</div>
                <div className="chart-sub">Submissions, approvals & rejections · last 6 months</div>
              </div>
              <div className="chart-badge">6 months</div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradSubmitted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#388087" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#388087" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gradApproved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6FB3B8" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6FB3B8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gradRejected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b54a4a" stopOpacity={0.12}/>
                    <stop offset="95%" stopColor="#b54a4a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(111,179,184,0.1)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7aa8ae', fontFamily: 'Poppins' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#7aa8ae', fontFamily: 'Poppins' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="submitted" name="Submitted" stroke="#388087" strokeWidth={2} fill="url(#gradSubmitted)" dot={false} activeDot={{ r: 4, fill: '#388087' }} />
                <Area type="monotone" dataKey="approved"  name="Approved"  stroke="#6FB3B8" strokeWidth={2} fill="url(#gradApproved)"  dot={false} activeDot={{ r: 4, fill: '#6FB3B8' }} />
                <Area type="monotone" dataKey="rejected"  name="Rejected"  stroke="#b54a4a" strokeWidth={2} fill="url(#gradRejected)"  dot={false} activeDot={{ r: 4, fill: '#b54a4a' }} />
              </AreaChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', gap: '20px', marginTop: '12px', justifyContent: 'center' }}>
              {[['Submitted','#388087'],['Approved','#6FB3B8'],['Rejected','#b54a4a']].map(([label,color]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '10px', height: '3px', borderRadius: '99px', background: color }} />
                  <span style={{ fontSize: '11px', color: '#7aa8ae', fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Donut Chart — Status Breakdown */}
          <div className="chart-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="chart-header">
              <div>
                <div className="chart-title">Status Breakdown</div>
                <div className="chart-sub">All-time claim distribution</div>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {donutData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ textAlign: 'center', marginTop: '-8px', marginBottom: '12px' }}>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#17252A' }}>{total}</div>
              <div style={{ fontSize: '11px', color: '#7aa8ae', fontWeight: 500 }}>Total Claims</div>
            </div>
            <div className="donut-legend">
              {donutData.map(d => (
                <div className="legend-item" key={d.name}>
                  <div className="legend-left">
                    <div className="legend-dot" style={{ background: d.color }} />
                    <span className="legend-label">{d.name}</span>
                  </div>
                  <span className="legend-val">{d.value} <span style={{ fontSize: '11px', color: '#7aa8ae', fontWeight: 400 }}>({Math.round(d.value/total*100)}%)</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="bottom-row">

          {/* Recent Activity */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <div className="chart-title">Recent Activity</div>
                <div className="chart-sub">Latest claim actions across the team</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', color: '#7aa8ae' }}>
                <Calendar size={12} />
                Today
              </div>
            </div>
            {recentActivity.map((item, i) => (
              <div className="activity-item" key={i}>
                <div className="activity-avatar" style={{ background: avatarColor(item.name) }}>
                  {initials(item.name)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="activity-name">{item.name}</div>
                  <div className="activity-action">{item.action}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <span className="activity-time">{item.time}</span>
                  <span className={`activity-status ast-${item.status}`}>
                    {item.status === 'approved' ? <CheckCircle size={10}/> : item.status === 'rejected' ? <XCircle size={10}/> : <Clock size={10}/>}
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Category Breakdown */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <div className="chart-title">Top Categories</div>
                <div className="chart-sub">Claims by expense type · this year</div>
              </div>
            </div>
            {categories.map((cat, i) => (
              <div className="category-item" key={i}>
                <div className="category-label">{cat.name}</div>
                <div className="category-bar-wrap">
                  <div className="category-bar" style={{ width: `${cat.pct}%` }} />
                </div>
                <div className="category-count">{cat.count}</div>
              </div>
            ))}

            {/* Mini bar chart */}
            <div style={{ marginTop: '24px' }}>
              <div style={{ fontSize: '12px', color: '#7aa8ae', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Monthly Volume</div>
              <ResponsiveContainer width="100%" height={100}>
                <BarChart data={monthlyData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }} barSize={14}>
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#7aa8ae', fontFamily: 'Poppins' }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="submitted" name="Submitted" radius={[4, 4, 0, 0]} fill="#388087" opacity={0.85} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}