import { useState } from 'react'
import { Search, Filter, CheckCircle, XCircle, Clock, Eye, FileText, ChevronRight, Check, X, User, Hash, TrendingUp, AlertCircle, Info } from 'lucide-react'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  .man-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
  .man-wrap { font-family: 'Poppins', sans-serif; background: #f4f8f9; min-height: 100vh; padding: 24px; }

  /* ── Header ── */
  .man-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
  .man-title { font-size: 22px; font-weight: 700; color: #17252A; }
  .man-title span { color: #388087; }
  .man-sub { font-size: 13px; color: #7aa8ae; margin-top: 2px; }

  /* ── Summary Stats ── */
  .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 24px; }
  .summary-card {
    background: #fff; border-radius: 18px; padding: 20px;
    border: 1.5px solid rgba(111,179,184,0.13);
    box-shadow: 0 4px 12px rgba(56,128,135,0.05);
    display: flex; align-items: center; gap: 16px;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .summary-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(56,128,135,0.08); }
  .summary-icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .summary-label { font-size: 12px; font-weight: 600; color: #7aa8ae; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
  .summary-val { font-size: 24px; font-weight: 700; color: #17252A; }

  /* Icon Colors */
  .ic-pending { background: rgba(212,134,10,0.1); color: #d4860a; }
  .ic-approved { background: rgba(56,128,135,0.1); color: #388087; }
  .ic-rejected { background: rgba(181,74,74,0.1); color: #b54a4a; }

  /* ── Controls Section ── */
  .man-controls { display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px; }
  .tabs-row { display: flex; align-items: center; border-bottom: 1.5px solid rgba(111,179,184,0.13); }
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
  .tab-count { margin-left: 6px; font-size: 11px; padding: 1px 6px; border-radius: 6px; background: rgba(111,179,184,0.12); color: #17252A; }

  .search-wrap { position: relative; width: 100%; }
  .search-wrap svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #7aa8ae; width: 15px; }
  .search-input {
    width: 100%; padding: 11px 12px 11px 40px; border-radius: 12px;
    border: 1.5px solid rgba(111,179,184,0.2); background: #fff;
    font-family: 'Poppins', sans-serif; font-size: 13.5px; color: #17252A; outline: none; transition: all 0.15s;
  }
  .search-input:focus { border-color: #6FB3B8; box-shadow: 0 0 0 4px rgba(111,179,184,0.06); }

  /* ── Table Area ── */
  .table-card {
    background: #fff; border-radius: 20px;
    border: 1.5px solid rgba(111,179,184,0.13);
    box-shadow: 0 4px 20px rgba(56,128,135,0.06); overflow: hidden;
  }
  .table-wrap { overflow-x: auto; }
  .tbl { width: 100%; border-collapse: collapse; min-width: 900px; }
  .tbl thead tr { background: rgba(111,179,184,0.05); }
  .tbl th { padding: 14px 20px; text-align: left; font-size: 12px; font-weight: 600; color: #7aa8ae; letter-spacing: 0.5px; text-transform: uppercase; }
  .tbl td { padding: 18px 20px; border-bottom: 1.2px solid rgba(111,179,184,0.08); vertical-align: middle; }

  .emp-cell { display: flex; align-items: center; gap: 12px; }
  .emp-avatar { width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg, #17252A, #388087); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px; }
  .emp-name { font-size: 14px; font-weight: 600; color: #17252A; }
  .emp-id { font-size: 11px; color: #7aa8ae; margin-top: 1px; }

  .status-pill { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
  .st-pending  { background: #FFF8E6; color: #B07A00; }
  .st-approved { background: #E8F7EC; color: #2E7D4F; }
  .st-rejected { background: #fee2e2; color: #ef4444; }

  /* Approval Sequence Badges */
  .seq-badge {
    display: inline-flex; align-items: center; gap: 5px; background: #f0f7f8;
    color: #388087; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 600;
  }

  .action-btns { display: flex; gap: 8px; }
  .btn-ic {
    width: 32px; height: 32px; border-radius: 8px; border: 1.2px solid #e0eef0;
    display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;
    background: #fff; color: #7aa8ae;
  }
  .btn-ic:hover { border-color: #388087; color: #388087; background: #f0f7f8; }
  .btn-ic.btn-yes:hover { border-color: #2E7D4F; color: #fff; background: #2E7D4F; }
  .btn-ic.btn-no:hover { border-color: #ef4444; color: #fff; background: #ef4444; }

  /* ── Modals ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(23,37,42,0.4); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center; padding: 16px;
  }
  .modal {
    background: #fff; border-radius: 24px; width: 100%; max-width: 440px;
    box-shadow: 0 24px 64px rgba(23,37,42,0.2); overflow: hidden;
  }
  .modal-body { padding: 32px; }
  .modal-icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
  .modal-title { font-size: 18px; font-weight: 700; color: #17252A; text-align: center; margin-bottom: 8px; }
  .modal-desc { font-size: 13.5px; color: #7aa8ae; text-align: center; line-height: 1.6; margin-bottom: 24px; }

  .remark-area {
    width: 100%; height: 100px; padding: 14px; border-radius: 14px;
    border: 1.5px solid #e0eef0; font-family: inherit; font-size: 13.5px;
    outline: none; resize: none; transition: 0.15s; background: #fafcfe;
  }
  .remark-area:focus { border-color: #388087; background: #fff; box-shadow: 0 0 0 4px rgba(56,128,135,0.06); }

  .modal-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .btn { padding: 12px; border-radius: 12px; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: 0.2s; border: none; }
  .btn-primary { background: linear-gradient(135deg, #17252A, #388087); color: #fff; box-shadow: 0 4px 12px rgba(23,37,42,0.15); }
  .btn-ghost { background: transparent; border: 1.5px solid #e0eef0; color: #7aa8ae; }
`

const MOCK_REQUESTS = [
  { id: 'EXP-1092', employee: 'Rahul Verma', empId: 'EMP042', amount: '₹12,400', category: 'Medical', date: 'Mar 29, 2024', status: 'Pending', step: 1, sequence: ['Manager', 'Finance', 'Director'] },
  { id: 'EXP-1093', employee: 'Priya Das', empId: 'EMP085', amount: '₹3,500',  category: 'Internet', date: 'Mar 28, 2024', status: 'Pending', step: 1, sequence: ['Manager', 'Director'] },
  { id: 'EXP-1090', employee: 'Arjun Mehra', empId: 'EMP101', amount: '₹8,200',  category: 'Travel',   date: 'Mar 24, 2024', status: 'Approved', step: 2, sequence: ['Manager', 'Finance'] },
  { id: 'EXP-1088', employee: 'Surbhi Jha', empId: 'EMP012', amount: '₹1,500',  category: 'Office',   date: 'Mar 22, 2024', status: 'Rejected', step: 1, sequence: ['Manager'] },
]

export default function ManagerRequest() {
  const [activeTab, setActiveTab] = useState('pending')
  const [search, setSearch] = useState('')
  const [selectedReq, setSelectedReq] = useState(null)
  const [modalType, setModalType] = useState(null) // 'approve', 'reject', 'details'
  const [remark, setRemark] = useState('')

  const stats = {
    pending: MOCK_REQUESTS.filter(r => r.status === 'Pending').length,
    approved: MOCK_REQUESTS.filter(r => r.status === 'Approved').length,
    rejected: MOCK_REQUESTS.filter(r => r.status === 'Rejected').length,
  }

  const filtered = MOCK_REQUESTS.filter(req => {
    const matchesTab = activeTab === 'pending' ? req.status === 'Pending' : req.status !== 'Pending'
    const matchesSearch = req.employee.toLowerCase().includes(search.toLowerCase()) || req.id.toLowerCase().includes(search.toLowerCase())
    return matchesTab && matchesSearch
  })

  const openModal = (req, type) => {
    setSelectedReq(req)
    setModalType(type)
    setRemark('')
  }

  const handleAction = () => {
    // Mock action handler
    console.log(`${modalType} request ${selectedReq.id} with remark: ${remark}`)
    setModalType(null)
  }

  return (
    <>
      <style>{css}</style>
      <div className="man-wrap">
        
        {/* Header */}
        <div className="man-header">
          <div>
            <div className="man-title">Department <span>Requests</span></div>
            <div className="man-sub">Review and approve expenses from your team</div>
          </div>
        </div>

        {/* Stats */}
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon ic-pending"><Clock size={20} /></div>
            <div className="summary-info"><div className="summary-label">Awaiting My Action</div><div className="summary-val">{stats.pending}</div></div>
          </div>
          <div className="summary-card">
            <div className="summary-icon ic-approved"><CheckCircle size={20} /></div>
            <div className="summary-info"><div className="summary-label">Approved by Me</div><div className="summary-val">{stats.approved}</div></div>
          </div>
          <div className="summary-card">
            <div className="summary-icon ic-rejected"><XCircle size={20} /></div>
            <div className="summary-info"><div className="summary-label">Rejected at Source</div><div className="summary-val">{stats.rejected}</div></div>
          </div>
        </div>

        {/* Search & Tabs */}
        <div className="man-controls">
          <div className="tabs-row">
            <div className="tabs">
              <button className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>
                Pending <span className="tab-count">{stats.pending}</span>
              </button>
              <button className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
                History <span className="tab-count">{stats.approved + stats.rejected}</span>
              </button>
            </div>
          </div>
          <div className="search-wrap">
            <Search />
            <input 
              className="search-input" 
              placeholder="Search by Employee name or Request ID..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="table-card">
          <div className="table-wrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Employee</th>
                  <th>Amount</th>
                  <th>Workflow Step</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(req => (
                  <tr key={req.id}>
                    <td style={{ fontWeight: 700, color: '#388087' }}>{req.id}</td>
                    <td>
                      <div className="emp-cell">
                        <div className="emp-avatar">{req.employee.split(' ').map(n=>n[0]).join('')}</div>
                        <div>
                          <div className="emp-name">{req.employee}</div>
                          <div className="emp-id">{req.empId}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, fontSize: '15px' }}>{req.amount}</td>
                    <td>
                      <div className="seq-badge">
                        <User size={12} />
                        Step {req.step}: {req.sequence[req.step - 1]}
                        {req.sequence.length > 1 && <ChevronRight size={10} />}
                      </div>
                    </td>
                    <td style={{ fontSize: '13px', color: '#7aa8ae' }}>{req.date}</td>
                    <td>
                      <span className={`status-pill ${req.status === 'Pending' ? 'st-pending' : req.status === 'Approved' ? 'st-approved' : 'st-rejected'}`}>
                        {req.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        {req.status === 'Pending' ? (
                          <>
                            <button className="btn-ic btn-yes" title="Approve" onClick={() => openModal(req, 'approve')}><Check size={16} /></button>
                            <button className="btn-ic btn-no" title="Reject" onClick={() => openModal(req, 'reject')}><X size={16} /></button>
                          </>
                        ) : (
                          <button className="btn-ic" onClick={() => openModal(req, 'details')}><Eye size={16} /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        {modalType && (
          <div className="modal-overlay" onClick={e => e.target.classList.contains('modal-overlay') && setModalType(null)}>
            <div className="modal">
              <div className="modal-body">
                {modalType === 'approve' && (
                  <>
                    <div className="modal-icon" style={{ background: 'rgba(46,125,79,0.1)', color: '#2E7D4F' }}><CheckCircle size={32} /></div>
                    <div className="modal-title">Approve Expense</div>
                    <div className="modal-desc">Are you sure you want to approve this request of <b>{selectedReq?.amount}</b> for {selectedReq?.employee}? It will move to the next stage.</div>
                  </>
                )}
                
                {modalType === 'reject' && (
                  <>
                    <div className="modal-icon" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}><AlertCircle size={32} /></div>
                    <div className="modal-title">Reject Expense</div>
                    <div className="modal-desc">Please provide a reason for rejecting the claim by {selectedReq?.employee}. This is mandatory for employee clarity.</div>
                  </>
                )}

                {(modalType === 'approve' || modalType === 'reject') && (
                   <div style={{ marginBottom: '24px' }}>
                    <label style={{ marginBottom: '8px', display: 'block' }}>Remark / Comments</label>
                    <textarea 
                      className="remark-area" 
                      placeholder="Add your comments here..."
                      value={remark}
                      onChange={e => setRemark(e.target.value)}
                    />
                  </div>
                )}

                {modalType === 'details' && (
                  <>
                     <div className="modal-icon" style={{ background: '#f0f7f8', color: '#17252A' }}><Info size={32} /></div>
                     <div className="modal-title">Request Details</div>
                     <div className="modal-desc" style={{ textAlign: 'left', marginBottom: '16px' }}>
                       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                         <div><b>Employee:</b> {selectedReq?.employee}</div>
                         <div><b>Amount:</b> {selectedReq?.amount}</div>
                         <div><b>Category:</b> {selectedReq?.category}</div>
                         <div><b>Date:</b> {selectedReq?.date}</div>
                       </div>
                       <div style={{ marginTop: '20px' }}>
                         <b>Approval Workflow Progress:</b>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                           {selectedReq?.sequence.map((step, idx) => (
                             <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                               <div style={{ 
                                 width: '24px', height: '24px', borderRadius: '50%', background: idx + 1 < selectedReq.step ? '#2E7D4F' : (idx + 1 === selectedReq.step ? '#388087' : '#eee'), 
                                 color: '#fff', fontSize: '11px', display: 'flex', alignItems: 'center', justifyCenter: 'center' 
                               }}>
                                 {idx + 1 < selectedReq.step ? <Check size={12} /> : idx + 1}
                               </div>
                               <span style={{ fontSize: '11px', color: idx + 1 === selectedReq.step ? '#17252A' : '#7aa8ae' }}>{step}</span>
                               {idx < selectedReq.sequence.length - 1 && <ChevronRight size={12} color="#ddd" />}
                             </div>
                           ))}
                         </div>
                       </div>
                     </div>
                  </>
                )}

                <div className="modal-actions">
                  <button className="btn btn-ghost" onClick={() => setModalType(null)}>Close</button>
                  {modalType !== 'details' && (
                    <button 
                      className="btn btn-primary" 
                      disabled={modalType === 'reject' && !remark.trim()}
                      onClick={handleAction}
                    >
                      Confirm {modalType}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}
