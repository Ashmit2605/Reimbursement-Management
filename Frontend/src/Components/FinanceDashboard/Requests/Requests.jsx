import { useState, useRef, useEffect } from 'react'
import { Search, Filter, CheckCircle, XCircle, Clock, Eye, FileText, ChevronDown, Check, X, AlertCircle, Calendar, Hash, User, CreditCard, Wallet } from 'lucide-react'

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

  .ic-payout { background: rgba(56,128,135,0.1); color: #388087; }
  .ic-pending { background: rgba(212,134,10,0.1); color: #d4860a; }

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

  /* Payout Status */
  .pay-pill {
    padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 700;
  }
  .p-paid    { background: #E8F7EC; color: #2E7D4F; }
  .p-queued  { background: #FFF8E6; color: #B07A00; }
  .p-failed  { background: #fee2e2; color: #ef4444; }

  .pay-btn {
    padding: 6px 12px; border-radius: 8px; border: 1.5px solid #388087;
    background: transparent; color: #388087; font-size: 11px; font-weight: 700;
    cursor: pointer; transition: all 0.2s;
  }
  .pay-btn:hover { background: #388087; color: #fff; }
`

const FINANCE_REQUESTS = [
  { id: 'FIN-101', employee: 'Alice Wong',   category: 'Travel',    date: 'Mar 29', amount: '₹14,500', status: 'Queued' },
  { id: 'FIN-102', employee: 'Bob Burton',   category: 'Internet',  date: 'Mar 28', amount: '₹999',    status: 'Paid' },
  { id: 'FIN-103', employee: 'Charlie Day',  category: 'Others',    date: 'Mar 26', amount: '₹2,300',  status: 'Failed' },
  { id: 'FIN-104', employee: 'Diana Prince', category: 'Medical',   date: 'Mar 25', amount: '₹12,400', status: 'Queued' },
]

export default function FinanceRequests() {
  const [search, setSearch] = useState('')

  return (
    <>
      <style>{css}</style>
      <div className="req-wrap">
        <div className="req-header">
          <div>
            <div className="req-title">Finance <span>Disbursements</span></div>
            <div className="req-sub">Verify and execute payments for approved reimbursement claims</div>
          </div>
        </div>

        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon ic-payout"><Wallet size={20} /></div>
            <div className="summary-info"><div className="summary-label">Total Outflow</div><div className="summary-val">₹12.45L</div></div>
          </div>
          <div className="summary-card">
            <div className="summary-icon ic-pending"><Clock size={20} /></div>
            <div className="summary-info"><div className="summary-label">Payments Queued</div><div className="summary-val">24</div></div>
          </div>
          <div className="summary-card">
             <div className="summary-icon ic-payout"><CreditCard size={20} /></div>
            <div className="summary-info"><div className="summary-label">Failed Trans.</div><div className="summary-val">2</div></div>
          </div>
        </div>

        <div className="req-controls">
           <div className="tabs-row">
            <div className="tabs">
              <button className="tab-btn active">Ready to Pay</button>
              <button className="tab-btn">Payment History</button>
            </div>
          </div>
          <div className="search-wrap">
            <Search size={15} />
            <input className="search-input" placeholder="Search by ID or employee name..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="table-card">
          <div className="table-wrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Employee</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Payout Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {FINANCE_REQUESTS.map(req => (
                  <tr key={req.id}>
                    <td style={{ fontWeight:700, color:'#388087' }}>{req.id}</td>
                    <td><div style={{ fontWeight:600 }}>{req.employee}</div></td>
                    <td><span style={{ fontSize:12, color:'#7aa8ae' }}>{req.category}</span></td>
                    <td style={{ fontWeight:700 }}>{req.amount}</td>
                    <td>{req.date}</td>
                    <td><span className={`pay-pill ${req.status === 'Queued' ? 'p-queued' : req.status === 'Paid' ? 'p-paid' : 'p-failed'}`}>{req.status}</span></td>
                    <td>
                      {req.status === 'Queued' 
                        ? <button className="pay-btn">Release Payment</button> 
                        : <button className="btn-icon-sq" title="View Transaction"><Eye size={16} /></button>
                      }
                    </td>
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
