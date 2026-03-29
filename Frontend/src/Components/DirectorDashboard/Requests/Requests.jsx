import { useState, useRef, useEffect } from 'react'
import { Search, Filter, CheckCircle, XCircle, Clock, Eye, FileText, ChevronDown, Check, X, AlertCircle, Calendar, Hash, User, TrendingUp } from 'lucide-react'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  .req-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
  .req-wrap { font-family: 'Poppins', sans-serif; background: #f4f8f9; min-height: 100vh; padding: 24px; }

  .req-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    margin-bottom: 24px; flex-wrap: wrap; gap: 16px;
  }
  .req-title { font-size: 22px; font-weight: 700; color: #17252A; }
  .req-title span { color: #388087; }
  .req-sub { font-size: 13px; color: #7aa8ae; margin-top: 2px; }

  /* Summary Cards */
  .summary-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px;
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
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .summary-info { flex: 1; }
  .summary-label { font-size: 12px; font-weight: 600; color: #7aa8ae; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
  .summary-val { font-size: 24px; font-weight: 700; color: #17252A; }

  .ic-budget { background: rgba(56,128,135,0.1); color: #388087; }
  .ic-pending { background: rgba(212,134,10,0.1); color: #d4860a; }
  .ic-approved { background: rgba(56,128,135,0.1); color: #388087; }
  .ic-rejected { background: rgba(181,74,74,0.1); color: #b54a4a; }

  /* Controls Section */
  .req-controls {
    display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px;
  }
  
  .tabs-row {
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1.5px solid rgba(111,179,184,0.13);
    padding-bottom: 0;
  }
  .tabs { display: flex; gap: 28px; }
  .tab-btn {
    padding: 10px 4px 14px; border: none; background: none; cursor: pointer;
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: #7aa8ae;
    position: relative; transition: all 0.2s;
  }
  .tab-btn:hover { color: #388087; }
  .tab-btn.active { color: #17252A; }
  .tab-btn.active::after {
    content: ''; position: absolute; bottom: -1.5px; left: 0; right: 0;
    height: 3px; background: #388087; border-radius: 3px 3px 0 0;
  }

  .toolbar { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .search-wrap { position: relative; width: 100%; maxWidth: 100%; }
  .search-wrap svg {
    position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
    width: 15px; height: 15px; color: #7aa8ae; pointer-events: none;
  }
  .search-input {
    width: 100%; padding: 10px 12px 10px 36px; border-radius: 12px;
    border: 1.5px solid rgba(111,179,184,0.22); background: #fff;
    font-family: 'Poppins', sans-serif; font-size: 13px; color: #17252A;
    outline: none; transition: all 0.15s;
  }
  .search-input:focus { border-color: #6FB3B8; box-shadow: 0 0 0 3px rgba(111,179,184,0.1); }

  /* Table Card */
  .table-card {
    background: #fff; border-radius: 20px;
    border: 1.5px solid rgba(111,179,184,0.13);
    box-shadow: 0 4px 20px rgba(56,128,135,0.06); overflow: hidden;
  }
  .table-wrap { overflow-x: auto; }
  .tbl { width: 100%; border-collapse: collapse; min-width: 800px; }
  .tbl thead tr { background: rgba(111,179,184,0.06); }
  .tbl th {
    padding: 14px 20px; text-align: left;
    font-size: 12px; font-weight: 600; color: #7aa8ae;
    letter-spacing: 0.4px; text-transform: uppercase;
  }
  .tbl td { padding: 16px 20px; border-bottom: 1px solid rgba(111,179,184,0.08); vertical-align: middle; }

  /* Cells */
  .avatar {
    width: 36px; height: 36px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; color: #fff; flex-shrink: 0;
  }

  /* Status Badges */
  .status-badge {
    padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700;
  }
  .st-pending  { background: #FFF8E6; color: #B07A00; }
  .st-approved { background: #E8F7EC; color: #2E7D4F; }
  .st-rejected { background: #fee2e2; color: #ef4444; }

  /* Action Icon */
  .btn-icon-sq {
    width: 32px; height: 32px; border-radius: 8px; border: 1.5px solid #eee;
    background: #fff; color: #777; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s;
  }
  .btn-icon-sq:hover { border-color: #388087; color: #388087; background: #f0f7f8; }

  /* Modal Placeholder */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 100; display: flex; align-items: center; justify-content: center; }
  .modal-box { background: #fff; padding: 24px; border-radius: 20px; width: 400px; }
`

const INITIAL_REQUESTS = [
  { id: 'DIR-881', employee: 'John Doe', dept: 'Engineering',   date: 'Mar 28', amount: '₹22,000', status: 'Pending' },
  { id: 'DIR-882', employee: 'Jane Smith', dept: 'Marketing',     date: 'Mar 27', amount: '₹14,500', status: 'Pending' },
  { id: 'DIR-883', employee: 'Robert Fox', dept: 'Sales',         date: 'Mar 25', amount: '₹8,200',  status: 'Approved' },
  { id: 'DIR-884', employee: 'Cody Fisher', dept: 'Support',      date: 'Mar 24', amount: '₹5,000',  status: 'Rejected' },
]

export default function DirectorRequests() {
  const [search, setSearch] = useState('')

  return (
    <>
      <style>{css}</style>
      <div className="req-wrap">
        <div className="req-header">
          <div>
            <div className="req-title">Director <span>Approvals</span></div>
            <div className="req-sub">High-tier reimbursement claims awaiting executive review</div>
          </div>
        </div>

        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon ic-budget"><TrendingUp size={20} /></div>
            <div className="summary-info"><div className="summary-label">Executive Budget</div><div className="summary-val">₹4,50,000</div></div>
          </div>
          <div className="summary-card">
            <div className="summary-icon ic-pending"><Clock size={20} /></div>
            <div className="summary-info"><div className="summary-label">Awaiting Me</div><div className="summary-val">12</div></div>
          </div>
          <div className="summary-card">
            <div className="summary-icon ic-approved"><CheckCircle size={20} /></div>
            <div className="summary-info"><div className="summary-label">Yearly Approved</div><div className="summary-val">₹14.2L</div></div>
          </div>
        </div>

        <div className="req-controls">
           <div className="tabs-row">
            <div className="tabs">
              <button className="tab-btn active">Pending Review</button>
              <button className="tab-btn">Executive History</button>
            </div>
          </div>
          <div className="search-wrap">
            <Search size={15} />
            <input className="search-input" placeholder="Search claims by ID or department..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="table-card">
          <div className="table-wrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {INITIAL_REQUESTS.map(req => (
                  <tr key={req.id}>
                    <td style={{ fontWeight:700, color:'#388087' }}>{req.id}</td>
                    <td><div style={{ fontWeight:600 }}>{req.employee}</div></td>
                    <td><span style={{ fontSize:12, color:'#7aa8ae' }}>{req.dept}</span></td>
                    <td style={{ fontWeight:700 }}>{req.amount}</td>
                    <td>{req.date}</td>
                    <td><span className={`status-badge ${req.status === 'Pending' ? 'st-pending' : req.status === 'Approved' ? 'st-approved' : 'st-rejected'}`}>{req.status}</span></td>
                    <td><button className="btn-icon-sq"><Eye size={16} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
