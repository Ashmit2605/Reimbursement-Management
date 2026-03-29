import { useState } from 'react'
import { Search, CheckCircle, XCircle, Clock, Eye, FileText, Check, X, Calendar, Hash } from 'lucide-react'

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

  .ic-all { background: rgba(23,37,42,0.08); color: #17252A; }
  .ic-pending { background: rgba(212,134,10,0.1); color: #d4860a; }
  .ic-approved { background: rgba(56,128,135,0.1); color: #388087; }
  .ic-rejected { background: rgba(181,74,74,0.1); color: #b54a4a; }

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
  .tab-count {
    margin-left: 6px; padding: 2px 8px; border-radius: 20px;
    font-size: 11px; background: rgba(111,179,184,0.12); color: #7aa8ae;
  }
  .tab-btn.active .tab-count { background: #388087; color: #fff; }

  .search-wrap { position: relative; flex: 1; min-width: 200px; max-width: 320px; }
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
  .tbl tbody tr:last-child td { border-bottom: none; }
  .tbl tbody tr { transition: background 0.1s; }
  .tbl tbody tr:hover { background: rgba(111,179,184,0.03); }

  .user-cell { display: flex; align-items: center; gap: 12px; }
  .avatar {
    width: 36px; height: 36px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; color: #fff; flex-shrink: 0;
  }
  .user-name { font-size: 13.5px; font-weight: 600; color: #17252A; }
  .user-email { font-size: 11.5px; color: #7aa8ae; }

  .amount-cell { font-size: 14px; font-weight: 700; color: #17252A; }
  .category-pill {
    padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 600;
    background: rgba(111,179,184,0.12); color: #388087; display: inline-block;
  }
  .date-cell { font-size: 12.5px; color: #5a7b80; display: flex; align-items: center; gap: 6px; }

  .status-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;
  }
  .st-pending { background: rgba(212,134,10,0.1); color: #d4860a; }
  .st-approved { background: rgba(56,128,135,0.1); color: #388087; }
  .st-rejected { background: rgba(181,74,74,0.1); color: #b54a4a; }

  .actions { display: flex; align-items: center; gap: 8px; }
  .btn-icon {
    width: 34px; height: 34px; border-radius: 10px; border: none;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all 0.15s; background: #f7fafa; color: #7aa8ae;
  }
  .btn-view:hover { background: rgba(23,37,42,0.08); color: #17252A; }

  .empty-state { text-align: center; padding: 60px 20px; }
  .empty-icon { width: 56px; height: 56px; border-radius: 16px; background: rgba(111,179,184,0.08); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: #6FB3B8; }
  .empty-txt { font-size: 15px; font-weight: 600; color: #17252A; margin-bottom: 4px; }
  .empty-sub { font-size: 13px; color: #7aa8ae; }

  .overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(23,37,42,0.38); backdrop-filter: blur(8px) saturate(0.9);
    display: flex; align-items: center; justify-content: center;
    padding: 16px; animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  .modal {
    background: #fff; border-radius: 24px; width: 100%; max-width: 440px;
    box-shadow: 0 24px 64px rgba(23,37,42,0.25);
    animation: slideUp 0.22s cubic-bezier(0.4, 0, 0.2, 1); overflow: hidden;
  }
  @keyframes slideUp { from{transform:translateY(24px);opacity:0} to{transform:translateY(0);opacity:1} }

  .modal-header {
    padding: 24px 28px 20px; border-bottom: 1px solid rgba(111,179,184,0.1);
    display: flex; align-items: center; justify-content: space-between;
  }
  .modal-title-group { display: flex; align-items: center; gap: 14px; }
  .modal-h-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
  }
  .modal-htitle { font-size: 17px; font-weight: 700; color: #17252A; }
  .modal-hsub { font-size: 12.5px; color: #7aa8ae; margin-top: 1px; }

  .modal-body { padding: 24px 28px; }
  .modal-request-info {
    background: #f7fafa; border-radius: 16px; padding: 16px; margin-bottom: 20px;
    border: 1px solid rgba(111,179,184,0.1);
  }
  .modal-info-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
  .modal-info-row:last-child { margin-bottom: 0; }
  .modal-info-k { font-size: 12px; color: #7aa8ae; font-weight: 500; }
  .modal-info-v { font-size: 13px; font-weight: 600; color: #17252A; }

  .modal-btns { display: flex; flex-direction: column; gap: 10px; margin-top: 24px; }
  .btn-cancel {
    padding: 12px; border-radius: 12px; background: transparent; color: #7aa8ae;
    border: 1.5px solid #e2eef0; font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s;
  }
  .btn-cancel:hover { border-color: #6FB3B8; color: #388087; }

  @media (max-width: 768px) {
    .req-wrap { padding: 16px; }
    .tabs-row { overflow-x: auto; flex-direction: column; align-items: stretch; gap: 16px; padding-bottom: 12px; }
    .tabs { padding-bottom: 4px; }
    .summary-grid { grid-template-columns: repeat(2, 1fr); }
    .search-wrap { max-width: none; }
  }
  @media (max-width: 480px) {
    .summary-grid { grid-template-columns: 1fr; }
    .avatar { width: 32px; height: 32px; font-size: 11px; }
  }
`

const AVATAR_COLORS = ['#388087','#d4860a','#6c3fc5','#c0504d','#2e7d32','#1565c0','#7b5ea7','#b06000']
const avatarColor = name => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
const initials    = name => name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

const INITIAL_REQUESTS = [
  { id: 'REQ-1001', employee: 'Alex Chen', email: 'alex@company.com', date: 'Mar 24, 2026', category: 'Travel', amount: '₹1,250.00', status: 'Pending', remark: '' },
  { id: 'REQ-1002', employee: 'Priya Sharma', email: 'priya@company.com', date: 'Mar 23, 2026', category: 'Food & Meals', amount: '₹480.00', status: 'Pending', remark: '' },
  { id: 'REQ-1003', employee: 'James Walker', email: 'james@company.com', date: 'Mar 22, 2026', category: 'Internet', amount: '₹999.00', status: 'Approved', remark: 'Valid subscription' },
  { id: 'REQ-1004', employee: 'Sarah Johnson', email: 'sarah@company.com', date: 'Mar 21, 2026', category: 'Office Supplies', amount: '₹2,340.00', status: 'Rejected', remark: 'Bill copy was not clearly visible' },
  { id: 'REQ-1005', employee: 'Marc Dupont', email: 'marc@company.com', date: 'Mar 20, 2026', category: 'Others', amount: '₹120.00', status: 'Pending', remark: '' },
  { id: 'REQ-1006', employee: 'Alex Chen', email: 'alex@company.com', date: 'Mar 18, 2026', category: 'Travel', amount: '₹850.00', status: 'Approved', remark: 'Client meet travel' },
  { id: 'REQ-1007', employee: 'Priya Sharma', email: 'priya@company.com', date: 'Mar 15, 2026', category: 'Medical', amount: '₹3,500.00', status: 'Rejected', remark: 'Personal expenses not covered' },
]

export default function Requests() {
  const [requests] = useState(INITIAL_REQUESTS)
  const [activeTab, setActiveTab] = useState('pending')
  const [search, setSearch] = useState('')
  const [selectedReq, setSelectedReq] = useState(null)

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'Pending').length,
    approved: requests.filter(r => r.status === 'Approved').length,
    rejected: requests.filter(r => r.status === 'Rejected').length
  }

  const filtered = requests.filter(r => {
    const isHistory = activeTab === 'history'
    const matchStatus = isHistory ? (r.status === 'Approved' || r.status === 'Rejected') : (r.status === 'Pending')
    const matchSearch = r.employee.toLowerCase().includes(search.toLowerCase()) ||
                        r.id.toLowerCase().includes(search.toLowerCase()) ||
                        r.category.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const closeModal = () => setSelectedReq(null)

  return (
    <>
      <style>{css}</style>
      <div className="req-wrap">

        {/* Header */}
        <div className="req-header">
          <div>
            <div className="req-title">Reimbursement <span>Requests</span></div>
            <div className="req-sub">View and track employee reimbursement claims</div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon ic-all"><Hash size={20} /></div>
            <div className="summary-info">
              <div className="summary-label">Total Claims</div>
              <div className="summary-val">{stats.total}</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon ic-pending"><Clock size={20} /></div>
            <div className="summary-info">
              <div className="summary-label">Pending</div>
              <div className="summary-val">{stats.pending}</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon ic-approved"><CheckCircle size={20} /></div>
            <div className="summary-info">
              <div className="summary-label">Approved</div>
              <div className="summary-val">{stats.approved}</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon ic-rejected"><XCircle size={20} /></div>
            <div className="summary-info">
              <div className="summary-label">Rejected</div>
              <div className="summary-val">{stats.rejected}</div>
            </div>
          </div>
        </div>

        {/* Tabs and Search */}
        <div className="req-controls">
          <div className="tabs-row">
            <div className="tabs">
              <button
                className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
              >
                Pending
                <span className="tab-count">{stats.pending}</span>
              </button>
              <button
                className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                History
                <span className="tab-count">{stats.approved + stats.rejected}</span>
              </button>
            </div>
          </div>

          <div className="search-wrap" style={{ maxWidth: '100%' }}>
            <Search size={15} />
            <input
              className="search-input"
              placeholder="Search by ID, name or category..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Request Table */}
        <div className="table-card">
          <div className="table-wrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount</th>
                  {activeTab === 'history' && <th>Status</th>}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={activeTab === 'history' ? 7 : 6}>
                      <div className="empty-state">
                        <div className="empty-icon"><FileText size={24} /></div>
                        <div className="empty-txt">No requests found</div>
                        <div className="empty-sub">We couldn't find any reimbursement claims matching your criteria.</div>
                      </div>
                    </td>
                  </tr>
                ) : filtered.map(req => (
                  <tr key={req.id}>
                    <td style={{ fontWeight: 600, color: '#388087', fontSize: '13px' }}>{req.id}</td>
                    <td>
                      <div className="user-cell">
                        <div className="avatar" style={{ background: avatarColor(req.employee) }}>
                          {initials(req.employee)}
                        </div>
                        <div>
                          <div className="user-name">{req.employee}</div>
                          <div className="user-email">{req.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="date-cell">
                        <Calendar size={13} />
                        {req.date}
                      </div>
                    </td>
                    <td><span className="category-pill">{req.category}</span></td>
                    <td><div className="amount-cell">{req.amount}</div></td>
                    {activeTab === 'history' && (
                      <td>
                        <span className={`status-badge ${req.status === 'Approved' ? 'st-approved' : 'st-rejected'}`}>
                          {req.status === 'Approved' ? <Check size={13}/> : <X size={13}/>}
                          {req.status}
                        </span>
                      </td>
                    )}
                    <td>
                      <div className="actions">
                        <button className="btn-icon btn-view" title="View Details" onClick={() => setSelectedReq(req)}>
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Modal */}
        {selectedReq && (
          <div className="overlay" onClick={e => e.target.classList.contains('overlay') && closeModal()}>
            <div className="modal">
              <div className="modal-header">
                <div className="modal-title-group">
                  <div className="modal-h-icon" style={{ background: 'rgba(56,128,135,0.1)', color: '#388087' }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="modal-htitle">Request Details</div>
                    <div className="modal-hsub">{selectedReq.id}</div>
                  </div>
                </div>
                <button className="btn-icon" onClick={closeModal}><X size={18} /></button>
              </div>
              <div className="modal-body">
                <div className="modal-request-info">
                  <div className="modal-info-row">
                    <span className="modal-info-k">Employee</span>
                    <span className="modal-info-v">{selectedReq.employee}</span>
                  </div>
                  <div className="modal-info-row">
                    <span className="modal-info-k">Category</span>
                    <span className="modal-info-v">{selectedReq.category}</span>
                  </div>
                  <div className="modal-info-row">
                    <span className="modal-info-k">Amount</span>
                    <span className="modal-info-v" style={{ color: '#388087' }}>{selectedReq.amount}</span>
                  </div>
                  <div className="modal-info-row">
                    <span className="modal-info-k">Submission Date</span>
                    <span className="modal-info-v">{selectedReq.date}</span>
                  </div>
                  <div className="modal-info-row">
                    <span className="modal-info-k">Status</span>
                    <span className="modal-info-v">
                      <span className={`status-badge ${selectedReq.status === 'Pending' ? 'st-pending' : selectedReq.status === 'Approved' ? 'st-approved' : 'st-rejected'}`}>
                        {selectedReq.status}
                      </span>
                    </span>
                  </div>
                </div>
                {selectedReq.remark && (
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#17252A', marginBottom: '8px', display: 'block' }}>Admin Remarks</span>
                    <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '12px', fontSize: '13px', color: '#5a7b80', border: '1px solid rgba(111,179,184,0.1)' }}>
                      {selectedReq.remark}
                    </div>
                  </div>
                )}
                <div className="modal-btns">
                  <button className="btn-cancel" onClick={closeModal}>Close Details</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}